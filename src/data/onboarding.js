export const onboardingRoadmap = [
  {
    step: '01',
    title: 'Terminal Fluency & Linux Internals',
    timeframe: 'Weeks 1 to 3',
    description: 'Master the command line, POSIX utilities, scripting, and networking basics. CTF competitions demand rapid terminal execution and understanding of process memory.',
    keyTopics: ['Linux CLI & Permissions', 'Python 3 Automation', 'Bash Pipeling & Regex', 'TCP/IP Sockets & Wireshark'],
    recommendedResources: [
      { name: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/', note: 'Command-line security fundamentals' },
      { name: 'Wireshark Network Analysis', url: 'https://www.wireshark.org', note: 'Packet capture inspection' }
    ]
  },
  {
    step: '02',
    title: 'Introductory Jeopardy Flags',
    timeframe: 'Weeks 4 to 7',
    description: 'Solve entry-level flags in controlled sandbox environments before participating in timed 48-hour weekend tournaments.',
    keyTopics: ['Web Vulnerabilities (SQLi, XSS, SSRF)', 'Classical & RSA Cryptography', 'ELF Binary File Headers & Strings'],
    recommendedResources: [
      { name: 'PicoCTF (CMU)', url: 'https://picoctf.org', note: 'Standard worldwide novice CTF platform' },
      { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', note: 'Practical web application security' }
    ]
  },
  {
    step: '03',
    title: 'Toolchain & Decompilation',
    timeframe: 'Weeks 8 to 12',
    description: 'Equip the standard toolkit used by Bulgarian competitors for reverse engineering, memory corruption, and token tampering.',
    keyTopics: ['Ghidra & IDA Free Decompilation', 'pwntools & GDB-gef', 'Burp Suite Interception', 'CyberChef Transformations'],
    recommendedResources: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef/', note: 'Data decoding and hashing recipes' },
      { name: 'pwntools Documentation', url: 'https://docs.pwntools.com', note: 'Python binary exploitation framework' }
    ]
  },
  {
    step: '04',
    title: 'Team Bulgaria & Domestic Circuit',
    timeframe: 'Spring Annual Qualifier',
    description: 'Compete in the annual Cybersecurity Challenge Bulgaria trials (ecsc-bg.eu) to qualify for Team Bulgaria at the European Cyber Security Challenge (ECSC).',
    keyTopics: ['ECSC National Qualifiers', 'BSides Sofia Onsite CTF', 'Varsity Roster Formation (TU, FMI, UNWE)'],
    recommendedResources: [
      { name: 'Cybersecurity Challenge Bulgaria', url: 'https://ecsc-bg.eu', note: 'Official Team Bulgaria ECSC qualifiers' },
      { name: 'init Lab Sofia', url: 'https://initlab.org', note: 'Local hackerspace meetups and workshops' }
    ]
  }
];

export const commonFaq = [
  {
    q: 'Do I need a university degree to start playing CTFs?',
    a: 'No. Many Bulgarian security engineers started during high school or through self-directed study on OverTheWire and PicoCTF. Systematic problem solving and curiosity matter most.'
  },
  {
    q: 'How does team scoring work on CTFtime?',
    a: 'CTFtime calculates ratings based on the event weight (ranging from 0 to 100), the team’s final standing, and the number of participating teams. Ratings accumulate throughout each calendar year.'
  },
  {
    q: 'How is the Bulgarian National Team selected for ECSC?',
    a: 'Cybersecurity Challenge Bulgaria (CSCB) hosts an open national qualifier annually at ecsc-bg.eu for Bulgarian citizens aged 16 to 25. The top 10 finalists form Team Bulgaria and undergo intensive training for the European championship.'
  },
  {
    q: 'Are students from TU Sofia, FMI, or UNWE eligible to compete together?',
    a: 'Yes. CTFtime allows any combination of students and community members to register a team. Students can create a mixed squad or register under their university name using the registration tool.'
  }
];
