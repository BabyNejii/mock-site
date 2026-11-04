import React, { useState } from 'react';
import { Search, ExternalLink, Plus, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export default function LeaderboardView({ teams, onSelectTeam, onOpenRegisterTeam }) {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const sortedTeams = [...teams].sort((a, b) => (b.points2024 || 0) - (a.points2024 || 0));

  const filteredTeams = sortedTeams.filter((team) => {
    return (
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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

  const getSpecialtyBadge = (spec) => {
    if (spec.toLowerCase().includes('web')) {
      return 'bg-highlight/10 text-highlight border-highlight/25';
    }
    if (spec.toLowerCase().includes('pwn') || spec.toLowerCase().includes('binary')) {
      return 'bg-accent/10 text-accent border-accent/25';
    }
    return 'bg-elevated text-secondary border-border-strong';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
              {lang === 'bg' ? 'CTFtime.org' : 'CTFtime.org'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
              {lang === 'bg' ? 'Национална класация в CTFtime' : 'Bulgarian CTFtime Standings'}
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-2xl">
              {lang === 'bg'
                ? 'Официален национален рейтинг в CTFtime.org. Точките отразяват участия в потвърдени международни турнири.'
                : 'Country ratings registered on CTFtime.org. Points reflect verified international competition submissions.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
              <input
                type="text"
                placeholder={lang === 'bg' ? 'Търсене на отбор или университет...' : 'Search team or university...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-border-default bg-elevated text-strong text-sm focus:outline-none focus:border-accent w-full sm:w-56"
              />
            </div>

            <button
              onClick={onOpenRegisterTeam}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'bg' ? 'Регистрирай отбор' : 'Register Squad'}</span>
            </button>
          </div>
        </div>

        {/* University & National Selection Notice */}
        <div className="p-3.5 rounded-xl border border-warning/25 bg-warning/10 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div className="text-sm text-secondary space-y-1">
            <span className="font-semibold text-strong">
              {lang === 'bg' ? 'Забележка за студентските състави и Team Bulgaria:' : 'Collegiate Rosters and Team Bulgaria Note:'}
            </span>
            <p className="leading-relaxed">
              {lang === 'bg'
                ? 'Технически университет - София, СУ (ФМИ) и УНСС все още нямат регистрирани официални представителни отбори в CTFtime. Националният състав за Европейското първенство (ECSC) е Team Bulgaria, избиран ежегодно чрез Cybersecurity Challenge Bulgaria (ecsc-bg.eu). Ако сформирате студентски отбор, регистрирайте го тук.'
                : 'Technical University of Sofia, Sofia University (FMI), and UNWE do not currently maintain official varsity rosters on CTFtime. Meanwhile, the European Cybersecurity Challenge national squad is Team Bulgaria, selected annually through Cybersecurity Challenge Bulgaria (ecsc-bg.eu). If you are assembling a collegiate team, register it here to appear in the national directory.'}
            </p>
          </div>
        </div>
      </div>

      {/* Standings Table */}
      <div className="rounded-2xl border border-border-default bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-default bg-elevated text-muted font-medium whitespace-nowrap">
                <th className="py-3 px-4 w-14 text-center font-mono">{lang === 'bg' ? 'Ранг' : 'Rank'}</th>
                <th className="py-3 px-4">{lang === 'bg' ? 'Отбор' : 'Squad'}</th>
                <th className="py-3 px-4">{lang === 'bg' ? 'Фокус дисциплини' : 'Focus Disciplines'}</th>
                <th className="py-3 px-4">{lang === 'bg' ? 'Принадлежност' : 'Affiliation'}</th>
                <th className="py-3 px-4 text-right font-mono">{lang === 'bg' ? 'Точки 2024' : '2024 Points'}</th>
                <th className="py-3 px-4 text-right font-mono">{lang === 'bg' ? 'Турнири' : 'Events'}</th>
                <th className="py-3 px-4 text-right font-mono">{lang === 'bg' ? 'Световен ранг' : 'World Rank'}</th>
                <th className="py-3 px-4 text-center">CTFtime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divide">
              {filteredTeams.map((team, idx) => {
                const rank = idx + 1;
                return (
                  <tr
                    key={team.id}
                    className="hover:bg-elevated transition-colors cursor-pointer group"
                    onClick={() => onSelectTeam(team)}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded border text-xs tabular-nums ${getRankMedallion(
                          rank
                        )}`}
                      >
                        #{rank}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-strong">
                      <div className="flex items-center gap-2">
                        <span className="group-hover:text-accent transition-colors text-sm">
                          {team.name}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-muted">
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

                    <td className="py-3.5 px-4 text-secondary">
                      {team.affiliation}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono tabular-nums font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/25">
                        {team.points2024 ? team.points2024.toFixed(2) : '0.00'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-secondary">
                      {team.eventsPlayed2024 || '0'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-secondary">
                      #{team.globalRank || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://ctftime.org/team/${team.ctftimeId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center p-1 rounded hover:bg-elevated text-secondary hover:text-strong transition-colors"
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
