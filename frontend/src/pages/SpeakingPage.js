import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SpeakingPage = () => {
  const speakingTopics = [
    {
      title: "Navigating Life Transitions",
      description: "Finding grace and growth in times of change, uncertainty, and transformation.",
      ideal: "Perfect for corporate wellness events, life coaching conferences, and personal development workshops."
    },
    {
      title: "The Power of Authentic Storytelling",
      description: "How sharing our truth creates connection, healing, and positive change in organizations and communities.",
      ideal: "Great for leadership conferences, team building events, and marketing/communications teams."
    },
    {
      title: "Healing in the Modern World",
      description: "Practical approaches to processing trauma, burnout, and emotional overwhelm while maintaining professional and personal responsibilities.",
      ideal: "Valuable for healthcare organizations, mental health conferences, and employee wellness programs."
    },
    {
      title: "Building Resilience Through Reflection",
      description: "Using journaling, mindfulness, and self-reflection as tools for building emotional resilience and preventing burnout.",
      ideal: "Excellent for educational institutions, corporate wellness programs, and community health initiatives."
    },
    {
      title: "Finding Your Voice After Trauma",
      description: "A survivor's perspective on reclaiming personal power, identity, and purpose after difficult life experiences.",
      ideal: "Meaningful for survivor support groups, therapy conferences, and advocacy organizations."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Coordinator, Tech Wellness Summit",
      content: "Mary's storytelling created such a safe and authentic space for our team. Her ability to share vulnerability while maintaining strength was exactly what our organization needed."
    },
    {
      name: "Dr. Michael Chen",
      role: "Conference Director, Healing Arts Symposium",
      content: "Rarely have I seen a speaker connect so deeply with an audience. Mary's authentic approach to discussing trauma and healing left our attendees feeling both seen and inspired."
    },
    {
      name: "Lisa Rodriguez",
      role: "HR Director, Fortune 500 Company",
      content: "Mary's session on navigating transitions was transformative for our employees going through organizational changes. Her practical wisdom and lived experience made all the difference."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-5xl mb-6">
            <span className="handwritten text-cosmic-rose">Authentic</span> Speaking
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Bringing real stories of healing, transformation, and resilience to your audience. 
            Creating space for authentic conversation about the human experience.
          </p>
        </motion.div>

        {/* Speaking Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20"
        >
          <div 
            className="w-full h-96 bg-cover bg-center rounded-3xl glass-card"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564)',
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-cosmic-navy/60 to-transparent rounded-3xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="handwritten text-3xl mb-4 text-cosmic-gold">
                  Every story has the power to heal
                </div>
                <p className="text-xl max-w-2xl">
                  Let's create meaningful conversations that inspire authentic growth and connection.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Speaking Topics */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="cosmic-title text-4xl mb-4">Speaking Topics</h2>
            <p className="cosmic-text text-lg">
              Each presentation is thoughtfully crafted to meet your audience's specific needs and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {speakingTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="cosmic-card"
              >
                <h3 className="cosmic-title text-xl mb-3">{topic.title}</h3>
                <p className="cosmic-text mb-4 leading-relaxed">
                  {topic.description}
                </p>
                <div className="text-sm cosmic-text opacity-80 italic">
                  {topic.ideal}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="cosmic-title text-4xl mb-4">
              What <span className="handwritten text-cosmic-rose">Audiences</span> Say
            </h2>
            <p className="cosmic-text text-lg">
              Real feedback from event organizers and attendees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="cosmic-card"
              >
                <p className="cosmic-text italic mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-glass-medium pt-4">
                  <div className="cosmic-title text-lg">{testimonial.name}</div>
                  <div className="cosmic-text text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Booking Information */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="cosmic-title text-4xl mb-6">
                Booking <span className="handwritten text-cosmic-gold">Information</span>
              </h2>
              <div className="space-y-4 cosmic-text text-lg">
                <div>
                  <strong>Keynote Presentations:</strong> 45-60 minutes including Q&A
                </div>
                <div>
                  <strong>Workshop Sessions:</strong> 2-4 hours with interactive elements
                </div>
                <div>
                  <strong>Panel Discussions:</strong> Expert perspective on healing and storytelling
                </div>
                <div>
                  <strong>Virtual Events:</strong> Fully adapted for online audiences
                </div>
              </div>
              <div className="mt-8">
                <div className="handwritten text-2xl text-cosmic-rose mb-4">
                  "I believe every organization deserves authentic conversation about what it means to be human."
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h3 className="cosmic-title text-2xl mb-6">Ready to Connect?</h3>
              <p className="cosmic-text mb-6">
                I'd love to learn about your event and explore how we can create 
                a meaningful experience for your audience.
              </p>
              <div className="space-y-4">
                <div>
                  <strong className="cosmic-title">Email:</strong>
                  <div className="cosmic-text">speaking@marysanctuary.com</div>
                </div>
                <div>
                  <strong className="cosmic-title">Response Time:</strong>
                  <div className="cosmic-text">Within 2 business days</div>
                </div>
                <div>
                  <strong className="cosmic-title">Booking Lead Time:</strong>
                  <div className="cosmic-text">Minimum 4-6 weeks preferred</div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/contact" className="cosmic-button w-full text-center block">
                  Send Speaking Inquiry
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center glass-card p-8"
        >
          <h2 className="cosmic-title text-3xl mb-4">
            Let's Create <span className="handwritten text-cosmic-rose">Something Meaningful</span>
          </h2>
          <p className="cosmic-text text-lg mb-6 max-w-2xl mx-auto">
            Whether you're planning a corporate wellness event, conference, or community gathering, 
            I'm here to bring authentic storytelling and practical wisdom to your audience.
          </p>
          <Link to="/contact" className="cosmic-button">
            Start the Conversation
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeakingPage;
