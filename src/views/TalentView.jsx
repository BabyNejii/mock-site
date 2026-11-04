import React, { useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { mockJobs, mockSponsors } from '../data/talent';
import { useLanguage } from '../context/useLanguage';

export default function TalentView() {
  const { lang } = useLanguage();
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleSimulateApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
          {lang === 'bg' ? 'Кариери' : 'Careers'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
          {lang === 'bg' ? 'Кариерен център и партньори' : 'Infosec Careers and Ecosystem Sponsors'}
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-3xl">
          {lang === 'bg'
            ? 'Свързване на български специалисти по обратен инженеринг, тестване за проникване и университетски състезатели с водещи отбори по сигурност в София.'
            : 'Connecting Bulgarian reverse engineers, penetration testers, and university CTF competitors with offensive security teams in Sofia.'}
        </p>
      </div>

      {/* Rationale Note */}
      <div className="rounded-2xl border border-border-default bg-elevated p-5">
        <h2 className="font-semibold text-sm text-strong mb-1">
          {lang === 'bg'
            ? 'Защо компаниите за сигурност търсят таланти директно от CTF състезания?'
            : 'Why do Bulgarian security firms recruit directly from CTF competitions?'}
        </h2>
        <p className="text-sm text-secondary leading-relaxed">
          {lang === 'bg'
            ? 'Отборите по офанзивна сигурност търсят хора с реален практически опит в решаването на нестандартни проблеми. Успешното решаване на практически задачи (повреждане на памет, анализ на фърмуер, уязвимости в криптография) доказва упоритост и дълбоки познания, които стандартните сертификационни тестове не винаги отразяват.'
            : 'Offensive security teams in Sofia look for hands-on problem solvers. Solving real CTF challenges (heap corruption, binary reverse engineering, cryptographic flaws) demonstrates practical persistence and deep technical skill that standard multiple-choice certifications often cannot capture.'}
        </p>
      </div>

      {/* Open Positions Section */}
      <div className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 mb-4 border-b border-border-default flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-strong">
              {lang === 'bg'
                ? 'Отворени инженерни позиции в София и дистанционно'
                : 'Open Engineering Roles in Sofia & Remote BG'}
            </h2>
            <p className="text-sm text-secondary">
              {lang === 'bg' ? 'Позиции, изискващи практически CTF умения' : 'Positions requiring practical CTF competencies'}
            </p>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wide tabular-nums text-accent">
            {mockJobs.length} {lang === 'bg' ? 'ПОЗИЦИИ' : 'POSITIONS'}
          </span>
        </div>

        <div className="divide-y divide-divide">
          {mockJobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);
            return (
              <div key={job.id} className="py-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-strong">
                      {job.role}
                    </h3>
                    <div className="text-sm text-secondary mt-0.5">
                      <span className="font-medium text-strong">{job.company}</span> (Sofia, Bulgaria)
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-elevated text-secondary border border-border-default self-start sm:self-auto">
                    {job.type}
                  </span>
                </div>

                {/* CTF Relevance Callout */}
                <div className="p-3 rounded-xl border border-accent/25 bg-accent/10 text-sm text-strong">
                  <span className="font-semibold text-accent block mb-0.5">
                    {lang === 'bg' ? 'Търсени състезателни умения:' : 'Target CTF Skillset:'}
                  </span>
                  <p>{job.ctfRelevance}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-sm font-semibold text-strong block">
                    {lang === 'bg' ? 'Основни изисквания:' : 'Core Requirements:'}
                  </span>
                  <ul className="space-y-1 text-sm text-secondary">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent font-mono">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-bold tabular-nums text-strong">
                      {job.salary}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-elevated text-secondary border border-border-default"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSimulateApply(job.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                      hasApplied
                        ? 'border border-accent bg-accent/10 text-accent'
                        : 'bg-accent hover:bg-accent-hover text-on-accent'
                    }`}
                  >
                    {hasApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'bg' ? 'Заявката е изпратена' : 'Application Registered'}</span>
                      </>
                    ) : (
                      <>
                        <span>{lang === 'bg' ? 'Кандидатствай' : 'Apply via CTF Profile'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Partners */}
      <div className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 mb-4 border-b border-border-default">
          <h2 className="font-bold text-sm sm:text-base text-strong">
            {lang === 'bg' ? 'Партньори и домакини на събития' : 'Community Partners and Event Hosts'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockSponsors.map((sp, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-border-default bg-elevated space-y-1.5"
            >
              <span className="text-[10px] font-mono font-semibold text-accent bg-accent/10 px-1.5 py-0.5 rounded inline-block">
                {sp.tier}
              </span>
              <h3 className="font-bold text-sm text-strong">
                {sp.name}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {sp.contribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
