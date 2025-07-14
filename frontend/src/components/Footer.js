import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass border-t border-glass-medium mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="handwritten text-2xl text-white">
                Mary's Cosmic Sanctuary
              </span>
            </div>
            <p className="cosmic-text max-w-md mb-6">
              A digital sanctuary for healing, growth, and authentic storytelling. 
              Join our community of deep feelers and cosmic explorers.
            </p>
            <div className="handwritten text-cosmic-rose text-lg">
              "Every story matters, every healing journey is sacred ✨"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="cosmic-title text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  About Mary
                </Link>
              </li>
              <li>
                <Link to="/speaking" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Speaking
                </Link>
              </li>
              <li>
                <Link to="/shop" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Digital Shop
                </Link>
              </li>
              <li>
                <Link to="/writing-room" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Writing Room
                </Link>
              </li>
              <li>
                <Link to="/blog" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="cosmic-title text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <a href="mailto:hello@marysanctuary.com" className="cosmic-text hover:text-cosmic-rose transition-colors">
                  hello@marysanctuary.com
                </a>
              </li>
              <li>
                <div className="cosmic-text">
                  Newsletter coming soon...
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-medium mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="cosmic-text text-sm">
            © 2025 Mary's Cosmic Sanctuary. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="cosmic-text text-sm hover:text-cosmic-rose transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="cosmic-text text-sm hover:text-cosmic-rose transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Cosmic Stars Background */}
      <div className="cosmic-stars">
        {[...Array(20)].map((_, i) => (
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
    </footer>
  );
};

export default Footer;
