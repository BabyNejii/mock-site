import React from 'react';
import { Trophy, ExternalLink, ArrowRight } from 'lucide-react';
import { mockTeams } from '../../data/teams';
import { useLanguage } from '../../context/useLanguage';

export default function NationalLedger({ onNavigate, onSelectTeam, teams = mockTeams }) {
  const { t } = useLanguage();
  const sortedTeams = [...teams].sort((a, b) => (b.points2024 || 0) - (a.points2024 || 0));
  const maxScore = Math.max(...sortedTeams.map((item) => item.points2024 || 0), 1);

  const getRankMedallion = (rank) => {
    if (rank === 1) {
      return 'bg-warning/15 text-warning border-warning/30 font-bold';
    }
    if (rank === 2) {
      return 'bg-elevated text-secondary border-border-strong font-semibold';
    }
    if (rank === 3) {
      return 'bg-warning/8 text-warning/80 border-warning/20 font-semibold';
    }
    return 'bg-elevated text-muted border-border-default font-mono';
  };

  return (
    <div className="rounded-2xl border border-border-default bg-surface flex flex-col justify-between transition-colors overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border-default flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-strong">
                {t.hub.standingsTitle}
              </h2>
            </div>
            <p className="text-[11px] text-muted">
              {t.hub.standingsSubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs text-accent hover:underline font-semibold cursor-pointer inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>{t.hub.fullTable}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Team List with Dense Data & Tabular Numbers */}
        <div className="divide-y divide-divide">
          {sortedTeams.slice(0, 4).map((team, idx) => {
            const rank = idx + 1;
            const scorePercent = Math.min(Math.round(((team.points2024 || 0) / maxScore) * 100), 100);

            return (
              <div
                key={team.id}
                onClick={() => onSelectTeam(team)}
                className="p-3.5 sm:p-4 hover:bg-elevated transition-colors cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Medallion */}
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded border text-xs shrink-0 ${getRankMedallion(
                        rank
                      )}`}
                    >
                      #{rank}
                    </span>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-strong group-hover:text-accent transition-colors truncate">
                          {team.name}
                        </span>
                        <a
                          href={`https://ctftime.org/team/${team.ctftimeId}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-mono text-muted hover:text-accent inline-flex items-center gap-0.5"
                          title="Open verified CTFtime profile"
                        >
                          <span>#{team.ctftimeId}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>
                      <p className="text-[11px] text-muted truncate">
                        {team.affiliation}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <span className="inline-block text-xs font-mono tabular-nums font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/25">
                      {team.points2024.toFixed(2)} {t.common.points}
                    </span>
                    <span className="block text-[11px] font-mono tabular-nums text-muted">
                      {t.common.worldRank} #{team.globalRank}
                    </span>
                  </div>
                </div>

                {/* Score Ratio Progress Bar */}
                <div className="w-full bg-elevated h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full rounded-full transition-all duration-500"
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-border-default bg-elevated text-center">
        <button
          onClick={() => onNavigate('leaderboard')}
          className="text-xs text-secondary hover:text-strong font-medium transition-colors cursor-pointer"
        >
          {t.hub.fullTable}
        </button>
      </div>
    </div>
  );
}
