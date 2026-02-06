import React from 'react';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';
import { FileCheck, MapPin, Shield, Clock } from 'lucide-react';

export default function NotaryServices() {
  const services = [
    'Real Estate Documents',
    'Loan Signings',
    'Powers of Attorney',
    'Living Wills & Advance Directives',
    'Affidavits',
    'Trusts & Estate Documents'
  ];

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <Hero
        title="Notary Services"
        subtitle="Professional, Reliable Support"
        scriptText="for Life's Important Documents"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
      >
        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
          Secure, prompt, and convenient notary services for real estate transactions, estate planning, and important life documents.
        </p>
      </Hero>

      {/* Services Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-sage-900 mb-6">
              Trusted Notary Services
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Whether you're closing on a home, planning your estate, or need important documents notarized, we provide professional service you can count on.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="text-center"
            >
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Bonded & Insured</h3>
              <p className="text-gray-600 text-sm">Professional certification and full insurance coverage</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Mobile Service</h3>
              <p className="text-gray-600 text-sm">We come to you for maximum convenience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Flexible Hours</h3>
              <p className="text-gray-600 text-sm">Evening and weekend appointments available</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-sage-700" />
              </div>
              <h3 className="text-lg font-semibold text-sage-900 mb-2">Real Estate Focus</h3>
              <p className="text-gray-600 text-sm">Specialized in real estate and property transactions</p>
            </motion.div>
          </div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100"
          >
            <h3 className="text-2xl font-serif text-sage-900 mb-6 text-center">
              Common Documents We Notarize
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center italic">
              And many other legal documents requiring notarization
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif text-sage-900 mb-4">
              What to Bring
            </h2>
            <p className="text-lg text-gray-600">
              Make your appointment smooth and efficient
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-sage-50 rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">📄</div>
              <h4 className="font-semibold text-sage-900 mb-2">Your Documents</h4>
              <p className="text-sm text-gray-600">
                Unsigned and ready for notarization
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-sage-50 rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">🪪</div>
              <h4 className="font-semibold text-sage-900 mb-2">Valid ID</h4>
              <p className="text-sm text-gray-600">
                Government-issued photo identification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-sage-50 rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-semibold text-sage-900 mb-2">All Signers</h4>
              <p className="text-sm text-gray-600">
                Everyone who needs to sign must be present
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection
        title="Need a Notary?"
        subtitle="Call or email to schedule your appointment today"
      />
    </div>
  );
}