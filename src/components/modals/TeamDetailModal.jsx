import React from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function TeamDetailModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border-default bg-elevated p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-divide">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-strong">
                #{team.rank} {team.name}
              </span>
              <span className="text-xs font-mono text-muted">
                #{team.ctftimeId}
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              {team.affiliation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-border-default hover:bg-surface text-muted hover:text-strong transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <div className="p-3 rounded-lg border border-border-default bg-surface/50 text-center">
            <span className="block text-[11px] text-muted font-medium">2024 Points</span>
            <span className="font-mono font-bold text-base text-accent">
              {team.points2024 ? team.points2024.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="p-3 rounded-lg border border-border-default bg-surface/50 text-center">
            <span className="block text-[11px] text-muted font-medium">Events Played</span>
            <span className="font-mono font-bold text-base text-strong">
              {team.eventsPlayed2024 || '0'}
            </span>
          </div>
          <div className="p-3 rounded-lg border border-border-default bg-surface/50 text-center">
            <span className="block text-[11px] text-muted font-medium">World Rank</span>
            <span className="font-mono font-bold text-base text-strong">
              #{team.globalRank || '—'}
            </span>
          </div>
        </div>

        {/* Squad Bio */}
        <div className="my-3">
          <span className="text-xs font-semibold text-strong block mb-1">
            Squad Profile
          </span>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed rounded-lg border border-border-default bg-surface/30 p-3">
            {team.bio}
          </p>
        </div>

        {/* Specialties */}
        {team.specialties && (
          <div className="mb-3.5">
            <span className="text-xs font-semibold text-strong block mb-1.5">
              Focus Tracks
            </span>
            <div className="flex flex-wrap gap-1.5">
              {team.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-lg text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/20"
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
            <span className="text-xs font-semibold text-strong block mb-1.5">
              Verified Highlights
            </span>
            <ul className="space-y-1 text-xs text-secondary">
              {team.recentAchievements.map((ach, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3.5 border-t border-divide flex items-center justify-between text-xs">
          <a
            href={`https://ctftime.org/team/${team.ctftimeId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:underline font-semibold"
          >
            <span>CTFtime Squad Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-on-accent font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
