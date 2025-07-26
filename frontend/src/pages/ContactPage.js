import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'collaboration', label: 'Collaboration Opportunity' },
    { value: 'media', label: 'Media/Press' },
    { value: 'support', label: 'Support/Technical' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! I\'ll get back to you within 2 business days.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry_type: 'general'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Unable to send message. Please try emailing me directly at hello@marysanctuary.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="cosmic-title text-4xl md:text-5xl mb-4">
            Let's Connect
          </h1>
          <p className="cosmic-text text-xl max-w-2xl mx-auto">
            Whether you're seeking collaboration, have questions about my work, 
            or simply want to share your own story, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="cosmic-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="cosmic-input"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="cosmic-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="cosmic-input"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiry_type" className="cosmic-label">
                  What's this about?
                </label>
                <select
                  id="inquiry_type"
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  className="cosmic-input"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="cosmic-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="cosmic-input"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="cosmic-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="cosmic-input resize-none"
                  placeholder="Share what's on your heart..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="cosmic-spinner w-5 h-5 mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message{' '}
                    <span className="text-cosmic-gold">⁎</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="cosmic-title text-xl mb-4">
                Other Ways to Connect
              </h3>
              
              <div className="space-y-4 cosmic-text">
                <div>
                  <strong>Email:</strong>
                  <br />
                  hello@perspectivesbymary.com
                </div>
                
                <div>
                  <strong>Response Time:</strong>
                  <br />
                  I typically respond within 24-48 hours
                </div>
                
                <div>
                  <strong>Speaking Inquiries:</strong>
                  <br />
                  Please include event details, audience size, and preferred dates
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="cosmic-title text-xl mb-4">
                Newsletter
              </h3>
              <p className="cosmic-text mb-6">
                Newsletter launching soon... <span className="text-cosmic-gold">⁎</span>
              </p>
              <p className="cosmic-text text-sm">
                Join our community for weekly prompts, insights, and gentle reminders 
                that you're exactly where you need to be.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
