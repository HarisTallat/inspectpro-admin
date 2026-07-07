/* ============================================================
   InspectPro Admin — Mobile app shell, router & screens
   ============================================================ */
const state = { tab: "dashboard", theme: "light", stack: [], reqSeg: "all", q: "", lang: "en" };
const app = document.getElementById("app");

/* ---------- Router ---------- */
function nav(name, params = {}, opts = {}) {
  if (!opts.replace && !opts.back) state.stack.push({ name, params });
  render(name, params, opts.back ? "pop" : "enter");
}
function goBack() { if (state.stack.length > 1) { state.stack.pop(); const p = state.stack[state.stack.length - 1]; render(p.name, p.params, "pop"); } }
function setTab(scr) { state.tab = scr; state.stack = [{ name: scr, params: {} }]; render(scr, {}, "enter"); }
function render(name, params, anim) {
  const fn = SCREENS[name]; if (!fn) return;
  app.innerHTML = fn(params);
  if (state.lang === "ar") translateDOM(app);
  const s = app.querySelector(".screen"); if (s) s.classList.add(anim === "pop" ? "pop" : "enter");
  app.scrollTop = 0;
}

/* ---------- Shell helper ---------- */
function screen({ title, sub, body, nav: navBar = true, fab = "", back = false, actions = "" }) {
  const header = title !== undefined ? `
    <div class="app-header">
      ${back ? `<div class="hicon" onclick="goBack()">${icon("chevronL", 20)}</div>` : ""}
      <div style="flex:1"><h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ""}</div>
      ${actions}
    </div>` : "";
  return `<div class="screen">${header}<div class="screen-body ${navBar ? "" : "no-nav"} stagger">${body}</div>${fab}${navBar ? bottomNav() : ""}</div>`;
}
function bottomNav() {
  const items = [["dashboard", "grid", "Home"], ["requests", "doc", "Requests"], ["inspectors", "users", "Examiners"], ["analysis", "chart", "Analysis"], ["more", "menu", "More"]];
  return `<div class="bottom-nav">${items.map(([id, ic, label]) =>
    `<div class="nav-item ${state.tab === id ? "active" : ""}" onclick="${id === "more" ? "openMore()" : `setTab('${id}')`}">${icon(ic, 22)}<span>${label}</span></div>`).join("")}</div>`;
}
function topActions() {
  const pend = DB.inspectors.filter(i => i.status === "pending").length + DB.requests.filter(r => r.status === "reopened").length;
  return `<div class="hicon ${pend ? "badge" : ""}" onclick="openNotifications()">${icon("bell", 20)}</div>
    <div class="avatar ${DB.admin.av}" style="width:40px;height:40px;font-size:13px" onclick="openMore()">${DB.admin.initials}</div>`;
}

/* ---------- Overlays ---------- */
function openSheet(html) { const s = document.createElement("div"); s.className = "scrim"; s.onclick = e => { if (e.target === s) closeAll(); }; s.innerHTML = `<div class="sheet"><div class="grip"></div>${html}</div>`; document.querySelector(".phone").appendChild(s); if (state.lang === "ar") translateDOM(s); }
function openModal(html) { const s = document.createElement("div"); s.className = "scrim center"; s.onclick = e => { if (e.target === s) closeAll(); }; s.innerHTML = `<div class="modal">${html}</div>`; document.querySelector(".phone").appendChild(s); if (state.lang === "ar") translateDOM(s); }
function closeAll() { document.querySelectorAll(".scrim").forEach(s => s.remove()); }
function toast(msg, ic = "check") { document.querySelectorAll(".toast").forEach(t => t.remove()); const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `${icon(ic, 17)}<span>${state.lang === "ar" ? trText(msg) : msg}</span>`; document.querySelector(".phone").appendChild(t); setTimeout(() => t.remove(), 2400); }
function toggleTheme() { state.theme = state.theme === "light" ? "dark" : "light"; document.querySelector(".phone").classList.toggle("dark", state.theme === "dark"); toast(state.theme === "dark" ? "Dark mode on" : "Light mode on", "moon"); }

/* ---------- Reusable ---------- */
function statCard(ic, tint, val, cap, trend) { return `<div class="stat"><div class="ico ${tint}">${icon(ic, 20)}</div><div class="val">${val}</div><div class="cap">${cap}</div>${trend ? `<div class="trend ${trend.d}">${trend.t}</div>` : ""}</div>`; }
function statusChip(s) { const m = { open: ["open", "Open · Editing"], locked: ["locked", "Locked (PDF)"], reopened: ["review", "Reopened"], expired: ["expired", "Expired"], completed: ["completed", "Completed"], progress: ["progress", "In-progress"], approved: ["approved", "Approved"], pending: ["pending", "Pending"], rejected: ["rejected", "Rejected"], active: ["active", "Active"] }; const [c, l] = m[s] || ["locked", s]; return `<span class="chip ${c}"><span class="dot"></span>${l}</span>`; }
function legend(d) { return `<div style="display:flex;flex-direction:column;gap:9px">${d.map(x => `<div class="row-between"><div class="legend-row"><span class="legend-dot" style="background:${x.c}"></span>${x.label}</div><b class="small">${x.v}%</b></div>`).join("")}</div>`; }
function infoRow(ic, k, v) { return `<div class="info-row"><span class="k">${icon(ic, 17)} ${k}</span><span class="v">${v}</span></div>`; }
function menuRow(ic, label, action, danger) { return `<div class="menu-row" onclick="${action}"><span class="l" style="${danger ? "color:var(--red)" : ""}"><span class="${danger ? "" : "muted"}" style="${danger ? "color:var(--red)" : ""}">${icon(ic, 19)}</span>${label}</span>${danger ? "" : `<span class="muted">${icon("chevron", 16)}</span>`}</div>`; }
function empty(t, s) { return `<div class="empty"><div class="eico">${icon("doc", 32)}</div><h4 style="font-weight:750">${t}</h4><p class="small muted mt8">${s}</p></div>`; }

