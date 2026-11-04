import React, { useState } from 'react';
import { Search, Copy, Check, Plus, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

export default function LfgView({ lfgPosts, onOpenPostLfg }) {
  const { lang } = useLanguage();
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  const postTypes = [
    { id: 'All', label: lang === 'bg' ? 'Всички' : 'All' },
    { id: 'Looking for Squad', label: lang === 'bg' ? 'Търся отбор' : 'Looking for Squad' },
    { id: 'Squad Recruiting', label: lang === 'bg' ? 'Отбори търсят' : 'Squad Recruiting' },
  ];

  const filteredPosts = lfgPosts.filter((post) => {
    const matchesFilter = filterType === 'All' || post.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch =
      (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.affiliation && post.affiliation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.targetEvent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getAffiliationBadge = (affil) => {
    if (affil.toLowerCase().includes('tu') || affil.toLowerCase().includes('technical')) {
      return 'bg-highlight/10 text-highlight border-highlight/25';
    }
    if (affil.toLowerCase().includes('fmi') || affil.toLowerCase().includes('sofia university')) {
      return 'bg-accent/10 text-accent border-accent/25';
    }
    return 'bg-elevated text-secondary border-border-strong';
  };

  const handleCopyDiscord = (id, handle) => {
    navigator.clipboard.writeText(handle);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
              {lang === 'bg' ? 'Намери отбор' : 'Team Finder'}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
              {lang === 'bg' ? 'Намери отбор (Team Finder)' : 'Team Finder Board'}
            </h1>
            <p className="text-sm sm:text-base text-secondary max-w-2xl">
              {lang === 'bg'
                ? 'Намерете съотборници за BSides Sofia 2027, националните квалификации за ECSC или предстоящи онлайн състезания.'
                : 'Find teammates for BSides Sofia 2027, ECSC national qualifications, or weekend online competitions.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
              <input
                type="text"
                placeholder={lang === 'bg' ? 'Търсене на обяви...' : 'Search recruitment posts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-border-default bg-elevated text-strong text-sm focus:outline-none focus:border-accent w-full sm:w-56"
              />
            </div>

            <button
              onClick={onOpenPostLfg}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent hover:bg-accent-hover text-on-accent text-sm font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'bg' ? 'Публикувай обява' : 'Create Listing'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wide text-muted mr-2">
            {lang === 'bg' ? 'ФИЛТЪР:' : 'FILTER:'}
          </span>
          {postTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterType === type.id
                  ? 'bg-accent/12 text-accent'
                  : 'text-secondary hover:text-strong hover:bg-elevated'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* University Focus Note */}
      <div className="rounded-2xl border border-border-default bg-elevated p-4 text-sm text-secondary space-y-1">
        <span className="font-semibold text-strong block">
          {lang === 'bg'
            ? 'Сформирате студентски отбор в ТУ-София, ФМИ или УНСС?'
            : 'Forming a campus squad at TU Sofia, FMI, or UNWE?'}
        </span>
        <p className="leading-relaxed">
          {lang === 'bg'
            ? 'Не се изисква предварителен състезателен опит. Много студенти се свързват тук, за да тренират заедно в платформи като PicoCTF, OverTheWire и PortSwigger преди регистрация в CTFtime.'
            : 'Prior competitive experience is not required. Many students connect here to practice beginner tracks together on OverTheWire, PicoCTF, and PortSwigger before forming an official university roster.'}
        </p>
      </div>

      {/* Structured Listings Feed */}
      <div className="rounded-2xl border border-border-default bg-surface divide-y divide-divide overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-sm text-secondary">
            {lang === 'bg' ? 'Няма намерени обяви по критериите.' : 'No listings found matching your search.'}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 hover:bg-elevated transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-strong">
                    {post.author}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getAffiliationBadge(
                      post.affiliation
                    )}`}
                  >
                    {post.affiliation}
                  </span>
                  <span className="text-muted">•</span>
                  <span className="text-xs font-mono font-medium text-accent">
                    {post.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tabular-nums text-muted">
                    {post.time}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-accent/10 text-accent border border-accent/25">
                    {post.type}
                  </span>
                </div>
              </div>

              <p className="text-sm text-secondary leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-divide">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-secondary">
                    {lang === 'bg' ? 'Целево състезание:' : 'Target Event:'}
                  </span>
                  <span className="font-medium text-strong">
                    {post.targetEvent}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyDiscord(post.id, post.discord)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border-default hover:bg-elevated text-strong text-xs font-mono transition-colors cursor-pointer"
                    title={lang === 'bg' ? 'Копирай Discord потребител' : 'Copy Discord handle'}
                  >
                    <MessageSquare className="w-3 h-3 text-accent" />
                    <span>{post.discord}</span>
                    {copiedId === post.id ? (
                      <Check className="w-3 h-3 text-accent" />
                    ) : (
                      <Copy className="w-3 h-3 text-muted" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
