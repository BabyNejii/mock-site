import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { mockWriteups } from '../data/writeups';
import { useLanguage } from '../context/useLanguage';

export default function WriteupsView({ onSelectWriteup }) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOptions = [
    { id: 'All', label: lang === 'bg' ? 'Всички' : 'All' },
    { id: 'Binary Exploitation', label: lang === 'bg' ? 'Бинарна експлоатация' : 'Binary Exploitation' },
    { id: 'Web Security', label: lang === 'bg' ? 'Уеб сигурност' : 'Web Security' },
    { id: 'Cryptography', label: lang === 'bg' ? 'Криптография' : 'Cryptography' },
    { id: 'Hardware / Forensics', label: lang === 'bg' ? 'Хардуер и криминалистика' : 'Hardware / Forensics' },
  ];

  const filteredWriteups = mockWriteups.filter((w) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      w.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Binary Exploitation' && w.category.toLowerCase().includes('pwn')) ||
      (selectedCategory === 'Hardware / Forensics' &&
        (w.category.toLowerCase().includes('hardware') || w.category.toLowerCase().includes('forensics')));

    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.event.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat) => {
    if (cat.toLowerCase().includes('web')) {
      return 'bg-highlight/10 text-highlight border-highlight/25';
    }
    if (cat.toLowerCase().includes('pwn') || cat.toLowerCase().includes('binary')) {
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
              {lang === 'bg' ? 'Архив' : 'Writeup Vault'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
              {lang === 'bg' ? 'Архив с решения на състезателни задачи' : 'Writeup Vault and Solution Guides'}
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-2xl">
              {lang === 'bg'
                ? 'Технически анализи, алгоритми и решения на задачи, подготвени от български участници.'
                : 'Technical challenge breakdowns and solutions written by Bulgarian competitors.'}
            </p>
          </div>

          {/* Search */}
          <div className="relative shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
            <input
              type="text"
              placeholder={lang === 'bg' ? 'Търсене на решения...' : 'Search writeups...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-border-default bg-elevated text-strong text-sm focus:outline-none focus:border-accent w-full sm:w-56"
            />
          </div>
        </div>

        {/* Category Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wide text-muted mr-2">
            {lang === 'bg' ? 'КАТЕГОРИЯ:' : 'TRACK:'}
          </span>
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === opt.id
                  ? 'bg-accent/12 text-accent'
                  : 'text-secondary hover:text-strong hover:bg-elevated'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code-Centric Writeups Feed */}
      <div className="rounded-2xl border border-border-default bg-surface divide-y divide-divide overflow-hidden">
        {filteredWriteups.length === 0 ? (
          <div className="p-8 text-center text-sm text-secondary">
            {lang === 'bg' ? 'Няма намерени решения по запитването.' : 'No writeups found matching your query.'}
          </div>
        ) : (
          filteredWriteups.map((w) => (
            <div
              key={w.id}
              onClick={() => onSelectWriteup(w)}
              className="p-5 hover:bg-elevated transition-colors cursor-pointer space-y-3 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${getCategoryBadge(
                      w.category
                    )}`}
                  >
                    {w.category}
                  </span>
                  <span className="text-secondary">
                    {lang === 'bg' ? 'Трудност:' : 'Difficulty:'}{' '}
                    <strong className="text-strong font-medium">{w.difficulty}</strong>
                  </span>
                  <span className="text-secondary">{w.event}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-muted">
                  <span>{w.solves} {lang === 'bg' ? 'решения' : 'solves'}</span>
                  <span>{w.date}</span>
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-strong group-hover:text-accent transition-colors">
                  {w.title}
                </h2>
                <p className="text-sm text-secondary mt-1 leading-relaxed">
                  {w.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-divide text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-secondary">{lang === 'bg' ? 'Автор:' : 'Author:'}</span>
                  <span className="font-semibold text-strong">{w.author}</span>
                  <span className="text-muted">•</span>
                  <span className="text-[11px] font-mono text-accent">{w.squad}</span>
                </div>

                <span className="text-xs text-accent group-hover:underline font-medium inline-flex items-center gap-1">
                  <span>{lang === 'bg' ? 'Преглед на анализа' : 'Read full analysis'}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
