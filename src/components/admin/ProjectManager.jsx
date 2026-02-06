import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Upload, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('result_projects')
      .select('*')
      .order('sort_date', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleSaveProject = async (projectData) => {
    if (editingProject?.id) {
      // Update
      const { error } = await supabase
        .from('result_projects')
        .update(projectData)
        .eq('id', editingProject.id);

      if (!error) {
        fetchProjects();
        setIsDialogOpen(false);
        setEditingProject(null);
      }
    } else {
      // Create
      const { error } = await supabase
        .from('result_projects')
        .insert([projectData]);

      if (!error) {
        fetchProjects();
        setIsDialogOpen(false);
        setEditingProject(null);
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project? This will also delete all associated media.')) return;

    const { error } = await supabase
      .from('result_projects')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchProjects();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif text-sage-900">Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditingProject(null)}
              className="bg-sage-700 hover:bg-sage-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'New Project'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSave={handleSaveProject}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingProject(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.category} • {project.location || 'No location'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProject(project);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {project.description && (
              <CardContent>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-500 py-12">No projects yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || 'Transitions',
    slug: project?.slug || '',
    description: project?.description || '',
    location: project?.location || '',
    is_published: project?.is_published ?? true,
  });
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (project?.id) {
      fetchMedia();
    }
  }, [project]);

  const fetchMedia = async () => {
    const { data } = await supabase
      .from('result_media')
      .select('*')
      .eq('project_id', project.id)
      .order('order_index');

    if (data) {
      setMedia(data);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Auto-generate slug from title
    if (field === 'title' && !project) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData({ ...formData, title: value, slug });
    }
  };

  const handleImageUpload = async (kind, files) => {
    if (!project?.id) {
      alert('Please save the project first before uploading images.');
      return;
    }

    setUploading(true);
    for (const file of files) {
      const fileName = `projects/${project.id}/${kind}/${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('results-media')
        .upload(fileName, file);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('results-media')
          .getPublicUrl(fileName);

        await supabase.from('result_media').insert([{
          project_id: project.id,
          kind,
          url: publicUrl,
          order_index: media.filter(m => m.kind === kind).length,
        }]);
      }
    }
    setUploading(false);
    fetchMedia();
  };

  const handleSetMainImage = async (mediaId, kind) => {
    // First, unset all other main images for this kind and project
    const { data: allMedia } = await supabase
      .from('result_media')
      .select('id')
      .eq('project_id', project.id)
      .eq('kind', kind);
    
    if (allMedia) {
      await Promise.all(
        allMedia.map(m => 
          supabase
            .from('result_media')
            .update({ is_main: false })
            .eq('id', m.id)
        )
      );
    }

    // Then set the selected one as main
    await supabase
      .from('result_media')
      .update({ is_main: true })
      .eq('id', mediaId);

    fetchMedia();
  };

  const handleDeleteMedia = async (mediaId, url) => {
    const { error } = await supabase
      .from('result_media')
      .delete()
      .eq('id', mediaId);

    if (!error) {
      // Extract file path from URL and delete from storage
      const path = url.split('/results-media/')[1];
      if (path) {
        await supabase.storage.from('results-media').remove([path]);
      }
      fetchMedia();
    }
  };

  const handleAddVideoLink = async (kind) => {
    const url = prompt('Enter YouTube or Vimeo URL:');
    if (!url || !project?.id) return;

    await supabase.from('result_media').insert([{
      project_id: project.id,
      kind,
      url,
      order_index: media.filter(m => m.kind === kind).length,
    }]);

    fetchMedia();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  const beforeImages = media.filter(m => m.kind === 'before_image');
  const afterImages = media.filter(m => m.kind === 'after_image');
  const beforeVideos = media.filter(m => m.kind === 'before_video');
  const afterVideos = media.filter(m => m.kind === 'after_video');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <Select value={formData.category} onValueChange={(val) => handleInputChange('category', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Transitions">Transitions</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
        <Input
          value={formData.slug}
          onChange={(e) => handleInputChange('slug', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <Input
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="e.g., Dayton, OH"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_published}
          onChange={(e) => handleInputChange('is_published', e.target.checked)}
          className="rounded"
        />
        <label className="text-sm font-medium">Published (visible on website)</label>
      </div>

      {project?.id && (
        <>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Before Images</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {beforeImages.map((m) => (
                <div key={m.id} className="relative group">
                  <img src={m.url} alt="Before" className="w-full h-32 object-cover rounded" />
                  {m.is_main && (
                    <div className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-1 rounded font-semibold">
                      Main
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(m.id, 'before_image')}
                    className="absolute bottom-2 left-2 bg-gold-500 hover:bg-gold-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set Main
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(m.id, m.url)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-sage-600 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Upload Before Images</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload('before_image', Array.from(e.target.files))}
              />
            </label>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">After Images</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {afterImages.map((m) => (
                <div key={m.id} className="relative group">
                  <img src={m.url} alt="After" className="w-full h-32 object-cover rounded" />
                  {m.is_main && (
                    <div className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-1 rounded font-semibold">
                      Main
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(m.id, 'after_image')}
                    className="absolute bottom-2 left-2 bg-gold-500 hover:bg-gold-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set Main
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(m.id, m.url)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <label className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-sage-600 transition-colors">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Upload After Images</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload('after_image', Array.from(e.target.files))}
              />
            </label>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Videos</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Before Video</p>
                {beforeVideos.map((v) => (
                  <div key={v.id} className="flex items-center gap-2 mb-2">
                    <Input value={v.url} readOnly />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMedia(v.id, v.url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {beforeVideos.length === 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddVideoLink('before_video')}
                  >
                    Add Before Video Link
                  </Button>
                )}
              </div>

              <div>
                <p className="text-sm font-medium mb-2">After Video</p>
                {afterVideos.map((v) => (
                  <div key={v.id} className="flex items-center gap-2 mb-2">
                    <Input value={v.url} readOnly />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMedia(v.id, v.url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {afterVideos.length === 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddVideoLink('after_video')}
                  >
                    Add After Video Link
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-sage-700 hover:bg-sage-800">
          {project ? 'Update Project' : 'Create Project'}
        </Button>
      </div>

      {!project && (
        <p className="text-sm text-gray-500 text-center">
          Save the project first to upload images and videos
        </p>
      )}

      {uploading && (
        <div className="flex items-center justify-center gap-2 text-sage-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
    </form>
  );
}