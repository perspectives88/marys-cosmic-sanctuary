import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import ConvertKitForm from '../components/ConvertKitForm';
import WritingRoomWelcome from '../components/WritingRoomWelcome';
import PremiumPromptSuggestion from '../components/PremiumPromptSuggestion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WritingRoomPage = () => {
  const [user, setUser] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: '',
    prompt_id: null
  });
  const [loading, setLoading] = useState(true);
  const [isWriting, setIsWriting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPremiumSuggestion, setShowPremiumSuggestion] = useState(false);
  const [justSavedEntry, setJustSavedEntry] = useState(false);
  const [cardPulled, setCardPulled] = useState(false);
  const [cardShimmering, setCardShimmering] = useState(false);
  const [entries, setEntries] = useState([]);

  // Free card collection (prompts, affirmations, reframes)
  const freeCards = [
    { id: 1, type: 'Prompt', content: 'What truth feels blurry but won\'t stop whispering?' },
    { id: 2, type: 'Affirmation', content: 'I am allowed to hold grief and gratitude in the same breath.' },
    { id: 3, type: 'Prompt', content: 'Who were you before the world taught you how to shrink?' },
    { id: 4, type: 'Reframe', content: 'You\'re not behind. You\'re just becoming at your own pace.' },
    { id: 5, type: 'Prompt', content: 'What part of you needs more compassion, not correction?' },
    { id: 6, type: 'Affirmation', content: 'I don\'t need to be fully healed to be whole.' },
    { id: 7, type: 'Prompt', content: 'What are you ready to release, even if it still loves you back?' },
    { id: 8, type: 'Reframe', content: 'The pause is not a failure. It\'s a portal.' },
    { id: 9, type: 'Prompt', content: 'Where do you feel most like yourself — and what does that tell you?' },
    { id: 10, type: 'Affirmation', content: 'My softness is not weakness. It\'s sacred strength.' }
  ];

  const moods = [
    { value: 'peaceful', emoji: '🕊️', label: 'Peaceful' },
    { value: 'reflective', emoji: '🤔', label: 'Reflective' },
    { value: 'energized', emoji: '✨', label: 'Energized' },
    { value: 'grateful', emoji: '🙏', label: 'Grateful' },
    { value: 'vulnerable', emoji: '💕', label: 'Vulnerable' },
    { value: 'hopeful', emoji: '🌅', label: 'Hopeful' }
  ];

  useEffect(() => {
    loadInitialData();
    // Show welcome modal after initial load
    const hasSeenWelcome = localStorage.getItem('writingRoomWelcomeSeen');
    if (!hasSeenWelcome) {
      setTimeout(() => setShowWelcome(true), 1000);
    }
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('writingRoomWelcomeSeen', 'true');
  };

  const loadInitialData = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userResponse = await axios.get(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(userResponse.data);
          
          // Load user's entries
          const entriesResponse = await axios.get(`${API}/journal/entries`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setEntries(entriesResponse.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardPull = () => {
    setCardShimmering(true);
    
    // Random card selection
    const randomCard = freeCards[Math.floor(Math.random() * freeCards.length)];
    
    setTimeout(() => {
      setCurrentCard(randomCard);
      setCardPulled(true);
      setCardShimmering(false);
    }, 1500); // Shimmer duration
  };

  const handleWriteAboutThis = () => {
    setCurrentEntry({
      title: '',
      content: '',
      mood: '',
      prompt_id: currentCard.id
    });
    setIsWriting(true);
  };

  const handleSaveEntry = async () => {
    if (!user) {
      toast.error('Please log in to save your entries');
      return;
    }

    if (!currentEntry.content) {
      toast.error('Please add some content to save');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const entryToSave = {
        ...currentEntry,
        title: currentEntry.title || `Reflection on ${currentCard?.type || 'Free Writing'}`
      };
      
      await axios.post(`${API}/journal/entries`, entryToSave, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Entry saved successfully! ✨');
      setIsWriting(false);
      setJustSavedEntry(true);
      
      // Track usage for premium suggestion
      let promptUsageCount = parseInt(localStorage.getItem('promptUsageCount') || '0');
      if (currentCard) {
        promptUsageCount += 1;
        localStorage.setItem('promptUsageCount', promptUsageCount.toString());
      }
      
      // Show premium suggestion after 3+ cards
      const lastSuggestionShown = localStorage.getItem('lastPremiumSuggestion');
      const now = Date.now();
      const daysSinceLastSuggestion = lastSuggestionShown ? 
        (now - parseInt(lastSuggestionShown)) / (1000 * 60 * 60 * 24) : 999;
      
      if (promptUsageCount >= 3 && (daysSinceLastSuggestion > 7 || !lastSuggestionShown)) {
        setTimeout(() => {
          setShowPremiumSuggestion(true);
          localStorage.setItem('lastPremiumSuggestion', now.toString());
        }, 2000);
      }
      
      loadInitialData();
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error('Unable to save entry. Please try again.');
    }
  };

  const handleReset = () => {
    setCurrentEntry({
      title: '',
      content: '',
      mood: '',
      prompt_id: null
    });
  };

  const handleDownload = () => {
    const content = `${currentEntry.title}\n\n${currentEntry.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentEntry.title || 'journal-entry'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

  return (
    <div className="journal-sanctuary">
      {/* Welcome Modal */}
      <WritingRoomWelcome 
        isOpen={showWelcome} 
        onClose={handleWelcomeClose} 
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {!isWriting ? (
          <>
            {/* Section 1: Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="cosmic-title text-5xl mb-8">
                The <span className="handwritten text-cosmic-rose">Writing Room</span>
              </h1>
              
              <div className="glass-card p-8 max-w-2xl mx-auto mb-12">
                <div className="space-y-4 cosmic-text text-lg leading-relaxed">
                  <p>Welcome to The Writing Room.</p>
                  <p>You've just received a prompt meant for right now.</p>
                  <p>This space isn't here to fix you.</p>
                  <p>It's here to remind you:</p>
                  <div className="handwritten text-2xl text-cosmic-gold my-6">
                    You are the guru.
                  </div>
                  <p>You've carried the wisdom all along — this is just a place to remember.</p>
                </div>
              </div>

              {/* Card Pull Entry Point */}
              {!cardPulled ? (
                <motion.button
                  onClick={handleCardPull}
                  disabled={cardShimmering}
                  className="cosmic-button text-xl px-12 py-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cardShimmering ? 'Selecting your card...' : 'I\'m ready for a perspective shift ✨'}
                </motion.button>
              ) : null}
            </motion.div>

            {/* Section 2: Display Card */}
            {cardPulled && currentCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <div className={`glass-card p-8 text-center relative overflow-hidden ${
                  cardShimmering ? 'shimmer-effect' : ''
                }`}>
                  {/* Shimmer overlay */}
                  {cardShimmering && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-gold/20 to-transparent shimmer-animation"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="handwritten text-cosmic-rose text-lg mb-4">
                      {currentCard.type}
                    </div>
                    <blockquote className="cosmic-text text-2xl leading-relaxed italic">
                      "{currentCard.content}"
                    </blockquote>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => {
                      setCardPulled(false);
                      setCurrentCard(null);
                    }}
                    className="ghost-button"
                  >
                    🔄 Pull Another Card
                  </button>
                  <button
                    onClick={handleWriteAboutThis}
                    className="cosmic-button"
                  >
                    📝 Write About This
                  </button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          /* Section 3: Journaling Interface */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Display Current Card */}
            {currentCard && (
              <div className="glass-card mb-6 p-6">
                <div className="handwritten text-cosmic-rose text-lg mb-2">
                  Your {currentCard.type}
                </div>
                <blockquote className="cosmic-text text-lg italic">
                  "{currentCard.content}"
                </blockquote>
              </div>
            )}

            {/* Journaling Guidance */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass p-6 rounded-xl mb-6 border border-cosmic-rose/20"
            >
              <div className="cosmic-text leading-relaxed space-y-2">
                <p>There's no pressure here.</p>
                <p>Let the words come as they want to — messy, quiet, scattered, sacred.</p>
                <p className="text-cosmic-silver italic">
                  Write what feels honest. Or just sit and breathe.
                </p>
              </div>
              <div className="text-xs cosmic-text opacity-60 mt-4">
                💡 Tip: You can save or download your writing below.
              </div>
            </motion.div>

            {/* Writing Interface */}
            <div className="writing-space">
              <input
                type="text"
                placeholder="Give your reflection a title (optional)"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                className="cosmic-input text-xl font-semibold mb-4"
              />

              <textarea
                placeholder="Begin here... let your thoughts flow freely onto the page."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                className="cosmic-input w-full h-96 resize-none text-lg leading-relaxed"
                style={{ background: 'transparent', border: 'none' }}
              />

              {/* Mood Selector */}
              <div className="mt-8">
                <div className="text-center mb-4">
                  <label className="cosmic-title text-lg mb-2 block">How does your heart feel right now?</label>
                  <p className="cosmic-text text-sm opacity-75">
                    Optional • A way to honor your emotional landscape
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentEntry({...currentEntry, mood: mood.value})}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        currentEntry.mood === mood.value
                          ? 'cosmic-button'
                          : 'ghost-button'
                      }`}
                    >
                      {mood.emoji} {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
                <button
                  onClick={() => setIsWriting(false)}
                  className="ghost-button"
                >
                  ← Back to Cards
                </button>
                
                <div className="flex gap-4">
                  {user ? (
                    <>
                      <button
                        onClick={handleSaveEntry}
                        className="cosmic-button"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={handleDownload}
                        className="ghost-button"
                        disabled={!currentEntry.content}
                      >
                        📥 Download
                      </button>
                      <button
                        onClick={handleReset}
                        className="ghost-button"
                      >
                        ♻️ Reset
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleDownload}
                        className="ghost-button"
                        disabled={!currentEntry.content}
                      >
                        📥 Download
                      </button>
                      <a href="/login" className="cosmic-button">
                        Login to Save
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section 4: Gentle Exit / Expansion Path */}
        {cardPulled && !isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center glass-card p-8 mt-12"
          >
            <h3 className="cosmic-title text-2xl mb-4">
              Looking to go <span className="handwritten text-cosmic-rose">deeper?</span>
            </h3>
            <p className="cosmic-text text-lg mb-6">
              Explore premium prompt libraries for moments of grief, becoming, love, and letting go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/yes-and" className="cosmic-button">
                ✨ Unlock More Perspectives
              </a>
              <button 
                onClick={() => {
                  setCardPulled(false);
                  setCurrentCard(null);
                }}
                className="ghost-button"
              >
                🔄 Pull Another Card
              </button>
              <a href="/" className="ghost-button">
                🏠 Back to Home
              </a>
            </div>
          </motion.div>
        )}

        {/* Premium Suggestion - appears after saving */}
        {justSavedEntry && user && (
          <PremiumPromptSuggestion 
            show={showPremiumSuggestion}
            onClose={() => {
              setShowPremiumSuggestion(false);
              setJustSavedEntry(false);
            }}
          />
        )}

        {/* Login Prompt for Non-Users */}
        {!user && !isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center glass-card p-8 mt-12"
          >
            <h2 className="cosmic-title text-2xl mb-4">
              Create Your <span className="handwritten text-cosmic-gold">Sacred Space</span>
            </h2>
            <p className="cosmic-text text-lg mb-6">
              Sign up to save your reflections and create a private digital sanctuary for your thoughts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" className="cosmic-button">
                Create Free Account
              </a>
              <a href="/login" className="ghost-button">
                Log In
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WritingRoomPage;
