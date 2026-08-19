import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ChevronUp, 
  Plus, 
  CheckSquare, 
  Square 
} from 'lucide-react';

export default function DashboardView({ 
  data, 
  onRebalance, 
  onToggleTask, 
  onAddTask, 
  onOpenAIModal, 
  onOpenActionPlan 
}) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  if (!data) return null;

  const { managerBrief, metrics, aiInsight, teamWorkload, priorityQueue, rebalanced } = data;

  const handleRebalanceClick = async () => {
    await onRebalance();
    setToastMessage(rebalanced ? "Workload reset to default distribution." : "Success! 2 tasks reassigned from Riya to Aman.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim());
    setNewTaskTitle('');
    setShowAddForm(false);
    setToastMessage("New priority task added!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
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
              background: 'rgba(0, 242, 254, 0.95)',
              color: '#031520',
              fontWeight: 700,
              fontSize: 13,
              padding: '10px 20px',
              borderRadius: 20,
              boxShadow: '0 8px 25px rgba(0, 242, 254, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <CheckCircle2 size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manager Brief Card */}
      <div className="glass-card manager-brief-card">
        <div className="brief-meta">{managerBrief.time}</div>
        <h2 className="brief-title">{managerBrief.greeting}</h2>
        <div className="brief-actions">
          <button 
            className="btn-cyan"
            onClick={() => onOpenAIModal("Show critical team risks")}
          >
            Review risks
          </button>
          <button 
            className="btn-outline"
            onClick={onOpenActionPlan}
          >
            Action plan
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="metrics-grid">
        {/* Card 1: Team Utilization */}
        <motion.div whileHover={{ y: -3 }} className="glass-card metric-card">
          <div className="metric-label">{metrics.teamUtilization.label}</div>
          <div className="metric-value-row">
            <span className="metric-value">{metrics.teamUtilization.value}</span>
          </div>
          <div className="metric-change up">
            <TrendingUp size={12} /> {metrics.teamUtilization.change}
          </div>
          <svg className="sparkline-svg" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke="#00F2FE"
              strokeWidth="2.5"
              strokeLinecap="round"
              points="0,25 20,18 40,22 60,12 80,10 100,5"
            />
          </svg>
        </motion.div>

        {/* Card 2: Tasks Today */}
        <motion.div whileHover={{ y: -3 }} className="glass-card metric-card">
          <div className="metric-label">{metrics.tasksToday.label}</div>
          <div className="metric-value-row">
            <span className="metric-value">{metrics.tasksToday.value}</span>
            <span className="metric-sub">{metrics.tasksToday.sub}</span>
          </div>
          <div className="metric-change normal">
            Optimal cadence
          </div>
          <svg className="sparkline-svg" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke="#4FACFE"
              strokeWidth="2.5"
              strokeLinecap="round"
              points="0,20 20,15 40,25 60,18 80,10 100,16"
            />
          </svg>
        </motion.div>

        {/* Card 3: At-Risk */}
        <motion.div whileHover={{ y: -3 }} className="glass-card metric-card">
          <div className="metric-label">{metrics.atRisk.label}</div>
          <div className="metric-value-row">
            <span className="metric-value" style={{ color: metrics.atRisk.value > 2 ? '#FF4B72' : '#FFB800' }}>
              {metrics.atRisk.value}
            </span>
          </div>
          <div className="metric-change down">
            <TrendingDown size={12} /> {metrics.atRisk.change}
          </div>
          <svg className="sparkline-svg" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke="#FF4B72"
              strokeWidth="2.5"
              strokeLinecap="round"
              points="0,8 25,12 50,15 75,22 100,26"
            />
          </svg>
        </motion.div>

        {/* Card 4: Health Score */}
        <motion.div whileHover={{ y: -3 }} className="glass-card metric-card">
          <div className="metric-label">{metrics.healthScore.label}</div>
          <div className="metric-value-row">
            <span className="metric-value">{metrics.healthScore.value}</span>
          </div>
          <div className="metric-change up">
            <TrendingUp size={12} /> {metrics.healthScore.change}
          </div>
          <svg className="sparkline-svg" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke="#38EF7D"
              strokeWidth="2.5"
              strokeLinecap="round"
              points="0,26 25,22 50,18 75,12 100,6"
            />
          </svg>
        </motion.div>
      </div>

      {/* AI Insight Panel */}
      <div className="glass-card">
        <div className="ai-panel-header">{aiInsight.title}</div>
        <h3 className="ai-panel-title">What needs action next</h3>
        <p className="ai-panel-desc">{aiInsight.description}</p>
        
        <div className="ai-alert-row">
          <AlertTriangle size={15} color="#FFB800" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <span className="ai-alert-label risk">Risk cluster</span> · {aiInsight.riskCluster}
          </div>
        </div>

        <div className="ai-alert-row">
          <ChevronUp size={15} color="#00F2FE" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <span className="ai-alert-label recovery">Recovery path</span> · {aiInsight.recoveryPath}
          </div>
        </div>

        <button 
          className="btn-expand-ai"
          onClick={() => onOpenAIModal("Explain AI recovery path details")}
        >
          <Sparkles size={15} />
          Expand AI insight ↗
        </button>
      </div>

      {/* Team Workload Section */}
      <div className="glass-card">
        <h3 className="section-title">Team workload</h3>
        <p className="section-subtitle">Spot overload before it becomes delivery risk.</p>

        {teamWorkload.map((member) => (
          <div key={member.id} className="workload-item">
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-task">
                {member.task} · <strong>{member.loggedHours}h / {member.maxHours}h</strong>
              </div>
            </div>
            <span className={`badge-status ${member.statusType}`}>
              {member.status}
            </span>
          </div>
        ))}

        <button className="btn-rebalance" onClick={handleRebalanceClick}>
          <ChevronUp size={16} />
          {rebalanced ? "↺ Reset workload distribution" : "⌃ Reassign 2 tasks from Riya to Aman."}
        </button>
      </div>

      {/* Priority Queue Section */}
      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <h3 className="section-title">Priority queue</h3>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-main)',
              borderRadius: 20,
              padding: '4px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Plus size={14} /> Add Task
          </button>
        </div>
        <p className="section-subtitle">AI ranked these by delivery impact and risk.</p>

        {showAddForm && (
          <form onSubmit={handleCreateTask} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Enter new priority item..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-light)',
                borderRadius: 10,
                padding: '8px 12px',
                color: '#FFF',
                fontSize: 13,
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-cyan" style={{ padding: '8px 14px', borderRadius: 10 }}>
              Add
            </button>
          </form>
        )}

        {priorityQueue.map((item) => (
          <motion.div
            key={item.id}
            layout
            className={`priority-item ${item.completed ? 'completed' : ''}`}
            onClick={() => onToggleTask(item.id)}
          >
            <div className="priority-icon">
              {item.tag === 'critical' && <span style={{ color: '#FF4B72', fontSize: 16 }}>♦</span>}
              {item.tag === 'warning' && <AlertTriangle size={15} color="#FFB800" />}
              {item.tag === 'opportunity' && <ArrowUpRight size={16} color="#00F2FE" />}
            </div>
            <div className="priority-content">
              <span className={`priority-tag ${item.tag}`}>{item.type}</span>
              <span className="priority-title">· {item.title}</span>
            </div>
            <div className="priority-checkbox">
              {item.completed ? <CheckSquare size={14} /> : <Square size={14} />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Standardized Copyright Notice */}
      <div className="copyright-footer-notice">
        Copyright © 2026 Kaustobh Bhattacharya
      </div>
    </motion.div>
  );
}
