import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Plus, 
  Search, 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  Sparkles, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function MeetingView({ onOpenAIModal }) {
  // Team Roster State with Initial Production Data
  const [teamMembers, setTeamMembers] = useState([
    { 
      id: "riya", 
      name: "Riya S.", 
      role: "Senior Frontend Lead", 
      email: "riya@pulsehq.io", 
      status: "Overloaded", 
      statusType: "danger",
      task: "Payments redesign", 
      loggedHours: 34, 
      maxHours: 30, 
      skills: ["React", "TypeScript", "UI Architecture"]
    },
    { 
      id: "aman", 
      name: "Aman K.", 
      role: "Backend Architect", 
      email: "aman@pulsehq.io", 
      status: "On track", 
      statusType: "success",
      task: "API integration", 
      loggedHours: 22, 
      maxHours: 30, 
      skills: ["Node.js", "Express", "REST APIs"]
    },
    { 
      id: "priya", 
      name: "Priya T.", 
      role: "Product Designer", 
      email: "priya@pulsehq.io", 
      status: "Watch", 
      statusType: "warning",
      task: "Sprint review prep", 
      loggedHours: 28, 
      maxHours: 30, 
      skills: ["Figma", "Design Systems", "User Research"]
    }
  ]);

  // UI Control States
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All'); // 'All' | 'Frontend' | 'Backend' | 'Design'
  const [activeModal, setActiveModal] = useState(null); // 'addMember' | 'editMember' | 'scheduleSync' | 'reassignTasks'
  const [selectedMember, setSelectedMember] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Form States for Add/Edit Teammate
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMaxHours, setFormMaxHours] = useState(30);
  const [formSkills, setFormSkills] = useState('');
  const [formError, setFormError] = useState('');

  // 1:1 Sync Scheduler States
  const [syncAgenda, setSyncAgenda] = useState('Sprint Rebalancing & Blockers');
  const [syncDate, setSyncDate] = useState('Tomorrow at 10:00 AM');

  // Trigger Toast Notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Team Members based on Search & Role Filter
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.task.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = roleFilter === 'All' || 
        (roleFilter === 'Frontend' && member.role.toLowerCase().includes('frontend')) ||
        (roleFilter === 'Backend' && member.role.toLowerCase().includes('backend')) ||
        (roleFilter === 'Design' && member.role.toLowerCase().includes('design'));

      return matchesSearch && matchesRole;
    });
  }, [teamMembers, searchQuery, roleFilter]);

  // Squad Summary Aggregates
  const totalCapacity = useMemo(() => teamMembers.reduce((acc, m) => acc + m.maxHours, 0), [teamMembers]);
  const totalLogged = useMemo(() => teamMembers.reduce((acc, m) => acc + m.loggedHours, 0), [teamMembers]);
  const overloadedCount = useMemo(() => teamMembers.filter(m => m.loggedHours > m.maxHours).length, [teamMembers]);

  // Open Modal Handlers
  const openAddMemberModal = () => {
    setFormName('');
    setFormRole('Frontend Engineer');
    setFormEmail('');
    setFormMaxHours(30);
    setFormSkills('React, TypeScript');
    setFormError('');
    setActiveModal('addMember');
  };

  const openEditMemberModal = (member) => {
    setSelectedMember(member);
    setFormName(member.name);
    setFormRole(member.role);
    setFormEmail(member.email);
    setFormMaxHours(member.maxHours);
    setFormSkills(member.skills.join(', '));
    setFormError('');
    setActiveModal('editMember');
  };

  const openSyncModal = (member) => {
    setSelectedMember(member);
    setActiveModal('scheduleSync');
  };

  // Submit Add/Edit Member
  const handleSaveMember = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      setFormError('Please enter member name and valid email.');
      return;
    }

    const skillsArray = formSkills.split(',').map(s => s.trim()).filter(Boolean);

    if (activeModal === 'addMember') {
      const newMember = {
        id: `mem-${Date.now()}`,
        name: formName.trim(),
        role: formRole.trim() || "Engineer",
        email: formEmail.trim(),
        status: "On track",
        statusType: "success",
        task: "Sprint onboard backlog",
        loggedHours: 0,
        maxHours: Number(formMaxHours) || 30,
        skills: skillsArray.length ? skillsArray : ["React", "JavaScript"]
      };
      setTeamMembers(prev => [...prev, newMember]);
      triggerToast(`Teammate ${newMember.name} invited to workspace!`);
    } else if (activeModal === 'editMember' && selectedMember) {
      setTeamMembers(prev => prev.map(m => {
        if (m.id === selectedMember.id) {
          const logged = m.loggedHours;
          const max = Number(formMaxHours) || 30;
          let status = "On track";
          let statusType = "success";
          if (logged > max) {
            status = "Overloaded";
            statusType = "danger";
          } else if (logged > max * 0.85) {
            status = "Watch";
            statusType = "warning";
          }

          return {
            ...m,
            name: formName.trim(),
            role: formRole.trim(),
            email: formEmail.trim(),
            maxHours: max,
            skills: skillsArray,
            status,
            statusType
          };
        }
        return m;
      }));
      triggerToast(`Updated profile details for ${formName.trim()}.`);
    }
    setActiveModal(null);
  };

  // Handle Member Deletion (with Edge Case Protection)
  const handleDeleteMember = (member) => {
    if (member.loggedHours > 0) {
      triggerToast(`⚠️ Cannot delete ${member.name} with ${member.loggedHours}h active workload. Reassign tasks first.`);
      return;
    }
    setTeamMembers(prev => prev.filter(m => m.id !== member.id));
    triggerToast(`Teammate ${member.name} removed from squad.`);
    setActiveModal(null);
  };

  // Schedule 1:1 Meeting Handler
  const handleConfirmSync = () => {
    if (!selectedMember) return;
    triggerToast(`1:1 Sync scheduled with ${selectedMember.name} (${syncDate})! Invite sent.`);
    setActiveModal(null);
  };

  // Quick Action Rebalance for Single Overloaded Member
  const handleQuickRebalanceMember = (member) => {
    if (member.loggedHours <= member.maxHours) {
      triggerToast(`${member.name} is already within capacity limit.`);
      return;
    }

    // Find available team member with capacity
    const recipient = teamMembers.find(m => m.id !== member.id && m.loggedHours < m.maxHours);
    if (!recipient) {
      triggerToast(`⚠️ No available squad members with free capacity to absorb tasks.`);
      return;
    }

    setTeamMembers(prev => prev.map(m => {
      if (m.id === member.id) {
        return { ...m, loggedHours: m.loggedHours - 6, status: "On track", statusType: "success" };
      }
      if (m.id === recipient.id) {
        return { ...m, loggedHours: m.loggedHours + 6, task: `${m.task} + Reassigned Task` };
      }
      return m;
    }));

    triggerToast(`Success! Reassigned 6h workload from ${member.name} to ${recipient.name}.`);
  };

  // Export Squad Status Report
  const handleExportReport = () => {
    const reportText = `PulseHQ Squad Report | Headcount: ${teamMembers.length} | Load: ${totalLogged}h/${totalCapacity}h (${Math.round((totalLogged/totalCapacity)*100)}%)`;
    navigator.clipboard.writeText(reportText);
    triggerToast(`📋 Squad Status Report copied to clipboard!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="team-theme"
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
    >
      {/* Dynamic Toast Notification */}
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
              background: 'rgba(217, 70, 239, 0.95)',
              color: '#FFF',
              fontWeight: 700,
              fontSize: 13,
              padding: '10px 20px',
              borderRadius: 20,
              boxShadow: '0 8px 25px rgba(217, 70, 239, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              maxWidth: '90%'
            }}
          >
            <CheckCircle2 size={16} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Squad Operations Header Card */}
      <div className="glass-card team-header-card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#D946EF', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <Sparkles size={14} /> Squad Operations & Strategy
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFF', marginTop: 4 }}>
              Team Hub
            </h1>
          </div>

          <button
            onClick={handleExportReport}
            style={{
              background: 'rgba(217, 70, 239, 0.12)',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              color: '#D946EF',
              fontSize: 12,
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Download size={13} /> Export Report
          </button>
        </div>

        {/* 3 Squad Stat Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px', borderRadius: 14, border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Active Squad</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FFF', marginTop: 2 }}>{teamMembers.length} Members</div>
            <div style={{ fontSize: 11, color: '#D946EF', marginTop: 4 }}>100% Onboarded</div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px', borderRadius: 14, border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Sprint Capacity</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FFF', marginTop: 2 }}>
              {totalLogged}h <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>/ {totalCapacity}h</span>
            </div>
            <div style={{ fontSize: 11, color: totalLogged > totalCapacity ? '#FF4B72' : '#00E676', marginTop: 4 }}>
              {Math.round((totalLogged / totalCapacity) * 100)}% Load Pressure
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px', borderRadius: 14, border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Squad Health</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: overloadedCount > 0 ? '#FFB800' : '#00E676', marginTop: 2 }}>
              {overloadedCount > 0 ? 'Watch' : 'Optimal'}
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
              {overloadedCount} Overload Alert{overloadedCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Squad Alerts & Action Card (Edge Case Guard) */}
      {overloadedCount > 0 && (
        <div style={{ background: 'linear-gradient(135deg, rgba(255, 75, 114, 0.12), rgba(217, 70, 239, 0.08))', border: '1px solid rgba(255, 75, 114, 0.3)', borderRadius: 18, padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle color="#FF4B72" size={18} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#FFF' }}>
                  Workload Pressure Warning
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>
                  Riya S. is logged at 34h/30h. Rebalancing will protect sprint delivery.
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenAIModal("Rebalance squad workload now")}
              className="purple-btn"
              style={{ padding: '6px 12px', fontSize: 12, whiteSpace: 'nowrap' }}
            >
              Resolve Alert ↗
            </button>
          </div>
        </div>
      )}

      {/* Team Directory Container */}
      <div className="glass-card" style={{ borderColor: 'rgba(217, 70, 239, 0.3)' }}>
        
        {/* Directory Controls Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 className="section-title" style={{ color: '#D946EF' }}>Team Roster</h3>
              <p className="section-subtitle">Sprint capacity, role skills, and 1:1 sync status</p>
            </div>
            <button 
              className="purple-btn"
              style={{ padding: '8px 14px', fontSize: 12 }}
              onClick={openAddMemberModal}
            >
              <Plus size={14} /> Add Teammate
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {/* Search Input */}
            <div style={{ flex: 1, minWidth: 160, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Filter teammates, roles, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 14,
                  padding: '8px 12px 8px 34px',
                  color: '#FFF',
                  fontSize: 12,
                  outline: 'none'
                }}
              />
            </div>

            {/* Role Filter Chips */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['All', 'Frontend', 'Backend', 'Design'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  style={{
                    background: roleFilter === role ? '#D946EF' : 'rgba(255,255,255,0.05)',
                    color: roleFilter === role ? '#FFF' : '#94A3B8',
                    border: '1px solid',
                    borderColor: roleFilter === role ? '#D946EF' : 'var(--border-light)',
                    borderRadius: 14,
                    padding: '6px 12px',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Member Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredMembers.map(m => {
            const loadPercent = Math.min(100, Math.round((m.loggedHours / m.maxHours) * 100));
            return (
              <motion.div
                key={m.id}
                layout
                style={{
                  padding: '14px',
                  background: 'rgba(217, 70, 239, 0.04)',
                  border: '1px solid rgba(217, 70, 239, 0.15)',
                  borderRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                {/* Top Member Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div 
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #D946EF 0%, #A855F7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        color: '#FFF',
                        fontSize: 15,
                        boxShadow: '0 0 12px rgba(217, 70, 239, 0.4)'
                      }}
                    >
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#FFF', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {m.name}
                        <span className={`badge-status ${m.statusType}`} style={{ fontSize: 10, padding: '2px 8px' }}>
                          {m.status}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{m.role} · <span style={{ color: '#64748B' }}>{m.email}</span></div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    {m.loggedHours > m.maxHours && (
                      <button
                        onClick={() => handleQuickRebalanceMember(m)}
                        title="Rebalance 6h overload"
                        style={{
                          background: 'rgba(255, 75, 114, 0.15)',
                          border: '1px solid rgba(255, 75, 114, 0.3)',
                          color: '#FF4B72',
                          borderRadius: 12,
                          padding: '6px 10px',
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        <RefreshCw size={12} /> Rebalance
                      </button>
                    )}

                    <button
                      onClick={() => openSyncModal(m)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        borderRadius: 12,
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

                    <button
                      onClick={() => openEditMemberModal(m)}
                      title="Edit Teammate Profile"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-light)',
                        color: '#94A3B8',
                        borderRadius: 12,
                        padding: '6px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={13} />
                    </button>
                  </div>
                </div>

                {/* Workload Capacity Progress Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>
                    <span>Active Focus: <strong style={{ color: '#FFF' }}>{m.task}</strong></span>
                    <span><strong>{m.loggedHours}h</strong> / {m.maxHours}h ({loadPercent}%)</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 10, background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div 
                      style={{
                        width: `${loadPercent}%`,
                        height: '100%',
                        borderRadius: 10,
                        background: m.loggedHours > m.maxHours 
                          ? 'linear-gradient(90deg, #FF4B72, #FF7597)' 
                          : 'linear-gradient(90deg, #D946EF, #A855F7)',
                        boxShadow: m.loggedHours > m.maxHours 
                          ? '0 0 8px rgba(255, 75, 114, 0.6)' 
                          : '0 0 8px rgba(217, 70, 239, 0.5)',
                        transition: 'all 0.35s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Skill Chips */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {m.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#94A3B8',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 10
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Edge Case 1: Empty Search/Filter State */}
          {filteredMembers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 16, border: '1px dashed var(--border-light)' }}>
              <Users size={32} color="#64748B" style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF' }}>No Teammates Match Filter</div>
              <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, marginBottom: 14 }}>
                Try adjusting your search terms or clearing the role filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setRoleFilter('All'); }}
                style={{
                  background: 'rgba(217, 70, 239, 0.15)',
                  border: '1px solid #D946EF',
                  color: '#D946EF',
                  borderRadius: 14,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
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

              {/* Modal 1: Add or Edit Teammate Form */}
              {(activeModal === 'addMember' || activeModal === 'editMember') && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#D946EF', marginBottom: 6 }}>
                    {activeModal === 'addMember' ? 'Invite Squad Teammate' : 'Edit Teammate Profile'}
                  </h3>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
                    Set role parameters, max sprint capacity, and primary technical skill tags.
                  </p>

                  {formError && (
                    <div style={{ color: '#FF4B72', fontSize: 12, marginBottom: 10, fontWeight: 600 }}>
                      ⚠️ {formError}
                    </div>
                  )}

                  <form onSubmit={handleSaveMember} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                        FULL NAME
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sarah M." 
                        value={formName} 
                        onChange={e => setFormName(e.target.value)}
                        style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                        ROLE / TITLE
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. Senior Frontend Engineer" 
                        value={formRole} 
                        onChange={e => setFormRole(e.target.value)}
                        style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }} 
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
                      <div>
                        <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                          EMAIL ADDRESS
                        </label>
                        <input 
                          type="email" 
                          placeholder="name@pulsehq.io" 
                          value={formEmail} 
                          onChange={e => setFormEmail(e.target.value)}
                          style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }} 
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                          MAX HOURS
                        </label>
                        <input 
                          type="number" 
                          placeholder="30" 
                          value={formMaxHours} 
                          onChange={e => setFormMaxHours(e.target.value)}
                          style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }} 
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                        TECHNICAL SKILL TAGS (Comma separated)
                      </label>
                      <input 
                        type="text" 
                        placeholder="React, TypeScript, GraphQL" 
                        value={formSkills} 
                        onChange={e => setFormSkills(e.target.value)}
                        style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      <button type="submit" className="purple-btn" style={{ flex: 1, padding: 12 }}>
                        {activeModal === 'addMember' ? 'Save & Invite Teammate' : 'Save Changes'}
                      </button>

                      {activeModal === 'editMember' && selectedMember && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(selectedMember)}
                          style={{
                            background: 'rgba(255, 75, 114, 0.15)',
                            border: '1px solid rgba(255, 75, 114, 0.3)',
                            color: '#FF4B72',
                            borderRadius: 14,
                            padding: '12px 14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <Trash2 size={15} /> Remove
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Modal 2: 1:1 Sync Scheduler */}
              {activeModal === 'scheduleSync' && selectedMember && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#D946EF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#FFF' }}>
                      {selectedMember.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF' }}>
                        Schedule 1:1 Sync with {selectedMember.name}
                      </h3>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>{selectedMember.role} · {selectedMember.email}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '12px 0 16px 0' }}>
                    Select agenda focus and dispatch automated calendar invite with pre-filled sprint context.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                        AGENDA FOCUS
                      </label>
                      <select
                        value={syncAgenda}
                        onChange={e => setSyncAgenda(e.target.value)}
                        style={{ width: '100%', padding: 10, borderRadius: 10, background: '#18233A', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }}
                      >
                        <option value="Sprint Rebalancing & Blockers">Sprint Rebalancing & Blockers</option>
                        <option value="Career Growth & 1:1 Retro">Career Growth & 1:1 Retro</option>
                        <option value="Architecture Sign-off Checkpoint">Architecture Sign-off Checkpoint</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                        PROPOSED TIME
                      </label>
                      <input
                        type="text"
                        value={syncDate}
                        onChange={e => setSyncDate(e.target.value)}
                        style={{ width: '100%', padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-light)', color: '#FFF', outline: 'none' }}
                      />
                    </div>

                    <div style={{ background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: 12, borderRadius: 12, marginTop: 4 }}>
                      <div style={{ fontSize: 11, color: '#00F2FE', fontWeight: 700, marginBottom: 4 }}>AUTOMATED CONTEXT ATTACHED</div>
                      <div style={{ fontSize: 12, color: '#94A3B8' }}>
                        - Active Task: {selectedMember.task}<br />
                        - Current Load: {selectedMember.loggedHours}h / {selectedMember.maxHours}h ({selectedMember.status})
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmSync}
                      className="purple-btn"
                      style={{ padding: 12, marginTop: 6 }}
                    >
                      Dispatch Calendar Invite ↗
                    </button>
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
