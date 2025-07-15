import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Set demo testimonials for now
      setTestimonials(demoTestimonials);
    } finally {
      setLoading(false);
    }
  };

  // Demo testimonials
  const demoTestimonials = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Cancer Survivor & Wellness Coach',
      content: 'Mary\'s words found me exactly when I needed them most. After my treatment ended, I felt lost in the space between "sick" and "healthy." Her writing about identity shifts helped me understand that I wasn\'t broken—I was becoming. Her guided journaling prompts gave me a safe space to process emotions I didn\'t even know I had.',
      is_featured: true,
      avatar_url: null
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      role: 'Conference Director, Healing Arts Symposium',
      content: 'Mary brought an authenticity to our keynote that I\'ve rarely seen. Her ability to share vulnerability while maintaining strength created a sacred space for our entire audience. Months later, attendees are still talking about her presentation on navigating transitions. Her lived experience combined with practical wisdom made all the difference.',
      is_featured: true,
      avatar_url: null
    },
    {
      id: '3',
      name: 'Lisa Thompson',
      role: 'HR Director, Fortune 500 Company',
      content: 'We brought Mary in during a major organizational restructuring, and her session on "Finding Grace in Change" was transformative. She helped our team understand that resistance to change is natural and gave them practical tools for processing uncertainty. Employee feedback was overwhelmingly positive.',
      is_featured: false,
      avatar_url: null
    },
    {
      id: '4',
      name: 'Emma Williams',
      role: 'Trauma Survivor & Artist',
      content: 'I\'ve been to therapy, read countless self-help books, and attended workshops, but something about Mary\'s approach is different. She doesn\'t try to fix you or rush your healing. Her journaling prompts helped me find my voice again after years of silence. I finally feel like I\'m writing my own story.',
      is_featured: true,
      avatar_url: null
    },
    {
      id: '5',
      name: 'James Parker',
      role: 'Corporate Burnout Recovery',
      content: 'After burning out in tech, I was skeptical of anything that seemed too "soft." But Mary\'s practical approach to healing resonated with my analytical mind. Her writing on sitting with discomfort gave me permission to feel my feelings without judgment. Six months later, I\'m in a completely different place.',
      is_featured: false,
      avatar_url: null
    },
    {
      id: '6',
      name: 'Dr. Rachel Kim',
      role: 'Psychologist & Author',
      content: 'As a mental health professional, I appreciate Mary\'s nuanced understanding of trauma and healing. Her work doesn\'t oversimplify the process or promise quick fixes. Instead, she offers genuine hope rooted in lived experience. I regularly recommend her resources to both colleagues and clients.',
      is_featured: false,
      avatar_url: null
    },
    {
      id: '7',
      name: 'Maria Gonzalez',
      role: 'Single Mother & Graduate Student',
      content: 'Between raising my kids and finishing my degree, I thought I didn\'t have time for healing. Mary\'s approach showed me that healing doesn\'t require hours of meditation or expensive retreats. Her 5-minute journaling prompts fit into my crazy schedule and gave me profound insights about my journey.',
      is_featured: true,
      avatar_url: null
    },
    {
      id: '8',
      name: 'David Foster',
      role: 'Event Organizer, Wellness Conference',
      content: 'Mary was our closing speaker, and she left the entire audience in tears—the good kind. Her story about finding light in darkness resonated with everyone, regardless of their background. She has this rare gift of making people feel seen and understood. Booking her was one of the best decisions we made.',
      is_featured: false,
      avatar_url: null
    }
  ];

  const featuredTestimonials = testimonials.filter(t => t.is_featured);
  const regularTestimonials = testimonials.filter(t => !t.is_featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

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
            Stories of <span className="handwritten text-cosmic-rose">Transformation</span>
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Real experiences from people who have found healing, growth, and authentic connection 
            through shared stories and guided reflection.
          </p>
        </motion.div>

        {/* Featured Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="cosmic-title text-4xl mb-4">
              <span className="handwritten text-cosmic-gold">Featured</span> Voices
            </h2>
            <p className="cosmic-text text-lg">
              Deep transformations and meaningful connections.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="cosmic-card relative"
              >
                {/* Featured Badge */}
                <div className="absolute -top-3 -right-3 bg-cosmic-gold text-cosmic-navy px-3 py-1 rounded-full text-sm font-medium">
                  ✨ Featured
                </div>
                
                <div className="p-8">
                  <div className="text-4xl text-cosmic-rose mb-4">"</div>
                  <p className="cosmic-text text-lg leading-relaxed mb-6">
                    {testimonial.content}
                  </p>
                  <div className="border-t border-glass-medium pt-4">
                    <div className="cosmic-title text-lg">{testimonial.name}</div>
                    <div className="cosmic-text text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regular Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="cosmic-title text-4xl mb-4">More Voices</h2>
            <p className="cosmic-text text-lg">
              Every story matters, every healing journey is sacred.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="cosmic-card"
              >
                <div className="text-2xl text-cosmic-rose mb-3">"</div>
                <p className="cosmic-text leading-relaxed mb-4">
                  {testimonial.content}
                </p>
                <div className="border-t border-glass-medium pt-3">
                  <div className="cosmic-title">{testimonial.name}</div>
                  <div className="cosmic-text text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Speaking Testimonials Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="cosmic-title text-4xl mb-4">
                Speaking <span className="handwritten text-cosmic-rose">Impact</span>
              </h2>
              <p className="cosmic-text text-lg">
                What event organizers and audiences say about Mary's presentations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-4 border-cosmic-lavender pl-6">
                  <p className="cosmic-text italic mb-3">
                    "Mary's storytelling created such a safe and authentic space for our team. 
                    Her ability to share vulnerability while maintaining strength was exactly what our organization needed."
                  </p>
                  <div className="cosmic-title text-sm">— Sarah Johnson, Tech Wellness Summit</div>
                </div>
                
                <div className="border-l-4 border-cosmic-rose pl-6">
                  <p className="cosmic-text italic mb-3">
                    "Rarely have I seen a speaker connect so deeply with an audience. 
                    Mary's authentic approach left our attendees feeling both seen and inspired."
                  </p>
                  <div className="cosmic-title text-sm">— Dr. Michael Chen, Healing Arts Symposium</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-cosmic-gold pl-6">
                  <p className="cosmic-text italic mb-3">
                    "Mary's session during our organizational restructuring was transformative. 
                    She helped our team understand that resistance to change is natural."
                  </p>
                  <div className="cosmic-title text-sm">— Lisa Rodriguez, Fortune 500 HR Director</div>
                </div>
                
                <div className="border-l-4 border-cosmic-silver pl-6">
                  <p className="cosmic-text italic mb-3">
                    "She left our entire audience in tears—the good kind. Mary has this rare gift 
                    of making people feel seen and understood."
                  </p>
                  <div className="cosmic-title text-sm">— David Foster, Wellness Conference</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href="/speaking" className="cosmic-button">
                Learn About Speaking Services
              </a>
            </div>
          </motion.div>
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
            Ready to Begin Your Own <span className="handwritten text-cosmic-gold">Journey?</span>
          </h2>
          <p className="cosmic-text text-lg mb-6 max-w-2xl mx-auto">
            Join our community of deep feelers, healers, and anyone navigating life's beautiful complexity. 
            Your story matters, and you're not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/writing-room" className="cosmic-button">
              Start Journaling
            </a>
            <a href="/contact" className="ghost-button">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
