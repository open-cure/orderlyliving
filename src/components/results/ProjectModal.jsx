import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BeforeAfterSlider from './BeforeAfterSlider';
import VideoEmbed from './VideoEmbed';
import ImageLightbox from './ImageLightbox';

export default function ProjectModal({ project, onClose }) {
  const [lightboxImages, setLightboxImages] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  useEffect(() => {
    // Trap focus and handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full shadow-lg"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge 
                  variant="secondary" 
                  className={project.category === 'Transitions' 
                    ? 'bg-gold-100 text-gold-800 border-gold-200' 
                    : 'bg-sage-100 text-sage-800 border-sage-200'
                  }
                >
                  {project.category}
                </Badge>
                {project.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                )}
              </div>
              
              <h2 className="text-3xl font-serif text-sage-900 mb-3">
                {project.title}
              </h2>
              
              {project.description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>

            {/* Before Photos */}
            {project.media.before.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-serif text-sage-900 mb-4">Before</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.media.before.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setLightboxImages([...project.media.before, ...project.media.after]);
                        setLightboxIndex(index);
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || `Before ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* After Photos */}
            {project.media.after.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-serif text-sage-900 mb-4">After</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.media.after.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setLightboxImages([...project.media.before, ...project.media.after]);
                        setLightboxIndex(project.media.before.length + index);
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || `After ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {(project.media.beforeVideo || project.media.afterVideo) && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-sage-900 mb-4">Video Walkthrough</h3>
                
                <div className={`grid gap-6 ${project.media.beforeVideo && project.media.afterVideo ? 'md:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>
                  {/* Before Video */}
                  {project.media.beforeVideo && (
                    <div>
                      <p className="text-lg font-medium text-sage-800 mb-3">Before</p>
                      <VideoEmbed 
                        video={project.media.beforeVideo} 
                        isVertical={project.media.beforeVideo.isVertical}
                      />
                    </div>
                  )}
                  
                  {/* After Video */}
                  {project.media.afterVideo && (
                    <div>
                      <p className="text-lg font-medium text-sage-800 mb-3">After</p>
                      <VideoEmbed 
                        video={project.media.afterVideo} 
                        isVertical={project.media.afterVideo.isVertical}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      {lightboxImages && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxImages(null)}
          onNavigate={(direction) => {
            if (direction === 'prev' && lightboxIndex > 0) {
              setLightboxIndex(lightboxIndex - 1);
            } else if (direction === 'next' && lightboxIndex < lightboxImages.length - 1) {
              setLightboxIndex(lightboxIndex + 1);
            }
          }}
        />
      )}
    </AnimatePresence>
  );
}