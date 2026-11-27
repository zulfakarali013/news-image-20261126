// Edition 3 page: turns day.json into one 1024 x 1024 front page (HTML + inline SVG),
// screenshots it in headless Chromium and writes ../entry.png plus a layout report.
// Run: node edition3/build.mjs   (playwright is a dev-only dependency)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scene } from './scenes.mjs';
import { atlas } from './atlas.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const day = JSON.parse(readFileSync(join(here, 'day.json'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const [Y, M, D] = day.date.split('-').map(Number);
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][M - 1];

const CHIP = { CONFIRMED: ['#1f6b3a', 'CONFIRMED'], OFFICIAL: ['#1f3a5f', 'OFFICIAL'], REPORTED: ['#5a4a6b', 'REPORTED'], CLAIMED: ['#b3261e', 'CLAIM'] };
const chip = (st) => { const [c, t] = CHIP[st] || CHIP.REPORTED; return `<i style="background:${c}">${t}</i>`; };

const panels = [...day.leads, ...day.stories];
const every = [...panels, ...day.brief];
const ORDER = ['North America', 'Latin America', 'Europe', 'Russia & Ukraine', 'Middle East', 'Africa', 'South Asia', 'East Asia', 'Southeast Asia', 'Oceania'];
const count = Object.fromEntries(ORDER.map((r) => [r, every.filter((s) => s.region === r).length]));
const regions = ORDER.filter((r) => count[r] > 0);

const lead = (s, i) => `<article class="lead">${scene(s.art, { w: 316, h: 82 })}<span class="n">${i + 1}</span>
  <div class="k">${esc(s.kicker)}</div><h2>${esc(s.h)}</h2><p>${esc(s.d)}</p><div class="why"><b>WHY IT MATTERS</b> ${esc(s.why)}</div><div class="src">${chip(s.st)} ${esc(s.src)}</div></article>`;

const panel = (s, i) => `<article class="pan"><div class="pic">${scene(s.art, { w: 84, h: 66 })}<span class="n">${i + 4}</span></div>
  <div class="txt"><div class="pl">${esc(s.region.toUpperCase())} · ${esc(s.place)}</div><h3>${esc(s.h)}</h3><p>${esc(s.d)}</p><div class="src">${chip(s.st)} ${esc(s.src)}</div></div></article>`;