/* ============================================================
   SCREENS
   ============================================================ */
const SCREENS = {};

/* ---------- Login ---------- */
SCREENS.login = () => `<div class="screen" style="justify-content:center;padding:26px">
  <div id="loginCard" style="animation:fadeUp .5s">
    <div style="width:60px;height:60px;border-radius:18px;background:var(--brand-grad);display:grid;place-items:center;color:#fff;margin-bottom:20px;box-shadow:var(--shadow-brand)">${icon("shield", 30)}</div>
    <h1 style="font-size:26px;font-weight:850;letter-spacing:-.7px">Admin Console</h1>
    <p class="muted mt8" style="font-size:14px">Sign in to manage InspectPro.</p>
    <div style="margin-top:24px">
      <div class="field"><label>Email</label><div style="position:relative"><span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-3)">${icon("mail", 18)}</span><input id="lu" class="login-pad" value="admin@inspectpro.sa" onkeydown="if(event.key==='Enter')doLogin()"></div></div>
      <div class="field"><label>Password</label><div style="position:relative"><span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-3)">${icon("shield", 18)}</span><input id="lp" class="login-pad" type="password" value="admin" onkeydown="if(event.key==='Enter')doLogin()"></div></div>
      <button class="btn btn-primary" onclick="doLogin()">Sign In</button>
    </div>
    <div class="card" style="background:var(--brand-soft);border:none;margin-top:16px;display:flex;align-items:center;gap:10px;padding:12px 14px">${icon("shield", 17)}<span class="small" style="font-weight:600">Demo — <b>admin</b> / <b>admin</b></span></div>
  </div></div>`;
function doLogin() { if ((document.getElementById("lp").value) === "admin") { setTab("dashboard"); } else { toast("Invalid credentials", "alert"); const c = document.getElementById("loginCard"); c.style.animation = "none"; requestAnimationFrame(() => c.style.animation = "shake .4s"); } }
function signOut() { closeAll(); state.stack = []; render("login", {}, "enter"); }

/* ---------- Dashboard ---------- */
SCREENS.dashboard = () => {
  const k = DB.kpi;
  return screen({
    title: `Hi, ${DB.admin.name.split(" ")[0]} 👋`, sub: "Admin overview", actions: topActions(),
    body: `
      <div class="hero"><div class="label">Revenue this month</div><div class="big">SAR ${k.revenue}K</div>
        <div class="row"><div class="pill">▲ 18% vs last month</div><div class="pill">${k.requests} requests</div></div></div>
      <div class="stat-grid mt16">
        ${statCard("doc", "tint-indigo", k.requests, "Total Requests", { d: "up", t: "▲ 12%" })}
        ${statCard("users", "tint-green", k.inspectors, "Examiners", { d: "up", t: "▲ 6%" })}
        ${statCard("clock", "tint-orange", k.pending, "Needs Attention")}
        ${statCard("chart", "tint-blue", "94%", "Performance", { d: "up", t: "▲ 3%" })}
      </div>
      <div class="section-title"><h3>Revenue trend</h3><span class="chip approved">▲ 34% YTD</span></div>
      <div class="card"><div class="row-between" style="margin-bottom:6px"><span class="small muted">SAR '000 · last 7 months</span><b>SAR ${k.revenue}K</b></div>
        ${areaChart(DB.revenueMonthly, 330, 160, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"])}</div>
      <div class="section-title"><h3>Requests trend</h3><span class="link" onclick="setTab('analysis')">Analysis</span></div>
      <div class="card">${barChart(DB.requestsMonthly, 330, 150)}</div>
      <div class="section-title"><h3>Request status</h3></div>
      <div class="card" style="display:flex;align-items:center;gap:16px">${donut(DB.statusSplit, 120, 20)}<div style="flex:1">${legend(DB.statusSplit)}</div></div>
      <div class="section-title"><h3>Recent requests</h3><span class="link" onclick="setTab('requests')">See all</span></div>
      <div class="list">${DB.requests.slice(0, 3).map(reqRow).join("")}</div>`,
  });
};

