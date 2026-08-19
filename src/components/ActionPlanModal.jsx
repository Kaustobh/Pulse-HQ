import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, X, ShieldAlert, Cpu } from 'lucide-react';

export default function ActionPlanModal({ steps, onClose, onExecuteRebalance }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={22} color="#00F2FE" />
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF' }}>Manager Action Plan</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: -4 }}>
          Recommended execution steps synthesized by PulseHQ AI:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0' }}>
          {steps && steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-light)',
                borderRadius: 14
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(0, 242, 254, 0.15)',
                  color: '#00F2FE',
                  fontWeight: 800,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {idx + 1}
              </div>
              <div style={{ fontSize: 13, color: '#FFF', fontWeight: 600, lineHeight: 1.4 }}>
                {step}
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-cyan"
          style={{ width: '100%', padding: '12px', marginTop: 8 }}
          onClick={() => {
            onExecuteRebalance();
            onClose();
          }}
        >
          Execute All Action Plan Recommendations ↗
        </button>
      </motion.div>
    </div>
  );
}
