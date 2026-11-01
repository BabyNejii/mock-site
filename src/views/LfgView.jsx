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
      return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
    if (affil.toLowerCase().includes('fmi') || affil.toLowerCase().includes('sofia university')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    if (affil.toLowerCase().includes('unwe')) {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
  };

  const handleCopyDiscord = (id, handle) => {
    navigator.clipboard.writeText(handle);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#e4e4e7] dark:border-[#222632]">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
              {lang === 'bg' ? 'Намери отбор (Team Finder)' : 'Team Finder Board'}
            </h1>
            <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93]">
              {lang === 'bg'
                ? 'Намерете съотборници за BSides Sofia 2027, националните квалификации за ECSC или предстоящи онлайн състезания.'
                : 'Find teammates for BSides Sofia 2027, ECSC national qualifications, or weekend online competitions.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#64646e] dark:text-[#8a8a93]" />
              <input
                type="text"
                placeholder={lang === 'bg' ? 'Търсене на обяви...' : 'Search recruitment posts...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-md border border-[#e4e4e7] dark:border-[#222632] bg-[#f3f3f5] dark:bg-[#0c0e12] text-[#18181b] dark:text-[#ededef] text-xs focus:outline-none focus:border-[#00966e] w-full sm:w-56"
              />
            </div>

            <button
              onClick={onOpenPostLfg}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00966e] hover:bg-[#00825f] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'bg' ? 'Публикувай обява' : 'Create Listing'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93] mr-2">
            {lang === 'bg' ? 'ФИЛТЪР:' : 'FILTER:'}
          </span>
          {postTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterType === type.id
                  ? 'bg-[#18181b] text-white dark:bg-[#ededef] dark:text-[#0c0e12]'
                  : 'border border-[#e4e4e7] dark:border-[#222632] bg-transparent text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* University Focus Note */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] p-4 text-xs text-[#64646e] dark:text-[#8a8a93] space-y-1">
        <span className="font-semibold text-[#18181b] dark:text-[#ededef] block">
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
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] divide-y divide-[#e4e4e7] dark:divide-[#222632] overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64646e] dark:text-[#8a8a93]">
            {lang === 'bg' ? 'Няма намерени обяви по критериите.' : 'No listings found matching your search.'}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#18181b] dark:text-[#ededef]">
                    {post.author}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getAffiliationBadge(
                      post.affiliation
                    )}`}
                  >
                    {post.affiliation}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-xs font-mono font-medium text-[#00966e]">
                    {post.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93]">
                    {post.time}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#00966e]/10 text-[#00966e] border border-[#00966e]/20">
                    {post.type}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#e4e4e7] dark:border-[#222632]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#64646e] dark:text-[#8a8a93]">
                    {lang === 'bg' ? 'Целево състезание:' : 'Target Event:'}
                  </span>
                  <span className="font-medium text-[#18181b] dark:text-[#ededef]">
                    {post.targetEvent}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyDiscord(post.id, post.discord)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#e4e4e7] dark:border-[#222632] hover:bg-white dark:hover:bg-[#13161f] text-[#18181b] dark:text-[#ededef] text-xs font-mono transition-colors cursor-pointer"
                    title={lang === 'bg' ? 'Копирай Discord потребител' : 'Copy Discord handle'}
                  >
                    <MessageSquare className="w-3 h-3 text-[#00966e]" />
                    <span>{post.discord}</span>
                    {copiedId === post.id ? (
                      <Check className="w-3 h-3 text-[#00966e]" />
                    ) : (
                      <Copy className="w-3 h-3 text-[#64646e] dark:text-[#8a8a93]" />
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
