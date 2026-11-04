import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export default function Footer({ onNavigate }) {
  const { lang, t } = useLanguage();

  return (
    <footer className="border-t border-border-default bg-surface text-secondary text-sm transition-colors">
      {/* Bulgarian Tricolor Ribbon */}
      <div className="h-[2px] w-full flex">
        <div className="flex-1 bg-strong/15" />
        <div className="flex-1 bg-accent" />
        <div className="flex-1 bg-highlight" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="space-y-2 sm:col-span-1">
            <span className="font-display font-bold text-sm tracking-tight text-strong">
              ctf.bg
            </span>
            <p className="text-sm text-secondary leading-relaxed">
              {lang === 'bg'
                ? 'Национален регистър за състезателна киберсигурност, турнирен календар и студентски отбори в България.'
                : 'Bulgarian competitive cybersecurity registry, event calendar, and student squad directory.'}
            </p>
          </div>

          {/* Directory Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-strong mb-3">
              {lang === 'bg' ? 'Навигация' : 'Directory'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  {t.nav.calendar}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  {t.nav.leaderboard}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lfg')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  {t.nav.lfg}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('writeups')}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  {t.nav.writeups}
                </button>
              </li>
            </ul>
          </div>

          {/* Bulgarian Ecosystem */}
          <div>
            <h3 className="text-xs font-semibold text-strong mb-3">
              {lang === 'bg' ? 'Българска екосистема' : 'Bulgarian Ecosystem'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://ecsc-bg.eu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>Team Bulgaria / CSCB (ecsc-bg.eu)</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://securitybsides.bg"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>Security BSides Sofia 2027</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
              <li>
                <a
                  href="https://ctftime.org/stats/BG"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <span>CTFtime Bulgaria Country Stats</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-strong mb-3">
              {lang === 'bg' ? 'Общност Discord' : 'Community Discord'}
            </h3>
            <p className="text-sm text-secondary mb-3 leading-relaxed">
              {lang === 'bg'
                ? 'Координирайте сформирането на отбори, обсъждайте решения на задачи и тренирайте със състезатели от българските университети.'
                : 'Coordinate team formation, discuss challenge PoCs, and practice with university competitors across Bulgaria.'}
            </p>
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-default hover:bg-elevated text-strong text-xs font-medium transition-colors"
            >
              <span>{lang === 'bg' ? 'Присъедини се към Discord' : 'Join Discord Server'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-4 border-t border-border-default flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-muted">
          <p>© 2026–2027 ctf.bg — {lang === 'bg' ? 'Независим български общностен регистър' : 'Independent Bulgarian community registry'}</p>
          <p>ТУ-София, СУ (ФМИ), УНСС, НБУ</p>
        </div>
      </div>
    </footer>
  );
}
