import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Set demo posts for now
      setPosts(demoPosts);
    } finally {
      setLoading(false);
    }
  };

  // Demo blog posts
  const demoPosts = [
    {
      id: '1',
      title: 'Finding Light in the Darkness: A Letter to My Past Self',
      excerpt: 'What I would tell the woman who was drowning in transition, afraid she\'d never find her way back to herself.',
      content: `Dear Past Self,

I know you can't see it right now, but the darkness you're swimming through isn't trying to drown you—it's trying to teach you how to breathe underwater.

I know that sounds impossible when you're gasping for air, when every day feels like pushing through thick fog, when you look in the mirror and don't recognize the person staring back. I know because I was you, and in many ways, I still am you.

The woman writing this letter has learned something beautiful: healing isn't about fixing what's broken. It's about remembering what was never broken to begin with.

You are not too much. You are not too sensitive. You are not failing at life because you feel everything so deeply. Your sensitivity is your superpower, even when it feels like your kryptonite.

The transitions you're afraid of? They're not endings—they're birthings. And birth is messy and beautiful and terrifying all at once. You're not losing yourself in these changes; you're excavating yourself. You're becoming.

Keep writing. Keep feeling. Keep trusting that voice inside you that knows you're meant for something beautiful and big and healing. Your story matters. Your pain has purpose. Your healing will light the way for others.

You are braver than you believe, stronger than you seem, and more loved than you know.

With all my love and cosmic stardust,
Your Future Self ✨`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494',
      created_at: '2025-01-15T10:00:00Z',
      tags: ['healing', 'self-love', 'transformation', 'letter to self']
    },
    {
      id: '2',
      title: 'The Sacred Art of Sitting with Discomfort',
      excerpt: 'Why our culture of constant motion keeps us from the deep healing that only comes through stillness.',
      content: `We live in a world that tells us discomfort is the enemy. Feel sad? Take something. Feel anxious? Distract yourself. Feel uncertain? Make a plan immediately.

But what if discomfort isn't the enemy? What if it's the teacher we've been avoiding?

I've learned that our discomfort often holds our deepest wisdom. That restless feeling when we're in the wrong relationship, the anxiety that shows up when we're not living authentically, the grief that comes when we're ready to let go of who we used to be.

Sitting with discomfort doesn't mean being passive or wallowing. It means creating space for our feelings to exist without immediately trying to fix them. It means trusting that our emotional landscape has intelligence, even when we can't see the bigger picture.

In my own healing journey, I've discovered that the feelings I tried hardest to avoid were often pointing me toward the changes I needed to make. My anxiety wasn't just random suffering—it was my soul's way of saying, "This doesn't fit anymore."

So how do we sit with discomfort without being overwhelmed by it?

First, we breathe. We remind ourselves that feelings are temporary visitors, not permanent residents. We create rituals that honor our emotional experience—journaling, walking in nature, creating art, talking with trusted friends.

We also remember that discomfort often signals growth. Just like a snake sheds its skin when it outgrows it, we feel uncomfortable when we're ready to expand beyond our current limitations.

Your discomfort is not a flaw in your design. It's a feature. It's your inner wisdom speaking a language that only you can understand.

Trust it. Sit with it. Let it teach you.`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1732352332941-7cb02a49edd8',
      created_at: '2025-01-10T14:30:00Z',
      tags: ['mindfulness', 'emotional wisdom', 'growth', 'healing']
    },
    {
      id: '3',
      title: 'When Your Identity Shifts: Navigating Who You\'re Becoming',
      excerpt: 'The beautiful, terrifying process of evolving beyond who you used to be—and how to navigate the in-between.',
      content: `Who are you when everything you thought you knew about yourself changes?

This question has been my companion through multiple identity shifts—from who I was before my healing journey to who I'm becoming, from the roles I played to the authentic self I'm uncovering.

Identity shifts are rarely linear. They're more like spiral staircases—you think you're going in circles, but actually, you're moving upward, just seeing familiar territory from a new perspective.

Maybe you're the high achiever who's learning that rest isn't lazy. Maybe you're the people-pleaser discovering your voice. Maybe you're the "strong one" learning it's okay to need support. These transitions can feel disorienting because we've often built our entire sense of self around these old patterns.

Here's what I've learned about navigating identity shifts:

1. **Honor the grief.** You're mourning who you used to be, and that's sacred work. It's okay to feel sad about leaving parts of yourself behind, even the parts that weren't serving you.

2. **Embrace the unknown.** The space between who you were and who you're becoming is where the magic happens. It's uncomfortable, but it's also full of possibility.

3. **Find your anchors.** What parts of you remain constant through all the changes? Your values, your capacity for love, your unique way of seeing the world—these are your home base.

4. **Be patient with the process.** Identity shifts take time. You don't have to have it all figured out tomorrow. You're allowed to explore, experiment, and change your mind.

5. **Surround yourself with people who see your becoming.** You need witnesses to your transformation—people who can hold space for both who you were and who you're becoming.

Remember: You're not broken because you're changing. You're not flighty because you're evolving. You're not failing because you're growing beyond your old limitations.

You're becoming. And becoming is beautiful.`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1468186402854-9a641fd7a7c4',
      created_at: '2025-01-05T09:15:00Z',
      tags: ['identity', 'transformation', 'growth', 'self-discovery']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-5xl mb-6">
            Reflections & <span className="handwritten text-cosmic-rose">Insights</span>
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Authentic thoughts on healing, growth, and the beautiful complexity of being human. 
            Stories from the journey of transformation.
          </p>
        </motion.div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Link to={`/blog/${posts[0].id}`} className="block cosmic-card group">
              <div 
                className="w-full h-80 bg-cover bg-center rounded-xl mb-6"
                style={{
                  backgroundImage: `url(${posts[0].featured_image})`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-cosmic-navy/80 to-transparent rounded-xl flex items-end p-6">
                  <div className="handwritten text-cosmic-gold text-lg">Featured</div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="cosmic-title text-3xl mb-4 group-hover:text-cosmic-rose transition-colors">
                  {posts[0].title}
                </h2>
                <p className="cosmic-text text-lg leading-relaxed mb-4">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {posts[0].tags.map((tag) => (
                    <span key={tag} className="text-sm cosmic-text opacity-60">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="cosmic-text text-sm">
                  {new Date(posts[0].created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other Posts */}
        <div className="space-y-8">
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="block cosmic-card group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="w-full h-48 bg-cover bg-center rounded-xl"
                    style={{
                      backgroundImage: `url(${post.featured_image})`,
                    }}
                  />
                  
                  <div className="md:col-span-2">
                    <h3 className="cosmic-title text-2xl mb-3 group-hover:text-cosmic-rose transition-colors">
                      {post.title}
                    </h3>
                    <p className="cosmic-text leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-sm cosmic-text opacity-60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="cosmic-text text-sm">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-card p-8"
        >
          <h2 className="cosmic-title text-3xl mb-4">
            Never Miss a <span className="handwritten text-cosmic-gold">Reflection</span>
          </h2>
          <p className="cosmic-text text-lg mb-6">
            Get new blog posts, journaling prompts, and healing insights delivered directly to your inbox.
          </p>
          <div className="handwritten text-cosmic-rose text-xl mb-4">
            Newsletter launching soon... ✨
          </div>
          <a href="/contact" className="cosmic-button">
            Stay Connected
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
