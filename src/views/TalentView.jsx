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
      {/* Header Panel */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 shadow-xs transition-colors">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
          {lang === 'bg' ? 'Кариерен център и партньори' : 'Infosec Careers and Ecosystem Sponsors'}
        </h1>
        <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] mt-1 max-w-3xl">
          {lang === 'bg'
            ? 'Свързване на български специалисти по обратен инженеринг, тестване за проникване и университетски състезатели с водещи отбори по сигурност в София.'
            : 'Connecting Bulgarian reverse engineers, penetration testers, and university CTF competitors with offensive security teams in Sofia.'}
        </p>
      </div>

      {/* Rationale Note */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] p-5">
        <h2 className="font-semibold text-xs sm:text-sm text-[#18181b] dark:text-[#ededef] mb-1">
          {lang === 'bg'
            ? 'Защо компаниите за сигурност търсят таланти директно от CTF състезания?'
            : 'Why do Bulgarian security firms recruit directly from CTF competitions?'}
        </h2>
        <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
          {lang === 'bg'
            ? 'Отборите по офанзивна сигурност търсят хора с реален практически опит в решаването на нестандартни проблеми. Успешното решаване на практически задачи (повреждане на памет, анализ на фърмуер, уязвимости в криптография) доказва упоритост и дълбоки познания, които стандартните сертификационни тестове не винаги отразяват.'
            : 'Offensive security teams in Sofia look for hands-on problem solvers. Solving real CTF challenges (heap corruption, binary reverse engineering, cryptographic flaws) demonstrates practical persistence and deep technical skill that standard multiple-choice certifications often cannot capture.'}
        </p>
      </div>

      {/* Open Positions Section */}
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 shadow-xs">
        <div className="pb-3 mb-4 border-b border-[#e4e4e7] dark:border-[#222632] flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-[#18181b] dark:text-[#ededef]">
              {lang === 'bg'
                ? 'Отворени инженерни позиции в София и дистанционно'
                : 'Open Engineering Roles in Sofia & Remote BG'}
            </h2>
            <p className="text-xs text-[#64646e] dark:text-[#8a8a93]">
              {lang === 'bg' ? 'Позиции, изискващи практически CTF умения' : 'Positions requiring practical CTF competencies'}
            </p>
          </div>
          <span className="text-xs font-mono text-[#00966e]">
            {mockJobs.length} {lang === 'bg' ? 'ПОЗИЦИИ' : 'POSITIONS'}
          </span>
        </div>

        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222632]">
          {mockJobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);
            return (
              <div key={job.id} className="py-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#18181b] dark:text-[#ededef]">
                      {job.role}
                    </h3>
                    <div className="text-xs text-[#64646e] dark:text-[#8a8a93] mt-0.5">
                      <span className="font-medium text-[#18181b] dark:text-[#ededef]">{job.company}</span> (Sofia, Bulgaria)
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f3f3f5] dark:bg-[#0c0e12] text-[#64646e] dark:text-[#8a8a93] border border-[#e4e4e7] dark:border-[#222632] self-start sm:self-auto">
                    {job.type}
                  </span>
                </div>

                {/* CTF Relevance Callout */}
                <div className="p-3 rounded-lg border border-[#00966e]/20 bg-[#00966e]/5 text-xs text-[#18181b] dark:text-[#ededef]">
                  <span className="font-semibold text-[#00966e] block mb-0.5">
                    {lang === 'bg' ? 'Търсени състезателни умения:' : 'Target CTF Skillset:'}
                  </span>
                  <p>{job.ctfRelevance}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block">
                    {lang === 'bg' ? 'Основни изисквания:' : 'Core Requirements:'}
                  </span>
                  <ul className="space-y-1 text-xs text-[#64646e] dark:text-[#8a8a93]">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00966e] font-mono">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#18181b] dark:text-[#ededef]">
                      {job.salary}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#f8f9fa] dark:bg-[#0f1117] text-[#64646e] dark:text-[#8a8a93] border border-[#e4e4e7] dark:border-[#222632]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSimulateApply(job.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                      hasApplied
                        ? 'border border-[#00966e] bg-[#00966e]/10 text-[#00966e]'
                        : 'bg-[#00966e] hover:bg-[#00825f] text-white shadow-xs'
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
      <div className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 shadow-xs">
        <div className="pb-3 mb-4 border-b border-[#e4e4e7] dark:border-[#222632]">
          <h2 className="font-bold text-sm sm:text-base text-[#18181b] dark:text-[#ededef]">
            {lang === 'bg' ? 'Партньори и домакини на събития' : 'Community Partners and Event Hosts'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockSponsors.map((sp, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] space-y-1.5"
            >
              <span className="text-[10px] font-mono font-semibold text-[#00966e] bg-[#00966e]/10 px-1.5 py-0.5 rounded inline-block">
                {sp.tier}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-[#18181b] dark:text-[#ededef]">
                {sp.name}
              </h3>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
                {sp.contribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
