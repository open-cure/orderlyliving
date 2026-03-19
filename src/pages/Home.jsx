import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ContactSection from '../components/ContactSection';
import { Home as HomeIcon, FileText, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import amyHeadshot from '../images/headshots/Amy-Final-Headshots-04.jpg';
import heroElderlyCouple from '../images/elderly_couple_holding_hands.jpg';
import heroTulip from '../images/tulip.jpg';
import heroKeys from '../images/keys.jpg';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Orderly.Living"
        subtitle="Creating calm, comfort, and order"
        scriptText="for Life's Big Changes"
        backgroundImage={[heroElderlyCouple, heroTulip, heroKeys]}
      >
        <p className="text-lg text-gray-700 mt-4 mb-6 leading-relaxed">
          Whether you're closing on a home or navigating a loved one's move into senior living, Orderly.Living handles the details so you can focus on what matters… the excitement of a new home, or the comfort of a fresh start.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-4">
          <Link
            to={createPageUrl('NotaryServices')}
            className="bg-azure hover:bg-azure-dark text-white px-6 py-3 rounded-full text-xl font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center"
          >
            <span>Loan Signing & Notary</span>
          </Link>
          <Link
            to={createPageUrl('Transitions')}
            className="bg-white hover:bg-gray-50 text-sage-800 px-6 py-3 rounded-full text-xl font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center border border-sage-200"
          >
            <span>Senior Transitions</span>
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
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-dark mb-4">
              How We Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compassionate support for seniors, families, and busy households
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard
              icon={FileText}
              title="Loan Signing & Notary"
              description="Professional support for life's important documents. Mobile notary services for real estate closings, estate planning, powers of attorney, and more. Bonded, insured, and available evenings and weekends."
              pageName="NotaryServices"
              delay={0}
            />
            <ServiceCard
              icon={Heart}
              title="Senior Transitions"
              description="Compassionate help for life's biggest moves. Thoughtful, personalized support helping seniors and their families transition into a space that truly feels like home — with dignity, familiarity, and peace of mind."
              pageName="Transitions"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* Meet Amy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
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
              <div className="flex items-center mb-6">
                <Sparkles className="h-8 w-8 text-gold-500 mr-3" />
                <h2 className="text-3xl sm:text-4xl font-serif text-brand-dark">
                  Meet Amy
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Moments like this cemented Amy's philosophy: transitions, whether big or small, can be exciting and joyful when approached thoughtfully.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Through Orderly Living, Amy brings this philosophy to both pillars of her business:
              </p>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span><strong>Loan Signing & Notary</strong> – Guiding clients through important life and legal transactions with clarity, reliability, and peace of mind, so even complex or emotional paperwork is orderly and manageable.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-500 mr-2">•</span>
                  <span><strong>Senior Transitions</strong> – Helping clients move confidently into new living environments with comfort, familiarity, and dignity.</span>
                </li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Amy believes that every major life change is a season of life — a chapter that can bring excitement, uncertainty, or emotion. Her goal is to help clients move into these seasons organized, empowered, and excited, making each change a moment of calm, clarity, and joy rather than stress or anxiety.
              </p>

              <Link
                to={createPageUrl('Contact')}
                className="inline-flex items-center text-sage-700 hover:text-sage-800 font-medium transition-colors"
              >
                <span>Get in touch</span>
                <span className="ml-2">→</span>
              </Link>
              <Link
                to={createPageUrl('MeetAmy')}
                className="inline-flex items-center text-brand hover:text-brand-dark font-medium transition-colors ml-6"
              >
                <span>Read Amy's story</span>
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