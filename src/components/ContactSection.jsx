import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function ContactSection({ title = "Ready to Get Started?", subtitle }) {
  return (
    <section className="bg-gradient-to-br from-sage-800 to-sage-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-sage-200 mb-8">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:937-272-2344"
              className="flex items-center space-x-2 bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span>Call or Text</span>
            </a>
            
            <a
              href="mailto:amy@orderly.living"
              className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-sage-800 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              <span>Send Email</span>
            </a>
          </div>
          
          <Link
            to={createPageUrl('Contact')}
            className="inline-flex items-center text-sage-200 hover:text-white transition-colors"
          >
            <span>Or fill out our contact form</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}