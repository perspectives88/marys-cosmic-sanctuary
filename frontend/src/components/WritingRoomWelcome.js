import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WritingRoomWelcome = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(10, 11, 30, 0.8)' }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Welcome Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-lg w-full glass-card p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Floating Stars */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cosmic-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-6xl mb-6"
            >
              ✨
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2 className="handwritten text-3xl text-cosmic-rose mb-6">
                Welcome to The Writing Room
              </h2>
              
              <div className="space-y-4 cosmic-text text-lg leading-relaxed">
                <p>You've just received a prompt meant for right now.</p>
                
                <p>Let this space be your pause, your mirror, your moment to meet yourself differently.</p>
                
                <p className="italic text-cosmic-silver">
                  There's no right way to begin — just breathe, and begin where you are.
                </p>
              </div>
            </motion.div>

            {/* Enter Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={onClose}
              className="cosmic-button mt-8 px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter Your Sacred Space
            </motion.button>

            {/* Close option */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="cosmic-text text-sm mt-4 opacity-60"
            >
              <button 
                onClick={onClose}
                className="hover:text-cosmic-rose transition-colors underline"
              >
                Skip and continue
              </button>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WritingRoomWelcome;
