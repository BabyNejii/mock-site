import React, { useState } from 'react';
import { Search, ExternalLink, Code2 } from 'lucide-react';
import { mockWriteups } from '../data/writeups';

export default function WriteupsView({ onSelectWriteup }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Binary Exploitation',
    'Web Security',
    'Cryptography',
    'Hardware / Forensics'
  ];

  const filteredWriteups = mockWriteups.filter((w) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      w.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Binary Exploitation' && w.category.toLowerCase().includes('pwn')) ||
      (selectedCategory === 'Hardware / Forensics' && (w.category.toLowerCase().includes('hardware') || w.category.toLowerCase().includes('forensics')));

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
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#e4e4e7] dark:border-[#242428]">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
              Writeup Vault and Exploit PoCs
            </h1>
            <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93]">
              Technical challenge breakdowns and exploit scripts by Bulgarian competitors.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64646e] dark:text-[#8a8a93]" />
            <input
              type="text"
              placeholder="Search writeups and PoCs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-md border border-[#e4e4e7] dark:border-[#242428] bg-[#f3f3f5] dark:bg-[#0c0c0e] text-[#18181b] dark:text-[#ededef] text-xs focus:outline-none focus:border-[#00966e] w-full sm:w-56"
            />
          </div>
        </div>

        {/* Category Controls */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93] mr-2">
            TRACK:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0c0e]'
                  : 'border border-[#e4e4e7] dark:border-[#242428] bg-transparent text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Code-Centric Writeups Feed */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-white dark:bg-[#131315] divide-y divide-[#e4e4e7] dark:divide-[#242428] overflow-hidden">
        {filteredWriteups.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64646e] dark:text-[#8a8a93]">
            No writeups found matching your query.
          </div>
        ) : (
          filteredWriteups.map((w) => (
            <div
              key={w.id}
              onClick={() => onSelectWriteup(w)}
              className="p-5 hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] transition-colors cursor-pointer space-y-3 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${getCategoryBadge(w.category)}`}>
                    {w.category}
                  </span>
                  <span className="text-[#64646e] dark:text-[#8a8a93]">
                    Difficulty: <strong className="text-[#18181b] dark:text-[#ededef] font-medium">{w.difficulty}</strong>
                  </span>
                  <span className="text-[#64646e] dark:text-[#8a8a93]">
                    {w.event}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#64646e] dark:text-[#8a8a93]">
                  <span>{w.solves} solves</span>
                  <span>{w.readTime}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef] group-hover:text-[#00966e] transition-colors">
                  {w.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed mt-1">
                  {w.summary}
                </p>
              </div>

              {w.snippet && (
                <div className="rounded-lg border border-[#e4e4e7] dark:border-[#242428] bg-[#f8f9fa] dark:bg-[#0c0c0e] p-3 text-xs overflow-hidden">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#64646e] dark:text-[#8a8a93] mb-1 font-mono">
                    <Code2 className="w-3 h-3 text-[#00966e]" />
                    <span>Proof of concept snippet</span>
                  </div>
                  <pre className="font-mono text-[11px] text-[#00966e] overflow-x-auto leading-relaxed">
                    <code>{w.snippet.split('\n').slice(0, 3).join('\n')}</code>
                  </pre>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-xs text-[#64646e] dark:text-[#8a8a93]">
                <span>
                  By <strong className="text-[#18181b] dark:text-[#ededef] font-semibold">{w.author}</strong> ({w.team})
                </span>
                <span className="font-semibold text-[#00966e] group-hover:underline">
                  View full solution walkthrough
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit Writeup Box */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#242428] bg-[#f8f9fa] dark:bg-[#0c0c0e]/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-[#18181b] dark:text-[#ededef]">
            Submit a challenge writeup
          </h4>
          <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-0.5">
            Solved an interesting challenge at BSides Sofia or on CTFtime? Submit your walkthrough via pull request on GitHub.
          </p>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#00966e] hover:bg-[#00825f] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <span>Submit on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