const first = panels.length + 1;
const third = Math.ceil(day.brief.length / 3);
const cols = [0, 1, 2].map((c) => day.brief.slice(c * third, (c + 1) * third).map((b, k) =>
  `<li><b>${first + c * third + k}</b><span class="bp">${esc(b.place)}</span> ${esc(b.t)}</li>`).join(''));

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1024px;height:1024px;background:#f6f1e6;font-family:'Noto Sans','DejaVu Sans',sans-serif;color:#1d1b19}
.page{padding:12px 18px 0;height:1024px;overflow:hidden}
.top{display:flex;justify-content:space-between;font-size:11px;font-weight:800;letter-spacing:.08em;border-bottom:3px double #1d1b19;padding-bottom:3px}
.top .r{color:#b3261e}
.mast{display:flex;align-items:flex-end;gap:16px;padding:4px 0 3px}
h1{font-family:'Noto Serif','DejaVu Serif',serif;font-size:46px;line-height:1;font-weight:900;letter-spacing:-.01em;white-space:nowrap}
h1 em{font-style:normal;color:#b3261e}
.dl{font-size:15px;font-weight:700;line-height:1.22;padding-bottom:3px}
.bar{display:flex;gap:4px;margin:3px 0}
.bar div{flex:1;background:#1d1b19;color:#fff;font-size:10.5px;font-weight:700;padding:3px 4px;border-radius:3px;text-align:center;white-space:nowrap}
.bar div b{color:#f7c445;font-size:12.5px;margin-left:3px}
.nums{display:flex;gap:6px;margin:3px 0 5px;border-top:1px solid #1d1b19;border-bottom:1px solid #1d1b19;padding:3px 0}
.nums div{flex:1;line-height:1.1}
.nums b{display:block;font-size:19px;font-weight:900;color:#b3261e}
.nums span{font-size:10.5px;font-weight:600;white-space:nowrap}
.leads{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.lead{position:relative}
.lead svg{display:block;border-radius:4px}
.n{position:absolute;left:4px;top:4px;background:#b3261e;color:#fff;font-weight:900;font-size:12px;width:20px;height:20px;border-radius:10px;text-align:center;line-height:20px;border:1.5px solid #fff}
.k{font-size:10px;font-weight:800;letter-spacing:.07em;color:#b3261e;margin-top:4px}
h2{font-family:'Noto Serif','DejaVu Serif',serif;font-size:22px;line-height:1.08;font-weight:900;margin:1px 0 3px}
.lead p{font-size:11.5px;line-height:1.28}
.why{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:10.5px;margin-top:2px;line-height:1.2}.why b{color:#b3261e;font-size:9.5px;letter-spacing:.05em}
.src{font-size:9.5px;color:#4b453d;margin-top:3px;font-weight:600}
.src i{font-style:normal;color:#fff;font-weight:800;font-size:8.5px;padding:1px 4px;border-radius:2px;letter-spacing:.04em;margin-right:2px}
.mid{display:grid;grid-template-columns:650px 1fr;gap:14px;margin-top:6px;border-top:2px solid #1d1b19;padding-top:6px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px 10px}
.pan{display:flex;gap:6px}
.pic{position:relative;flex:none}
.pic svg{display:block;border-radius:3px}
.pic .n{left:-3px;top:-3px;width:18px;height:18px;line-height:18px;font-size:11px}
.pl{font-size:8.5px;font-weight:800;letter-spacing:.05em;color:#b3261e}
h3{font-size:13.5px;line-height:1.12;font-weight:900;margin:1px 0 2px}
.pan p{font-size:10px;line-height:1.22}
.pan .src{font-size:8.3px;margin-top:2px}
.pan .src i{font-size:7.6px}
.side .sec,.briefs .sec{font-size:10px;font-weight:800;letter-spacing:.07em;margin-bottom:3px}
.side svg{display:block;border-radius:3px}
.tl{display:grid;grid-template-columns:repeat(4,1fr);gap:2px 6px;margin-top:4px;font-size:9.4px;line-height:1.2}
.tl b{display:block;color:#b3261e;font-size:10px}
.chk{margin-top:5px;border:2px solid #b3261e;border-radius:4px;background:#fbefe6;padding:4px 7px;font-size:9.4px;line-height:1.3}
.chk b{color:#b3261e;letter-spacing:.04em}
.briefs{margin-top:5px;border-top:2px solid #1d1b19;padding-top:5px}
.cols{display:grid;grid-template-columns:repeat(3,1fr);gap:0 16px}
.cols ul{list-style:none}
.cols li{font-size:10.3px;line-height:1.25;padding-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cols li b{display:inline-block;width:19px;color:#b3261e}
.bp{font-weight:800}
.foot{margin-top:3px;border-top:1px solid #1d1b19;padding-top:3px;font-size:8.8px;color:#4b453d;text-align:center;white-space:nowrap;overflow:hidden}
</style></head><body><div class="page">
<div class="top"><span>THE WORLD IN ONE DAY · A FRONT PAGE FOR ${esc(day.weekday.toUpperCase())}</span><span class="r">${every.length} STORIES · ${regions.length} REGIONS · ALL FROM ${D} ${MONTH.toUpperCase()} ${Y}</span></div>
<div class="mast"><h1>${esc(day.weekday)} <em>${D} ${MONTH}</em> ${Y}</h1><div class="dl">${esc(day.headline)}</div></div>
<div class="bar">${regions.map((r) => `<div>${esc(r)}<b>${count[r]}</b></div>`).join('')}</div>
<div class="nums">${day.numbers.map((x) => `<div><b>${esc(x.n)}</b><span>${esc(x.t)}</span></div>`).join('')}</div>
<section class="leads">${day.leads.map(lead).join('')}</section>
<section class="mid"><div class="grid">${day.stories.map(panel).join('')}</div>
<div class="side"><div class="sec">WHERE · PINS 1–${panels.length} MATCH THE PICTURES</div>${atlas(panels, 306, 138)}
<div class="sec" style="margin-top:4px">WHEN · FIRST REPORTED, UTC, 26 NOV</div><div class="tl">${day.timeline.map((t) => `<div><b>${t.utc}</b>${esc(t.t)}</div>`).join('')}</div>
<div class="chk"><b>DATE CHECK · NOT 26 NOV, SO NOT COUNTED:</b> ${day.left_out.map(esc).join(' · ')}</div></div></section>
<section class="briefs"><div class="sec">ALSO ON ${esc(day.weekday.toUpperCase())} ${D} ${MONTH.toUpperCase()} · STORIES ${first}–${every.length}</div>
<div class="cols">${cols.map((c) => `<ul>${c}</ul>`).join('')}</div></section>
<div class="foot">Sources: ${esc(day.sources)} · Original drawings · CONFIRMED = 2+ outlets · OFFICIAL = govt or agency</div>
</div></body></html>`;

mkdirSync(join(root, 'out'), { recursive: true });
const pageFile = join(root, 'out', 'edition3.html');
writeFileSync(pageFile, html);

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await tab.goto('file://' + pageFile);
await tab.waitForTimeout(300);
const report = await tab.evaluate(() => {
  const cut = [];
  // Serif headlines overhang their line box by a pixel or two, so allow 3 px before calling text cut.
  for (const el of document.querySelectorAll('h2,h3,p,li,.dl,.chk,.src')) {
    if (el.scrollHeight > el.clientHeight + 3 || el.scrollWidth > el.clientWidth + 1) cut.push(el.textContent.slice(0, 40));
  }
  return { footBottom: Math.round(document.querySelector('.foot').getBoundingClientRect().bottom), cut };
});
const png = await tab.screenshot({ type: 'png' });
await browser.close();
writeFileSync(join(root, 'entry.png'), png);
console.log(JSON.stringify({ bytes: png.length, ...report }));
