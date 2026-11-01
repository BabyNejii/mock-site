import React from 'react';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';

export default function CampusNotice({ onNavigate }) {
  const { lang, t } = useLanguage();

  const universities = [
    {
      code: 'TU-SOFIA',
      name: lang === 'bg' ? 'Технически университет - София' : 'Technical University of Sofia',
      faculty: lang === 'bg' ? 'Факултет по Компютърни системи и технологии' : 'Faculty of Computer Systems & Technologies',
      activeRecruits: lang === 'bg' ? '4 студентски обяви' : '4 student listings',
      status: lang === 'bg' ? 'Активни индивидуални състезатели, предстои сформиране на отбор в CTFtime' : 'Active ad-hoc competitors, unregistered varsity roster on CTFtime',
      disciplines: lang === 'bg' ? ['Бинарна експлоатация', 'Уеб сигурност', 'Вградени системи'] : ['Binary Exploitation', 'Web Security', 'Embedded Systems'],
      tagColor: 'border-blue-500/25 text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      code: 'SU-FMI',
      name: lang === 'bg' ? 'Софийски университет (ФМИ)' : 'Sofia University (FMI)',
      faculty: lang === 'bg' ? 'Факултет по математика и информатика' : 'Faculty of Mathematics and Informatics',
      activeRecruits: lang === 'bg' ? '2 студентски обяви' : '2 student listings',
      status: lang === 'bg' ? 'Активни индивидуални състезатели, предстои сформиране на отбор в CTFtime' : 'Active ad-hoc competitors, unregistered varsity roster on CTFtime',
      disciplines: lang === 'bg' ? ['Приложна криптография', 'Алгоритми', 'Обратен инженеринг'] : ['Applied Cryptography', 'Algorithms', 'Reverse Engineering'],
      tagColor: 'border-purple-500/25 text-purple-600 dark:text-purple-400 bg-purple-500/10'
    },
    {
      code: 'UNWE',
      name: lang === 'bg' ? 'УНСС' : 'University of National and World Economy',
      faculty: lang === 'bg' ? 'Катедра Информационни технологии и киберсигурност' : 'Department of Information Technologies & Cybersecurity',
      activeRecruits: lang === 'bg' ? '1 студентска обява' : '1 student listing',
      status: lang === 'bg' ? 'Активни индивидуални състезатели, предстои сформиране на отбор в CTFtime' : 'Active ad-hoc competitors, unregistered varsity roster on CTFtime',
      disciplines: lang === 'bg' ? ['Дигитална криминалистика', 'Мрежова защита', 'Тризначен анализ'] : ['Digital Forensics', 'Network Defense', 'Incident Triage'],
      tagColor: 'border-emerald-500/25 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <section className="rounded-xl border border-[#e4e4e7] dark:border-[#222632] bg-white dark:bg-[#13161f] p-6 sm:p-7 shadow-xs transition-colors space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#e4e4e7] dark:border-[#222632]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#00966e]" />
            <h2 className="text-base font-bold text-[#18181b] dark:text-[#ededef]">
              {t.hub.campusTitle}
            </h2>
          </div>
          <p className="text-xs text-[#64646e] dark:text-[#8a8a93]">
            {t.hub.campusSubtitle}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0 self-start">
          {t.hub.unregisteredBadge}
        </span>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {universities.map((uni) => (
          <div
            key={uni.code}
            className="p-5 rounded-lg border border-[#e4e4e7] dark:border-[#222632] bg-[#f8f9fa] dark:bg-[#0f1117] space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${uni.tagColor}`}>
                  {uni.code}
                </span>
                <span className="text-[11px] font-mono text-[#64646e] dark:text-[#8a8a93]">
                  {uni.activeRecruits}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#18181b] dark:text-[#ededef]">
                  {uni.name}
                </h3>
                <span className="block text-[11px] text-[#64646e] dark:text-[#8a8a93] mt-0.5">
                  {uni.faculty}
                </span>
              </div>

              <p className="text-xs text-[#64646e] dark:text-[#8a8a93] leading-relaxed pt-1">
                {uni.status}
              </p>
            </div>

            <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#222632]">
              <span className="block text-[10px] font-mono uppercase text-[#64646e] dark:text-[#8a8a93] mb-1.5">
                {t.hub.focusDisciplines}
              </span>
              <div className="flex flex-wrap gap-1">
                {uni.disciplines.map((d, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-[#181b24] border border-[#e4e4e7] dark:border-[#222632] text-[#18181b] dark:text-[#ededef]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#64646e] dark:text-[#8a8a93] max-w-xl leading-relaxed">
          {t.hub.campusCta}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('lfg')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#18181b] hover:bg-black dark:bg-[#ededef] dark:hover:bg-white text-white dark:text-[#0c0e12] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.hub.browseListings}</span>
          </button>
          <button
            onClick={() => onNavigate('onboarding')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#e4e4e7] dark:border-[#222632] hover:bg-[#f3f3f5] dark:hover:bg-[#181b24] text-[#18181b] dark:text-[#ededef] text-xs font-semibold transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#00966e]" />
            <span>{t.hub.trainingRoadmap}</span>
            <ArrowRight className="w-3 h-3 text-[#64646e] dark:text-[#8a8a93]" />
          </button>
        </div>
      </div>
    </section>
  );
}
