import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Star, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index', { ascending: false });

    if (!error && data) {
      setTestimonials(data);
    }
    setLoading(false);
  };

  const handleSaveTestimonial = async (testimonialData) => {
    if (editingTestimonial?.id) {
      // Update
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', editingTestimonial.id);

      if (!error) {
        fetchTestimonials();
        setIsDialogOpen(false);
        setEditingTestimonial(null);
      }
    } else {
      // Create
      const { error } = await supabase
        .from('testimonials')
        .insert([testimonialData]);

      if (!error) {
        fetchTestimonials();
        setIsDialogOpen(false);
        setEditingTestimonial(null);
      }
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchTestimonials();
    }
  };

  const toggleFeatured = async (testimonial) => {
    await supabase
      .from('testimonials')
      .update({ featured: !testimonial.featured })
      .eq('id', testimonial.id);

    fetchTestimonials();
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
        <h2 className="text-2xl font-serif text-sage-900">Testimonials</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => setEditingTestimonial(null)}
              className="bg-sage-700 hover:bg-sage-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <TestimonialForm
              testimonial={editingTestimonial}
              onSave={handleSaveTestimonial}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingTestimonial(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={testimonial.featured ? 'border-gold-500 border-2' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {testimonial.featured && (
                      <Star className="h-5 w-5 fill-gold-500 text-gold-500" />
                    )}
                    <span className="text-sm font-medium text-sage-700">
                      {testimonial.role}
                      {testimonial.category && ` • ${testimonial.category}`}
                    </span>
                  </div>
                  <blockquote className="text-gray-700 italic mb-2">
                    "{testimonial.quote}"
                  </blockquote>
                  {(testimonial.name || testimonial.city) && (
                    <p className="text-sm text-gray-600">
                      — {testimonial.name || 'Anonymous'}
                      {testimonial.city && `, ${testimonial.city}`}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(testimonial)}
                    title="Toggle featured"
                  >
                    <Star className={`h-4 w-4 ${testimonial.featured ? 'fill-gold-500 text-gold-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <p className="text-center text-gray-500 py-12">No testimonials yet. Create your first one!</p>
        )}
      </div>
    </div>
  );
}

function TestimonialForm({ testimonial, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    quote: testimonial?.quote || '',
    role: testimonial?.role || 'Client',
    name: testimonial?.name || '',
    city: testimonial?.city || '',
    category: testimonial?.category || '',
    featured: testimonial?.featured || false,
    is_published: testimonial?.is_published ?? true,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Quote *</label>
        <Textarea
          value={formData.quote}
          onChange={(e) => handleInputChange('quote', e.target.value)}
          rows={4}
          required
          placeholder="Enter the testimonial quote..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Role *</label>
          <Select value={formData.role} onValueChange={(val) => handleInputChange('role', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Loved One">Loved One</SelectItem>
              <SelectItem value="Resident">Resident</SelectItem>
              <SelectItem value="Referral Partner">Referral Partner</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={formData.category || 'none'} onValueChange={(val) => handleInputChange('category', val === 'none' ? '' : val)}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="Transitions">Transitions</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <Input
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleInputChange('featured', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium">Featured (highlight on website)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => handleInputChange('is_published', e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium">Published</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-sage-700 hover:bg-sage-800">
          {testimonial ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </div>
    </form>
  );
}