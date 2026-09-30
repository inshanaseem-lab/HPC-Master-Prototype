# HPC app · Responsive, GIGW-compliant, micro-frontend rebuild

Scope: make every screen work from a 320 px phone to a desktop without stretching, meet the
Government of India's **GIGW 3.0** guidelines (which adopt **WCAG 2.1 AA**), make screens easier
to use, and restructure the codebase as **micro-frontends** (one independently loaded module
per flow on a shared platform).

Baseline measured on 26 screens (26 Sep 2026):
- No horizontal scroll at 320 px anywhere.
- 481–639 px: the app stretches edge to edge (cards/buttons stretch).
- Tablets get a fake phone bezel; desktop shows a phone frame.
- All font sizes are fixed `px`, so Android/iOS "large text" settings are ignored (WCAG 1.4.4).
- One 1.1 MB JS bundle; every flow downloads on first open.
- axe-core WCAG 2.2 AA scan: passes, except the known deviation below.

**Known, accepted deviation (product-owner decision, 26 Sep 2026):** white text on the brand
orange `#FF7900` measures 2.6:1, below the 4.5:1 WCAG AA / GIGW minimum. Recorded in the in-app
accessibility statement. Compliant alternative if ever required: near-black label on the same
orange (6.2:1).

---

## Architecture: micro-frontends

```
src/
  platform/          shell: router, layout, error boundaries, route titles, focus management
  components/ui.jsx  design system (tokens in tailwind.config.js)
  hpc/               shared domain: handbook config, cross-role store, registry, domain UI
  i18n/              t(), dictionaries
  flows/<mfe>/       one micro-frontend each:
    manifest.js      id, role, owner, title — eager, tiny
    routes.jsx       route table; every screen is lazy() so it downloads on first visit
    …screens, parts, data, local store
```

Rules for every micro-frontend (MFE):
1. May import only from `components/`, `hpc/`, `i18n/`, `store/`, `student/` (the platform and
   shared domain) and from its own folder. **Never from another MFE's folder.** Cross-MFE links
   are URLs (route contract) and registry calls, never imports.
2. Owns its routes, strings (`i18n/hi/<mfe>.js`), assets (`assets/<mfe>/`) and local state.
3. Every screen is code-split (`lazy`). A crash inside one MFE is caught by its error boundary
   and shows a "Something went wrong · Try again" state without taking down the app.
4. Shared UI changes go to the platform, not copied into an MFE.

MFEs: `onboarding` (login, home, classes, profile), `students` (HPC viewer incl. the student's
/s/hpc, class overview), `know-myself` (A), `group-project` = folders `group-setup` + `group-live`
(B teacher, one MFE), `pbi` (C teacher), `classroom` (D), `student-home`, `student-ac` (A + C student),
`student-bd` (B + D student), `about` (GIGW pages).

Cross-MFE data goes through `src/platform/services.js` (provide / getService); shared student UI
lives in `src/student/`. `npm run check:mfe` (also run by `npm run build`) fails on any
cross-MFE import.

---

## Tasks

### P1 · Platform shell (lead)
**Goal:** responsive app frame, lazy MFEs, route titles, focus and landmarks.
- Layout: ≤ 480 px full-bleed; 481–1023 px a centred 480 px column on the warm canvas (no
  bezel, no stretching); ≥ 1024 px the device-frame preview.
- Convert every `routes.jsx` to lazy screens (codemod), add `Suspense` skeleton and a per-route
  `ErrorBoundary` with Try again.
- `document.title` per route ("Screen · HPC"); move focus to the screen heading on navigation
  (screen readers announce the new screen); `<header>` / `<main>` / `<footer>` landmarks in
  `Screen`; toasts `role="status"`.
- Accept: `vite build` splits into per-MFE chunks; no screen regresses at 320 / 412 / 768 / 1280.

### P2 · Scalable type (lead)
**Goal:** text follows the user's OS font size (WCAG 1.4.4, GIGW).
- Codemod `text-[Npx]` and `leading-[Npx]` to `rem`; keep layout widths in px/%, never fixed
  heights on text containers.
- Accept: at 200 % text size, no clipped or overlapping text on the 26 audited screens.

### P3 · GIGW compliance screens (lead)
**Goal:** the mandatory information GIGW asks every government app to carry, kept short.
- In both profiles, an "About & policies" list: Help & support, Accessibility statement,
  Privacy policy, Terms of use, App version / last updated, Feedback. Content that the state
  department must supply is labelled "Content from Samagra Shiksha, Himachal Pradesh".
- Accessibility statement lists the conformance level and the known deviation above.

### P4 · Per-MFE responsive + usability pass (agents, one group each)
Prompt for each agent (fill in `<folders>`):

> You own `<folders>` (and their `i18n/hi` + `assets` files). Read `PLAN.md`, `src/components/ui.jsx`,
> `src/hpc/components.jsx`, `tailwind.config.js`. Do not edit anything outside your folders.
> For every screen you own, check at **320, 360, 412 and 480 px** wide (open your own browser tab;
> never drive other tabs) and fix:
> 1. **No stretching:** nothing wider than its content needs — images keep aspect ratio
>    (`object-contain`, explicit width/height), cards and buttons never exceed the 480 px column,
>    long text wraps (no `whitespace-nowrap` on sentences), no fixed `w-[NNNpx]` except icons.
> 2. **Easier arrangement:** one primary action per screen, pinned in the footer; secondary actions
>    as outline/text buttons below it; destructive actions last and confirmed; related fields
>    grouped in one card with a heading; labels above inputs; errors under the field;
>    lists (not rows of buttons) for choices; progressive disclosure (collapse) for long optional detail.
> 3. **Touch & reading:** targets ≥ 44 × 44 px with ≥ 8 px gaps; body text ≥ 14 px, secondary ≥ 12 px;
>    line length ≤ ~70 characters; no information by colour alone (icon + text on status chips).
> 4. **Screen readers:** every screen has one `<h1>`; icon-only buttons have `aria-label`;
>    decorative images `alt=""`; form fields have labels; state changes announced (EventNotice / toast).
> 5. **Both languages:** check Hindi at 320 px (Hindi runs 20–40 % longer).
> 6. **200 % text:** set `document.documentElement.style.fontSize = '200%'` and re-check at 360 px:
>    rows that hold text + icons/buttons must wrap (flex-wrap, `min-w-0`, text block `flex-1 min-w-[10rem]`),
>    never overlap or truncate names; e.g. the home header currently overlaps the emblem at 200 %.
>    Use rem-based sizes only (px text sizes were already converted); never fixed heights on text.
> Tools: open your OWN tab with the browser tools (tabs_create, then navigate/resize_window/javascript_tool
> with that tabId) at http://localhost:5190/#/<route>. Don't touch other tabs or change the shared viewport.
> Disable animations while checking: inject `*{animation:none!important;transition:none!important}`.
> Keep behaviour and content unchanged — layout, spacing and structure only.
> Finish with `npx vite build` passing and a report: screens touched, what changed, anything unresolved.

Groups: (a) onboarding + students + student-home · (b) know-myself + classroom ·
(c) group-setup + group-live + student-bd · (d) pbi + student-ac.

### P5 · Verification (lead)
- Overflow scan at 320 / 360 / 412 / 480 / 768 / 1280 px on all screens, both languages.
- axe-core WCAG 2.2 AA scan on all screens.
- Text-size 200 % check.
- Build size per chunk.
