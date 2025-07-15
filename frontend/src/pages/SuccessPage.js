import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      checkPaymentStatus(sessionId);
    } else {
      setPaymentStatus('no_session');
    }
  }, [searchParams]);

  const checkPaymentStatus = async (sessionId) => {
    try {
      const response = await axios.get(`${API}/payments/checkout/status/${sessionId}`);
      
      if (response.data.payment_status === 'paid') {
        setPaymentStatus('success');
        setOrderDetails(response.data);
      } else if (response.data.status === 'expired') {
        setPaymentStatus('expired');
      } else {
        setPaymentStatus('pending');
        // Continue polling for a few more attempts
        setTimeout(() => checkPaymentStatus(sessionId), 2000);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('error');
    }
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'checking':
      case 'pending':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="cosmic-spinner w-16 h-16 mx-auto mb-6"></div>
            <h1 className="cosmic-title text-3xl mb-4">
              Processing Your <span className="handwritten text-cosmic-gold">Order</span>
            </h1>
            <p className="cosmic-text text-lg">
              Please wait while we confirm your payment...
            </p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="success-celebration w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>
            
            <h1 className="cosmic-title text-4xl mb-6">
              Welcome to Your <span className="handwritten text-cosmic-rose">Digital Sanctuary!</span>
            </h1>
            
            <p className="cosmic-text text-lg mb-8 max-w-2xl mx-auto">
              Your payment was successful! You now have access to your purchased digital resources. 
              Check your email for download links and detailed instructions.
            </p>

            {orderDetails && (
              <div className="glass-card p-6 mb-8 max-w-md mx-auto">
                <h3 className="cosmic-title text-lg mb-4">Order Summary</h3>
                <div className="space-y-2 cosmic-text">
                  <div className="flex justify-between">
                    <span>Order Total:</span>
                    <span className="cosmic-title">
                      ${(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm opacity-75">
                    Payment confirmed on {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/writing-room" className="cosmic-button">
                Start Your Journey
              </Link>
              <Link to="/shop" className="ghost-button">
                Browse More Products
              </Link>
            </div>

            <div className="handwritten text-cosmic-gold text-xl">
              "Every healing journey begins with a single step. You've just taken yours. ✨"
            </div>
          </motion.div>
        );

      case 'expired':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">⏰</div>
            <h1 className="cosmic-title text-3xl mb-4">
              Payment Session <span className="handwritten text-cosmic-rose">Expired</span>
            </h1>
            <p className="cosmic-text text-lg mb-8">
              Your payment session has expired. No charges were made to your account.
            </p>
            <Link to="/shop" className="cosmic-button">
              Try Again
            </Link>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="cosmic-title text-3xl mb-4">
              Payment <span className="handwritten text-cosmic-rose">Error</span>
            </h1>
            <p className="cosmic-text text-lg mb-8">
              We encountered an issue checking your payment status. 
              Please contact us if you were charged but don't see your products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="cosmic-button">
                Contact Support
              </Link>
              <Link to="/shop" className="ghost-button">
                Back to Shop
              </Link>
            </div>
          </motion.div>
        );

      case 'no_session':
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🤔</div>
            <h1 className="cosmic-title text-3xl mb-4">
              No Order <span className="handwritten text-cosmic-rose">Found</span>
            </h1>
            <p className="cosmic-text text-lg mb-8">
              We couldn't find any order information. If you just made a purchase, 
              please check your email for confirmation.
            </p>
            <Link to="/shop" className="cosmic-button">
              Browse Products
            </Link>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4">
        {renderContent()}

        {/* Additional Help */}
        {paymentStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 cosmic-card p-6 text-center"
          >
            <h3 className="cosmic-title text-lg mb-4">What's Next?</h3>
            <div className="space-y-3 cosmic-text">
              <p>📧 Check your email for download links and instructions</p>
              <p>📝 Start your healing journey in the Writing Room</p>
              <p>💌 Join our community for ongoing support</p>
              <p>🌟 Share your transformation story when you're ready</p>
            </div>
          </motion.div>
        )}

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="cosmic-text text-sm">
            Need help? <Link to="/contact" className="hover:text-cosmic-rose transition-colors">Contact us</Link> and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
