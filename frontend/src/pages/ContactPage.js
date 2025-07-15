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
      toast.success('Message sent successfully! I\'ll get back to you within 2 business days. ✨');
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-5xl mb-6">
            Let's <span className="handwritten text-cosmic-rose">Connect</span>
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Whether you're interested in speaking services, have a collaboration idea, 
            or simply want to share your story, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cosmic-card"
          >
            <h2 className="cosmic-title text-2xl mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="cosmic-title text-sm mb-2 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="cosmic-input"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="cosmic-title text-sm mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="cosmic-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="cosmic-title text-sm mb-2 block">Inquiry Type</label>
                <select
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

              <div>
                <label className="cosmic-title text-sm mb-2 block">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="cosmic-input"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="cosmic-title text-sm mb-2 block">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="cosmic-input resize-none"
                  placeholder="Share your thoughts, questions, or ideas..."
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
                  'Send Message ✨'
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="cosmic-card">
              <h3 className="cosmic-title text-xl mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div>
                  <div className="cosmic-title text-sm mb-1">Email</div>
                  <a href="mailto:hello@marysanctuary.com" className="cosmic-text hover:text-cosmic-rose transition-colors">
                    hello@marysanctuary.com
                  </a>
                </div>
                <div>
                  <div className="cosmic-title text-sm mb-1">Speaking Inquiries</div>
                  <a href="mailto:speaking@marysanctuary.com" className="cosmic-text hover:text-cosmic-rose transition-colors">
                    speaking@marysanctuary.com
                  </a>
                </div>
                <div>
                  <div className="cosmic-title text-sm mb-1">Response Time</div>
                  <div className="cosmic-text">Within 2 business days</div>
                </div>
              </div>
            </div>

            {/* Speaking Inquiries */}
            <div className="cosmic-card">
              <h3 className="cosmic-title text-xl mb-4">Speaking Engagements</h3>
              <p className="cosmic-text mb-4">
                I'm available for keynotes, workshops, and panel discussions on:
              </p>
              <ul className="space-y-2 cosmic-text">
                <li>• Navigating life transitions with grace</li>
                <li>• The power of authentic storytelling</li>
                <li>• Healing approaches for modern challenges</li>
                <li>• Building resilience through reflection</li>
                <li>• Finding voice after trauma</li>
              </ul>
              <div className="mt-4">
                <a href="/speaking" className="ghost-button">
                  View Speaking Topics
                </a>
              </div>
            </div>

            {/* Collaboration */}
            <div className="cosmic-card">
              <h3 className="cosmic-title text-xl mb-4">Let's Collaborate</h3>
              <p className="cosmic-text mb-4">
                I'm always interested in meaningful collaborations with:
              </p>
              <ul className="space-y-2 cosmic-text">
                <li>• Fellow healers and storytellers</li>
                <li>• Organizations supporting trauma survivors</li>
                <li>• Mental health and wellness platforms</li>
                <li>• Publishers and media outlets</li>
                <li>• Event organizers and communities</li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="cosmic-card">
              <h3 className="cosmic-title text-xl mb-4">
                <span className="handwritten text-cosmic-gold">Stay Connected</span>
              </h3>
              <p className="cosmic-text mb-4">
                Join our growing community of deep feelers and cosmic explorers. 
                Get updates on new content, speaking events, and exclusive resources.
              </p>
              <div className="handwritten text-cosmic-rose text-lg mb-4">
                Newsletter launching soon... ✨
              </div>
              <button className="cosmic-button w-full">
                Join the Waitlist
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="cosmic-title text-4xl mb-4">
              Frequently Asked <span className="handwritten text-cosmic-rose">Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="cosmic-card">
              <h3 className="cosmic-title text-lg mb-3">How quickly do you respond to inquiries?</h3>
              <p className="cosmic-text">
                I aim to respond to all messages within 2 business days. For speaking inquiries 
                during busy seasons, it may take up to 3-4 days.
              </p>
            </div>

            <div className="cosmic-card">
              <h3 className="cosmic-title text-lg mb-3">Do you offer virtual speaking engagements?</h3>
              <p className="cosmic-text">
                Absolutely! I've adapted all my presentations for virtual audiences and have 
                experience with various platforms and interactive formats.
              </p>
            </div>

            <div className="cosmic-card">
              <h3 className="cosmic-title text-lg mb-3">Can I share my story with you?</h3>
              <p className="cosmic-text">
                I'm deeply honored when people share their stories with me. While I read every 
                message, please know that I may not be able to respond to every personal story individually.
              </p>
            </div>

            <div className="cosmic-card">
              <h3 className="cosmic-title text-lg mb-3">Are you available for media interviews?</h3>
              <p className="cosmic-text">
                Yes! I'm available for podcast interviews, articles, and other media opportunities 
                that align with topics of healing, storytelling, and authentic growth.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
