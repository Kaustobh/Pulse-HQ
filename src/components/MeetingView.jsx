import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Plus, Layers, FileText, Palette, X, Check } from 'lucide-react';

export default function MeetingView({ onOpenAIModal }) {
  const [activeModal, setActiveModal] = useState(null); // 'wireframes' | 'assumptions' | 'icon' | 'member'
  const [scheduleSuccess, setScheduleSuccess] = useState(null);

  const teamMembers = [
    { name: "Riya S.", role: "Senior Frontend Lead", email: "riya@pulsehq.io", status: "Active" },
    { name: "Aman K.", role: "Backend Architect", email: "aman@pulsehq.io", status: "Active" },
    { name: "Priya T.", role: "Product Designer", email: "priya@pulsehq.io", status: "Active" }
  ];

  const handleScheduleMeeting = (name) => {
    setScheduleSuccess(`1:1 Sync scheduled with ${name}! Calendar invite dispatched.`);
    setTimeout(() => setScheduleSuccess(null), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="team-theme"
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {scheduleSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 70,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 300,
              background: 'rgba(217, 70, 239, 0.95)',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 13,
              padding: '10px 20px',
              borderRadius: 20,
              boxShadow: '0 8px 25px rgba(217, 70, 239, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Check size={16} />
            {scheduleSuccess}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header matching screenshot */}
      <div className="glass-card team-header-card" style={{ padding: '24px 20px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: '#FFF', letterSpacing: '-1px', marginBottom: 20 }}>
          Coming<br />Soon
        </h1>

        {/* 3 Reference Design Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 220 }}>
          {/* Wire-frames Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(217, 119, 6, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveModal('wireframes')}
            style={{
              background: 'linear-gradient(135deg, #78350F 0%, #451A03 100%)',
              border: '1.5px solid #D97706',
              color: '#FDE68A',
              fontWeight: 800,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.3)'
            }}
          >
            <Layers size={16} />
            Wire-frames
          </motion.button>

          {/* Assumptions Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0, 230, 118, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveModal('assumptions')}
            style={{
              background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
              border: 'none',
              color: '#064E3B',
              fontWeight: 800,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 15px rgba(52, 211, 153, 0.4)'
            }}
          >
            <FileText size={16} />
            Assumptions
          </motion.button>

          {/* Icon Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(0, 242, 254, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveModal('icon')}
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
              border: 'none',
              color: '#EF4444',
              fontWeight: 900,
              fontSize: 14,
              padding: '12px 24px',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 4px 15px rgba(34, 211, 238, 0.4)'
            }}
          >
            <Palette size={16} />
            Icon
          </motion.button>
        </div>
      </div>

      {/* Team Member Management Directory */}
      <div className="glass-card" style={{ borderColor: 'rgba(217, 70, 239, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3 className="section-title" style={{ color: '#D946EF' }}>Team Directory</h3>
            <p className="section-subtitle">Manage squad members and sync schedules</p>
          </div>
          <button 
            className="purple-btn"
            style={{ padding: '8px 14px', fontSize: 12 }}
            onClick={() => setActiveModal('member')}
          >
            <Plus size={14} /> Add Member
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {teamMembers.map(m => (
            <div 
              key={m.name} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(217, 70, 239, 0.05)',
                border: '1px solid rgba(217, 70, 239, 0.15)',
                borderRadius: 14
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div 
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D946EF 0%, #A855F7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    color: '#FFF',
                    fontSize: 14
                  }}
                >
                  {m.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF', fontSize: 14 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{m.role}</div>
                </div>
              </div>

              <button
                onClick={() => handleScheduleMeeting(m.name)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFF',
                  borderRadius: 20,
                  padding: '6px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Calendar size={13} color="#D946EF" /> 1:1 Sync
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Standardized Copyright Notice */}
      <div className="copyright-footer-notice">
        Copyright © 2026 Kaustobh Bhattacharya
      </div>

      {/* Interactive Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="modal-overlay" onClick={() => setActiveModal(null)}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={18} />
              </button>

              {activeModal === 'wireframes' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FDE68A', marginBottom: 8 }}>
                    Wire-frame Blueprint Specs
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                    PulseHQ UI/UX layout wireframes for sprint 14 features.
                  </p>
                  <div style={{ background: '#090D14', padding: 16, borderRadius: 12, border: '1px dashed #D97706' }}>
                    <div style={{ color: '#D97706', fontWeight: 700, marginBottom: 8 }}>[Wireframe #01] - Manager AI Dashboard</div>
                    <p style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                      - Top Search & Ask AI Drawer<br />
                      - 4 Real-time Metric Cards (Utilization, Baseline, At-Risk, Health)<br />
                      - One-click Workload Rebalancing Module
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'assumptions' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#34D399', marginBottom: 8 }}>
                    Sprint Assumptions & Guarantees
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                    Core engineering & team assumptions backing delivery estimations.
                  </p>
                  <ul style={{ fontSize: 13, color: '#FFF', display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 20 }}>
                    <li>API sign-off delay resolved within 24 hours.</li>
                    <li>Riya's Payments redesign hours capped at 30h max.</li>
                    <li>Delivery confidence index maintains standard baseline &gt; 80%.</li>
                  </ul>
                </div>
              )}

              {activeModal === 'icon' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#22D3EE', marginBottom: 8 }}>
                    PulseHQ Icon & Asset System
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                    Glowing neon asset library and SVG micro-icon tokens.
                  </p>
                  <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                    <div style={{ padding: 12, borderRadius: 12, background: 'rgba(0, 242, 254, 0.1)', border: '1px solid #00F2FE', color: '#00F2FE' }}>
                      <Layers size={24} />
                    </div>
                    <div style={{ padding: 12, borderRadius: 12, background: 'rgba(217, 70, 239, 0.1)', border: '1px solid #D946EF', color: '#D946EF' }}>
                      <Users size={24} />
                    </div>
                    <div style={{ padding: 12, borderRadius: 12, background: 'rgba(52, 211, 153, 0.1)', border: '1px solid #34D399', color: '#34D399' }}>
                      <Calendar size={24} />
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'member' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#D946EF', marginBottom: 8 }}>
                    Add Team Member
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>
                    Invite a new teammate to PulseHQ squad workspace.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input type="text" placeholder="Member Full Name" style={{ padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF' }} />
                    <input type="email" placeholder="Email Address" style={{ padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF' }} />
                    <button className="purple-btn" onClick={() => setActiveModal(null)}>Add Teammate</button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
