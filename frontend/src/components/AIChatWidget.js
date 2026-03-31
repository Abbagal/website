'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Sparkles, Heart, Star } from 'lucide-react';
import { api } from '../lib/api';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchPopularQuestions();
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        message: '🕉️ Namaste! Welcome to our spiritual journey. I am here to guide you with mantras, astrology, pujas, and spiritual wisdom. How can I assist you today?',
        timestamp: new Date().toISOString(),
        suggestions: ['Tell me about mantras', 'Check my horoscope', 'Quick puja guide', 'Book a service']
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchPopularQuestions = async () => {
    try {
      const response = await api.get('/api/chatbot/popular-questions');
      setPopularQuestions(response.data.data);
    } catch (error) {
      console.error('Error fetching popular questions:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await api.post('/api/chatbot/chat', {
        message: message.trim(),
        userId: 'user_' + Date.now()
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: response.data.data.message,
        intent: response.data.data.intent,
        suggestions: response.data.data.suggestions,
        timestamp: response.data.data.timestamp
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: 'I apologize, but I am having trouble connecting right now. Please try again in a moment. 🙏',
        timestamp: new Date().toISOString()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const getIntentIcon = (intent) => {
    const icons = {
      greetings: '🙏',
      mantras: '🕉️',
      astrology: '⭐',
      pujas: '🪔',
      services: '🛕',
      meditation: '🧘',
      festivals: '🎉',
      default: '💫'
    };
    return icons[intent] || icons.default;
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          <Sparkles size={12} />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Spiritual Guide AI</h3>
                  <p className="text-white/80 text-sm">Always here to help 🕉️</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-[400px] bg-gradient-to-b from-purple-900/20 to-pink-900/20">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                          {msg.type === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          msg.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          {msg.intent && (
                            <div className="mt-2 text-xs opacity-70">
                              {getIntentIcon(msg.intent)} {msg.intent}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Suggestions */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full border border-white/20 transition"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="p-2 rounded-full bg-purple-500">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-white/10 border border-white/20 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Popular Questions (when no messages) */}
            {messages.length <= 1 && popularQuestions.length > 0 && (
              <div className="p-4 border-t border-white/20">
                <h4 className="text-white font-semibold mb-3 text-sm">Popular Questions:</h4>
                <div className="space-y-2">
                  {popularQuestions.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(q.question)}
                      className="w-full text-left p-2 bg-white/5 hover:bg-white/10 text-white text-xs rounded-lg border border-white/10 transition"
                    >
                      <div className="flex items-center gap-2">
                        <Star size={12} className="text-yellow-400" />
                        <span>{q.question}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about mantras, astrology, pujas..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 text-sm"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
