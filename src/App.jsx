import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Home, Users, Search, Sparkles, Smartphone, Monitor } from 'lucide-react';

import SplashLoader from './components/SplashLoader';
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import MeetingView from './components/MeetingView';
import AIAssistantModal from './components/AIAssistantModal';
import ActionPlanModal from './components/ActionPlanModal';
import { apiService } from './services/apiService';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home'); // 'analytics' | 'home' | 'team'
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  // Backend / Service Data State
  const [dashboardData, setDashboardData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiModalPrompt, setAiModalPrompt] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);

  // Load Dashboard Data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const data = await apiService.getDashboard();
    setDashboardData(data);
  };

  // Workload Rebalancing API Trigger
  const handleRebalance = async () => {
    const updatedDashboard = await apiService.rebalanceWorkload();
    setDashboardData({ ...updatedDashboard });
  };

  // Toggle Priority Task Completion
  const handleToggleTask = async (id) => {
    const updatedQueue = await apiService.toggleTask(id);
    setDashboardData(prev => ({
      ...prev,
      priorityQueue: updatedQueue
    }));
  };

  // Add Priority Task
  const handleAddTask = async (title) => {
    const updatedQueue = await apiService.addTask(title);
    setDashboardData(prev => ({
      ...prev,
      priorityQueue: updatedQueue
    }));
  };

  const handleOpenAIModal = (promptText = null) => {
    setAiModalPrompt(promptText);
    setShowAiModal(true);
  };

  // Instant Search Filtering
  const filteredPriorityQueue = dashboardData?.priorityQueue.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWorkload = dashboardData?.teamWorkload.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
      
      {/* Top Floating View Mode Switcher */}
      <div className="mode-switcher">
        <button
          className={`mode-btn ${!isDesktopMode ? 'active' : ''}`}
          onClick={() => setIsDesktopMode(false)}
        >
          <Smartphone size={14} /> Phone View
        </button>
        <button
          className={`mode-btn ${isDesktopMode ? 'active' : ''}`}
          onClick={() => setIsDesktopMode(true)}
        >
          <Monitor size={14} /> Responsive Desktop
        </button>
      </div>

      {/* Main Device Container */}
      <div className={`app-container ${isDesktopMode ? 'desktop-mode' : ''}`}>
        
        {/* Splash Loader Screen */}
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashLoader key="splash" onComplete={() => setShowSplash(false)} />
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              
              {/* Universal Top Header */}
              <div style={{ padding: '16px 20px 8px 20px' }}>
                <header className="app-header">
                  <div className="brand-logo" onClick={() => setShowSplash(true)} style={{ cursor: 'pointer' }} title="Click to view Splash Screen">
                    <div className="brand-icon-box">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <span className="brand-name">PulseHQ</span>
                  </div>

                  {/* Search Bar */}
                  <div className="header-search">
                    <Search size={14} className="search-icon-inside" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search tasks, teammates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Ask AI Badge Button */}
                  <button 
                    className="ask-ai-btn"
                    onClick={() => handleOpenAIModal()}
                  >
                    <Sparkles size={14} /> Ask AI
                  </button>
                </header>

                {/* Instant Search Results Overlay */}
                {searchQuery.trim() !== '' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: '#141C2E',
                      border: '1px solid var(--border-glow)',
                      borderRadius: 16,
                      padding: 12,
                      marginTop: 8,
                      position: 'absolute',
                      left: 20,
                      right: 20,
                      zIndex: 150,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                    }}
                  >
                    <div style={{ fontSize: 11, color: '#00F2FE', fontWeight: 800, marginBottom: 8 }}>INSTANT SEARCH RESULTS</div>
                    
                    {filteredWorkload?.map(m => (
                      <div key={m.id} style={{ fontSize: 13, color: '#FFF', padding: '4px 0' }}>
                        👤 <strong>{m.name}</strong> - {m.task} ({m.loggedHours}h)
                      </div>
                    ))}

                    {filteredPriorityQueue?.map(t => (
                      <div key={t.id} style={{ fontSize: 13, color: '#94A3B8', padding: '4px 0' }}>
                        ♦ {t.type}: <strong>{t.title}</strong>
                      </div>
                    ))}

                    {(!filteredWorkload?.length && !filteredPriorityQueue?.length) && (
                      <div style={{ fontSize: 12, color: '#64748B' }}>No matching tasks or teammates found.</div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Main Screen Views */}
              <div className="screen-wrapper">
                {activeTab === 'home' && dashboardData && (
                  <DashboardView
                    data={dashboardData}
                    onRebalance={handleRebalance}
                    onToggleTask={handleToggleTask}
                    onAddTask={handleAddTask}
                    onOpenAIModal={handleOpenAIModal}
                    onOpenActionPlan={() => setShowActionPlan(true)}
                  />
                )}

                {activeTab === 'analytics' && (
                  <AnalyticsView onOpenAIModal={handleOpenAIModal} />
                )}

                {activeTab === 'team' && (
                  <MeetingView onOpenAIModal={handleOpenAIModal} />
                )}
              </div>

              {/* Bottom Navigation Bar with Dynamic Neon Aesthetics */}
              <nav className="bottom-nav">
                {/* Analytics Tab (Cyan Neon Aesthetic) */}
                <button
                  className={`nav-item analytics-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 size={20} />
                  <span>Analytics</span>
                </button>

                {/* Home Tab */}
                <button
                  className={`nav-item home-tab ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home size={20} />
                  <span>Home</span>
                </button>

                {/* Team Tab (Purple Neon Aesthetic) */}
                <button
                  className={`nav-item team-tab ${activeTab === 'team' ? 'active' : ''}`}
                  onClick={() => setActiveTab('team')}
                >
                  <Users size={20} />
                  <span>Team</span>
                </button>

                {/* Dynamic Neon Active Indicator Line */}
                <div className={`nav-indicator-bar ${activeTab}`} />
              </nav>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Modals */}
        {showAiModal && (
          <AIAssistantModal
            initialPrompt={aiModalPrompt}
            onClose={() => setShowAiModal(false)}
          />
        )}

        {showActionPlan && dashboardData && (
          <ActionPlanModal
            steps={dashboardData.managerBrief.actionPlanSteps}
            onClose={() => setShowActionPlan(false)}
            onExecuteRebalance={handleRebalance}
          />
        )}

      </div>
    </div>
  );
}
