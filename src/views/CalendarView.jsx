import React, { useState } from 'react';
import { ExternalLink, Search, Download } from 'lucide-react';
import { mockEvents } from '../data/ctfs';

export default function CalendarView() {
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTypes = ['All', 'Local (Sofia)', 'National Selection', 'Global Major'];

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
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (type.includes('National') || type.includes('Selection')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
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
      {/* Header Panel */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#e4e4e7] dark:border-[#242428]">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
              Competitions and Qualifiers Calendar
            </h1>
            <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93]">
              Schedule of Bulgarian on-site events, national team selection trials, and major global tournaments.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64646e] dark:text-[#8a8a93]" />
            <input
              type="text"
              placeholder="Filter events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-md border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5] dark:bg-[#0c0c0e] text-[#18181b] dark:text-[#ededef] text-xs focus:outline-none focus:border-[#00966e] w-full sm:w-60"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93] mr-2">
            TYPE:
          </span>
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedType === type
                  ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0c0e]'
                  : 'border border-[#e4e4e7] dark:border-[#242428] bg-transparent text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Feed */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] shadow-xs divide-y divide-[#e4e4e7] dark:divide-[#242428] overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64646e] dark:text-[#8a8a93]">
            No competitions found matching your search criteria.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const dateObj = new Date(evt.startDate);
            const formattedDate = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

            return (
              <div
                key={evt.id}
                className="p-5 hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-[#18181b] dark:text-[#ededef]">
                      {formattedDate}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${getEventTypeBadge(evt.type)}`}>
                      {evt.type}
                    </span>
                    <span className="text-[#64646e] dark:text-[#8a8a93] text-xs">
                      {evt.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef]">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed max-w-3xl">
                    {evt.description}
                  </p>

                  <div className="text-xs text-[#64646e] dark:text-[#8a8a93] flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    <span>Organizer: <strong className="font-medium text-[#18181b] dark:text-[#ededef]">{evt.organizer}</strong></span>
                    <span>Format: <strong className="font-medium text-[#18181b] dark:text-[#ededef]">{evt.format}</strong></span>
                    <span className="font-mono">Weight: <strong className="font-mono font-medium text-[#18181b] dark:text-[#ededef]">{evt.weight}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                  <button
                    onClick={() => handleDownloadIcs(evt)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#e4e4e7] dark:border-[#242428] hover:bg-[#f3f3f5] dark:hover:bg-[#0c0c0e] text-[#18181b] dark:text-[#ededef] text-xs font-mono font-medium transition-colors cursor-pointer"
                    title="Export event to .ics format"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics</span>
                  </button>
                  <a
                    href={evt.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#00966e] hover:bg-[#00825f] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Register</span>
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
