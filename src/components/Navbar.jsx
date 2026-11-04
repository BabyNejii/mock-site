import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Plus } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export default function Navbar({ activeTab, setActiveTab, isDark, toggleTheme, onOpenRegisterTeam }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navItems = [
    { id: 'hub', label: t.nav.hub },
    { id: 'calendar', label: t.nav.calendar },
    { id: 'leaderboard', label: t.nav.leaderboard },
    { id: 'lfg', label: t.nav.lfg },
    { id: 'writeups', label: t.nav.writeups },
    { id: 'onboarding', label: t.nav.onboarding },
    { id: 'talent', label: t.nav.talent },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-default bg-page/80 backdrop-blur-xl">
      {/* Bulgarian tricolor hairline — subtle national nod */}
      <div className="flex h-[2px] w-full">
        <div className="w-1/3 bg-strong/15" />
        <div className="w-1/3 bg-accent" />
        <div className="w-1/3 bg-highlight" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleTabClick('hub')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-strong">
                ctf.bg
              </span>
              <span className="text-xs font-medium text-muted hidden sm:inline">
                {t.nav.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-0.5 px-4">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-accent/12 text-accent'
                      : 'text-secondary hover:text-strong hover:bg-elevated'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Language Toggle Switch (Bulgarian default) */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="px-2 py-1.5 rounded-lg border border-border-default text-xs font-mono font-semibold hover:border-border-strong hover:bg-elevated transition-colors cursor-pointer flex items-center gap-1"
              title={lang === 'bg' ? 'Switch to English' : 'Превключи на Български'}
            >
              <span className={lang === 'bg' ? 'text-accent font-bold' : 'text-muted'}>
                BG
              </span>
              <span className="text-border-strong text-[10px]">/</span>
              <span className={lang === 'en' ? 'text-accent font-bold' : 'text-muted'}>
                EN
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-border-default text-secondary hover:text-strong hover:border-border-strong hover:bg-elevated transition-colors cursor-pointer"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Register Team Button */}
            <button
              onClick={onOpenRegisterTeam}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.registerTeam}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-border-default text-secondary cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-default bg-page px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-accent/12 text-accent'
                    : 'text-secondary hover:bg-elevated'
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