/* ---------- Requests ---------- */
function reqRow(r) {
  const editing = r.status === "open" || r.status === "reopened";
  return `<div class="list-item" onclick="openRequest('${r.id}')">
    <div class="thumb" style="background:${editing ? "var(--brand-grad)" : "var(--surface-2)"};color:${editing ? "#fff" : "var(--text-3)"}">${icon(editing ? "unlock" : "lock", 20)}</div>
    <div class="li-main"><div class="t">${r.type}</div><div class="s">${r.eng} · ${r.id}</div></div>
    <div class="li-end">${statusChip(r.status)}${editing ? `<span class="small" style="color:var(--orange);font-weight:600">${r.hoursLeft}h left</span>` : ""}</div>
  </div>`;
}
SCREENS.requests = () => {
  const q = state.q.toLowerCase(); const seg = state.reqSeg;
  let rows = DB.requests.filter(r => !q || r.id.toLowerCase().includes(q) || r.eng.toLowerCase().includes(q) || r.mobile.includes(q) || r.city.toLowerCase().includes(q));
  if (seg === "editing") rows = rows.filter(r => r.status === "open" || r.status === "reopened");
  if (seg === "locked") rows = rows.filter(r => r.status === "locked" || r.status === "expired");
  return screen({
    title: "Requests", sub: "Paid inspection reports",
    actions: `<div class="hicon" onclick="toast('48h window · auto-locks to PDF','clock')">${icon("clock", 20)}</div>`,
    body: `
      <div class="search" onclick="openReqSearch()"><span class="muted">${icon("search", 18)}</span><input placeholder="Search request, examiner, mobile" readonly></div>
      <div class="segment mt12">
        <button class="${seg === "all" ? "active" : ""}" onclick="setReqSeg('all')">All (${DB.requests.length})</button>
        <button class="${seg === "editing" ? "active" : ""}" onclick="setReqSeg('editing')">Editing</button>
        <button class="${seg === "locked" ? "active" : ""}" onclick="setReqSeg('locked')">Locked</button>
      </div>
      <div class="list mt12">${rows.length ? rows.map(reqRow).join("") : empty("No requests", "Try a different filter.")}</div>`,
  });
};
function setReqSeg(s) { state.reqSeg = s; render("requests", {}, "enter"); }
function openReqSearch() { openSheet(`<div class="search" style="margin-bottom:14px"><span class="muted">${icon("search", 18)}</span><input placeholder="Search requests" oninput="state.q=this.value" autofocus></div><div class="small muted" style="margin:4px 0 10px;font-weight:600">RECENT</div><div class="list">${DB.requests.slice(0, 3).map(reqRow).join("")}</div>`); }
function openRequest(id) {
  const r = DB.requests.find(x => x.id === id); const editing = r.status === "open" || r.status === "reopened";
  openSheet(`
    <div class="row-between"><div><h3 style="font-weight:800;font-size:17px">${r.id}</h3><div class="small muted">${r.type}</div></div>${statusChip(r.status)}</div>
    ${editing ? `<div class="card mt12" style="background:var(--orange-soft);border:none;display:flex;align-items:center;gap:10px;color:var(--orange)">${icon("clock", 18)}<b style="font-size:13px">${r.hoursLeft}h left before it auto-locks to PDF</b></div>` : ""}
    <div class="card mt12" style="display:flex;flex-direction:column;gap:2px">
      ${infoRow("users", "Examiner name", r.eng)}${infoRow("location", "City", r.city)}${infoRow("phone", "Mobile", r.mobile)}${infoRow("clock", "Request date", r.date)}${infoRow("money", "Paid", "SAR " + r.paid)}</div>
    <button class="btn btn-ghost mt16" onclick="toast('Downloading ${r.id}.pdf','download')">${icon("download", 18)} Download PDF</button>
    ${(r.status === "locked" || r.status === "expired") ? `<button class="btn btn-primary mt12" onclick="reopenRequest('${r.id}')">${icon("unlock", 18)} Reopen (1–10 days)</button>`
      : r.status === "open" ? `<button class="btn btn-soft mt12" onclick="lockRequest('${r.id}')">${icon("lock", 18)} Lock now as PDF</button>` : ""}`);
}
function reopenRequest(id) {
  closeAll();
  openSheet(`<h3 style="font-weight:800;font-size:17px">Reopen ${id}</h3><p class="small muted mt8">Grant the examiner temporary edit access.</p>
    <div class="field mt16"><label>Reopen duration</label><select id="reopenDays">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1} day${i ? "s" : ""}</option>`).join("")}</select></div>
    <div class="field"><label>Reason (sent to examiner)</label><textarea>Additional photos required for the electrical note.</textarea></div>
    <button class="btn btn-primary" onclick="confirmReopen('${id}')">${icon("unlock", 18)} Reopen & notify</button>`);
}
function confirmReopen(id) { const d = +document.getElementById("reopenDays").value; const r = DB.requests.find(x => x.id === id); if (r) { r.status = "reopened"; r.hoursLeft = d * 24; } closeAll(); render("requests", {}, "enter"); toast(`${id} reopened ${d} day(s) · examiner notified`, "mail"); }
function lockRequest(id) { const r = DB.requests.find(x => x.id === id); if (r) { r.status = "locked"; r.hoursLeft = 0; } closeAll(); render("requests", {}, "enter"); toast(`${id} locked as PDF · examiner notified`, "lock"); }

/* ---------- Inspectors ---------- */
SCREENS.inspectors = () => {
  const q = state.q.toLowerCase();
  const rows = DB.inspectors.filter(i => !q || i.name.toLowerCase().includes(q) || i.mobile.includes(q) || i.city.toLowerCase().includes(q));
  const pending = DB.inspectors.filter(i => i.status === "pending").length;
  return screen({
    title: "Examiners", sub: "Registrations & approvals",
    actions: `<div class="hicon" onclick="toast('Examiners register from the app','userPlus')">${icon("userPlus", 20)}</div>`,
    body: `
      <div class="stat-grid">
        ${statCard("users", "tint-indigo", DB.inspectors.length, "Total")}
        ${statCard("clock", "tint-orange", pending, "Pending Approval")}
      </div>
      <div class="section-title"><h3>All registrations</h3></div>
      <div class="list">${DB.inspectors.map((i, idx) => `
        <div class="list-item" onclick="openInspector(${idx})">
          <div class="avatar ${i.av}">${i.initials}</div>
          <div class="li-main"><div class="t">${i.name}</div><div class="s">${i.city} · ${i.nationality} · ${i.sce}</div></div>
          <div class="li-end">${statusChip(i.status)}${i.verified ? `<span class="small" style="color:var(--green);font-weight:600">verified</span>` : `<span class="small muted">unverified</span>`}</div>
        </div>`).join("")}</div>`,
  });
};
function openInspector(idx) {
  const i = DB.inspectors[idx];
  openSheet(`
    <div class="row" style="gap:13px"><div class="avatar ${i.av}" style="width:52px;height:52px;font-size:18px">${i.initials}</div>
      <div style="flex:1"><div style="font-weight:800;font-size:17px">${i.name}</div><div class="small muted">${i.city} · ${i.nationality}</div></div>${statusChip(i.status)}</div>
    <div class="card mt16" style="display:flex;flex-direction:column;gap:2px">
      ${infoRow("phone", "Mobile", i.mobile)}
      ${infoRow("mail", "Email", `${i.email} ${i.verified ? "✓" : ""}`)}
      ${infoRow("shield", "SCE Membership", i.sce)}
      ${infoRow("doc", "Reports", i.reports)}
      ${infoRow("clock", "Joined", i.joined)}</div>
    <div class="card mt12" style="background:var(--surface-2);border:none">
      <div class="row" style="gap:8px;color:var(--text-2)">${icon("lock", 16)}<b style="font-size:13px">Anti-forgery lock</b></div>
      <p class="small muted mt8">Personal data can't be modified after acceptance without admin approval.</p></div>
    ${i.status === "pending" ? `<div class="row" style="gap:10px;margin-top:16px">
      <button class="btn btn-danger" onclick="setInspector(${idx},'rejected')">${icon("x", 17)} Reject</button>
      <button class="btn btn-primary" onclick="setInspector(${idx},'approved')">${icon("check", 17)} Approve</button></div>`
      : `<button class="btn btn-ghost mt16" onclick="toast('Email sent to ${i.name.split(" ")[0]}','mail')">${icon("mail", 18)} Message examiner</button>`}`);
}
function setInspector(idx, st) { DB.inspectors[idx].status = st; closeAll(); render("inspectors", {}, "enter"); toast(`${DB.inspectors[idx].name} ${st} · both parties emailed`, st === "approved" ? "check" : "x"); }

/* ---------- Analysis ---------- */
SCREENS.analysis = () => {
  const q = state.q.toLowerCase();
  const rows = DB.requests.filter(r => !q || r.id.toLowerCase().includes(q) || r.eng.toLowerCase().includes(q) || r.mobile.includes(q));
  return screen({
    title: "Data Analysis", sub: "Filter & explore",
    actions: `<div class="hicon" onclick="openFilters()">${icon("filter", 20)}</div>`,
    body: `
      <div class="card" onclick="openFilters()" style="display:flex;align-items:center;gap:10px;cursor:pointer">
        ${icon("filter", 18)}<span style="font-weight:600;font-size:14px;flex:1">Date · Examiner · Request No · Mobile · Status</span>${icon("chevron", 16)}</div>
      <div class="section-title"><h3>Requests / month</h3></div>
      <div class="card">${barChart(DB.requestsMonthly, 330, 150)}</div>
      <div class="section-title"><h3>Status split</h3></div>
      <div class="card" style="display:flex;align-items:center;gap:16px">${donut(DB.statusSplit, 118, 20)}<div style="flex:1">${legend(DB.statusSplit)}</div></div>
      <div class="section-title"><h3>By city</h3></div>
      <div class="card" style="display:flex;align-items:center;gap:16px">${donut(DB.citySplit, 118, 20)}<div style="flex:1">${legend(DB.citySplit)}</div></div>
      <div class="section-title"><h3>Results (${rows.length})</h3><span class="link" onclick="toast('Exported to CSV','download')">Export</span></div>
      <div class="list">${rows.map(reqRow).join("")}</div>`,
  });
};
function openFilters() {
  openSheet(`<h3 style="font-weight:800;font-size:17px;margin-bottom:14px">Filters</h3>
    <div style="display:flex;gap:10px"><div class="field" style="flex:1"><label>From</label><input type="date" value="2026-07-01"></div><div class="field" style="flex:1"><label>To</label><input type="date" value="2026-07-07"></div></div>
    <div class="field"><label>Examiner</label><select><option>All examiners</option>${[...new Set(DB.requests.map(r => r.eng))].map(n => `<option>${n}</option>`).join("")}</select></div>
    <div class="field"><label>Request No</label><input placeholder="RPT-2026-…"></div>
    <div class="field"><label>Mobile</label><input placeholder="+966 5X…"></div>
    <div class="field"><label>Status</label><select><option>All</option><option>Under construction</option><option>Completed</option></select></div>
    <div style="display:flex;gap:10px"><button class="btn btn-ghost" onclick="closeAll()">Reset</button><button class="btn btn-primary" onclick="closeAll();toast('Filters applied','filter')">Apply</button></div>`);
}

/* ---------- Marketing & Finance ---------- */
SCREENS.marketing = () => screen({
  title: "Marketing & Finance", sub: "Ads · codes · productivity", back: true, nav: true,
  body: `
    <div class="stat-grid">
      ${statCard("money", "tint-green", "SAR 128K", "Income (month)", { d: "up", t: "▲ 18%" })}
      ${statCard("tag", "tint-indigo", DB.codes.filter(c => c.status === "active").length, "Active Codes")}
    </div>
    <div class="section-title"><h3>Productivity</h3></div>
    <div class="card">
      <div class="segment" style="margin-bottom:12px"><button class="active" onclick="setProd('time',this)">Time</button><button onclick="setProd('performance',this)">Performance</button><button onclick="setProd('income',this)">Income</button></div>
      <div id="prodChart">${areaChart(DB.prepMonthly, 330, 160, ["J", "F", "M", "A", "M", "J", "J"])}</div>
      <div class="small muted mt8" style="text-align:center">Productivity across time · performance · income</div>
    </div>
    <div class="section-title"><h3>Discount codes</h3><span class="link" onclick="addCode()">＋ New</span></div>
    <div class="list">${DB.codes.map(c => `
      <div class="card" style="padding:14px">
        <div class="row-between"><b style="font-size:15px;letter-spacing:.3px">${c.code}</b><span class="chip ${c.status === "active" ? "active" : "expired"}">${c.pct}% off</span></div>
        <div class="row-between mt8"><span class="small muted">${c.uses}/${c.limit} used · exp ${c.expires}</span></div>
        <div class="bar-track mt8"><div class="bar-fill" style="width:${Math.min(100, c.uses / c.limit * 100)}%"></div></div>
      </div>`).join("")}</div>
    <div class="section-title"><h3>Announcements</h3><span class="link" onclick="addAd()">＋ New</span></div>
    <div class="list">${DB.ads.map(a => `<div class="card" style="padding:14px"><div class="row-between"><b style="font-size:14px">${a.title}</b><span class="chip ${a.status === "active" ? "active" : "review"}">${a.status}</span></div><p class="small muted mt8">${a.body}</p><div class="small muted mt8">${icon("eye", 13)} ${a.views.toLocaleString()} views</div></div>`).join("")}</div>
    <div class="row small muted" style="gap:7px;margin-top:12px">${icon("alert", 15)} In-app only — no third-party commercial ads.</div>`,
});
function setProd(kind, el) { document.querySelectorAll("#app .segment button").forEach(b => b.classList.remove("active")); el.classList.add("active"); const m = { time: DB.prepMonthly, performance: DB.perfMonthly, income: DB.revenueMonthly }; document.getElementById("prodChart").innerHTML = areaChart(m[kind], 330, 160, ["J", "F", "M", "A", "M", "J", "J"]); toast("Showing " + kind, "chart"); }
function addCode() { openSheet(`<h3 style="font-weight:800;font-size:17px;margin-bottom:14px">New discount code</h3><div class="field"><label>Code</label><input value="WELCOME20"></div><div style="display:flex;gap:10px"><div class="field" style="flex:1"><label>Discount %</label><input type="number" value="20"></div><div class="field" style="flex:1"><label>Limit</label><input type="number" value="100"></div></div><button class="btn btn-primary" onclick="closeAll();toast('Discount code created','tag')">Create code</button>`); }
function addAd() { openSheet(`<h3 style="font-weight:800;font-size:17px;margin-bottom:14px">New announcement</h3><div class="field"><label>Title</label><input placeholder="e.g. 20% off first report"></div><div class="field"><label>Message</label><textarea placeholder="Short in-app message…"></textarea></div><div class="row small muted" style="gap:7px;margin-bottom:12px">${icon("alert", 15)} Keep simple — no commercial ads.</div><button class="btn btn-primary" onclick="closeAll();toast('Announcement published','mega')">Publish</button>`); }

/* ---------- Admin accounts ---------- */
SCREENS.admins = () => {
  const used = DB.admins.length, max = 10;
  return screen({
    title: "Admin Accounts", sub: `${used} / ${max} used`, back: true, nav: true,
    actions: `<div class="hicon" onclick="${used >= max ? "toast('Limit reached (10)','alert')" : "addAdmin()"}">${icon("plus", 20)}</div>`,
    body: `
      <div class="card" style="background:var(--brand-soft);border:none;display:flex;align-items:center;gap:10px">${icon("shield", 18)}<span class="small" style="font-weight:600">Up to 10 accounts can manage the app.</span></div>
      <div class="list mt12">${DB.admins.map((a, i) => `
        <div class="list-item" style="cursor:default">
          <div class="avatar ${a.av}">${a.initials}</div>
          <div class="li-main"><div class="t">${a.name}</div><div class="s">${a.email}</div></div>
          <div class="li-end"><span class="chip ${a.role === "Super Admin" ? "review" : "approved"}">${a.role}</span>${i === 0 ? `<span class="small muted">You</span>` : `<span class="small" style="color:var(--red);cursor:pointer" onclick="removeAdmin(${i})">Remove</span>`}</div>
        </div>`).join("")}</div>`,
  });
};
function addAdmin() { openSheet(`<h3 style="font-weight:800;font-size:17px;margin-bottom:14px">Add admin account</h3><div class="field"><label>Full name</label><input placeholder="e.g. Salem Al-Harbi"></div><div class="field"><label>Email</label><input placeholder="name@inspectpro.sa"></div><div class="field"><label>Role</label><select><option>Admin</option><option>Reviewer</option><option>Finance</option><option>Super Admin</option></select></div><button class="btn btn-primary" onclick="closeAll();toast('Invite sent · account created','mail')">Send invite</button>`); }
function removeAdmin(i) { const n = DB.admins[i].name; DB.admins.splice(i, 1); render("admins", {}, "enter"); toast(`${n} removed`, "trash"); }

/* ---------- Settings ---------- */
SCREENS.settings = () => screen({
  title: "Settings", back: true, nav: true,
  body: `
    <div class="section-title" style="margin-top:4px"><h3>Preferences</h3></div>
    <div class="card" style="padding:6px 0">
      ${menuRow("moon", "Dark Mode", "toggleTheme()")}
      <div class="menu-row" onclick="openLanguage()"><span class="l"><span class="muted">${icon("globe", 19)}</span>Language</span><span class="small muted" data-no-tr>${state.lang === "ar" ? "العربية" : "English"}</span></div>
      ${menuRow("bell", "Notifications", "openNotifications()")}
    </div>
    <div class="section-title"><h3>Liability Disclaimer</h3></div>
    <div class="card">
      <div class="row" style="gap:8px;margin-bottom:8px">${icon("alert", 18)}<b style="font-size:13.5px">Shown to examiners on registration</b></div>
      <p class="small muted" style="line-height:1.7">This program allows the use of engineering report templates without any liability on the part of the application owner or team. There is no quality control over any report produced. Examiners are solely responsible for their observations, images, and their accuracy. We are simply an engineering report design application.</p>
    </div>
    <div class="section-title"><h3>About</h3></div>
    <div class="card" style="padding:6px 0">${menuRow("shield", "Version 1.0.0", "toast('Up to date','check')")}</div>
    <button class="btn btn-danger mt16" onclick="signOut()">${icon("logout", 18)} Sign Out</button>`,
});

/* ---------- More menu (bottom nav overflow) ---------- */
function openMore() {
  openSheet(`<h3 style="font-weight:800;font-size:16px;margin-bottom:12px">More</h3>
    <div class="card" style="padding:6px 0">
      ${menuRow("mega", "Marketing & Finance", "closeAll();setTab('dashboard');nav('marketing')")}
      ${menuRow("shield", "Admin Accounts", "closeAll();setTab('dashboard');nav('admins')")}
      ${menuRow("settings", "Settings", "closeAll();setTab('dashboard');nav('settings')")}
      ${menuRow("moon", "Toggle Theme", "toggleTheme()")}
    </div>
    <button class="btn btn-danger mt16" onclick="signOut()">${icon("logout", 18)} Sign Out</button>`);
}

/* ---------- Notifications ---------- */
function openNotifications() {
  openSheet(`<h3 style="font-weight:800;font-size:16px;margin-bottom:12px">Notifications</h3>
    <div class="list">${DB.notifications.map(n => `
      <div class="list-item" style="cursor:default">
        <div class="thumb ${n.tint}" style="background:transparent"><span class="${n.tint}" style="width:100%;height:100%;border-radius:13px;display:grid;place-items:center">${icon(n.icon, 20)}</span></div>
        <div class="li-main"><div class="t">${n.t}</div><div class="s">${n.s}</div></div>
        <span class="small muted" style="align-self:flex-start">${n.time}</span>
      </div>`).join("")}</div>`);
}

/* ============================================================
   BILINGUAL — English ⇄ العربية (RTL). Post-render translation.
   ============================================================ */
const AR = {
  // Nav
  "Home": "الرئيسية", "Requests": "الطلبات", "Examiners": "الفاحصون", "Analysis": "التحليل", "More": "المزيد",
  // Dashboard
  "Admin overview": "نظرة عامة للإدارة", "Revenue this month": "إيراد هذا الشهر", "Total Requests": "إجمالي الطلبات",
  "Needs Attention": "يحتاج انتباه", "Performance": "الأداء", "Revenue trend": "اتجاه الإيراد",
  "SAR '000 · last 7 months": "ألف ر.س · آخر 7 أشهر", "Requests trend": "اتجاه الطلبات",
  "Request status": "حالة الطلبات", "Recent requests": "أحدث الطلبات", "See all": "عرض الكل", "Analysis": "التحليل",
  // Statuses
  "Open · Editing": "مفتوح · قيد التعديل", "Locked (PDF)": "مقفل (PDF)", "Reopened": "أُعيد فتحه", "Expired": "منتهٍ",
  "Completed": "مكتمل", "Under construction": "قيد الإنشاء", "In-progress": "قيد التنفيذ", "Approved": "معتمد",
  "Pending": "قيد الانتظار", "Rejected": "مرفوض", "Active": "نشط", "verified": "موثّق", "unverified": "غير موثّق",
  // Requests
  "Paid inspection reports": "تقارير فحص مدفوعة", "All": "الكل", "Editing": "قيد التعديل", "Locked": "مقفل", "No requests": "لا توجد طلبات",
  "Try a different filter.": "جرّب تصفية أخرى.", "Examiner name": "اسم الفاحص", "Examiner": "الفاحص", "City": "المدينة", "Mobile": "الجوال",
  "Request date": "تاريخ الطلب", "Paid": "المدفوع", "Download PDF": "تحميل PDF", "Reopen (1–10 days)": "إعادة الفتح (1–10 أيام)",
  "Lock now as PDF": "إقفال الآن كـ PDF", "Reopen duration": "مدة إعادة الفتح", "Reason (sent to examiner)": "السبب (يُرسل للفاحص)",
  "Reopen & notify": "إعادة الفتح والإشعار", "Grant the examiner temporary edit access.": "منح الفاحص صلاحية تعديل مؤقتة.",
  "Additional photos required for the electrical note.": "مطلوب صور إضافية للملاحظة الكهربائية.", "48h window · auto-locks to PDF": "نافذة 48 ساعة · إقفال تلقائي كـ PDF",
  // Inspectors
  "Registrations & approvals": "التسجيلات والاعتمادات", "Total": "الإجمالي", "Pending Approval": "بانتظار الاعتماد",
  "All registrations": "جميع التسجيلات", "Anti-forgery lock": "قفل مكافحة التزوير",
  "Personal data can't be modified after acceptance without admin approval.": "لا يمكن تعديل البيانات الشخصية بعد القبول دون موافقة الإدارة.",
  "Reject": "رفض", "Approve": "اعتماد", "Message examiner": "مراسلة الفاحص", "Email": "البريد",
  "SCE Membership": "عضوية هيئة المهندسين", "Reports": "التقارير", "Joined": "تاريخ الانضمام",
  // Analysis
  "Data Analysis": "تحليل البيانات", "Filter & explore": "التصفية والاستكشاف",
  "Date · Examiner · Request No · Mobile · Status": "التاريخ · الفاحص · رقم الطلب · الجوال · الحالة",
  "Requests / month": "الطلبات / الشهر", "Status split": "توزيع الحالات", "By city": "حسب المدينة", "Export": "تصدير",
  "Filters": "عوامل التصفية", "From": "من", "To": "إلى", "Request No": "رقم الطلب", "Status": "الحالة",
  "All examiners": "كل الفاحصين", "Reset": "إعادة تعيين", "Apply": "تطبيق",
  // Marketing
  "Marketing & Finance": "التسويق والمالية", "Ads · codes · productivity": "إعلانات · أكواد · إنتاجية",
  "Income (month)": "الدخل (الشهر)", "Active Codes": "الأكواد النشطة", "Productivity": "الإنتاجية",
  "Time": "الوقت", "Income": "الدخل", "Productivity across time · performance · income": "الإنتاجية عبر الوقت · الأداء · الدخل",
  "Discount codes": "أكواد الخصم", "New": "جديد", "Announcements": "الإعلانات", "New discount code": "كود خصم جديد",
  "Code": "الكود", "Discount %": "نسبة الخصم %", "Limit": "الحد", "Create code": "إنشاء الكود",
  "New announcement": "إعلان جديد", "Title": "العنوان", "Message": "الرسالة", "Publish": "نشر",
  "In-app only — no third-party commercial ads.": "داخل التطبيق فقط — بدون إعلانات تجارية خارجية.",
  "Keep simple — no commercial ads.": "أبقِه بسيطًا — بدون إعلانات تجارية.",
  // Admins
  "Admin Accounts": "حسابات الإدارة", "Up to 10 accounts can manage the app.": "يمكن حتى 10 حسابات إدارة التطبيق.",
  "You": "أنت", "Remove": "إزالة", "Super Admin": "مدير عام", "Admin": "مدير", "Reviewer": "مراجع", "Finance": "مالية",
  "Add admin account": "إضافة حساب إدارة", "Full name": "الاسم الكامل", "Role": "الدور", "Send invite": "إرسال دعوة",
  // Settings
  "Settings": "الإعدادات", "Preferences": "التفضيلات", "Dark Mode": "الوضع الداكن", "Language": "اللغة", "Toggle Theme": "تبديل المظهر",
  "Notifications": "الإشعارات", "Liability Disclaimer": "إخلاء المسؤولية", "Shown to examiners on registration": "يُعرض للفاحصين عند التسجيل", "About": "حول", "Sign Out": "تسجيل الخروج",
  "This program allows the use of engineering report templates without any liability on the part of the application owner or team. There is no quality control over any report produced. Examiners are solely responsible for their observations, images, and their accuracy. We are simply an engineering report design application.":
    "يتيح هذا البرنامج استخدام قوالب التقارير الهندسية دون أي مسؤولية على مالك التطبيق أو فريقه. لا توجد أي رقابة جودة على أي تقرير يُنتَج. الفاحصون وحدهم مسؤولون عن ملاحظاتهم وصورهم ودقتها. نحن مجرد تطبيق لتصميم التقارير الهندسية.",
  // Login
  "Admin Console": "لوحة الإدارة", "Sign in to manage InspectPro.": "سجّل الدخول لإدارة InspectPro.", "Password": "كلمة المرور", "Sign In": "تسجيل الدخول",
  // Cities / types / nationalities
  "Riyadh": "الرياض", "Jeddah": "جدة", "Dammam": "الدمام", "Mecca": "مكة",
  "Commercial Building": "مبنى تجاري", "Villa": "فيلا", "Residential Building": "مبنى سكني", "Apartment": "شقة", "Duplex": "دوبلكس",
  "Saudi": "سعودي", "Egyptian": "مصري", "Jordanian": "أردني",
  // Names
  "Hi, Yousef 👋": "مرحبًا، يوسف 👋", "Yousef Al-Mutairi": "يوسف المطيري", "Mansour Al-Otaibi": "منصور العتيبي", "Reem Al-Faran": "ريم الفرن", "Ali Al-Harthy": "علي الحارثي",
  "Khalid Al-Otaibi": "خالد العتيبي", "Sara Al-Harbi": "سارة الحربي", "Faisal Al-Dosari": "فيصل الدوسري", "Noura Al-Qahtani": "نورة القحطاني",
  "Omar Al-Ghamdi": "عمر الغامدي", "Layla Al-Mansour": "ليلى المنصور", "Tariq Bin Nasser": "طارق بن ناصر", "Hassan Al-Zahrani": "حسن الزهراني",
  // Notifications
  "New examiner registration": "تسجيل فاحص جديد", "Layla Al-Mansour is awaiting approval.": "ليلى المنصور بانتظار الاعتماد.",
  "Reopen requested": "طلب إعادة فتح", "Omar Al-Ghamdi requested to reopen RPT-2026-000138.": "طلب عمر الغامدي إعادة فتح RPT-2026-000138.",
  "Report auto-locked": "إقفال تلقائي للتقرير", "RPT-2026-000140 closed after 48h.": "أُقفل RPT-2026-000140 بعد 48 ساعة.",
  "Payment received": "تم استلام الدفع", "SAR 350 for RPT-2026-000142.": "350 ر.س مقابل RPT-2026-000142.",
  "18m ago": "قبل 18 دقيقة", "1h ago": "قبل ساعة", "3h ago": "قبل 3 ساعات", "5h ago": "قبل 5 ساعات",
  // Chart labels / months
  "Jan": "يناير", "Feb": "فبراير", "Mar": "مارس", "Apr": "أبريل", "May": "مايو", "Jun": "يونيو", "Jul": "يوليو",
  "TOTAL %": "الإجمالي %", "▲ 34% YTD": "▲ 34% للسنة",
  "Productivity across time · performance · income": "الإنتاجية عبر الوقت · الأداء · الدخل",
  "＋ New": "＋ جديد", "Version 1.0.0": "الإصدار 1.0.0",
  // Ads (full strings so substring pass never touches them)
  "Ramadan offer — 20% off your first report": "عرض رمضان — خصم 20% على تقريرك الأول",
  "Limited-time launch pricing for new engineers.": "أسعار إطلاق لفترة محدودة للمهندسين الجدد.",
  "New: bilingual Arabic/English PDF export": "جديد: تصدير PDF ثنائي اللغة عربي/إنجليزي",
  "Now available for all report templates.": "متاح الآن لجميع قوالب التقارير.",
  "active": "نشط", "scheduled": "مجدول",
};
const AR_RULES = [
  [/^(\d+) requests$/, "$1 طلب"],
  [/^(\d+)h left$/, "$1 ساعة متبقية"],
  [/^(\d+) \/ 10 used$/, "$1 / 10 مستخدم"],
  [/^Results \((\d+)\)$/, "النتائج ($1)"],
  [/^All \((\d+)\)$/, "الكل ($1)"],
  [/^(\d+)% off$/, "$1% خصم"],
  [/^(\d+) days?$/, "$1 يوم"],
];
const AR_UNITS = { "SAR": "ر.س", "views": "مشاهدة" };
const AR_SUB = [
  ["h left before it auto-locks to PDF", " ساعة متبقية قبل الإقفال التلقائي كـ PDF"],
  ["vs last month", "مقارنة بالشهر الماضي"],
  ["used · exp", "مستخدم · ينتهي"],
];
const AR_SUBKEYS = Object.keys(AR).filter(k => k.length >= 5).sort((a, b) => b.length - a.length);
function translateDOM(root) {
  if (state.lang !== "ar") return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n);
  nodes.forEach(node => {
    if (node.parentElement && node.parentElement.closest("[data-no-tr]")) return;
    const raw = node.nodeValue; if (!raw || !raw.trim()) return;
    const key = raw.trim();
    if (AR[key] !== undefined) { node.nodeValue = raw.replace(key, AR[key]); return; }
    for (const [re, rep] of AR_RULES) { if (re.test(key)) { node.nodeValue = raw.replace(key, key.replace(re, rep)); return; } }
    if (!/[A-Za-z]/.test(raw)) return;
    let v = raw;
    for (const [s, r] of AR_SUB) { if (v.includes(s)) v = v.split(s).join(r); }
    for (const k of AR_SUBKEYS) { if (v.includes(k)) v = v.split(k).join(AR[k]); }
    for (const u in AR_UNITS) { if (v.includes(u)) v = v.split(u).join(AR_UNITS[u]); }
    if (v !== raw) node.nodeValue = v;
  });
  root.querySelectorAll("input[placeholder],textarea[placeholder]").forEach(el => { const p = el.getAttribute("placeholder"); if (p && AR[p.trim()]) el.setAttribute("placeholder", AR[p.trim()]); });
}
function trText(s) { if (state.lang !== "ar" || !s) return s; if (AR[s] !== undefined) return AR[s]; let v = s; for (const k of AR_SUBKEYS) { if (v.includes(k)) v = v.split(k).join(AR[k]); } for (const u in AR_UNITS) { if (v.includes(u)) v = v.split(u).join(AR_UNITS[u]); } return v; }
function setLang(l) {
  state.lang = l;
  document.querySelector(".phone").setAttribute("dir", l === "ar" ? "rtl" : "ltr");
  const cur = state.stack[state.stack.length - 1] || { name: "dashboard", params: {} };
  render(cur.name, cur.params, "enter");
  toast(l === "ar" ? "تم التغيير إلى العربية" : "Switched to English", "globe");
}
function openLanguage() {
  const cur = state.lang;
  openSheet(`<h3 style="font-weight:800;font-size:17px;margin-bottom:14px" data-no-tr>${cur === "ar" ? "اللغة" : "Language"}</h3>
    <div class="list" data-no-tr>
      <div class="list-item" onclick="closeAll();setLang('en')"><div class="thumb" style="background:var(--brand-grad)">EN</div>
        <div class="li-main"><div class="t">English</div><div class="s">Left-to-right</div></div>${cur === "en" ? `<span style="color:var(--brand-1)">${icon("check", 22)}</span>` : ""}</div>
      <div class="list-item" onclick="closeAll();setLang('ar')"><div class="thumb" style="background:linear-gradient(135deg,#10b981,#3b82f6);font-size:22px">ع</div>
        <div class="li-main"><div class="t">العربية</div><div class="s" dir="rtl">من اليمين إلى اليسار</div></div>${cur === "ar" ? `<span style="color:var(--brand-1)">${icon("check", 22)}</span>` : ""}</div>
    </div>`);
}

/* ---------- Boot ---------- */
render("login", {}, "enter");
