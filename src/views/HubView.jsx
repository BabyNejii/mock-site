import React, { useState, useEffect } from 'react';
import Masthead from '../components/hub/Masthead';
import CompetitionsTable from '../components/hub/CompetitionsTable';
import NationalLedger from '../components/hub/NationalLedger';
import CampusNotice from '../components/hub/CampusNotice';
import { mockNews } from '../data/news';
import { useLanguage } from '../context/useLanguage';

export default function HubView({ onNavigate, onSelectTeam }) {
  const { t } = useLanguage();
  // Target: Security BSides Sofia 2027 CTF
  const targetDate = new Date('2027-03-27T09:00:00Z').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="space-y-6 font-sans">
      {/* Editorial Masthead */}
      <Masthead onNavigate={onNavigate} onSelectTeam={onSelectTeam} timeLeft={timeLeft} />

      {/* Grid: Competitions Schedule + National Ledger */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompetitionsTable onNavigate={onNavigate} />
        <NationalLedger onNavigate={onNavigate} onSelectTeam={onSelectTeam} />
      </section>

      {/* University Campus Initiative */}
      <CampusNotice onNavigate={onNavigate} />

      {/* National Scene Bulletins */}
      <section className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 border-b border-border-default flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-strong">
              {t.hub.newsTitle}
            </h2>
            <p className="text-[11px] text-muted">
              {t.hub.newsSubtitle}
            </p>
          </div>
        </div>

        <div className="divide-y divide-divide">
          {mockNews.map((item) => (
            <div key={item.id} className="py-3.5 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted">
                  {item.date}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-accent bg-accent/10 border border-accent/25">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-strong">
                {item.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
