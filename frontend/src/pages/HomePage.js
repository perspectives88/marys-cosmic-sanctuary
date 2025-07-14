import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ConvertKitForm from '../components/ConvertKitForm';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    // Test API connection
    const testApi = async () => {
      try {
        const response = await axios.get(`${API}/`);
        setApiStatus('connected ✨');
        console.log('API Response:', response.data.message);
      } catch (error) {
        setApiStatus('connection error');
        console.error('API Error:', error);
      }
    };

    testApi();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519810755548-39cd217da494)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(0.5px)'
          }}
        />
        
        {/* Cosmic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-navy/80 via-cosmic-purple/60 to-transparent z-10" />
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-20 text-center max-w-4xl mx-auto px-4"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="handwritten text-2xl text-cosmic-rose mb-4">
            Welcome to your digital sanctuary
          </motion.div>
          
          <motion.h1 className="cosmic-title text-5xl md:text-7xl mb-6 leading-tight">
            Mary's Cosmic
            <br />
            <span className="handwritten text-cosmic-gold">Sanctuary</span>
          </motion.h1>
          
          <motion.p className="cosmic-text text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            A space for healing, storytelling, and authentic growth. 
            Join our community of deep feelers navigating life's transitions with grace and wisdom.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/writing-room" className="cosmic-button text-lg px-8 py-4">
              Enter the Writing Room ✨
            </Link>
            <Link to="/about" className="ghost-button text-lg px-8 py-4">
              Meet Mary
            </Link>
          </motion.div>
          
          <motion.div className="mt-8 text-sm cosmic-text">
            API Status: {apiStatus}
          </motion.div>
        </motion.div>

        {/* Floating Stars */}
        <div className="cosmic-stars">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="cosmic-title text-4xl mb-4">
              Your Journey of <span className="handwritten text-cosmic-rose">Healing</span> Begins Here
            </h2>
            <p className="cosmic-text text-xl max-w-3xl mx-auto">
              Whether you're navigating a life transition, seeking deeper self-reflection, 
              or looking for authentic storytelling that resonates with your soul.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Speaking Card */}
            <motion.div variants={featureVariants} className="cosmic-card group">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1738237454459-44554bd3d648)',
                }}
              />
              <h3 className="cosmic-title text-xl mb-3">Speaking & Events</h3>
              <p className="cosmic-text mb-4">
                Authentic storytelling for corporate events, conferences, and community gatherings. 
                Sharing lived experiences of healing and transformation.
              </p>
              <Link to="/speaking" className="ghost-button group-hover:bg-cosmic-lavender group-hover:text-white transition-all">
                Learn More
              </Link>
            </motion.div>

            {/* Digital Products Card */}
            <motion.div variants={featureVariants} className="cosmic-card group">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1596078878524-8047985968bb)',
                }}
              />
              <h3 className="cosmic-title text-xl mb-3">Digital Sanctuary Shop</h3>
              <p className="cosmic-text mb-4">
                Thoughtfully crafted journals, ebooks, card decks, and guided meditations 
                designed to support your healing journey.
              </p>
              <Link to="/shop" className="ghost-button group-hover:bg-cosmic-lavender group-hover:text-white transition-all">
                Explore Shop
              </Link>
            </motion.div>

            {/* Writing Room Card */}
            <motion.div variants={featureVariants} className="cosmic-card group">
              <div 
                className="w-full h-48 bg-cover bg-center rounded-xl mb-4"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1732352332941-7cb02a49edd8)',
                }}
              />
              <h3 className="cosmic-title text-xl mb-3">The Writing Room</h3>
              <p className="cosmic-text mb-4">
                A sacred digital space for journaling with guided prompts, reflective exercises, 
                and a supportive community of fellow travelers.
              </p>
              <Link to="/writing-room" className="ghost-button group-hover:bg-cosmic-lavender group-hover:text-white transition-all">
                Start Writing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ConvertKitForm 
              title="Join Our Cosmic Community"
              description="Be the first to receive new journaling prompts, healing insights, and exclusive content for deep feelers and cosmic explorers."
              buttonText="Enter the Sanctuary ✨"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
