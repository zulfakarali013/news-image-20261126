// Original flat drawings for the panels, one small function per scene.
// Every scene is drawn in the same 200 x 120 box so leads and panels can share them.

const sky = (top, bottom) =>
  `<defs><linearGradient id="g${top.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs><rect width="200" height="120" fill="url(#g${top.slice(1)})"/>`;

const ground = (c, y = 96) => `<rect y="${y}" width="200" height="${120 - y}" fill="${c}"/>`;

const flame = (x, y, s = 1) =>
  `<path d="M${x} ${y} c${-9 * s} ${-10 * s} ${-4 * s} ${-22 * s} ${2 * s} ${-30 * s} c${1 * s} ${8 * s} ${8 * s} ${10 * s} ${8 * s} ${18 * s} c${4 * s} ${-4 * s} ${4 * s} ${-9 * s} ${3 * s} ${-12 * s} c${7 * s} ${7 * s} ${8 * s} ${18 * s} ${-1 * s} ${24 * s} z" fill="#e8662a"/><path d="M${x + 1 * s} ${y} c${-4 * s} ${-6 * s} ${-1 * s} ${-12 * s} ${3 * s} ${-16 * s} c${1 * s} ${6 * s} ${5 * s} ${8 * s} ${3 * s} ${16 * s} z" fill="#f7c445"/>`;

