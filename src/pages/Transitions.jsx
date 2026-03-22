import React from 'react';
import Hero from '../components/Hero';
import TestimonialCard from '../components/TestimonialCard';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Home, Sparkles } from 'lucide-react';
import pabooAfter from '../images/paboo_after.jpeg';
import pabooBefore from '../images/paboo_before.jpeg';

export default function Transitions() {
  const howItWorks = [
    {
      title: 'Free Consultation Call',
      description: 'We start with a complimentary 15–30 minute call to learn about your loved one — their history, what matters most to them, and what the transition looks like.'
    },
    {
      title: 'Visiting the New Space',
      description: "Amy visits the new living space in person to take measurements, assess the layout, and gather ideas — so every item brought in has a thoughtful, intentional place."
    },
    {
      title: 'The Current Space',
      description: "Amy works with you to identify the meaningful items to bring — the photos, keepsakes, and familiar pieces that will make the new space feel warm and personal from the moment they arrive."
    },
    {
      title: 'Setting Up the Space',
      description: "Amy handles every detail of the setup with care and intention — so that when your loved one walks in for the first time, it already feels like home."
    },
    {
      title: 'Peace of Mind for the Whole Family',
      description: "You can be fully present for your loved one, knowing every detail has been handled with compassion. And when the day is done, they can settle in for the night surrounded by the things they love — comfortable, familiar, and truly at home."
    }
  ];

  const testimonials = [
    {
      quote: "I cannot tell you how many people have commented that it looks like they've lived there forever and it's beautiful.",
      author: "Melissa S., Nursing Home Referral Partner"
    },
    {
      quote: "This was the best gift I could've given to my dad, surrounding him with items where he is cognitively. It awakened a spark in him that we hadn't seen in a long time.",
      author: "Nancy S., Daughter of Resident"
    },
    {
      quote: "He's been giving tours to all the employees. You are amazing.",
      author: "Meaghan C."
    }
  ];

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <Hero
        title="Senior Transition Support"
        subtitle="Creating Calm, Comfort and Order"
        dualPortraitImages={[
          { src: pabooAfter, label: 'After' },
          { src: pabooBefore, label: 'Before' },
        ]}
      >
        <div className="bg-sage-100 rounded-2xl p-6 mt-8 border-l-4 border-sage-600 w-full">
          <p className="text-base text-gray-700 italic leading-snug">
            "I help seniors select the items that matter most and bring those into their new space. We arrange everything with intention, so it feels familiar, beautiful, and immediately like home."
          </p>
          <p className="text-sage-700 text-sm font-medium mt-2">
            — Amy Skardon
          </p>
        </div>
      </Hero>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">
              How It Works
            </h2>
          </motion.div>

          <div className="space-y-6">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-azure text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-sage-900 mb-1">{step.title}</h4>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-br from-sage-700 to-sage-800 rounded-2xl p-8 text-center text-white shadow-xl"
          >
            <Sparkles className="h-12 w-12 text-gold-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif mb-2">Investment</h3>
            <p className="text-4xl font-bold mb-2">$600 – $1,000</p>
            <p className="text-sage-200 mb-4">Flat Project Fee for 1–2 Bedroom Moves</p>
            <p className="text-sm text-sage-300">
              Optional quotes available for larger or complex moves
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-4">
              What Families Are Saying
            </h2>
          </motion.div>

          {/* Featured quote callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 bg-sage-100 rounded-full p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-5xl md:text-6xl font-script text-gold-800" style={{fontWeight: 'normal', fontStyle: 'normal'}}>
              "Aw, it's like home."
            </p>
            <p className="text-sage-700 mt-2">— Paul M., Resident</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* A Thoughtful Transition — What's Included / Not Included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif text-brand-dark mb-6">
              A Thoughtful Transition
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Moving to assisted living is a big change. We make it easier by helping you choose what matters most and creating a space that feels like home from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100"
            >
              <Heart className="h-12 w-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-serif text-sage-900 mb-4">What's Included</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Walkthrough with client and family to select meaningful furniture and belongings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Thoughtful placement of furniture, artwork, and personal items</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Setup of clothes, kitchen and bath essentials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Optional light decorating touches (bedding, wallpaper, finishing details)</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-sage-100"
            >
              <Home className="h-12 w-12 text-sage-600 mb-4" />
              <h3 className="text-2xl font-serif text-sage-900 mb-4">Not Included</h3>
              <p className="text-gray-700 mb-4">
                This service focuses on decision-making and setup, not physical moving:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-sage-400 mr-3">•</span>
                  <span>Moving trucks or heavy transport</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sage-400 mr-3">•</span>
                  <span>Packing and hauling services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-sage-400 mr-3">•</span>
                  <span>Disposal or donation coordination</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 italic">
                Most setups can be completed in one day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactSection
        title="Ready to Schedule?"
        subtitle="Serving Southwest Ohio. Call or text today to discuss your transition needs."
      />
    </div>
  );
}