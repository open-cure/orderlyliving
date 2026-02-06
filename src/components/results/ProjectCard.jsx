import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Play, Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function ProjectCard({ project, onClick, delay = 0 }) {
  const hasVideo = project.media.beforeVideo || project.media.afterVideo;
  const totalImages = project.media.before.length + project.media.after.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sage-100 hover:border-sage-300">
        {/* Interactive Slider Preview */}
        <div className="relative">
          <BeforeAfterSlider
            beforeImages={project.media.before}
            afterImages={project.media.after}
          />
          
          {/* Overlays */}
          {hasVideo && (
            <div className="absolute bottom-4 right-4 bg-sage-700/90 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
              <Play className="h-4 w-4" fill="white" />
              Video Walkthrough
            </div>
          )}
          
          {totalImages > 2 && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-1">
              <ImageIcon className="h-4 w-4" />
              {totalImages} photos
            </div>
          )}
          
          {/* Click to View All */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end justify-center pb-8">
            <div className="bg-white text-sage-900 px-6 py-2 rounded-full font-semibold shadow-lg">
              Click to view all photos
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-serif text-sage-900 group-hover:text-sage-700 transition-colors">
              {project.title}
            </h3>
          </div>

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
                <MapPin className="h-3 w-3 mr-1" />
                {project.location}
              </div>
            )}
          </div>

          {project.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}