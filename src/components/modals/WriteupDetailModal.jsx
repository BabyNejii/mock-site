import React, { useState } from 'react';
import { X, Check, Copy, Code2 } from 'lucide-react';

export default function WriteupDetailModal({ writeup, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!writeup) return null;

  const handleCopyCode = () => {
    if (!writeup.snippet) return;
    navigator.clipboard.writeText(writeup.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-lg border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#131315] p-6 shadow-2xl transition-all max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#d6dae1] dark:border-[#292f42] shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#00966e]/10 text-[#00966e] border border-[#00966e]/20">
                {writeup.category}
              </span>
              <span className="text-xs text-[#64646e] dark:text-[#8a8a93]">
                Difficulty: {writeup.difficulty}
              </span>
              <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93]">
                {writeup.readTime}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#18181b] dark:text-[#ededef]">
              {writeup.title}
            </h2>
            <p className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-1">
              By <strong className="text-[#18181b] dark:text-[#ededef]">{writeup.author}</strong> ({writeup.team}) for {writeup.event}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded border border-[#d6dae1] dark:border-[#292f42] hover:bg-[#f3f3f5] dark:hover:bg-[#18181c] text-[#64646e] dark:text-[#8a8a93] hover:text-[#18181b] dark:hover:text-[#ededef] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
          <div>
            <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1">
              Challenge Overview
            </span>
            <p className="rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5]/50 dark:bg-[#131620]/50 p-3.5 text-[#18181b] dark:text-[#ededef]">
              {writeup.summary}
            </p>
          </div>

          {/* Exploit PoC Snippet */}
          {writeup.snippet && (
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#00966e]" />
                  <span>Exploit Script (Python)</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 text-xs text-[#00966e] hover:underline font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied script' : 'Copy script'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs bg-[#f3f3f5] dark:bg-[#131620] text-[#00966e] p-3.5 rounded border border-[#d6dae1] dark:border-[#292f42] overflow-x-auto leading-relaxed">
                <code>{writeup.snippet}</code>
              </pre>
            </div>
          )}

          {/* Full Content */}
          <div>
            <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1">
              Methodology and Walkthrough
            </span>
            <div className="whitespace-pre-line rounded border border-[#d6dae1] dark:border-[#292f42] bg-[#f3f3f5]/50 dark:bg-[#131620]/50 p-4 text-[#18181b] dark:text-[#ededef]">
              {writeup.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-[#d6dae1] dark:border-[#292f42] flex items-center justify-between text-xs shrink-0">
          <span className="text-[#64646e] dark:text-[#8a8a93] text-[11px]">
            ctf.bg technical writeup archive
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#18181b] hover:bg-black dark:bg-[#ededef] dark:hover:bg-white text-white dark:text-[#0c0c0e] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
