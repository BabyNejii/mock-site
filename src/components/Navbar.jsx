import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Plus } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDark, toggleTheme, onOpenRegisterTeam }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Hub' },
    { id: 'calendar', label: 'Events' },
    { id: 'leaderboard', label: 'Standings' },
    { id: 'lfg', label: 'Team Finder' },
    { id: 'writeups', label: 'Writeups' },
    { id: 'onboarding', label: 'Get Started' },
    { id: 'talent', label: 'Careers' },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e4e4e7] dark:border-[#242428] bg-white/95 dark:bg-[#0c0c0e]/95 backdrop-blur-md transition-colors">
      {/* Bulgarian Tricolor Micro Ribbon */}
      <div className="h-[2px] w-full flex">
        <div className="w-1/3 bg-white dark:bg-[#ededef]" />
        <div className="w-1/3 bg-[#00966e]" />
        <div className="w-1/3 bg-[#d62626]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Handcrafted, uniform text, no single-word colored span */}
          <button
            onClick={() => handleTabClick('hub')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base tracking-tight text-[#18181b] dark:text-[#ededef]">
                ctf.bg
              </span>
              <span className="text-[11px] font-medium text-[#64646e] dark:text-[#8a8a93] hidden sm:inline">
                Bulgarian CTF Registry
              </span>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0c0e]'
                      : 'text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] hover:bg-[#f3f3f5] dark:hover:bg-[#131315]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md border border-[#e4e4e7] dark:border-[#242428] text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] hover:bg-[#f3f3f5] dark:hover:bg-[#131315] transition-colors cursor-pointer"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#18181b]" />}
            </button>

            {/* Register Team Button */}
            <button
              onClick={onOpenRegisterTeam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00966e] hover:bg-[#00825f] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Team</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md border border-[#e4e4e7] dark:border-[#242428] text-[#64646e] dark:text-[#8a8a93] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#0c0c0e] px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0c0e]'
                    : 'text-[#64646e] dark:text-[#8a8a93] hover:bg-[#f3f3f5] dark:hover:bg-[#131315]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
