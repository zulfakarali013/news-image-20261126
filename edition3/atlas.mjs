// World map for the "where" box: rough continent outlines (lon/lat, a few degrees accurate),
// equirectangular projection, one numbered pin per illustrated story (1-12).

const COAST = [
  [[-166, 68], [-120, 71], [-82, 69], [-60, 56], [-66, 45], [-80, 31], [-80, 25], [-97, 27], [-96, 18], [-84, 10], [-79, 8], [-105, 21], [-117, 33], [-124, 46], [-136, 58], [-160, 60]],
  [[-52, 82], [-22, 80], [-24, 70], [-44, 60], [-56, 70]],
  [[-79, 9], [-60, 11], [-50, 0], [-35, -7], [-40, -22], [-57, -35], [-67, -47], [-72, -53], [-74, -40], [-71, -18], [-81, -5]],
  [[-9, 37], [-9, 44], [-1, 46], [3, 51], [8, 55], [5, 62], [14, 68], [28, 71], [42, 67], [44, 48], [30, 45], [26, 40], [21, 37], [14, 41], [11, 44], [3, 43], [-2, 37]],
  [[-5, 50], [1, 52], [-2, 56], [-5, 58], [-6, 54]],
  [[-17, 21], [-9, 32], [10, 37], [21, 32], [32, 31], [43, 12], [51, 11], [40, -4], [40, -16], [33, -26], [20, -35], [12, -17], [9, 2], [-8, 4], [-16, 12]],
  [[42, 67], [70, 72], [110, 77], [150, 71], [178, 67], [158, 57], [140, 53], [134, 43], [126, 37], [121, 30], [119, 23], [108, 21], [106, 10], [101, 14], [102, 2], [97, 10], [90, 22], [80, 14], [77, 8], [72, 21], [61, 25], [56, 26], [58, 22], [52, 16], [43, 13], [35, 29], [36, 36], [44, 42]],
  [[130, 31], [141, 37], [145, 44], [140, 42], [133, 34]],
  [[95, 5], [106, -6], [120, -9], [141, -8], [131, -2], [118, 4], [109, 1], [104, -1]],
  [[114, -22], [129, -14], [142, -11], [146, -19], [153, -27], [150, -37], [140, -38], [131, -31], [116, -34]],
  [[173, -35], [178, -38], [171, -44], [167, -46], [172, -41]],
];

export function atlas(pins, w, h) {
  const lon0 = -125, lon1 = 160, lat0 = 62, lat1 = -47;
  const px = (lo) => ((lo - lon0) / (lon1 - lon0)) * w;
  const py = (la) => ((lat0 - la) / (lat0 - lat1)) * h;
  const land = COAST.map((c) => `<polygon points="${c.map(([a, b]) => `${px(a).toFixed(1)},${py(b).toFixed(1)}`).join(' ')}" fill="#d9ceb2" stroke="#b6a983" stroke-width=".8"/>`).join('');
  const spot = pins.map((p) => [px(p.lon), py(p.lat)]);
  const at = spot.map(([x, y]) => [x, y]);
  // Nudge apart badges that would overlap (Gulf and Korea stories sit close together).
  for (let k = 0; k < 80; k++) for (let i = 0; i < at.length; i++) for (let j = 0; j < i; j++) {
    const dx = at[i][0] - at[j][0], dy = at[i][1] - at[j][1], d = Math.hypot(dx, dy) || 0.1;
    if (d < 21) { const f = (21 - d) / 2 / d; at[i][0] += dx * f; at[i][1] += dy * f + (d < 0.2 ? 1 : 0); at[j][0] -= dx * f; at[j][1] -= dy * f; }
  }
  const marks = pins.map((p, i) => {
    const [x, y] = spot[i], [bx, by] = at[i];
    return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="#7a1a14" stroke-width="1"/>` +
      `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="10" fill="#b3261e" stroke="#fff" stroke-width="1.6"/>` +
      `<text x="${bx.toFixed(1)}" y="${(by + 4.2).toFixed(1)}" font-size="12" font-weight="900" fill="#fff" text-anchor="middle" font-family="Noto Sans">${i + 1}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="#dde8f1"/>${land}${marks}</svg>`;
}
