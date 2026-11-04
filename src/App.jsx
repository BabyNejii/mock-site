import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HubView from './views/HubView';
import CalendarView from './views/CalendarView';
import LeaderboardView from './views/LeaderboardView';
import WriteupsView from './views/WriteupsView';
import LfgView from './views/LfgView';
import OnboardingView from './views/OnboardingView';
import TalentView from './views/TalentView';

// Modals
import RegisterTeamModal from './components/modals/RegisterTeamModal';
import PostLfgModal from './components/modals/PostLfgModal';
import WriteupDetailModal from './components/modals/WriteupDetailModal';
import TeamDetailModal from './components/modals/TeamDetailModal';

// Initial Data
import { mockTeams } from './data/teams';
import { mockLfgPosts } from './data/lfg';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('ctf_theme');
    if (saved) return saved === 'dark';
    return false; // Default to light mode as requested
  });

  const [teams, setTeams] = useState(mockTeams);
  const [lfgPosts, setLfgPosts] = useState(mockLfgPosts);

  // Modals
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedWriteup, setSelectedWriteup] = useState(null);
  const [isRegisterTeamOpen, setIsRegisterTeamOpen] = useState(false);
  const [isPostLfgOpen, setIsPostLfgOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ctf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ctf_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleRegisterSuccess = (newTeam) => {
    setTeams(prev => [...prev, newTeam]);
    showToast(`Team "${newTeam.name}" registered in the Bulgarian directory.`);
  };

  const handlePostLfgSuccess = (newPost) => {
    setLfgPosts(prev => [newPost, ...prev]);
    showToast('Post published to Team Finder board.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-strong font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border-default bg-elevated text-strong text-sm font-medium shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Masthead */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenRegisterTeam={() => setIsRegisterTeamOpen(true)}
      />

      {/* Primary Workspace */}
      <main className="grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'hub' && (
          <HubView 
            onNavigate={setActiveTab}
            onSelectTeam={setSelectedTeam}
          />
        )}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            teams={teams}
            onSelectTeam={setSelectedTeam}
            onOpenRegisterTeam={() => setIsRegisterTeamOpen(true)}
          />
        )}
        {activeTab === 'lfg' && (
          <LfgView
            lfgPosts={lfgPosts}
            onOpenPostLfg={() => setIsPostLfgOpen(true)}
          />
        )}
        {activeTab === 'writeups' && (
          <WriteupsView
            onSelectWriteup={setSelectedWriteup}
          />
        )}
        {activeTab === 'onboarding' && <OnboardingView />}
        {activeTab === 'talent' && <TalentView />}
      </main>

      {/* Technical Colophon Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Modals */}
      <RegisterTeamModal
        isOpen={isRegisterTeamOpen}
        onClose={() => setIsRegisterTeamOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      <PostLfgModal
        isOpen={isPostLfgOpen}
        onClose={() => setIsPostLfgOpen(false)}
        onPostSuccess={handlePostLfgSuccess}
      />

      <WriteupDetailModal
        writeup={selectedWriteup}
        onClose={() => setSelectedWriteup(null)}
      />

      <TeamDetailModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </div>
  );
}
