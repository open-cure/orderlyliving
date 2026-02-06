import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactSection from '../components/ContactSection';
import { Home as HomeIcon, FileText, FolderOpen, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import amyHeadshot from '../images/headshots/Amy-Final-Headshots-04.jpg';
import amyOnTheJob from '../images/amy_on_the_job.jpeg';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Orderly Living"
        subtitle="Creating calm, comfort, and organization..."
        scriptText="for Life's Big Changes"
        image={amyOnTheJob}
        imagePosition="object-[center_40%]"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
          <a
            href="tel:937-272-2344"
            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            <span>Schedule Free Consultation</span>
          </a>
          <Link
            to={createPageUrl('Contact')}
            className="bg-white hover:bg-gray-50 text-sage-800 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center border border-sage-200"
          >
            <span>Learn More</span>
          </Link>
        </div>
      </Hero>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif text-sage-900 mb-4">
              How We Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compassionate support for seniors, families, and busy households
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Heart}
              title="Transitions"
              description="Downsizing and move-in support for seniors transitioning to assisted living. We help select meaningful items and create a familiar, comforting new space."
              pageName="Transitions"
              delay={0}
            />
            <ServiceCard
              icon={FileText}
              title="Notary Services"
              description="Professional mobile notary services for real estate transactions and important life documents. Convenient, secure, and reliable."
              pageName="NotaryServices"
              delay={0.1}
            />
            <ServiceCard
              icon={FolderOpen}
              title="Organization"
              description="Transform cluttered spaces into calm, functional areas. From garages to closets, kitchens to offices—organized systems that last."
              pageName="Organization"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={amyHeadshot}
                  alt="Amy Skardon"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-gold-500 mr-3" />
                <h2 className="text-3xl sm:text-4xl font-serif text-sage-900">
                  Meet Amy
                </h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "I help seniors select the items that matter most and bring those into their new space. We arrange everything with intention, so it feels familiar, beautiful, and immediately like home."
              </p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                With a compassionate approach and an eye for creating calm, organized spaces, Amy brings peace of mind to families during life's most important transitions.
              </p>

              <Link
                to={createPageUrl('Contact')}
                className="inline-flex items-center text-sage-700 hover:text-sage-800 font-medium transition-colors"
              >
                <span>Get in touch</span>
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ContactSection
        title="Ready to Bring Order to Your Life?"
        subtitle="Schedule a free 30-minute consultation call today"
      />
    </div>
  );
}