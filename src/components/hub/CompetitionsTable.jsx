import React from 'react';
import { Calendar, ExternalLink, ArrowRight, MapPin, Globe } from 'lucide-react';
import { mockEvents } from '../../data/ctfs';
import { useLanguage } from '../../context/useLanguage';

export default function CompetitionsTable({ onNavigate }) {
  const { lang, t } = useLanguage();
  const events = mockEvents.slice(0, 4);

  const getTypeBadgeClass = (type) => {
    if (type.includes('Sofia') || type.includes('Local')) {
      return 'bg-[#00966e]/10 text-[#00966e] border-[#00966e]/25';
    }
    if (type.includes('National') || type.includes('Selection')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25';
    }
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25';
  };

  return (
    <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] shadow-xs flex flex-col justify-between transition-colors overflow-hidden">
      <div>
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00966e]" />
              <h2 className="text-sm font-bold text-[#18181b] dark:text-[#ededef]">
                {t.hub.upcomingEvents}
              </h2>
            </div>
            <p className="text-[11px] text-[#64646e] dark:text-[#8a8a93]">
              {t.hub.eventsSubtitle}
            </p>
          </div>
          <button
            onClick={() => onNavigate('calendar')}
            className="text-xs text-[#00966e] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            <span>{t.hub.allEvents}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Competition Event Rows */}
        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222632]">
          {events.map((evt) => {
            const dateObj = new Date(evt.startDate);
            const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(
              dateObj.getDate()
            ).padStart(2, '0')}`;
            const isLocal = evt.type.includes('Sofia') || evt.location.toLowerCase().includes('sofia');

            return (
              <div
                key={evt.id}
                className="p-3.5 sm:p-4 hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono tabular-nums font-semibold text-[#18181b] dark:text-[#ededef]">
                      {formattedDate}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${getTypeBadgeClass(
                        evt.type
                      )}`}
                    >
                      {evt.type}
                    </span>
                    <span className="text-[#64646e] dark:text-[#8a8a93] text-xs flex items-center gap-1">
                      {isLocal ? (
                        <MapPin className="w-3 h-3 text-[#00966e]" />
                      ) : (
                        <Globe className="w-3 h-3 text-[#64646e] dark:text-[#8a8a93]" />
                      )}
                      <span>{evt.location}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => onNavigate('calendar')}
                    className="text-xs sm:text-sm font-semibold text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors cursor-pointer"
                  >
                    {evt.title}
                  </h3>

                  <div className="text-[11px] text-[#64646e] dark:text-[#8a8a93] flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>{lang === 'bg' ? 'Формат:' : 'Format:'} {evt.format}</span>
                    <span className="font-mono">{lang === 'bg' ? 'Тежест:' : 'Weight:'} {evt.weight}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href={evt.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#e4e4e7] dark:border-[#222632] hover:bg-white dark:hover:bg-[#13161f] text-[#18181b] dark:text-[#ededef] text-xs font-medium transition-colors"
                  >
                    <span>{t.common.website}</span>
                    <ExternalLink className="w-3 h-3 text-[#64646e] dark:text-[#8a8a93]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] text-center">
        <button
          onClick={() => onNavigate('calendar')}
          className="text-xs text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] font-medium transition-colors cursor-pointer"
        >
          {t.hub.allEvents}
        </button>
      </div>
    </div>
  );
}
