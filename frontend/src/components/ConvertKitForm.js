import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ConvertKitForm = ({ 
  title = "Words for the in-between", 
  description = "Straight to your inbox. Stay close for prompts, perspective shifts, and first looks.",
  placeholder = "Enter your email address",
  buttonText = (
    <>
      Join the Sanctuary{' '}
      <span className="text-cosmic-gold">⁎</span>
    </>
  ),
  inline = false 
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Use our backend API with reCAPTCHA verification
      await axios.post(`${API}/newsletter/subscribe`, {
        email,
        first_name: firstName,
        recaptcha_token: recaptchaToken
      });

      setIsSubscribed(true);
      setEmail('');
      setFirstName('');
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error('Subscription error:', error);
      if (error.response?.data?.detail === 'reCAPTCHA verification failed') {
        alert('Security verification failed. Please try again.');
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${inline ? 'p-4' : 'glass-card p-6'}`}
      >
        <div className="text-4xl mb-4 text-cosmic-gold">⁎</div>
        <h3 className="cosmic-title text-xl mb-2">Welcome to the Sanctuary!</h3>
        <p className="cosmic-text">
          Check your email to confirm your subscription and receive your first journaling prompt.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={inline ? 'p-4 rounded-xl glass' : 'glass-card p-6'}
    >
      <div className="text-center mb-6">
        <h3 className="cosmic-title text-xl mb-2">{title}</h3>
        <p className="cosmic-text text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="cosmic-input"
          />
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="cosmic-input"
          />
        </div>

        {/* reCAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
            theme="dark"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email || !recaptchaToken}
          className="cosmic-button w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="cosmic-spinner w-5 h-5 mr-2"></div>
              Joining...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </form>

      <p className="cosmic-text text-xs text-center mt-3 opacity-75">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
};

export default ConvertKitForm;

