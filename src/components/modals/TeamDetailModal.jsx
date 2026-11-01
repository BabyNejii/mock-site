import React from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function TeamDetailModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-lg border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-[#e4e4e7] dark:border-[#242428]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#18181b] dark:text-[#ededef]">
                #{team.rank} {team.name}
              </span>
              <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93]">
                #{team.ctftimeId}
              </span>
            </div>
            <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-0.5">
              {team.affiliation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded border border-[#e4e4e7] dark:border-[#242428] hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="p-3 rounded border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5]/50 dark:bg-[#0c0c0e]/50 text-center">
            <span className="block text-[11px] text-[#64646e] dark:text-[#8a8a93] font-medium">2024 Points</span>
            <span className="font-mono font-bold text-base text-[#00966e]">
              {team.points2024 ? team.points2024.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="p-3 rounded border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5]/50 dark:bg-[#0c0c0e]/50 text-center">
            <span className="block text-[11px] text-[#64646e] dark:text-[#8a8a93] font-medium">Events Played</span>
            <span className="font-mono font-bold text-base text-[#18181b] dark:text-[#ededef]">
              {team.eventsPlayed2024 || '0'}
            </span>
          </div>
          <div className="p-3 rounded border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5]/50 dark:bg-[#0c0c0e]/50 text-center">
            <span className="block text-[11px] text-[#64646e] dark:text-[#8a8a93] font-medium">World Rank</span>
            <span className="font-mono font-bold text-base text-[#18181b] dark:text-[#ededef]">
              #{team.globalRank || '—'}
            </span>
          </div>
        </div>

        {/* Squad Bio */}
        <div className="my-3">
          <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1">
            Squad Profile
          </span>
          <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed rounded border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5]/30 dark:bg-[#0c0c0e]/30 p-3">
            {team.bio}
          </p>
        </div>

        {/* Specialties */}
        {team.specialties && (
          <div className="mb-3.5">
            <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1.5">
              Focus Tracks
            </span>
            <div className="flex flex-wrap gap-1.5">
              {team.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-[#00966e]/10 text-[#00966e] border border-[#00966e]/20"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notable Achievements */}
        {team.recentAchievements && (
          <div className="mb-4">
            <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1.5">
              Verified Highlights
            </span>
            <ul className="space-y-1 text-xs text-[#64646e] dark:text-[#8a8a93]">
              {team.recentAchievements.map((ach, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00966e]" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3.5 border-t border-[#e4e4e7] dark:border-[#242428] flex items-center justify-between text-xs">
          <a
            href={`https://ctftime.org/team/${team.ctftimeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[#00966e] hover:underline font-semibold"
          >
            <span>CTFtime Squad Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#18181b] hover:bg-black dark:bg-[#ededef] dark:hover:bg-white text-white dark:text-[#0c0c0e] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
