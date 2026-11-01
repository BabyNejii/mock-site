import React, { useState } from 'react';
import { Search, ExternalLink, Plus, AlertCircle } from 'lucide-react';

export default function LeaderboardView({ teams, onSelectTeam, onOpenRegisterTeam }) {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedTeams = [...teams].sort((a, b) => (b.points2024 || 0) - (a.points2024 || 0));

  const filteredTeams = sortedTeams.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold';
    if (rank === 2) return 'bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 font-semibold';
    if (rank === 3) return 'bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/25 font-semibold';
    return 'bg-[#f3f3f5] dark:bg-[#0c0c0e] text-[#64646e] dark:text-[#8a8a93] border-[#e4e4e7] dark:border-[#242428] font-mono';
  };

  const getSpecialtyBadge = (spec) => {
    if (spec.toLowerCase().includes('pwn') || spec.toLowerCase().includes('binary')) {
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (spec.toLowerCase().includes('web')) {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (spec.toLowerCase().includes('crypto')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    if (spec.toLowerCase().includes('rev')) {
      return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
    }
    return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#e4e4e7] dark:border-[#242428]">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
              Bulgarian CTFtime Standings
            </h1>
            <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93]">
              Country ratings registered on CTFtime.org. Points reflect verified international competition submissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64646e] dark:text-[#8a8a93]" />
              <input
                type="text"
                placeholder="Search team or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-md border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5] dark:bg-[#0c0c0e] text-[#18181b] dark:text-[#ededef] text-xs focus:outline-none focus:border-[#00966e] w-full sm:w-56"
              />
            </div>

            <button
              onClick={onOpenRegisterTeam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00966e] hover:bg-[#00825f] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Squad</span>
            </button>
          </div>
        </div>

        {/* University & National Selection Notice */}
        <div className="mt-4 p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-[#64646e] dark:text-[#8a8a93] space-y-1">
            <span className="font-semibold text-[#18181b] dark:text-[#ededef]">
              Collegiate Rosters and Team Bulgaria Note:
            </span>
            <p className="leading-relaxed">
              Technical University of Sofia, Sofia University (FMI), and UNWE do not currently maintain official varsity rosters on CTFtime. Meanwhile, the European Cybersecurity Challenge national squad is <strong>Team Bulgaria</strong>, selected annually through Cybersecurity Challenge Bulgaria (ecsc-bg.eu). If you are assembling a collegiate team, register it here to appear in the national directory.
            </p>
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5]/60 dark:bg-[#0c0c0e]/60 text-[#64646e] dark:text-[#8a8a93] font-medium">
                <th className="py-3 px-4 w-14 text-center font-mono">Rank</th>
                <th className="py-3 px-4">Squad</th>
                <th className="py-3 px-4">Focus Disciplines</th>
                <th className="py-3 px-4">Affiliation</th>
                <th className="py-3 px-4 text-right font-mono">2024 Points</th>
                <th className="py-3 px-4 text-right font-mono">Events</th>
                <th className="py-3 px-4 text-right font-mono">World Rank</th>
                <th className="py-3 px-4 text-center">CTFtime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4e7] dark:divide-[#242428]">
              {filteredTeams.map((team, idx) => {
                const displayRank = team.rank || idx + 1;
                return (
                  <tr
                    key={team.id}
                    className="hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] transition-colors cursor-pointer group"
                    onClick={() => onSelectTeam(team)}
                  >
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded border text-xs ${getRankBadgeClass(displayRank)}`}>
                        {displayRank}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#18181b] dark:text-[#ededef]">
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-[#00966e] transition-colors text-xs sm:text-sm">
                          {team.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93]">
                          #{team.ctftimeId}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {team.specialties?.slice(0, 2).map((spec, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded border ${getSpecialtyBadge(spec)}`}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#64646e] dark:text-[#8a8a93]">
                      {team.affiliation}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono tabular-nums font-bold text-[#00966e] bg-[#00966e]/10 px-2 py-0.5 rounded border border-[#00966e]/20">
                        {team.points2024 ? team.points2024.toFixed(2) : '0.00'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#64646e] dark:text-[#8a8a93]">
                      {team.eventsPlayed2024 || '0'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#64646e] dark:text-[#8a8a93]">
                      #{team.globalRank || '—'}
                    </td>

                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`https://ctftime.org/team/${team.ctftimeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center p-1 rounded hover:bg-[#f3f3f5] dark:hover:bg-[#242428] text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] transition-colors"
                      title="Open verified CTFtime profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
