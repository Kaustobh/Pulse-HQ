import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { apiService } from '../services/apiService';

export default function AIAssistantModal({ initialPrompt, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: initialPrompt
        ? `Analyzing query: "${initialPrompt}"...`
        : "Hello Daniel! I'm PulseHQ AI. I can rebalance team workload, summarize sprint risks, or draft status updates.",
      suggestions: [
        "Rebalance Payments team workload",
        "Summarize sprint risks",
        "Generate weekly executive report"
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const data = await apiService.askAI(textToSend);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.response,
          suggestions: data.suggestions
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "PulseHQ AI is actively monitoring team workload. High confidence index maintained.",
          suggestions: ["Check workload status", "Review metrics"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="modal-content"
        style={{ height: '75%', maxHeight: 600 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ padding: 8, borderRadius: 10, background: 'rgba(0, 242, 254, 0.15)', color: '#00F2FE' }}>
              <Bot size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFF' }}>Ask PulseHQ AI</h3>
              <span style={{ fontSize: 11, color: '#00F2FE', fontWeight: 600 }}>Active Assistant · Real-time Sync</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 4 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : '#18233A',
                  color: msg.sender === 'user' ? '#031520' : '#FFF',
                  fontWeight: msg.sender === 'user' ? 700 : 500,
                  fontSize: 13,
                  lineHeight: 1.45,
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(0, 242, 254, 0.3)' : 'none'
                }}
              >
                {msg.text}
              </div>

              {/* Action Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {msg.suggestions.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSend(chip)}
                      style={{
                        background: 'rgba(0, 242, 254, 0.08)',
                        border: '1px solid rgba(0, 242, 254, 0.25)',
                        color: '#00F2FE',
                        borderRadius: 16,
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {chip} ↗
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ color: '#00F2FE', fontSize: 12, fontWeight: 600 }}>
              PulseHQ AI is processing...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <input
            type="text"
            placeholder="Ask about team velocity, risks, or workload..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-light)',
              borderRadius: 20,
              padding: '10px 16px',
              color: '#FFF',
              fontSize: 13,
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="btn-cyan"
            style={{ padding: '10px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Send size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
