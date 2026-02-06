import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ title, subtitle, scriptText, image, imagePosition = 'object-center', children }) {
  return (
    <section className="relative bg-gradient-to-br from-cream-50 to-sage-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0U4RURFNyIgb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-sage-900 leading-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl sm:text-2xl text-gray-700 mb-6 leading-relaxed">
                {subtitle}
              </p>
            )}
            {scriptText && (
              <p className="text-3xl sm:text-4xl font-script text-gold-600 mb-8 italic">
                {scriptText}
              </p>
            )}
            {children}
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={image}
                  alt={title}
                  className={`w-full h-full object-cover ${imagePosition}`}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500 rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .bg-sage-50 { background-color: #F5F7F4; }
        .text-gold-600 { color: var(--gold-600); }
        .font-script { font-family: 'Dancing Script', cursive; }
      `}</style>
    </section>
  );
}