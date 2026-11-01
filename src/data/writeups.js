export const mockWriteups = [
  {
    id: 'bsides-2026-pwn-heap-troubles',
    title: 'BSides Sofia 2026 — Heap of Troubles (x86_64)',
    event: 'BSides Sofia CTF 2026',
    category: 'Binary Exploitation / Pwn',
    author: 'k4m3n',
    team: 'Perperikon',
    difficulty: 'Hard',
    points: 450,
    solves: 3,
    readTime: '8 min read',
    date: '2026-10-18',
    summary: 'Exploiting a glibc 2.38 off-by-null byte in a custom memory chunk allocator using House of Einherjar and safe linking bypass.',
    snippet: `// Safe-linking deobfuscation helper
uint64_t deobfuscate(uint64_t val) {
    uint64_t mask = 0xfffULL << 52;
    while (mask) {
        val ^= (val & mask) >> 12;
        mask >>= 12;
    }
    return val;
}`,
    content: `
### Challenge Overview
The binary presented a menu-driven note management service running on Ubuntu 24.04 with glibc 2.38. All modern protections were active (Full RELRO, Canary, PIE, NX, Fortify).

### Vulnerability Analysis
In the \`edit_note()\` subroutine, the length check allowed writing exactly 1 extra byte beyond the allocated chunk when index matched \`0x40\`. This provided a single null byte overflow into the next chunk's \`size\` header, clearing \`PREV_INUSE\`.

### Exploitation Strategy
1. **Heap Grooming:** Allocate multiple 0x480 chunks to prevent consolidation with top chunk.
2. **Leak Libc & Heap:** Free an unsorted bin chunk, read via use-after-free read primitive.
3. **Safe Linking Bypass:** In glibc 2.38, pointers are mangled with \`L = P ^ (A >> 12)\`. We reconstruct the uncorrupted pointer using the heap base leak.
4. **House of Einherjar:** Trigger backward consolidation into our forged fake chunk, granting overlapping read/write primitives.
5. **Target \`environ\` & ROP:** Leak the stack address via libc \`environ\`, rewrite saved RIP with an \`execve('/bin/sh', 0, 0)\` ROP chain.
    `
  },
  {
    id: 'ecsc-2025-crypto-ecdsa-nonce',
    title: 'ECSC Quals — Biased Nonce ECDSA Signature Forgery',
    event: 'ECSC Bulgaria Qualifiers',
    category: 'Cryptography',
    author: 'stoyan_fmi',
    team: 'FMI Binary Guild',
    difficulty: 'Medium',
    points: 300,
    solves: 7,
    readTime: '6 min read',
    date: '2026-09-02',
    summary: 'Recovering the private key from 30 flawed ECDSA signatures leaking the top 4 bits of the ephemeral nonce using Bleichenbacher lattice reduction.',
    snippet: `from sage.all import *
# Setting up the CVP lattice for biased ECDSA nonce
B = matrix(QQ, n + 2, n + 2)
# Populate diagonal and target weights ...
L = B.LLL()`,
    content: `
### Challenge Overview
A verification oracle gave us signed authorization tokens. Inspection of the backend showed the pseudo-random nonce generator had a flaw: the most significant 4 bits were consistently zeros (\`nonce < 2^252\` on secp256k1).

### Attack Methodology
We modeled the Hidden Number Problem (HNP) as a Closest Vector Problem (CVP) using Babai’s nearest plane algorithm:
1. Collected 32 signature tuples \`(r_i, s_i, h_i)\`.
2. Built a lattice matrix scaled by the known bounds.
3. Applied LLL / BKZ-20 reduction in SageMath to recover the secret scalar \`d\`.
    `
  },
  {
    id: 'bsides-2026-web-jwt-jwks',
    title: 'BSides Sofia 2026 — Key Injection via Malicious jku',
    event: 'BSides Sofia CTF 2026',
    category: 'Web Security',
    author: 'v3x0r',
    team: 'Dead Pirate Society',
    difficulty: 'Easy',
    points: 150,
    solves: 24,
    readTime: '4 min read',
    date: '2026-10-17',
    summary: 'Bypassing regex validation on JWT header jku URL parameter using open redirect to forge arbitrary admin claims.',
    snippet: `// Forged JWT Header
{
  "alg": "RS256",
  "typ": "JWT",
  "jku": "https://auth.internal.ctf.bg@attacker-site.com/.well-known/jwks.json"
}`,
    content: `
### Vulnerability
The backend validated that the \`jku\` string began with \`https://auth.internal.ctf.bg\`, but passed it unchecked to standard \`fetch()\`. By using URL userinfo syntax (\`https://trusted@malicious.com\`), the request resolved to our controlled JWKS server. We minted our own RSA keypair and signed the token with \`role: "root_admin"\`.
    `
  },
  {
    id: 'openfest-hardware-uart-dump',
    title: 'OpenFest 2026 — Dump & Decrypt IoT Router Firmware',
    event: 'OpenFest Security Village',
    category: 'Hardware / Forensics',
    author: '0xRadko',
    team: 'init_0',
    difficulty: 'Medium',
    points: 250,
    solves: 12,
    readTime: '5 min read',
    date: '2026-11-01',
    summary: 'Identifying test pads on a custom ESP32 board, dropping into U-Boot shell via UART at 115200 baud, and extracting hardcoded credentials.',
    snippet: `screen /dev/ttyUSB0 115200
# Hit space on boot to enter U-Boot
=> md.b 0x3ff00000 0x100
# Found AES-128 key in unencrypted bootloader ROM`,
    content: `
### Reconnaissance
Using a multimeter in continuity mode, we traced ground, Tx, and Rx pins to unpopulated test pads labeled TP4/TP5. Hooked up a FTDI USB-to-UART adapter. Interrupted the 3-second boot delay, dumped SPI flash memory, and parsed the SquashFS rootfs to extract the hidden administrator flag.
    `
  }
];
