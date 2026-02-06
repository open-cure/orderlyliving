import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../components/supabaseClient';
import ProjectCard from '../components/results/ProjectCard';
import ProjectModal from '../components/results/ProjectModal';
import TestimonialCard from '../components/TestimonialCard';
import ContactSection from '../components/ContactSection';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function Results() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch projects with their media
    const { data: projectsData } = await supabase
      .from('result_projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_date', { ascending: false });

    if (projectsData) {
      // Fetch media for each project
      const projectsWithMedia = await Promise.all(
        projectsData.map(async (project) => {
          const { data: mediaData } = await supabase
            .from('result_media')
            .select('*')
            .eq('project_id', project.id)
            .order('order_index');

          // Sort images so main ones come first
          const beforeImagesRaw = mediaData?.filter(m => m.kind === 'before_image') || [];
          const afterImagesRaw = mediaData?.filter(m => m.kind === 'after_image') || [];
          
          const sortByMain = (images) => images.sort((a, b) => (b.is_main ? 1 : 0) - (a.is_main ? 1 : 0));
          
          const beforeImages = sortByMain(beforeImagesRaw).map(m => ({ src: m.url, alt: m.alt }));
          const afterImages = sortByMain(afterImagesRaw).map(m => ({ src: m.url, alt: m.alt }));
          const beforeVideo = mediaData?.find(m => m.kind === 'before_video');
          const afterVideo = mediaData?.find(m => m.kind === 'after_video');

          // Determine video type
          const getVideoType = (url) => {
            if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
            if (url.includes('vimeo.com')) return 'vimeo';
            return 'mp4';
          };

          return {
            id: project.id,
            title: project.title,
            category: project.category,
            description: project.description,
            location: project.location,
            date: project.sort_date,
            media: {
              before: beforeImages,
              after: afterImages,
              beforeVideo: beforeVideo ? {
                type: getVideoType(beforeVideo.url),
                url: beforeVideo.url,
                isVertical: beforeVideo.is_vertical || false,
              } : null,
              afterVideo: afterVideo ? {
                type: getVideoType(afterVideo.url),
                url: afterVideo.url,
                isVertical: afterVideo.is_vertical || false,
              } : null,
            }
          };
        })
      );

      setProjects(projectsWithMedia);
    }

    // Fetch testimonials
    const { data: testimonialsData } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: false });

    if (testimonialsData) {
      setTestimonials(testimonialsData);
    }

    setLoading(false);
  };

  // Filter projects
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Separate featured testimonial
  const featuredTestimonial = testimonials.find(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sage-600" />
      </div>
    );
  }

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-800 to-sage-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-serif mb-4">
              Results
            </h1>
            <p className="text-xl text-sage-200 max-w-3xl mx-auto">
              See the transformations we've created and hear from the families, residents, and partners we've worked with.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif text-sage-900 mb-4">
              Before & After
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Real transformations from our work with seniors and families
            </p>

            {/* Filter Tabs */}
            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="inline-block">
              <TabsList className="bg-white border border-sage-200">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="Transitions">Transitions</TabsTrigger>
                <TabsTrigger value="Organization">Organization</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Projects - One Per Row */}
          <div className="space-y-12">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                delay={index * 0.1}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif text-sage-900 mb-4">
              Testimonials
            </h2>
            <p className="text-lg text-gray-600">
              Hear from the families, residents, and partners we've served
            </p>
          </motion.div>

          {/* Featured Testimonial */}
          {featuredTestimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-br from-gold-50 to-sage-50 rounded-2xl p-8 md:p-12 border-2 border-gold-200 shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                  <p className="text-2xl md:text-3xl text-gray-800 italic leading-relaxed mb-6">
                    "{featuredTestimonial.quote}"
                  </p>
                  <p className="text-lg text-sage-700 font-medium">
                    — {featuredTestimonial.role}
                    {featuredTestimonial.name && `, ${featuredTestimonial.name}`}
                    {featuredTestimonial.city && `, ${featuredTestimonial.city}`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Regular Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={`${testimonial.role}${testimonial.name ? `, ${testimonial.name}` : ''}${testimonial.city ? `, ${testimonial.city}` : ''}`}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection
        title="Ready to See Your Own Transformation?"
        subtitle="Schedule a free consultation to discuss your project"
      />

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}