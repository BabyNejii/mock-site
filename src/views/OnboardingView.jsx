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
      {/* Header Panel */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] p-6 shadow-xs transition-colors">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181b] dark:text-[#ededef]">
          {lang === 'bg' ? 'Наръчник за първи стъпки в CTF' : 'Capture The Flag Starter Guide'}
        </h1>
        <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] mt-1 max-w-3xl">
          {lang === 'bg'
            ? 'Структурирана програма за студенти от българските университети (ТУ-София, ФМИ, УНСС) и разработчици, навлизащи в състезателната киберсигурност.'
            : 'A structured roadmap for Bulgarian university students (TU Sofia, FMI, UNWE) and developers entering competitive cybersecurity.'}
        </p>
      </div>

      {/* Sequential Roadmap */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] p-6 shadow-xs">
        <div className="pb-3 mb-6 border-b border-[#d6dae1] dark:border-[#292f42] flex items-center justify-between">
          <div>
            <h2 className="font-bold text-sm sm:text-base text-[#18181b] dark:text-[#ededef]">
              {lang === 'bg' ? 'Четиристепенно развитие' : 'The Four-Stage Progression'}
            </h2>
            <p className="text-xs text-[#64646e] dark:text-[#8a8a93]">
              {lang === 'bg'
                ? 'От първите конзолни команди до квалификациите за Европейското първенство'
                : 'From first terminal commands to European championship qualifications'}
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-[#00966e]">
            {lang === 'bg' ? 'ПЪТНА КАРТА' : 'ROADMAP'}
          </span>
        </div>

        <div className="space-y-4">
          {onboardingRoadmap.map((stage) => (
            <div
              key={stage.step}
              className="p-5 rounded-lg border border-[#d6dae1] dark:border-[#292f42] bg-[#f0f3f6] dark:bg-[#141722] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00966e]/10 text-[#00966e] border border-[#00966e]/20 whitespace-nowrap shrink-0">
                    {lang === 'bg' ? `ЕТАП ${stage.step}` : `STAGE ${stage.step}`}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#18181b] dark:text-[#ededef]">
                    {stage.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#64646e] dark:text-[#8a8a93] whitespace-nowrap shrink-0">
                  {stage.timeframe}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
                {stage.description}
              </p>

              <div>
                <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1">
                  {lang === 'bg' ? 'Основни теми:' : 'Core Topics:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {stage.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs bg-white dark:bg-[#1a1e2b] text-[#18181b] dark:text-[#ededef] border border-[#d6dae1] dark:border-[#292f42]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#d6dae1] dark:border-[#292f42]">
                <span className="text-xs font-semibold text-[#18181b] dark:text-[#ededef] block mb-1">
                  {lang === 'bg' ? 'Препоръчани платформи за подготовка:' : 'Recommended Training Platforms:'}
                </span>
                <div className="space-y-1">
                  {stage.recommendedResources.map((res, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00966e] hover:underline inline-flex items-center gap-1 font-semibold"
                      >
                        <span>{res.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className="text-[#64646e] dark:text-[#8a8a93]">{res.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Disciplines List */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] p-6 shadow-xs">
        <div className="pb-3 mb-4 border-b border-[#d6dae1] dark:border-[#292f42]">
          <h2 className="font-bold text-sm sm:text-base text-[#18181b] dark:text-[#ededef]">
            {lang === 'bg' ? 'Основни категории и препоръчан софтуер' : 'Standard CTF Categories & Toolchains'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="p-4 rounded-lg border border-[#d6dae1] dark:border-[#292f42] bg-[#f0f3f6] dark:bg-[#141722] space-y-1.5"
            >
              <h3 className="font-bold text-xs sm:text-sm text-[#18181b] dark:text-[#ededef]">
                {cat.name}
              </h3>
              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-1 text-xs font-mono text-[#00966e]">
                <span className="text-[#64646e] dark:text-[#8a8a93] font-sans">
                  {lang === 'bg' ? 'Инструменти: ' : 'Tools: '}
                </span>
                {cat.tools}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-xl border border-[#d6dae1] dark:border-[#292f42] bg-white dark:bg-[#1a1e2b] p-6 shadow-xs">
        <div className="pb-3 mb-4 border-b border-[#d6dae1] dark:border-[#292f42]">
          <h2 className="font-bold text-sm sm:text-base text-[#18181b] dark:text-[#ededef]">
            {lang === 'bg' ? 'Често задавани въпроси' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="divide-y divide-[#e4e4e7] dark:divide-[#222632] border border-[#d6dae1] dark:border-[#292f42] rounded-lg overflow-hidden">
          {commonFaq.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-transparent">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#18181b] dark:text-[#ededef] hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#64646e] dark:text-[#8a8a93]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#64646e] dark:text-[#8a8a93]" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 bg-[#f0f3f6] dark:bg-[#141722] text-xs sm:text-sm text-[#64646e] dark:text-[#8a8a93] leading-relaxed border-t border-[#d6dae1] dark:border-[#292f42]">
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
