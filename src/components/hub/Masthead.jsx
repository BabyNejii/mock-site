import React from 'react';
import { Trophy, Users, Calendar, ShieldCheck, ExternalLink, MapPin, ArrowRight } from 'lucide-react';
import { mockTeams } from '../../data/teams';
import { useLanguage } from '../../context/useLanguage';

export default function Masthead({ onNavigate, onSelectTeam, timeLeft }) {
  const { t } = useLanguage();
  const perperikon = mockTeams.find((item) => item.id === 'perperikon');

  const handleSelectPerperikon = () => {
    if (onSelectTeam && perperikon) {
      onSelectTeam(perperikon);
    } else {
      onNavigate('leaderboard');
    }
  };

  return (
    <section className="space-y-6">
      {/* ── Hero: oversized asymmetric headline over a masked blueprint grid ── */}
      <div className="hero-grid relative overflow-hidden rounded-2xl border border-border-default bg-surface px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-highlight">
              {t.masthead.circuit}
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-strong sm:text-5xl lg:text-6xl">
            {t.masthead.title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-secondary sm:text-base">
            {t.masthead.desc}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('leaderboard')}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover cursor-pointer"
            >
              <Trophy className="h-4 w-4" />
              <span>{t.masthead.btnStandings}</span>
            </button>

            <button
              onClick={() => onNavigate('lfg')}
              className="inline-flex items-center gap-2 rounded-lg border border-border-default bg-transparent px-5 py-2.5 text-sm font-semibold text-strong transition-colors hover:border-border-strong hover:bg-elevated cursor-pointer"
            >
              <Users className="h-4 w-4 text-accent" />
              <span>{t.masthead.btnLfg}</span>
            </button>

            <button
              onClick={() => onNavigate('calendar')}
              className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-secondary transition-colors hover:text-strong cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>{t.masthead.btnCalendar}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mixed-density spotlight: one dominant featured block + two tight side cards ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Featured — National #1 (spans 2 cols, accent hairline) */}
        <div
          onClick={handleSelectPerperikon}
          className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border-default bg-surface p-6 transition-colors hover:border-border-strong lg:col-span-2 lg:p-8"
        >
          <span className="pointer-events-none absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-highlight to-transparent" />
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-highlight">
                <Trophy className="h-3.5 w-3.5" />
                {t.masthead.spotlight1Badge}
              </span>
              <span className="font-mono text-[11px] text-muted">#194263</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <h3 className="font-display text-2xl font-bold text-strong transition-colors group-hover:text-accent lg:text-3xl">
                Perperikon
              </h3>
              <span className="font-mono text-xs font-medium text-muted">CTFtime World #74</span>
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary">
              {t.masthead.spotlight1Desc}
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between border-t border-divide pt-4">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-bold tabular-nums text-strong">373.73</span>
              <span className="text-xs text-muted">{t.masthead.points}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
              <span>{t.masthead.spotlight1Action}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Side rail — two tighter cards stacked */}
        <div className="flex flex-col gap-4">
          {/* European representation */}
          <div className="flex flex-1 flex-col justify-between rounded-2xl border border-border-default bg-surface p-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {t.masthead.spotlight2Badge}
                </span>
                <span className="font-mono text-[10px] text-muted">ECSC 26/27</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-strong">{t.masthead.spotlight2Name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-secondary">{t.masthead.spotlight2Desc}</p>
            </div>
            <a
              href="https://ecsc-bg.eu"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent hover:gap-1.5 transition-all"
            >
              <span>{t.masthead.spotlight2Action}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Domestic flagship + countdown */}
          <div
            onClick={() => onNavigate('calendar')}
            className="group flex flex-1 cursor-pointer flex-col justify-between rounded-2xl border border-border-default bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                  <MapPin className="h-3.5 w-3.5" />
                  {t.masthead.spotlight3Badge}
                </span>
                <span className="rounded-md border border-highlight/25 bg-highlight/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-highlight">
                  {timeLeft.days}d {timeLeft.hours}h
                </span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-strong transition-colors group-hover:text-accent">
                BSides Sofia 2027
              </h3>
              <p className="mt-1 font-mono text-[11px] text-muted">March 27–28, 2027</p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-1.5 transition-all">
              <span>{t.masthead.spotlight3Action}</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
