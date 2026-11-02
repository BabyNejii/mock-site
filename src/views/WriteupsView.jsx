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
    if (cat.toLowerCase().includes('pwn') || cat.toLowerCase().includes('binary')) {
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (cat.toLowerCase().includes('web')) {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (cat.toLowerCase().includes('crypto')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d6dae1] dark:border-[#292f42]">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
              {lang === 'bg' ? 'Архив с решения на състезателни задачи' : 'Writeup Vault and Solution Guides'}
            </h1>
            <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93]">
              {lang === 'bg'
                ? 'Технически анализи, алгоритми и решения на задачи, подготвени от български участници.'
                : 'Technical challenge breakdowns and solutions written by Bulgarian competitors.'}
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64646e] dark:text-[#8a8a93]" />
            <input
              type="text"
              placeholder={lang === 'bg' ? 'Търсене на решения...' : 'Search writeups...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-md border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5] dark:bg-[#131620] text-[#18181b] dark:text-[#ededef] text-xs focus:outline-none focus:border-[#00966e] w-full sm:w-56"
            />
          </div>
        </div>

        {/* Category Controls */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93] mr-2">
            {lang === 'bg' ? 'КАТЕГОРИЯ:' : 'TRACK:'}
          </span>
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === opt.id
                  ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0e12]'
                  : 'border border-[#d6dae1] dark:border-[#292f42] bg-transparent text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code-Centric Writeups Feed */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] divide-y divide-[#e4e4e7] dark:divide-[#222632] overflow-hidden">
        {filteredWriteups.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64646e] dark:text-[#8a8a93]">
            {lang === 'bg' ? 'Няма намерени решения по запитването.' : 'No writeups found matching your query.'}
          </div>
        ) : (
          filteredWriteups.map((w) => (
            <div
              key={w.id}
              onClick={() => onSelectWriteup(w)}
              className="p-5 hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] transition-colors cursor-pointer space-y-3 group"
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
                  <span className="text-[#64646e] dark:text-[#8a8a93]">
                    {lang === 'bg' ? 'Трудност:' : 'Difficulty:'}{' '}
                    <strong className="text-[#18181b] dark:text-[#ededef] font-medium">{w.difficulty}</strong>
                  </span>
                  <span className="text-[#64646e] dark:text-[#8a8a93]">{w.event}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#64646e] dark:text-[#8a8a93]">
                  <span>{w.solves} {lang === 'bg' ? 'решения' : 'solves'}</span>
                  <span>{w.date}</span>
                </div>
              </div>

              <div>
                <h2 className="text-base font-bold text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors">
                  {w.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] mt-1 leading-relaxed">
                  {w.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#d6dae1] dark:border-[#292f42] text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#64646e] dark:text-[#8a8a93]">{lang === 'bg' ? 'Автор:' : 'Author:'}</span>
                  <span className="font-semibold text-[#18181b] dark:text-[#ededef]">{w.author}</span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-[11px] font-mono text-[#00966e]">{w.squad}</span>
                </div>

                <span className="text-xs text-[#00966e] group-hover:underline font-medium inline-flex items-center gap-1">
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