export const scenes = {
  // New York: wind-bent trees, rain, a deflated parade balloon tied down, dark windows.
  storm: () =>
    sky('#3b4a5e', '#6d7f93') +
    [20, 52, 150, 176].map((x, i) => `<rect x="${x}" y="${40 + (i % 2) * 12}" width="24" height="${60 - (i % 2) * 12}" fill="#2b3442"/>` +
      [0, 1, 2].map((r) => `<rect x="${x + 5}" y="${48 + (i % 2) * 12 + r * 14}" width="5" height="6" fill="#1a1f28"/><rect x="${x + 14}" y="${48 + (i % 2) * 12 + r * 14}" width="5" height="6" fill="#1a1f28"/>`).join('')).join('') +
    ground('#4b5563') +
    Array.from({ length: 26 }, (_, i) => `<line x1="${(i * 23) % 200}" y1="${(i * 17) % 60}" x2="${((i * 23) % 200) - 9}" y2="${((i * 17) % 60) + 22}" stroke="#c9d6e3" stroke-width="1.2" opacity=".7"/>`).join('') +
    `<ellipse cx="100" cy="78" rx="26" ry="14" fill="#e85d4a" transform="rotate(-12 100 78)"/><ellipse cx="96" cy="74" rx="8" ry="4" fill="#f39b8c" transform="rotate(-12 96 74)"/>` +
    `<line x1="84" y1="88" x2="80" y2="100" stroke="#ddd" stroke-width="1.4"/><line x1="116" y1="82" x2="122" y2="100" stroke="#ddd" stroke-width="1.4"/>` +
    `<path d="M118 30 q30 -6 44 6 q-16 -2 -30 6" fill="none" stroke="#e5edf5" stroke-width="3" stroke-linecap="round"/><path d="M110 46 q26 -4 40 4" fill="none" stroke="#e5edf5" stroke-width="2.4" stroke-linecap="round"/>` +
    `<rect x="62" y="102" width="76" height="12" rx="2" fill="#f2efe6"/><text x="100" y="111" font-size="8" font-weight="800" text-anchor="middle" fill="#b3261e" font-family="Noto Sans">PARADE · SAT 28 NOV</text>`,

  // Kuwait: desert radar station, an intercept burst in the sky, falling fragments.
  drone: () =>
    sky('#e9b97a', '#f6dfb6') + ground('#d2a86a', 92) +
    `<rect x="30" y="70" width="44" height="24" fill="#8a7a62"/><rect x="40" y="58" width="6" height="14" fill="#6b5e4c"/>` +
    `<path d="M30 58 q13 -18 26 0 z" fill="#b8b0a2"/><line x1="43" y1="50" x2="43" y2="58" stroke="#6b5e4c" stroke-width="2"/>` +
    `<rect x="120" y="76" width="56" height="18" fill="#9a8a70"/><rect x="128" y="64" width="18" height="12" fill="#7d6f58"/>` +
    `<circle cx="138" cy="32" r="16" fill="#fff3c4"/><circle cx="138" cy="32" r="9" fill="#f7a63a"/>` +
    Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return `<line x1="${138 + Math.cos(a) * 12}" y1="${32 + Math.sin(a) * 12}" x2="${138 + Math.cos(a) * 24}" y2="${32 + Math.sin(a) * 24}" stroke="#e8662a" stroke-width="2"/>`; }).join('') +
    [[110, 56], [124, 62], [150, 60], [98, 70]].map(([x, y]) => `<rect x="${x}" y="${y}" width="4" height="3" fill="#3b2f25" transform="rotate(30 ${x} ${y})"/><line x1="${x}" y1="${y}" x2="${x + 8}" y2="${y - 12}" stroke="#3b2f25" stroke-width=".8" opacity=".5"/>`).join('') +
    `<path d="M60 20 l14 4 l-14 4 l3 -4 z" fill="#4a4a4a"/><line x1="74" y1="24" x2="122" y2="30" stroke="#fff" stroke-width="1.2" stroke-dasharray="3 3"/>` +
    `<rect x="8" y="100" width="92" height="15" rx="2" fill="#b3261e"/><text x="54" y="111" font-size="9.5" font-weight="900" text-anchor="middle" fill="#fff" font-family="Noto Sans">KUWAIT: 2 KILLED</text>`,

  // Brussels: a round summit table, twelve stars, an empty signature line.
  eu: () =>
    sky('#1f3a8a', '#2f53b5') +
    Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; const x = 100 + Math.cos(a) * 34, y = 44 + Math.sin(a) * 30; return `<polygon points="${[0, 1, 2, 3, 4].map((k) => { const b = -Math.PI / 2 + k * 2.513; return `${(x + Math.cos(b) * 5).toFixed(1)},${(y + Math.sin(b) * 5).toFixed(1)}`; }).join(' ')}" fill="#f7d33b"/>`; }).join('') +
    `<ellipse cx="100" cy="98" rx="84" ry="16" fill="#e7dcc5"/><ellipse cx="100" cy="96" rx="70" ry="10" fill="#f4ecdb"/>` +
    [40, 70, 100, 130, 160].map((x) => `<circle cx="${x}" cy="80" r="6" fill="#2a2a2a"/><rect x="${x - 7}" y="85" width="14" height="8" rx="3" fill="#2a2a2a"/>`).join('') +
    `<rect x="70" y="30" width="60" height="26" rx="3" fill="#ffffff" stroke="#b3261e" stroke-width="2"/><text x="100" y="47" font-size="13" font-weight="900" text-anchor="middle" fill="#b3261e" font-family="Noto Sans">NO DEAL</text>`,

  // Jazan: refinery towers with fire and smoke.
  refinery: () =>
    sky('#53433a', '#9c7b5f') + ground('#5e4b3a', 94) +
    `<path d="M70 30 q-30 -20 -10 -40 q20 10 40 0 q20 20 -10 40z" fill="#3a332e" opacity=".8"/>` +
    [[40, 40], [62, 52], [140, 46]].map(([x, y]) => `<rect x="${x}" y="${y}" width="12" height="${94 - y}" fill="#7e7a72"/><rect x="${x - 2}" y="${y}" width="16" height="4" fill="#5d5a54"/>`).join('') +
    `<rect x="90" y="64" width="40" height="30" rx="14" fill="#a7a39a"/><rect x="160" y="70" width="26" height="24" fill="#8e8a82"/>` +
    flame(100, 64, 1.2) + flame(68, 52, 0.8),

  // Gaza: damaged blocks and a long arrow south.
  gaza: () =>
    sky('#cfc6b8', '#e8e1d4') + ground('#b9ab92', 96) +
    [[18, 50, 30], [52, 62, 26], [84, 44, 28], [118, 58, 24], [148, 48, 32]].map(([x, y, w], i) =>
      `<path d="M${x} 96 V${y} l${w * 0.3} ${i % 2 ? 6 : -4} l${w * 0.4} ${i % 2 ? -5 : 7} l${w * 0.3} -3 V96z" fill="${i % 2 ? '#9c9283' : '#8a8173'}"/>` +
      `<rect x="${x + 5}" y="${y + 14}" width="6" height="6" fill="#4a443c"/><rect x="${x + w - 11}" y="${y + 24}" width="6" height="6" fill="#4a443c"/>`).join('') +
    `<path d="M20 108 H160" stroke="#b3261e" stroke-width="5"/><path d="M160 100 l18 8 l-18 8z" fill="#b3261e"/>` +
    `<text x="90" y="104" font-size="8" font-weight="800" text-anchor="middle" fill="#fff" font-family="Noto Sans">1 MILLION SOUTH?</text>`,

  // Odesa: a bulk carrier hit at sea, grain spilling.
  ship: () =>
    sky('#7d93ab', '#b6c6d6') + `<rect y="74" width="200" height="46" fill="#2f5d7c"/>` +
    `<path d="M30 74 H170 l-14 22 H44z" fill="#3b3f46"/><rect x="128" y="54" width="26" height="20" fill="#e9e4d8"/><rect x="134" y="44" width="8" height="10" fill="#b3261e"/>` +
    [48, 72, 96].map((x) => `<rect x="${x}" y="64" width="20" height="10" fill="#c79a3b"/>`).join('') +
    `<path d="M80 54 q-12 -24 6 -40 q8 18 20 10 q2 20 -12 30z" fill="#4a4743" opacity=".75"/>` + flame(92, 66, 0.8) +
    Array.from({ length: 12 }, (_, i) => `<circle cx="${60 + i * 5}" cy="${98 + (i % 3) * 4}" r="1.6" fill="#e0b04a"/>`).join(''),

  // Pyongyang: missile on a launcher.
  missile: () =>
    sky('#5a2f2f', '#8a4b3c') + ground('#3d2a24', 98) +
    `<rect x="40" y="86" width="120" height="12" rx="3" fill="#4b5320"/>` + [52, 76, 100, 124, 148].map((x) => `<circle cx="${x}" cy="100" r="7" fill="#222"/>`).join('') +
    `<g transform="rotate(-38 80 86)"><rect x="80" y="76" width="96" height="14" rx="7" fill="#d9d4c7"/><path d="M176 76 l18 7 l-18 7z" fill="#b3261e"/><rect x="88" y="72" width="8" height="22" fill="#8c8778"/></g>` +
    `<circle cx="170" cy="22" r="10" fill="#f2d16b" opacity=".85"/>`,

  // Seoul: central bank columns with a rising arrow.
  bank: () =>
    sky('#e6eef6', '#f5f8fb') + ground('#c9d2dc', 100) +
    `<polygon points="40,44 100,22 160,44" fill="#2e4a6b"/><rect x="40" y="44" width="120" height="8" fill="#3d5c80"/>` +
    [50, 74, 98, 122, 146].map((x) => `<rect x="${x}" y="52" width="10" height="42" fill="#5d7ea4"/>`).join('') + `<rect x="36" y="94" width="128" height="6" fill="#2e4a6b"/>` +
    `<path d="M20 90 L60 70 L90 76 L150 30" fill="none" stroke="#1f8a4c" stroke-width="5" stroke-linecap="round"/><path d="M150 22 l10 14 l-16 2z" fill="#1f8a4c"/>` +
    `<rect x="132" y="96" width="56" height="18" rx="3" fill="#1f8a4c"/><text x="160" y="109" font-size="11" font-weight="900" text-anchor="middle" fill="#fff" font-family="Noto Sans">3.25%</text>`,

  // Ebola: a field clinic tent and a virus mark.
  virus: () =>
    sky('#d7e7d5', '#eef5ec') + ground('#8f7a4f', 96) +
    `<path d="M26 96 L66 54 L106 96z" fill="#f4f4f0"/><path d="M66 54 L66 96" stroke="#c9c9c0" stroke-width="2"/><rect x="58" y="70" width="16" height="10" fill="#b3261e"/><rect x="63" y="65" width="6" height="20" fill="#b3261e"/>` +
    `<circle cx="146" cy="52" r="22" fill="#b3261e"/>` + Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return `<line x1="${146 + Math.cos(a) * 22}" y1="${52 + Math.sin(a) * 22}" x2="${146 + Math.cos(a) * 30}" y2="${52 + Math.sin(a) * 30}" stroke="#b3261e" stroke-width="3"/><circle cx="${146 + Math.cos(a) * 31}" cy="${52 + Math.sin(a) * 31}" r="3" fill="#b3261e"/>`; }).join('') +
    `<text x="146" y="57" font-size="13" font-weight="900" text-anchor="middle" fill="#fff" font-family="Noto Sans">12k</text>`,

  // Bangkok: a fireball over a tank farm.
  blast: () =>
    sky('#2d2b3a', '#6a4a52') + ground('#3a3836', 96) +
    `<circle cx="104" cy="52" r="34" fill="#f39b3a" opacity=".9"/><circle cx="104" cy="56" r="22" fill="#f7d06b"/><path d="M80 30 q24 -30 48 0" fill="#4a3f3c"/>` +
    [[24, 30], [60, 26], [140, 28], [172, 22]].map(([x, w]) => `<rect x="${x - w / 2}" y="76" width="${w}" height="20" rx="4" fill="#b7b2a8"/><rect x="${x - w / 2}" y="74" width="${w}" height="4" fill="#8f8a80"/>`).join(''),

  // Flinders Island: hills on fire under an orange sky.
  bushfire: () =>
    sky('#c65a2a', '#f0a24c') +
    `<path d="M0 80 q40 -30 80 -6 q40 -26 120 4 V120 H0z" fill="#5b4a2f"/><path d="M0 96 q50 -16 100 0 q50 -14 100 2 V120 H0z" fill="#3f3424"/>` +
    [20, 46, 74, 120, 150, 180].map((x, i) => flame(x, 86 - (i % 2) * 6, 0.7 + (i % 3) * 0.15)).join('') +
    `<path d="M40 40 q30 -30 70 -10 q30 -16 60 4" fill="none" stroke="#7a4a3a" stroke-width="14" opacity=".45" stroke-linecap="round"/>`,

  // Bissau: a ballot box with a calendar showing 2028.
  ballot: () =>
    sky('#e9e2c9', '#f6f1e0') + ground('#c8b98f', 98) +
    `<rect x="36" y="50" width="70" height="48" fill="#f4f1e8" stroke="#3a3a3a" stroke-width="2"/><rect x="56" y="48" width="30" height="5" fill="#3a3a3a"/><path d="M62 30 h18 v20 h-18z" fill="#fff" stroke="#3a3a3a"/>` +
    `<path d="M46 74 h50" stroke="#b3261e" stroke-width="4"/><path d="M46 62 l50 24 M96 62 l-50 24" stroke="#b3261e" stroke-width="4"/>` +
    `<rect x="120" y="36" width="58" height="56" rx="4" fill="#fff" stroke="#3a3a3a" stroke-width="2"/><rect x="120" y="36" width="58" height="14" fill="#1f6b3a"/><text x="149" y="47" font-size="8" font-weight="800" text-anchor="middle" fill="#fff" font-family="Noto Sans">ELECTION</text><text x="149" y="78" font-size="17" font-weight="900" text-anchor="middle" fill="#1d1b19" font-family="Noto Sans">2028</text>`,
};

export function scene(name, { w, h, slice = true } = {}) {
  const body = (scenes[name] || scenes.ballot)();
  return `<svg viewBox="0 0 200 120" width="${w}" height="${h}" preserveAspectRatio="${slice ? 'xMidYMid slice' : 'xMidYMid meet'}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
}
