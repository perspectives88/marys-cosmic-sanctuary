import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Set demo products for now
      setProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  // Demo products while we set up the backend
  const demoProducts = [
    {
      id: '1',
      name: 'Cosmic Healing Journal',
      description: 'A beautifully designed 120-page digital journal with guided prompts for self-reflection, healing, and growth. Includes moon phases, intention setting, and gratitude practices.',
      price: 29.99,
      category: 'journal',
      preview_content: 'Sample pages include: "What does healing mean to you today?" and "Three things that brought me peace this week..."',
      featured_image: 'https://images.unsplash.com/photo-1596078878524-8047985968bb'
    },
    {
      id: '2',
      name: 'Transitions & Transformation eBook',
      description: 'A comprehensive 80-page guide to navigating life\'s major transitions with grace and wisdom. Based on real experiences and proven strategies.',
      price: 19.99,
      category: 'ebook',
      preview_content: 'Chapter preview: "Understanding the Seasons of Change" - Learn why transitions feel so challenging and how to move through them with intention.',
      featured_image: 'https://images.unsplash.com/photo-1732352332941-7cb02a49edd8'
    },
    {
      id: '3',
      name: 'Affirmation & Reflection Cards',
      description: 'A set of 52 beautifully designed digital cards with affirmations and reflection prompts for weekly practices. Perfect for daily inspiration.',
      price: 15.99,
      category: 'card_deck',
      preview_content: 'Sample card: "I trust my ability to navigate uncertainty with grace and wisdom. Today I choose to see challenges as opportunities for growth."',
      featured_image: 'https://images.unsplash.com/photo-1468186402854-9a641fd7a7c4'
    },
    {
      id: '4',
      name: 'Guided Healing Meditation Series',
      description: 'A collection of 10 guided meditations (each 15-20 minutes) focusing on different aspects of healing: trauma release, self-compassion, inner child work, and more.',
      price: 39.99,
      category: 'meditation',
      preview_content: 'Includes meditations for: Releasing What No Longer Serves, Embracing Your Authentic Self, Healing the Inner Child, and Finding Peace in Uncertainty.',
      featured_image: 'https://images.unsplash.com/photo-1605703905070-24220ce7f693'
    },
    {
      id: '5',
      name: 'Complete Sanctuary Bundle',
      description: 'Everything you need for your healing journey! Includes the Cosmic Healing Journal, Transitions eBook, Affirmation Cards, and Meditation Series.',
      price: 79.99,
      category: 'bundle',
      preview_content: 'Save $25 when you get the complete collection! Perfect for anyone ready to dive deep into their healing and transformation journey.',
      featured_image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'journal', name: 'Journals' },
    { id: 'ebook', name: 'eBooks' },
    { id: 'card_deck', name: 'Card Decks' },
    { id: 'meditation', name: 'Meditations' },
    { id: 'bundle', name: 'Bundles' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handlePurchase = async (productId) => {
    try {
      const response = await axios.post(`${API}/payments/checkout/session`, [productId]);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Unable to process purchase at this time. Please try again later.');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'journal': return '📔';
      case 'ebook': return '📖';
      case 'card_deck': return '🃏';
      case 'meditation': return '🧘‍♀️';
      case 'bundle': return '🎁';
      default: return '✨';
    }
  };

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
            Digital <span className="handwritten text-cosmic-rose">Sanctuary</span> Shop
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Thoughtfully crafted digital resources to support your healing journey. 
            Each product is created with intention, love, and practical wisdom.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'cosmic-button'
                  : 'ghost-button'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="product-card group"
            >
              {/* Product Image */}
              <div 
                className="w-full h-64 bg-cover bg-center rounded-xl mb-4"
                style={{
                  backgroundImage: `url(${product.featured_image})`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-cosmic-navy/80 to-transparent rounded-xl flex items-end p-4">
                  <div className="text-2xl">
                    {getCategoryIcon(product.category)}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="cosmic-title text-xl group-hover:text-cosmic-rose transition-colors">
                    {product.name}
                  </h3>
                  <div className="cosmic-title text-2xl">
                    ${product.price}
                  </div>
                </div>

                <p className="cosmic-text mb-4 leading-relaxed">
                  {product.description}
                </p>

                {product.preview_content && (
                  <div className="glass bg-cosmic-purple/20 p-3 rounded-lg mb-4">
                    <div className="text-sm cosmic-text italic">
                      Preview: {product.preview_content}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handlePurchase(product.id)}
                  className="cosmic-button w-full group-hover:scale-105 transition-transform"
                >
                  Purchase Now ✨
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass-card p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔮</div>
              <h3 className="cosmic-title text-2xl mb-4">No Products Found</h3>
              <p className="cosmic-text">
                We're working on adding more beautiful resources to this category. 
                Check back soon!
              </p>
            </div>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-card p-8"
        >
          <h2 className="cosmic-title text-3xl mb-4">
            Stay Updated on <span className="handwritten text-cosmic-gold">New Releases</span>
          </h2>
          <p className="cosmic-text text-lg mb-6">
            Be the first to know about new digital products, special offers, and exclusive content.
          </p>
          <div className="handwritten text-cosmic-rose text-xl mb-4">
            Newsletter launching soon... ✨
          </div>
          <a href="/contact" className="cosmic-button">
            Join the Waitlist
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
