import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Filter } from 'lucide-react';

export default function AnalyticsView({ onOpenAIModal }) {
  const [period, setPeriod] = useState('3D');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    fetchAnalytics(period);
  }, [period]);

  const fetchAnalytics = async (selectedPeriod) => {
    try {
      const res = await fetch(`/api/analytics?period=${selectedPeriod}`);
      const data = await res.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error("Failed to load analytics", err);
    }
  };

  if (!analyticsData) return <div style={{ color: '#94A3B8', padding: 20, textAlign: 'center' }}>Loading cyan analytics...</div>;

  const { confidenceRose, confidenceDesc, trend, matrix, workloadBalance, riskHeatmap } = analyticsData;

  // Chart coordinate calculations
  const svgWidth = 320;
  const svgHeight = 130;
  const labelsCount = trend.labels.length;
  
  const getX = (index) => 25 + (index / (labelsCount - 1)) * (svgWidth - 50);
  const getYConfidence = (val) => svgHeight - 20 - (val / 100) * (svgHeight - 40);
  const getYVelocity = (val) => svgHeight - 20 - (val / 100) * (svgHeight - 40);

  const pointsConfidence = trend.deliveryConfidence.map((val, i) => `${getX(i)},${getYConfidence(val)}`).join(' ');
  const pointsVelocity = trend.velocityScore.map((val, i) => `${getX(i)},${getYVelocity(val)}`).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="analytics-theme"
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Title Header */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#FFF' }}>Analytics & Reports</h2>
        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
          Track team efficiency, predict risks, and understand delivery
        </p>
      </div>

      {/* Timeframe Chips */}
      <div className="period-chips">
        {['3D', '7D', 'Quarter', 'Custom'].map((p) => (
          <button
            key={p}
            className={`chip-btn ${period === p ? 'active' : ''}`}
            onClick={() => p !== 'Custom' && setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Productivity Trend Card */}
      <div className="glass-card chart-card" style={{ borderColor: 'rgba(0, 242, 254, 0.2)' }}>
        <h3 className="section-title">Productivity trend</h3>
        <p className="section-subtitle">Delivery confidence (%)</p>

        <div style={{ position: 'relative', marginTop: 10 }}>
          <svg className="chart-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            {/* Background Grid Lines */}
            <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="20" y1="65" x2={svgWidth - 20} y2="65" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="20" y1="110" x2={svgWidth - 20} y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

            {/* Velocity Line (Blue) */}
            <polyline
              fill="none"
              stroke="#4FACFE"
              strokeWidth="3"
              strokeLinecap="round"
              points={pointsVelocity}
            />

            {/* Confidence Line (Glowing Cyan) */}
            <polyline
              fill="none"
              stroke="#00F2FE"
              strokeWidth="3.5"
              strokeLinecap="round"
              points={pointsConfidence}
              style={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 242, 254, 0.8))' }}
            />

            {/* Data Points */}
            {trend.deliveryConfidence.map((val, i) => (
              <circle
                key={`conf-${i}`}
                cx={getX(i)}
                cy={getYConfidence(val)}
                r={hoveredPoint === i ? "6" : "4"}
                fill="#00F2FE"
                stroke="#0B0F17"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>

          {/* Dynamic Hover Tooltip */}
          {hoveredPoint !== null && (
            <div
              style={{
                position: 'absolute',
                top: getYConfidence(trend.deliveryConfidence[hoveredPoint]) - 35,
                left: getX(hoveredPoint) - 45,
                background: 'rgba(0, 242, 254, 0.95)',
                color: '#031520',
                padding: '4px 8px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 800,
                pointerEvents: 'none',
                boxShadow: '0 4px 12px rgba(0, 242, 254, 0.5)'
              }}
            >
              {trend.labels[hoveredPoint]}: {trend.deliveryConfidence[hoveredPoint]}%
            </div>
          )}
        </div>
      </div>

      {/* AI Confidence Rose Banner */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(79, 172, 254, 0.04) 100%)',
          borderColor: 'rgba(0, 242, 254, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00F2FE', fontWeight: 800, fontSize: 15 }}>
          <ArrowUpRight size={18} />
          Delivery confidence rose {confidenceRose}
        </div>
        <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 8, lineHeight: 1.45 }}>
          {confidenceDesc}
        </p>
      </div>

      {/* Team Performance Matrix */}
      <div className="glass-card">
        <h3 className="section-title">Team performance matrix</h3>
        <p className="section-subtitle">Quality, utilization, and load pressure</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
          {matrix.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#FFF', width: 60 }}>{item.name}</span>
              
              {/* Indicator Blocks */}
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4].map((barIndex) => (
                  <div
                    key={barIndex}
                    style={{
                      width: 22,
                      height: 14,
                      borderRadius: 4,
                      background: barIndex <= item.activeBars ? item.color : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: barIndex <= item.activeBars ? `0 0 8px ${item.color}80` : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <span style={{ fontSize: 14, fontWeight: 800, color: item.color, width: 45, textAlign: 'right' }}>
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Workload Balance */}
      <div className="glass-card">
        <h3 className="section-title">Workload balance</h3>
        <p className="section-subtitle">Balanced, near limit, overloaded, underutilized</p>

        {/* Stacked Progress Bar */}
        <div style={{ display: 'flex', height: 16, borderRadius: 10, overflow: 'hidden', margin: '14px 0' }}>
          <div style={{ width: `${workloadBalance.balanced}%`, background: '#00F2FE', boxShadow: '0 0 10px rgba(0,242,254,0.6)' }} />
          <div style={{ width: `${workloadBalance.overloaded}%`, background: '#FF4B72', boxShadow: '0 0 10px rgba(255,75,114,0.6)' }} />
          <div style={{ width: `${workloadBalance.underutilized}%`, background: '#4FACFE', boxShadow: '0 0 10px rgba(79,172,254,0.6)' }} />
        </div>

        {/* Breakdown Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 12, borderRadius: 6, background: '#00F2FE' }} />
              <span style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>Balanced</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#00F2FE' }}>{workloadBalance.balanced}%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 12, borderRadius: 6, background: '#FF4B72' }} />
              <span style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>Overloaded</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#FF4B72' }}>{workloadBalance.overloaded}%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 12, borderRadius: 6, background: '#4FACFE' }} />
              <span style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>Underutilized</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#4FACFE' }}>{workloadBalance.underutilized}%</span>
          </div>
        </div>
      </div>

      {/* Delivery Risk Heatmap */}
      <div className="glass-card">
        <h3 className="section-title">Delivery risk heatmap</h3>
        <p className="section-subtitle">Where project risk accumulates across weeks.</p>

        <div style={{ marginTop: 12, overflowX: 'auto' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(6, 1fr)', gap: 6, marginBottom: 8, textAlign: 'center' }}>
            <div />
            {riskHeatmap.weeks.map(w => (
              <span key={w} style={{ fontSize: 11, color: '#64748B', fontWeight: 700 }}>{w}</span>
            ))}
          </div>

          {/* Project Matrix Rows */}
          {riskHeatmap.rows.map(row => (
            <div key={row.name} style={{ display: 'grid', gridTemplateColumns: '70px repeat(6, 1fr)', gap: 6, marginBottom: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>{row.name}</span>
              {row.values.map((val, idx) => {
                // Color scaling based on intensity
                let opacity = val / 100;
                let bg = `rgba(0, 242, 254, ${Math.max(0.15, opacity)})`;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.15 }}
                    style={{
                      height: 28,
                      borderRadius: 6,
                      background: bg,
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      boxShadow: val > 70 ? '0 0 10px rgba(0, 242, 254, 0.6)' : 'none',
                      cursor: 'pointer'
                    }}
                    title={`${row.name} - ${riskHeatmap.weeks[idx]}: ${val}% risk score`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Standardized Copyright Notice */}
      <div className="copyright-footer-notice">
        Copyright © 2026 Kaustobh Bhattacharya
      </div>
    </motion.div>
  );
}
