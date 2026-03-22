import React from 'react';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';
import { Package, Sparkles, CheckCircle } from 'lucide-react';

export default function Organization() {
  const spaces = [
    { name: 'Kitchens & Pantries', icon: '🍽️' },
    { name: 'Closets & Wardrobes', icon: '👔' },
    { name: 'Garages & Storage', icon: '🚗' },
    { name: 'Home Offices', icon: '💼' },
    { name: 'Playrooms & Kids Spaces', icon: '🧸' },
    { name: 'Basements & Attics', icon: '📦' }
  ];

  const process = [
    {
      title: 'Assessment',
      description: 'We walk through your space with you, listening to your goals and identifying pain points.'
    },
    {
      title: 'Sort & Simplify',
      description: 'Decluttering is judgment-free — we keep what serves you and let go of what doesn\'t.'
    },
    {
      title: 'Systemize',
      description: 'We create practical organizing systems that fit your life, routines, and home.'
    },
    {
      title: 'Maintain',
      description: 'We teach simple habits and tips to keep your space organized long-term.'
    }
  ];

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <Hero
        title="Home Organization"
        subtitle="Transform Cluttered Spaces into Calm, Functional Rooms"
        scriptText="Organized Spaces that Stay Organized"
        image="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80"
      >
        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
          From feeling overwhelmed to living in clarity, we create simple, practical systems that bring calm and functionality to your home. Every space can be transformed into an organized area that works for you and your lifestyle.
        </p>
      </Hero>

      {/* Spaces We Organize */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-6">
              Spaces We Organize
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From kitchens to closets, garages to offices — every space can become calm, functional, and organized.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-sage-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{space.icon}</div>
                <h3 className="text-lg font-semibold text-sage-900">
                  {space.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600">
              A simple, proven approach to lasting organization:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-sage-50 rounded-2xl p-8 border-l-4 border-sage-600"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-sage-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-sage-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">
              Service Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the level of support that fits your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-sage-200"
            >
              <div className="text-center mb-6">
                <Package className="h-12 w-12 text-sage-600 mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-sage-900 mb-2">Refresh</h3>
                <p className="text-gray-600">Perfect for Small Spaces</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Single closet or cabinet</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">2-3 hour session</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Quick wins & easy systems</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gold-400 relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-azure text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-sage-900 mb-2">Reset</h3>
                <p className="text-gray-600">Ideal for Medium Projects</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Full room or garage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Half- or full-day session</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Complete transformation</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-sage-200"
            >
              <div className="text-center mb-6">
                <Package className="h-12 w-12 text-sage-600 mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-sage-900 mb-2">Whole Home</h3>
                <p className="text-gray-600">Comprehensive Organizing</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Multiple rooms and spaces</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Multi-session plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Total home transformation</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              Not sure which package is right for you?
              <br />
              <a href="tel:336-673-3759" className="text-azure hover:text-azure-dark font-medium underline">
                Schedule a free consultation
              </a>{' '}
              to discuss your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection
        title="Ready for an Organized Home?"
        subtitle="Schedule a free consultation to discuss your needs"
      />
    </div>
  );
}