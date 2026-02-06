import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, description, pageName, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Link to={createPageUrl(pageName)}>
        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-sage-100 hover:border-sage-300 hover:-translate-y-1">
          <div className="bg-sage-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage-200 transition-colors">
            <Icon className="h-8 w-8 text-sage-700" />
          </div>
          
          <h3 className="text-2xl font-serif text-sage-900 mb-3">
            {title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {description}
          </p>
          
          <div className="flex items-center text-sage-700 font-medium group-hover:text-sage-800 transition-colors">
            <span>Learn More</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}