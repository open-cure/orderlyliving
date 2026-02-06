import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ quote, author, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100 h-full"
    >
      <Quote className="h-10 w-10 text-gold-500 mb-4 opacity-50" />
      
      <p className="text-gray-700 leading-relaxed mb-6 italic text-lg">
        "{quote}"
      </p>
      
      <p className="text-sage-700 font-medium">
        — {author}
      </p>
    </motion.div>
  );
}