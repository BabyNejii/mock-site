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
      <section className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 shadow-xs">
        <div className="pb-3 border-b border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#18181b] dark:text-[#ededef]">
              {t.hub.newsTitle}
            </h2>
            <p className="text-[11px] text-[#64646e] dark:text-[#8a8a93]">
              {t.hub.newsSubtitle}
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222632]">
          {mockNews.map((item) => (
            <div key={item.id} className="py-3.5 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#64646e] dark:text-[#8a8a93]">
                  {item.date}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#00966e] bg-[#00966e]/10 border border-[#00966e]/20">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#18181b] dark:text-[#ededef]">
                {item.title}
              </h3>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
