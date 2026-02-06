import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import CalendlyEmbed from '../components/CalendlyEmbed';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission would go here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-mauve-400 to-mauve-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-serif mb-4">
              Let's Get Started
            </h1>
            <p className="text-xl text-gray-800">
              Ready to bring order and calm to your space? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif text-sage-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                The best way to get started is with a free 30-minute consultation call. We'll discuss your needs, answer your questions, and create a plan together.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-sage-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-sage-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900 mb-1">Phone</h3>
                    <a
                      href="tel:937-272-2344"
                      className="text-lg text-sage-700 hover:text-sage-800 transition-colors"
                    >
                      937-272-2344
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-sage-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-sage-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sage-900 mb-1">Email</h3>
                    <a
                      href="mailto:hello@orderly.living"
                      className="text-lg text-sage-700 hover:text-sage-800 transition-colors break-all"
                    >
                      hello@orderly.living
                    </a>
                    <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Hours/Service Area */}
              <div className="mt-12 bg-sage-50 rounded-2xl p-6 border border-sage-200">
                <h3 className="font-semibold text-sage-900 mb-4">Service Information</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours:</span>
                    <span className="font-medium">Flexible scheduling available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Area:</span>
                    <span className="font-medium">Ohio and surrounding areas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free Consultation:</span>
                    <span className="font-medium text-sage-700">30 minutes</span>
                  </div>
                </div>
              </div>

              {/* Calendly Scheduling */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-sage-100">
                <h3 className="font-semibold text-sage-900 mb-4">Schedule Your Free Consultation</h3>
                <CalendlyEmbed url="https://calendly.com/your-calendly-username/30min" />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-sage-100">
                <h3 className="text-2xl font-serif text-sage-900 mb-6">
                  Send Us a Message
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-sage-900 mb-2">
                      Thank You!
                    </h4>
                    <p className="text-gray-600">
                      We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        placeholder="Jane Smith"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          placeholder="jane@example.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">Service Interested In *</Label>
                      <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transitions">Senior Transitions</SelectItem>
                          <SelectItem value="notary">Notary Services</SelectItem>
                          <SelectItem value="organization">Home Organization</SelectItem>
                          <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        placeholder="Tell us about your project or questions..."
                        rows={5}
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-600 text-white py-6 text-lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}