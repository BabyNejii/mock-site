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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-2xl border border-border-default bg-elevated p-6 shadow-2xl transition-all max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-divide shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono font-medium bg-accent/10 text-accent border border-accent/20">
                {writeup.category}
              </span>
              <span className="text-xs text-muted">
                Difficulty: {writeup.difficulty}
              </span>
              <span className="text-xs font-mono text-muted">
                {writeup.readTime}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-strong">
              {writeup.title}
            </h2>
            <p className="text-xs text-muted mt-1">
              By <strong className="text-strong">{writeup.author}</strong> ({writeup.team}) for {writeup.event}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg border border-border-default hover:bg-surface text-muted hover:text-strong transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-secondary leading-relaxed">
          <div>
            <span className="text-xs font-semibold text-strong block mb-1">
              Challenge Overview
            </span>
            <p className="rounded-lg border border-border-default bg-surface/50 p-3.5 text-strong">
              {writeup.summary}
            </p>
          </div>

          {/* Exploit PoC Snippet */}
          {writeup.snippet && (
            <div>
              <div className="flex items-center justify-between pb-1.5">
                <span className="text-xs font-semibold text-strong flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <span>Exploit Script (Python)</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied script' : 'Copy script'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs bg-surface text-accent p-3.5 rounded-lg border border-border-default overflow-x-auto leading-relaxed">
                <code>{writeup.snippet}</code>
              </pre>
            </div>
          )}

          {/* Full Content */}
          <div>
            <span className="text-xs font-semibold text-strong block mb-1">
              Methodology and Walkthrough
            </span>
            <div className="whitespace-pre-line rounded-lg border border-border-default bg-surface/50 p-4 text-strong">
              {writeup.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3.5 border-t border-divide flex items-center justify-between text-xs shrink-0">
          <span className="text-muted text-[11px]">
            ctf.bg technical writeup archive
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-on-accent font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
