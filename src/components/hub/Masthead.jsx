import React from 'react';
import { Trophy, Users, Calendar, ShieldCheck, ExternalLink, MapPin, ArrowRight } from 'lucide-react';
import { mockTeams } from '../../data/teams';

export default function Masthead({ onNavigate, onSelectTeam, timeLeft }) {
  const perperikon = mockTeams.find((t) => t.id === 'perperikon');

  const handleSelectPerperikon = () => {
    if (onSelectTeam && perperikon) {
      onSelectTeam(perperikon);
    } else {
      onNavigate('leaderboard');
    }
  };

  return (
    <section className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] shadow-xs overflow-hidden transition-colors">
      {/* Top Hero: Identity, Description, and Key Directives */}
      <div className="p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00966e]" />
            <span className="text-xs font-medium text-[#64646e] dark:text-[#8a8a93]">
              Sofia, Bulgaria • Official CTFtime & Collegiate Circuit
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#18181b] dark:text-[#ededef] leading-tight">
            The Bulgarian Competitive Cybersecurity Registry
          </h1>

          <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed max-w-2xl">
            Tracking domestic squads on CTFtime, coordinating student varsity rosters across Sofia University (FMI), TU Sofia, and UNWE, and spotlighting European qualifiers like ECSC.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            onClick={() => onNavigate('leaderboard')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#18181b] hover:bg-black dark:bg-[#ededef] dark:hover:bg-white text-white dark:text-[#0c0e12] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>National Standings</span>
          </button>

          <button
            onClick={() => onNavigate('lfg')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#e4e4e7] dark:border-[#222632] bg-transparent hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] text-[#18181b] dark:text-[#ededef] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5 text-[#00966e]" />
            <span>Team Finder</span>
          </button>

          <button
            onClick={() => onNavigate('calendar')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#e4e4e7] dark:border-[#222632] bg-transparent hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] text-[#18181b] dark:text-[#ededef] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#64646e] dark:text-[#8a8a93]" />
            <span>Events Calendar</span>
          </button>
        </div>
      </div>

      {/* 3 Authentic Spotlight Cards / Metric Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] dark:divide-[#222632] border-t border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117]">
        {/* Spotlight 1: National #1 Squad */}
        <div
          onClick={handleSelectPerperikon}
          className="p-5 sm:p-6 space-y-3 hover:bg-[#f3f3f5] dark:hover:bg-[#141822] transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-semibold text-[#00966e] uppercase tracking-wide flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#00966e]" />
                National #1 Squad
              </span>
              <span className="font-mono text-[11px] text-[#64646e] dark:text-[#8a8a93]">
                #194263
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors">
                  Perperikon
                </h3>
                <span className="text-xs font-mono font-medium text-[#64646e] dark:text-[#8a8a93]">
                  CTFtime World #74
                </span>
              </div>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-1 leading-relaxed">
                Bulgaria’s top-ranked independent team. Advanced binary exploitation and cryptography.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-sm font-bold text-[#18181b] dark:text-[#ededef] tabular-nums">
                373.73
              </span>
              <span className="text-[11px] text-[#64646e] dark:text-[#8a8a93]">points</span>
            </div>
            <span className="text-xs text-[#00966e] font-medium flex items-center gap-1 group-hover:underline">
              <span>View squad</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Spotlight 2: European Representation */}
        <div className="p-5 sm:p-6 space-y-3 hover:bg-[#f3f3f5] dark:hover:bg-[#141822] transition-colors flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-semibold text-[#00966e] uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00966e]" />
                European Representation
              </span>
              <span className="font-mono text-[11px] text-[#64646e] dark:text-[#8a8a93]">
                ECSC 2026/2027
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef]">
                Team Bulgaria
              </h3>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-1 leading-relaxed">
                Official national squad selected annually via Cybersecurity Challenge Bulgaria for competitors aged 16–25.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93]">
              ecsc-bg.eu
            </span>
            <a
              href="https://ecsc-bg.eu"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#00966e] hover:underline font-medium flex items-center gap-1"
            >
              <span>National Qualifiers</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Spotlight 3: Domestic Flagship */}
        <div
          onClick={() => onNavigate('calendar')}
          className="p-5 sm:p-6 space-y-3 hover:bg-[#f3f3f5] dark:hover:bg-[#141822] transition-colors cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] font-semibold text-[#00966e] uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00966e]" />
                Domestic Flagship
              </span>
              <span className="font-mono font-medium text-[11px] text-[#00966e] bg-[#00966e]/10 px-1.5 py-0.5 rounded border border-[#00966e]/20">
                {timeLeft.days}d {timeLeft.hours}h left
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors">
                Security BSides Sofia 2027
              </h3>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-1 leading-relaxed">
                Sofia Tech Park (John Atanasoff Forum). On-site jeopardy, badge hacking, and hardware village.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93]">
              March 27–28, 2027
            </span>
            <span className="text-xs text-[#00966e] font-medium flex items-center gap-1 group-hover:underline">
              <span>View event details</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
