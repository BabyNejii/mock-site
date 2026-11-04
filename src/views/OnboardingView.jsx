import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { onboardingRoadmap, commonFaq } from '../data/onboarding';
import { useLanguage } from '../context/useLanguage';

export default function OnboardingView() {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  const categories = [
    {
      name: lang === 'bg' ? 'Уеб сигурност (Web)' : 'Web Exploitation',
      desc: lang === 'bg' ? 'Логически дефекти, SQL инжекции, XSS, SSRF, IDOR и удостоверяване в модерни уеб системи.' : 'Logic flaws, SQL injection, XSS, SSRF, IDOR, and authentication bypasses in modern web systems.',
      tools: 'Burp Suite, curl, python-requests, jwt_tool'
    },
    {
      name: lang === 'bg' ? 'Бинарна експлоатация (Pwn)' : 'Binary Exploitation (Pwn)',
      desc: lang === 'bg' ? 'Повреждане на паметта, препълване на стека и хийпа, ROP вериги и заобикаляне на ASLR/PIE защити.' : 'Memory corruption, buffer/heap overflows, ROP gadget chaining, format strings, and ASLR/PIE bypasses.',
      tools: 'pwntools, GDB-gef, checksec, ROPgadget'
    },
    {
      name: lang === 'bg' ? 'Обратен инженеринг (Reverse)' : 'Reverse Engineering',
      desc: lang === 'bg' ? 'Декомпилиране и динамичен анализ на ELF/PE бинарни файлове и вграден фърмуер.' : 'Decompiling and analyzing stripped ELF/PE binaries, malware samples, and embedded firmware.',
      tools: 'Ghidra, IDA Free, radare2, jadx'
    },
    {
      name: lang === 'bg' ? 'Криптография (Crypto)' : 'Cryptography',
      desc: lang === 'bg' ? 'Анализ на уязвими математически имплементации, слаби генератори на случайни числа и RSA атаки.' : 'Attacking flawed mathematical implementations, weak PRNGs, RSA factorization, and discrete logs.',
      tools: 'SageMath, Python, CyberChef'
    },
    {
      name: lang === 'bg' ? 'Дигитална криминалистика (Forensics)' : 'Digital Forensics',
      desc: lang === 'bg' ? 'Извличане на скрити данни от файлови формати, мрежови пакети и дъмп на оперативната памет.' : 'Carving corrupted file headers, memory dump triage, packet capture inspection, and filesystem artifacts.',
      tools: 'Wireshark, Volatility 3, binwalk, tshark'
    },
    {
      name: lang === 'bg' ? 'OSINT и разузнаване' : 'OSINT & Recon',
      desc: lang === 'bg' ? 'Търсене в публични регистри, DNS анализ, сертификатни логове и геолокация.' : 'Public asset mapping, DNS enumeration, certificate transparency logs, and geolocation triage.',
      tools: 'shodan.io, Amass, WHOIS, curl'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
          {lang === 'bg' ? 'Наръчник' : 'Starter Guide'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-strong">
          {lang === 'bg' ? 'Наръчник за първи стъпки в CTF' : 'Capture The Flag Starter Guide'}
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-3xl">
          {lang === 'bg'
            ? 'Структурирана програма за студенти от българските университети (ТУ-София, ФМИ, УНСС) и разработчици, навлизащи в състезателната киберсигурност.'
            : 'A structured roadmap for Bulgarian university students (TU Sofia, FMI, UNWE) and developers entering competitive cybersecurity.'}
        </p>
      </div>

      {/* Sequential Roadmap */}
      <div className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 mb-6 border-b border-border-default flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-strong">
              {lang === 'bg' ? 'Четиристепенно развитие' : 'The Four-Stage Progression'}
            </h2>
            <p className="text-sm text-secondary">
              {lang === 'bg'
                ? 'От първите конзолни команди до квалификациите за Европейското първенство'
                : 'From first terminal commands to European championship qualifications'}
            </p>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wide text-accent">
            {lang === 'bg' ? 'ПЪТНА КАРТА' : 'ROADMAP'}
          </span>
        </div>

        <div className="space-y-4">
          {onboardingRoadmap.map((stage) => (
            <div
              key={stage.step}
              className="p-5 rounded-2xl border border-border-default bg-elevated space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-accent/10 text-accent border border-accent/25 whitespace-nowrap shrink-0 tabular-nums">
                    {lang === 'bg' ? `ЕТАП ${stage.step}` : `STAGE ${stage.step}`}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-strong">
                    {stage.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted whitespace-nowrap shrink-0">
                  {stage.timeframe}
                </span>
              </div>

              <p className="text-sm text-secondary leading-relaxed">
                {stage.description}
              </p>

              <div>
                <span className="text-sm font-semibold text-strong block mb-1">
                  {lang === 'bg' ? 'Основни теми:' : 'Core Topics:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stage.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs bg-surface text-strong border border-border-default"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-divide">
                <span className="text-sm font-semibold text-strong block mb-1">
                  {lang === 'bg' ? 'Препоръчани платформи за подготовка:' : 'Recommended Training Platforms:'}
                </span>
                <div className="space-y-1">
                  {stage.recommendedResources.map((res, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>{res.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-secondary">{res.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Disciplines List */}
      <div className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 mb-4 border-b border-border-default">
          <h2 className="font-bold text-sm sm:text-base text-strong">
            {lang === 'bg' ? 'Основни категории и препоръчан софтуер' : 'Standard CTF Categories & Toolchains'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-border-default bg-elevated space-y-1.5"
            >
              <h3 className="font-bold text-sm text-strong">
                {cat.name}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-1 text-xs font-mono text-accent">
                <span className="text-secondary font-sans">
                  {lang === 'bg' ? 'Инструменти: ' : 'Tools: '}
                </span>
                {cat.tools}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-2xl border border-border-default bg-surface p-6">
        <div className="pb-3 mb-4 border-b border-border-default">
          <h2 className="font-bold text-sm sm:text-base text-strong">
            {lang === 'bg' ? 'Често задавани въпроси' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="divide-y divide-divide border border-border-default rounded-2xl overflow-hidden">
          {commonFaq.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-transparent">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-strong hover:bg-elevated transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 bg-elevated text-sm text-secondary leading-relaxed border-t border-divide">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
