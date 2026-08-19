import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, TrendingUp, GitMerge, Activity } from 'lucide-react';

export default function SplashLoader({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0B0F17 0%, #06090F 100%)',
        position: 'relative',
        zIndex: 50
      }}
    >
      {/* Pulse Logo Box */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: 110,
          height: 110,
          borderRadius: 30,
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 242, 254, 0.25), rgba(11, 15, 23, 0.8))',
          border: '1.5px solid rgba(0, 242, 254, 0.4)',
          boxShadow: '0 0 35px rgba(0, 242, 254, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 6 30 C 15 30 18 10 27 10 C 36 10 39 50 48 50 C 53 50 55 30 58 30"
            stroke="#00F2FE"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ fontSize: 28, fontWeight: 800, color: '#FFF', letterSpacing: '-0.5px' }}
      >
        PulseHQ
      </motion.h1>

      <motion.p
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ fontSize: 16, fontWeight: 600, color: '#94A3B8', marginTop: 50, marginBottom: 40 }}
      >
        Manage , Analyze, Implement
      </motion.p>

      {/* 3 Icon Features Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ display: 'flex', gap: 36, marginBottom: 60 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} style={{ color: '#EAB308' }}>
          <UserCheck size={36} strokeWidth={1.5} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} style={{ color: '#EAB308' }}>
          <TrendingUp size={36} strokeWidth={1.5} />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} style={{ color: '#EAB308' }}>
          <GitMerge size={36} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={onComplete}
        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 242, 254, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
          color: '#000',
          border: 'none',
          fontWeight: 800,
          fontSize: 14,
          padding: '14px 32px',
          borderRadius: 25,
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)'
        }}
      >
        Launch Dashboard ↗
      </motion.button>

      {/* Standardized Copyright Notice */}
      <div 
        style={{
          position: 'absolute',
          bottom: 16,
          left: 20,
          fontSize: '0.75rem',
          color: '#64748B',
          fontWeight: 500,
          letterSpacing: '0.2px',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        Copyright © 2026 Kaustobh Bhattacharya
      </div>
    </motion.div>
  );
}
