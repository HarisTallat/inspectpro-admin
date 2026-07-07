/* ============================================================
   InspectPro Admin — Mock Data (hardcoded, no backend)
   ============================================================ */
const DB = {
  admin: { name: "Yousef Al-Mutairi", role: "Super Admin", initials: "YM", av: "av-1", email: "admin@inspectpro.sa" },

  kpi: { revenue: 128, requests: 342, inspectors: 48, pending: 6, conversion: 71, avgTime: 2.4 },

  // ---- Requests (reports engineers paid for) ----
  requests: [
    { id: "RPT-2026-000142", eng: "Khalid Al-Otaibi", city: "Riyadh", mobile: "+966 55 214 7788", date: "2026-07-07", status: "open", hoursLeft: 41, type: "Commercial Building", paid: 350 },
    { id: "RPT-2026-000141", eng: "Sara Al-Harbi", city: "Jeddah", mobile: "+966 56 909 3321", date: "2026-07-07", status: "open", hoursLeft: 12, type: "Villa", paid: 250 },
    { id: "RPT-2026-000140", eng: "Faisal Al-Dosari", city: "Dammam", mobile: "+966 54 771 0092", date: "2026-07-06", status: "locked", hoursLeft: 0, type: "Residential Building", paid: 350 },
    { id: "RPT-2026-000139", eng: "Noura Al-Qahtani", city: "Riyadh", mobile: "+966 50 338 5510", date: "2026-07-06", status: "locked", hoursLeft: 0, type: "Apartment", paid: 200 },
    { id: "RPT-2026-000138", eng: "Omar Al-Ghamdi", city: "Mecca", mobile: "+966 53 442 8890", date: "2026-07-05", status: "reopened", hoursLeft: 96, type: "Duplex", paid: 250 },
    { id: "RPT-2026-000137", eng: "Khalid Al-Otaibi", city: "Riyadh", mobile: "+966 55 214 7788", date: "2026-07-04", status: "locked", hoursLeft: 0, type: "Commercial Building", paid: 350 },
    { id: "RPT-2026-000136", eng: "Sara Al-Harbi", city: "Jeddah", mobile: "+966 56 909 3321", date: "2026-07-03", status: "expired", hoursLeft: 0, type: "Villa", paid: 250 },
    { id: "RPT-2026-000135", eng: "Tariq Bin Nasser", city: "Dammam", mobile: "+966 54 009 7712", date: "2026-07-02", status: "locked", hoursLeft: 0, type: "Duplex", paid: 250 },
  ],

  // ---- Inspectors / Examiners ----
  inspectors: [
    { id: "e1", name: "Khalid Al-Otaibi", city: "Riyadh", nationality: "Saudi", mobile: "+966 55 214 7788", email: "k.alotaibi@inspectpro.sa", verified: true, sce: "SCE-114203", status: "approved", reports: 42, joined: "2026-01-12", av: "av-1", initials: "KA" },
    { id: "e2", name: "Sara Al-Harbi", city: "Jeddah", nationality: "Saudi", mobile: "+966 56 909 3321", email: "s.alharbi@inspectpro.sa", verified: true, sce: "SCE-098771", status: "approved", reports: 31, joined: "2026-02-03", av: "av-4", initials: "SH" },
    { id: "e3", name: "Faisal Al-Dosari", city: "Dammam", nationality: "Saudi", mobile: "+966 54 771 0092", email: "f.aldosari@inspectpro.sa", verified: true, sce: "SCE-132049", status: "approved", reports: 26, joined: "2026-02-18", av: "av-3", initials: "FD" },
    { id: "e4", name: "Omar Al-Ghamdi", city: "Mecca", nationality: "Egyptian", mobile: "+966 53 442 8890", email: "o.alghamdi@inspectpro.sa", verified: true, sce: "SCE-151877", status: "pending", reports: 0, joined: "2026-07-06", av: "av-5", initials: "OG" },
    { id: "e5", name: "Layla Al-Mansour", city: "Riyadh", nationality: "Jordanian", mobile: "+966 51 220 7781", email: "l.mansour@gmail.com", verified: false, sce: "SCE-160934", status: "pending", reports: 0, joined: "2026-07-07", av: "av-2", initials: "LM" },
    { id: "e6", name: "Tariq Bin Nasser", city: "Dammam", nationality: "Saudi", mobile: "+966 54 009 7712", email: "t.nasser@inspectpro.sa", verified: true, sce: "SCE-140028", status: "approved", reports: 18, joined: "2026-03-09", av: "av-1", initials: "TN" },
    { id: "e7", name: "Hassan Al-Zahrani", city: "Jeddah", nationality: "Saudi", mobile: "+966 55 771 4402", email: "h.zahrani@outlook.com", verified: true, sce: "—", status: "rejected", reports: 0, joined: "2026-06-28", av: "av-3", initials: "HZ" },
  ],

  // ---- Discount codes ----
  codes: [
    { code: "LAUNCH25", pct: 25, uses: 84, limit: 200, status: "active", expires: "2026-08-01" },
    { code: "SUMMER15", pct: 15, uses: 142, limit: 500, status: "active", expires: "2026-09-15" },
    { code: "SCE10", pct: 10, uses: 37, limit: 100, status: "active", expires: "2026-12-31" },
    { code: "EARLYBIRD", pct: 30, uses: 100, limit: 100, status: "expired", expires: "2026-05-01" },
  ],

  // ---- Admin accounts (max 10) ----
  admins: [
    { name: "Yousef Al-Mutairi", email: "admin@inspectpro.sa", role: "Super Admin", initials: "YM", av: "av-1", last: "Active now" },
    { name: "Mansour Al-Otaibi", email: "mansour@inspectpro.sa", role: "Admin", initials: "MO", av: "av-3", last: "2h ago" },
    { name: "Reem Al-Faran", email: "reem@inspectpro.sa", role: "Reviewer", initials: "RF", av: "av-4", last: "Yesterday" },
    { name: "Ali Al-Harthy", email: "ali@inspectpro.sa", role: "Finance", initials: "AH", av: "av-5", last: "3 days ago" },
  ],

  ads: [
    { title: "Ramadan offer — 20% off your first report", body: "Limited-time launch pricing for new engineers.", status: "active", views: 4210 },
    { title: "New: bilingual Arabic/English PDF export", body: "Now available for all report templates.", status: "scheduled", views: 0 },
  ],

  notifications: [
    { icon: "userPlus", tint: "tint-indigo", t: "New examiner registration", s: "Layla Al-Mansour is awaiting approval.", time: "18m ago" },
    { icon: "alert", tint: "tint-orange", t: "Reopen requested", s: "Omar Al-Ghamdi requested to reopen RPT-2026-000138.", time: "1h ago" },
    { icon: "lock", tint: "tint-red", t: "Report auto-locked", s: "RPT-2026-000140 closed after 48h.", time: "3h ago" },
    { icon: "money", tint: "tint-green", t: "Payment received", s: "SAR 350 for RPT-2026-000142.", time: "5h ago" },
  ],

  // ---- Chart data ----
  revenueMonthly: [62, 74, 68, 95, 88, 112, 128],   // SAR '000
  requestsMonthly: [{ m: "Jan", v: 34 }, { m: "Feb", v: 41 }, { m: "Mar", v: 38 }, { m: "Apr", v: 55 }, { m: "May", v: 49 }, { m: "Jun", v: 64 }, { m: "Jul", v: 61 }],
  perfMonthly: [78, 82, 80, 88, 85, 91, 94],         // performance %
  prepMonthly: [3.1, 2.9, 2.8, 2.6, 2.5, 2.4, 2.3],  // avg prep time (hours)
  statusSplit: [ { label: "Completed", v: 62, c: "#10b981" }, { label: "Under construction", v: 26, c: "#f59e0b" }, { label: "Expired", v: 12, c: "#ef4444" } ],
  citySplit: [ { label: "Riyadh", v: 44, c: "#6366f1" }, { label: "Jeddah", v: 28, c: "#8b5cf6" }, { label: "Dammam", v: 17, c: "#3b82f6" }, { label: "Mecca", v: 11, c: "#a855f7" } ],
};
DB.kpi.pending = DB.inspectors.filter(i => i.status === "pending").length + DB.requests.filter(r => r.status === "reopened").length;
