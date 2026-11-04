import React, { useState } from 'react';
import { ExternalLink, Search, Download } from 'lucide-react';
import { mockEvents } from '../data/ctfs';
import { useLanguage } from '../context/useLanguage';

export default function CalendarView() {
  const { lang } = useLanguage();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { id: 'All', label: lang === 'bg' ? 'Всички' : 'All' },
    { id: 'Local (Sofia)', label: lang === 'bg' ? 'Локални (София)' : 'Local (Sofia)' },
    { id: 'National Selection', label: lang === 'bg' ? 'Национална селекция' : 'National Selection' },
    { id: 'Global Major', label: lang === 'bg' ? 'Международни' : 'Global Major' },
  ];

  const filteredEvents = mockEvents.filter((evt) => {
    const matchesType = selectedType === 'All' || evt.type === selectedType;
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getEventTypeBadge = (type) => {
    if (type.includes('Sofia') || type.includes('Local')) {
      return 'bg-accent/10 text-accent border-accent/25';
    }
    if (type.includes('National') || type.includes('Selection')) {
      return 'bg-highlight/10 text-highlight border-highlight/25';
    }
    return 'bg-elevated text-secondary border-border-strong';
  };

  const handleDownloadIcs = (event) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ctf.bg//Events//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
              {lang === 'bg' ? 'Календар' : 'Calendar'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
              {lang === 'bg' ? 'Календар на състезания и квалификации' : 'Competitions and Qualifiers Calendar'}
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-2xl">
              {lang === 'bg'
                ? 'График на български присъствени събития, национални квалификации за ECSC и ключови международни турнири.'
                : 'Schedule of Bulgarian on-site events, national team selection trials, and major global tournaments.'}
            </p>
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
            <input
              type="text"
              placeholder={lang === 'bg' ? 'Филтриране на събития...' : 'Filter events...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-border-default bg-elevated text-strong text-sm focus:outline-none focus:border-accent w-full sm:w-60"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wide text-muted mr-2">
            {lang === 'bg' ? 'ТИП:' : 'TYPE:'}
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedType === opt.id
                  ? 'bg-accent/12 text-accent'
                  : 'text-secondary hover:text-strong hover:bg-elevated'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Feed */}
      <div className="rounded-2xl border border-border-default bg-surface divide-y divide-divide overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-sm text-secondary">
            {lang === 'bg'
              ? 'Няма намерени състезания по избраните критерии.'
              : 'No competitions found matching your search criteria.'}
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const dateObj = new Date(evt.startDate);
            const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(
              dateObj.getDate()
            ).padStart(2, '0')}`;

            return (
              <div
                key={evt.id}
                className="p-5 hover:bg-elevated transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 group"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono tabular-nums font-bold text-strong">
                      {formattedDate}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${getEventTypeBadge(
                        evt.type
                      )}`}
                    >
                      {evt.type}
                    </span>
                    <span className="text-secondary text-xs">
                      {evt.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-strong group-hover:text-accent transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-secondary leading-relaxed max-w-3xl">
                    {evt.description}
                  </p>

                  <div className="text-sm text-secondary flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>
                      {lang === 'bg' ? 'Организатор:' : 'Organizer:'}{' '}
                      <strong className="font-medium text-strong">{evt.organizer}</strong>
                    </span>
                    <span>
                      {lang === 'bg' ? 'Формат:' : 'Format:'}{' '}
                      <strong className="font-medium text-strong">{evt.format}</strong>
                    </span>
                    <span className="font-mono">
                      {lang === 'bg' ? 'Тежест:' : 'Weight:'}{' '}
                      <strong className="font-mono font-medium tabular-nums text-strong">{evt.weight}</strong>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                  <button
                    onClick={() => handleDownloadIcs(evt)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default hover:bg-elevated text-strong text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    title={lang === 'bg' ? 'Експортирай към .ics календар' : 'Export event to .ics format'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics</span>
                  </button>
                  <a
                    href={evt.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{lang === 'bg' ? 'Регистрация' : 'Register'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
