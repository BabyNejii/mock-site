import React from 'react';
import { Calendar, ExternalLink, ArrowRight, MapPin, Globe } from 'lucide-react';
import { mockEvents } from '../../data/ctfs';
import { useLanguage } from '../../context/useLanguage';

export default function CompetitionsTable({ onNavigate }) {
  const { lang, t } = useLanguage();
  const events = mockEvents.slice(0, 4);

  const getTypeBadgeClass = (type) => {
    if (type.includes('Sofia') || type.includes('Local')) {
      return 'bg-accent/10 text-accent border-accent/25';
    }
    if (type.includes('National') || type.includes('Selection')) {
      return 'bg-highlight/10 text-highlight border-highlight/25';
    }
    return 'bg-secondary/10 text-secondary border-border-strong';
  };

  return (
    <div className="rounded-2xl border border-border-default bg-surface flex flex-col justify-between transition-colors overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border-default flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-strong">
                {t.hub.upcomingEvents}
              </h2>
            </div>
            <p className="text-[11px] text-muted">
              {t.hub.eventsSubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('calendar')}
            className="text-xs text-accent hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            <span>{t.hub.allEvents}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Competition Event Rows */}
        <div className="divide-y divide-divide">
          {events.map((evt) => {
            const dateObj = new Date(evt.startDate);
            const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(
              dateObj.getDate()
            ).padStart(2, '0')}`;
            const isLocal = evt.type.includes('Sofia') || evt.location.toLowerCase().includes('sofia');

            return (
              <div
                key={evt.id}
                className="p-3.5 sm:p-4 hover:bg-elevated transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono tabular-nums font-semibold text-strong">
                      {formattedDate}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${getTypeBadgeClass(
                        evt.type
                      )}`}
                    >
                      {evt.type}
                    </span>
                    <span className="text-secondary text-xs flex items-center gap-1">
                      {isLocal ? (
                        <MapPin className="w-3 h-3 text-accent" />
                      ) : (
                        <Globe className="w-3 h-3 text-muted" />
                      )}
                      <span>{evt.location}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => onNavigate('calendar')}
                    className="text-xs sm:text-sm font-semibold text-strong group-hover:text-accent transition-colors cursor-pointer"
                  >
                    {evt.title}
                  </h3>

                  <div className="text-[11px] text-muted flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>{lang === 'bg' ? 'Формат:' : 'Format:'} {evt.format}</span>
                    <span className="font-mono">{lang === 'bg' ? 'Тежест:' : 'Weight:'} {evt.weight}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={evt.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-default hover:bg-elevated text-strong text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.common.website}</span>
                    <ExternalLink className="w-3 h-3 text-muted" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-border-default bg-elevated text-center">
        <button
          onClick={() => onNavigate('calendar')}
          className="text-xs text-secondary hover:text-strong font-medium transition-colors cursor-pointer"
        >
          {t.hub.allEvents}
        </button>
      </div>
    </div>
  );
}
