# InspectPro — Admin Console (Prototype)

Back-office admin app for the InspectPro engineering-inspection product. **Mobile-first**
(phone-frame) web app in pure **HTML / CSS / JS** — no framework, no backend, all data
hardcoded. Matches the engineer mobile app's design system.

## Run it
Open **`index.html`** in a browser, or serve locally: `python3 -m http.server 4708`.

**Login:** `admin@inspectpro.sa` / `admin`  (password: `admin`)

## Navigation
Bottom nav: **Home · Requests · Inspectors · Analysis · More**. "More" opens Marketing &
Finance, Admin Accounts, Settings, and Sign out.

## Sections (per client requirements)
1. **Dashboard** — revenue, requests, inspectors, "needs attention" KPIs + charts.
2. **Requests** — table (Request No · Inspector · City · Mobile · Date · PDF · Status).
   Implements the **48-hour edit window → auto-lock to PDF**, and admin **Reopen (1–10 days)**
   with inspector notification.
3. **Inspectors** — registrations table + detail drawer (Name · City · Nationality · Mobile ·
   Email + verification · SCE membership). **Approve / reject** (emails both parties),
   **anti-forgery lock** (no data edits after acceptance without admin approval).
4. **Data Analysis** — filter by Date · Inspector · Request No · Mobile · Status + charts + export.
5. **Marketing & Finance** — in-app announcements, **discount codes**, and a **productivity graph**
   (time · performance · income). No third-party commercial ads.
6. **Admin Accounts** — up to **10** management accounts (roles: Super Admin · Admin · Reviewer · Finance).
7. **Settings** — preferences + the inspector **liability disclaimer**.

## Structure
```
index.html
css/styles.css   # desktop dashboard design system (+ dark mode)
js/data.js       # hardcoded mock data
js/charts.js     # SVG charts + icons
js/app.js        # router, shell, pages, overlays
```
