import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-5xl mb-6">
            Meet <span className="handwritten text-cosmic-rose">Mary</span>
          </h1>
          <p className="cosmic-text text-xl">
            Storyteller, Healing Guide, and Fellow Traveler on the Journey of Transformation
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Hero Image and Intro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="glass-card p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div 
                  className="w-full h-80 bg-cover bg-center rounded-2xl"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1738237454459-44554bd3d648)',
                  }}
                />
              </div>
              <div>
                <div className="handwritten text-2xl text-cosmic-gold mb-4">
                  Every story matters ✨
                </div>
                <p className="cosmic-text text-lg leading-relaxed">
                  I believe in the power of authentic storytelling to heal, connect, and transform lives. 
                  As someone who has navigated the complex waters of identity shifts, healing, and personal growth, 
                  I understand the importance of having a sacred space to process, reflect, and grow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* My Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="cosmic-title text-3xl mb-6">My Journey</h2>
            <div className="space-y-4 cosmic-text text-lg leading-relaxed">
              <p>
                My path to becoming a healing guide and storyteller wasn't linear—and that's exactly why it's powerful. 
                Through my own experiences with life transitions, identity exploration, and the deep work of healing, 
                I've learned that our most challenging moments often become our greatest teachers.
              </p>
              <p>
                Whether it's navigating burnout, processing trauma, or simply feeling like you're in a season of 
                profound change, I've been there. I've felt the isolation that can come with deep transformation, 
                and I've discovered the healing that happens when we share our stories with others who truly understand.
              </p>
              <div className="handwritten text-cosmic-rose text-xl mt-6">
                "Healing isn't about fixing ourselves—it's about remembering who we've always been."
              </div>
            </div>
          </motion.div>

          {/* What I Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h2 className="cosmic-title text-3xl mb-6">What I Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="cosmic-title text-xl mb-3">🎤 Speaking & Storytelling</h3>
                <p className="cosmic-text">
                  I share authentic stories of transformation and healing at corporate events, 
                  conferences, and community gatherings, creating space for real conversation about the human experience.
                </p>
              </div>
              <div>
                <h3 className="cosmic-title text-xl mb-3">📝 Digital Products</h3>
                <p className="cosmic-text">
                  Thoughtfully crafted journals, ebooks, and guided resources designed to support 
                  your personal growth and healing journey.
                </p>
              </div>
              <div>
                <h3 className="cosmic-title text-xl mb-3">✍️ The Writing Room</h3>
                <p className="cosmic-text">
                  A sacred digital space where you can explore your inner world through guided journaling 
                  prompts and reflective exercises.
                </p>
              </div>
              <div>
                <h3 className="cosmic-title text-xl mb-3">💫 Community Connection</h3>
                <p className="cosmic-text">
                  Building a supportive community of deep feelers, healers, and anyone navigating 
                  life's beautiful complexity.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card p-8">
              <h2 className="cosmic-title text-3xl mb-4">
                Ready to Begin Your <span className="handwritten text-cosmic-gold">Journey?</span>
              </h2>
              <p className="cosmic-text text-lg mb-6">
                Whether you're looking for speaking services, digital resources, or simply a place to process and grow, 
                I'm here to support you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="cosmic-button">
                  Get in Touch
                </a>
                <a href="/writing-room" className="ghost-button">
                  Start Journaling
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
