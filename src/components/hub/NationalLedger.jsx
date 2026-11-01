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
      return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold';
    }
    if (rank === 2) {
      return 'bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 font-semibold';
    }
    if (rank === 3) {
      return 'bg-amber-700/10 text-amber-700 dark:text-amber-500/90 border-amber-700/25 font-semibold';
    }
    return 'bg-[#f3f3f5] dark:bg-[#14161d] text-[#64646e] dark:text-[#8a8a93] border-[#e4e4e7] dark:border-[#222632] font-mono';
  };

  return (
    <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] shadow-xs flex flex-col justify-between transition-colors overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-[#18181b] dark:text-[#ededef]">
                {t.hub.standingsTitle}
              </h2>
            </div>
            <p className="text-[11px] text-[#64646e] dark:text-[#8a8a93]">
              {t.hub.standingsSubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="text-xs text-[#00966e] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            <span>{t.hub.fullTable}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Team List with Dense Data & Tabular Numbers */}
        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222632]">
          {sortedTeams.slice(0, 4).map((team, idx) => {
            const rank = idx + 1;
            const scorePercent = Math.min(Math.round(((team.points2024 || 0) / maxScore) * 100), 100);

            return (
              <div
                key={team.id}
                onClick={() => onSelectTeam(team)}
                className="p-3.5 sm:p-4 hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] transition-colors cursor-pointer space-y-2 group"
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
                        <span className="font-semibold text-xs sm:text-sm text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors truncate">
                          {team.name}
                        </span>
                        <a
                          href={`https://ctftime.org/team/${team.ctftimeId}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93] hover:text-[#00966e] inline-flex items-center gap-0.5"
                          title="Open verified CTFtime profile"
                        >
                          <span>#{team.ctftimeId}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>
                      <p className="text-[11px] text-[#64646e] dark:text-[#8a8a93] truncate">
                        {team.affiliation}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <span className="inline-block text-xs font-mono tabular-nums font-bold text-[#00966e] bg-[#00966e]/10 px-2 py-0.5 rounded border border-[#00966e]/20">
                      {team.points2024.toFixed(2)} {t.common.points}
                    </span>
                    <span className="block text-[11px] font-mono tabular-nums text-[#64646e] dark:text-[#8a8a93]">
                      {t.common.worldRank} #{team.globalRank}
                    </span>
                  </div>
                </div>

                {/* Score Ratio Progress Bar */}
                <div className="w-full bg-zinc-100 dark:bg-zinc-800/80 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00966e] h-full rounded-full transition-all duration-500"
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] text-center">
        <button
          onClick={() => onNavigate('leaderboard')}
          className="text-xs text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] font-medium transition-colors cursor-pointer"
        >
          {t.hub.fullTable}
        </button>
      </div>
    </div>
  );
}
