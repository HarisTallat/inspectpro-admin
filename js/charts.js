/* ============================================================
   InspectPro Admin — Icons + SVG Charts (zero deps)
   ============================================================ */
const ICONS = {
  grid:    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
  doc:     '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  users:   '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6M18 20c0-2.2-1-3.8-2.5-4.6"/>',
  chart:   '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  mega:    '<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8a4 4 0 0 1 0 8"/>',
  shield:  '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  settings:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/>',
  bell:    '<path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>',
  search:  '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
  download:'<path d="M12 4v10m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
  lock:    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  unlock:  '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
  clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  plus:    '<path d="M12 5v14M5 12h14"/>',
  check:   '<path d="M4 12.5 9.5 18 20 6.5"/>',
  x:       '<path d="M6 6l12 12M18 6 6 18"/>',
  alert:   '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4M12 17.5v.2"/>',
  eye:     '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  edit:    '<path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17z"/><path d="M13.5 6.5 17 10"/>',
  trash:   '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  more:    '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone:   '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  location:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/>',
  logout:  '<path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3"/><path d="M10 12H3M6 8l-4 4 4 4"/>',
  money:   '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9v6M18 9v6"/>',
  tag:     '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.6"/>',
  userPlus:'<circle cx="9" cy="8" r="3.4"/><path d="M3.5 20c0-3 2.4-5 5.5-5s5.5 2 5.5 5"/><path d="M18 8v6M15 11h6"/>',
  filter:  '<path d="M3 5h18l-7 8v6l-4-2v-4z"/>',
  moon:    '<path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/>',
  menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
  refresh: '<path d="M4 12a8 8 0 0 1 13-6l3 2M20 12a8 8 0 0 1-13 6l-3-2"/><path d="M20 4v4h-4M4 20v-4h4"/>',
  star:    '<path d="M12 3l2.6 5.5 6 .8-4.3 4.2 1 6L12 16.8 6.7 19.5l1-6L3.4 9.3l6-.8z"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  chevronL:'<path d="M15 6l-6 6 6 6"/>',
  building:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  globe:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
};
function icon(n, s = 20, w = 2) { return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ""}</svg>`; }

/* ---------- Area / line chart ---------- */
function areaChart(values, w = 640, h = 220, labels) {
  const max = Math.max(...values) * 1.15, min = Math.min(...values) * 0.75, range = max - min || 1;
  const pad = 26, step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - 34 - ((v - min) / range) * (h - 60)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${w - pad} ${h - 34} L ${pad} ${h - 34} Z`;
  const dots = pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" fill="#fff" stroke="#6366f1" stroke-width="2.5"/>`).join("");
  const xl = (labels || values.map(() => "")).map((l, i) => `<text x="${pts[i][0]}" y="${h - 12}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-3)">${l}</text>`).join("");
  const grid = [0, 1, 2, 3].map(i => `<line x1="${pad}" y1="${20 + i * (h - 60) / 3}" x2="${w - pad}" y2="${20 + i * (h - 60) / 3}" stroke="var(--border)" stroke-width="1"/>`).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none">
    <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(139,92,246,.28)"/><stop offset="100%" stop-color="rgba(99,102,241,0)"/></linearGradient>
    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#a855f7"/></linearGradient></defs>
    ${grid}<path d="${area}" fill="url(#ag)"/><path d="${line}" fill="none" stroke="url(#lg)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${dots}${xl}</svg>`;
}

/* ---------- Bar chart ---------- */
function barChart(data, w = 640, h = 220) {
  const max = Math.max(...data.map(d => d.v)) * 1.15, bw = (w - 20) / data.length, pad = bw * 0.42;
  const bars = data.map((d, i) => {
    const bh = (d.v / max) * (h - 44), x = 10 + i * bw + pad / 2, y = h - bh - 26;
    return `<rect x="${x}" y="${y}" width="${bw - pad}" height="${bh}" rx="7" fill="url(#bg)"/>
      <text x="${x + (bw - pad) / 2}" y="${h - 8}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--text-3)">${d.m}</text>
      <text x="${x + (bw - pad) / 2}" y="${y - 7}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-2)">${d.v}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}"><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/></linearGradient></defs>${bars}</svg>`;
}

/* ---------- Donut ---------- */
function donut(data, size = 168, thick = 26) {
  const total = data.reduce((s, d) => s + d.v, 0), r = (size - thick) / 2, c = size / 2, circ = 2 * Math.PI * r;
  let off = 0;
  const rings = data.map(d => {
    const dash = (d.v / total) * circ;
    const seg = `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${d.c}" stroke-width="${thick}" stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${-off}" stroke-linecap="round" transform="rotate(-90 ${c} ${c})"/>`;
    off += dash; return seg;
  }).join("");
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${thick}"/>${rings}
    <text x="${c}" y="${c - 3}" text-anchor="middle" font-size="30" font-weight="820" fill="var(--text)">${total}</text>
    <text x="${c}" y="${c + 16}" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--text-2)">TOTAL %</text></svg>`;
}

/* ---------- Progress ring ---------- */
function ring(pct, size = 120, thick = 11, color = "#6366f1", label = "") {
  const r = (size - thick) / 2, c = size / 2, circ = 2 * Math.PI * r, dash = (pct / 100) * circ;
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${thick}"/>
    <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="${thick}" stroke-linecap="round" stroke-dasharray="${dash} ${circ}" transform="rotate(-90 ${c} ${c})"/>
    <text x="${c}" y="${c - 1}" text-anchor="middle" font-size="24" font-weight="820" fill="var(--text)">${pct}%</text>
    <text x="${c}" y="${c + 17}" text-anchor="middle" font-size="10" font-weight="600" fill="var(--text-2)">${label}</text></svg>`;
}
