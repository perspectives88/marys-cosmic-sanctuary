import React from 'react';
import { motion } from 'framer-motion';

const PremiumPromptSuggestion = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-8 p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(212, 165, 165, 0.1) 0%, rgba(107, 91, 149, 0.1) 100%)',
        border: '1px solid rgba(212, 165, 165, 0.2)'
      }}
    >
      <div className="text-center">
        {/* Soft decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl mb-4"
        >
          🌙
        </motion.div>

        {/* Gentle suggestion text */}
        <div className="space-y-3 mb-6">
          <p className="cosmic-text text-lg">
            Looking for something deeper or more specific?
          </p>
          <p className="cosmic-text leading-relaxed">
            Explore themed prompts and perspective decks in the premium collection — 
            crafted for life's in-betweens, turning points, and tender edges.
          </p>
        </div>

        {/* Call to action */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="cosmic-button px-6 py-3 mb-3"
          onClick={() => window.location.href = '/yes-and'}
        >
          ✨ Unlock More Perspectives
        </motion.button>

        {/* Gentle dismiss option */}
        <div>
          <button
            onClick={onClose}
            className="cosmic-text text-sm opacity-60 hover:opacity-80 transition-opacity underline"
          >
            Continue with free prompts
          </button>
        </div>
      </div>

      {/* Subtle close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cosmic-text opacity-40 hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </motion.div>
  );
};

export default PremiumPromptSuggestion;
