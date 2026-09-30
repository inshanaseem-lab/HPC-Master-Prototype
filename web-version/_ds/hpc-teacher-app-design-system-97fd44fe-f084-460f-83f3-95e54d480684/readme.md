# HPC Teacher App — Design System

Design system for the **Holistic Progress Card (HPC)** teacher mobile app — a tool that lets school teachers in Himachal Pradesh run learning activities (Section A “Know Myself”, group projects, problem-based enquiry, classroom interaction), evaluate students with rubrics, and view each student's live HPC. Header lockups carry the Government of Himachal Pradesh, Samagra Shiksha, HP Board of School Education (Dharamshala) and PARAKH marks.

## Sources
- Figma: **“HPC New Prototype - 22 September.fig”** (attached file, not a link). Pages: `Final-Screens` (4 flow boards: all teacher flows, home / view HPC / quick access, language-login-onboarding), `Teacher-Flows-Mobile` (106 frames — every flow step at 412×~915), `Trash-Bin` (3 discarded frames).
- 415 Figma Variables (one “Ungrouped” collection with many library modes) → `components/figma/fig-tokens.css`.
- No codebase, no slide decks, no font files were provided.

## Products / surfaces
One product: the **teacher Android app** (412px wide). Flows in the file: onboarding (language → user type → teacher ID → verify details), home, add/remove classes, start activity (Section A, Group Project setup & live evaluation, Inquiry, Classroom Interaction, Manual Grouping), class overview, view student's HPC (search → Live HPC profile → student details), surveys, success/error screens.

## Index
- `styles.css` — global entry (imports only)
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css` (brand tokens transcribed from screens)
- `components/figma/` — generated `fig-tokens.css` (all 415 variables, all modes), `fig-typography.css` (empty — file defines 0 text styles), `fig-assets.css` + `assets/`
- `components/<group>/` — React components + `.d.ts` + `.prompt.md` + one card
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `assets/` — `logos/`, `illustrations/`, `patterns/`, `icons/`
- `ui_kits/teacher-app/` — click-through recreation (`index.html`, `Home Screen.html` starting point)
- `SKILL.md`, `thumbnail.html`

## Components
All 21 component sets + 31 standalone symbols from the file's inventory:
- **forms/** — Checkbox (.Checkbox), Field (.Field), RadioButtonIcon (.Radio Button Icon), RadioButton (Radio Button), Label (label), InfoField (Info Field)
- **actions/** — Button (Button set 1:262), Button2 (second Button set 173:192), BottomNavBar (Bottom Nav Bar, composes NavButton internally — not shown standalone), NavButton (Nav Button — used only via BottomNavBar), CaretRight
- **display/** — Avatar, BadgeAccentTag (Badge / Accent Tag), Separator, StudentOverviewCard (Student Overview card), WorkoutTime (Workout time), SpeedWidgets (Speed_Widgets — both same-named sets resolve to one component)
- **accordions/** — ChartAccordion, HealthAccordion, InfoAccordion, ListAccordion, PendingAccordion
- **device/** — StatusBar (Status bar), GestureBar (.Gesture bar), BGFrame (BG Frame)
- **annotation/** — Notes
- **glyphs/** — Circle, Circle2, ChevronDown, ChevronDownFilled, ChevronUp, HelpCircle, HxHome02, HxTrendUp01Filled, IconCheck, Minus, Mail01, BarChart07, Briefcase02
- **icons/** — Icon (25 glyphs: ArrowLeft, ArrowLeftFilled, ArrowRight, Bank, BarChart07, Briefcase02, CheckVerified01, ChevronDown, ChevronDownFilled, ChevronUp, Circle, Delete, HelpCircle, HxClipboardDuotone, HxFile06, HxHome02, HxTrendDown01Filled, HxTrendUp01Filled, IconCheck, LogOut01, Mail01, Minus, User01, Users01, XClose)

### Intentional additions
- `Icon` wrapper — renders the file's standalone icon symbols by name from one data file.

## CONTENT FUNDAMENTALS
- **Voice:** friendly, direct, second person to the teacher (“Welcome back”, “Your Classes”, “Please verify if this you”). The app talks *to* the teacher; students are referred to in third person.
- **Casing:** Title Case for screen titles and CTAs (“Start a new Activity”, “View Student’s HPC”, “Add/Remove Classes”, “Confirm and Proceed”); sentence case for helper copy (“Choose the type of activity you'd like to create.”). Section labels are UPPERCASE overlines (“TODAY'S FOCUS”, “QUICK ACTIONS”, “THIS YEAR AT A GLANCE”, “TIMELINE”).
- **Density:** short imperative CTAs (Continue, Next, Confirm); one-line helpers under every H1. Meta rows use middle dots: “Class 9 A · 123401”, “Group Project · 3 stages · 12 h”, “Updated on 01/01/25 · On Track”.
- **Domain vocabulary:** HPC, Live HPC, Section A, FA/SA (formative/summative assessment), ORF score, rubric, cohort (“Prarambhik”), grade/class/section (“Class 9 A”, “Grade 9A”).
- **Bilingual:** English and हिंदी are offered at onboarding; keep strings short enough to translate.
- **Emoji:** used sparingly as data icons on the student profile (🗓️ attendance, 📊 performance, 🧑‍🎓 ORF, 🎯 goals) and arrows “↗” for trend. Never in headings or buttons.
- Copy in the source has typos (“Procees”, “this you”); fix when reusing.

## VISUAL FOUNDATIONS
- **Color:** warm and civic. Saffron `#FF7900` is the only accent — primary buttons, quick-action card, overline labels (`#E86E00`), outline pill buttons (`#B55600` on `#FFF2E6`). Text is warm near-black `#221F26` with grey `#6B6873`; slate `#64748B` for greeting/meta. App background is warm stone `#F4F2EF`; cards white. Class cards on home use four pastel tints (lavender `#BFC3FB`, pink, cream, sky). Green `#1B6B34` / brick red `#B54A45` for status; grade chips use brick red text.
- **Type:** Poppins everywhere in product screens (400/500/600/700). Inter appears only inside library components (Button, Field, badges) and grade chips. H1 24/30 SemiBold; screen titles 18/24 SemiBold; body 13/19; overlines 12/16 Bold +0.96px uppercase.
- **Backgrounds:** a faint line-doodle pattern (`assets/patterns/doodle-bg.png`) sits in the top-left of screens; the final home uses a soft peach→stone vertical gradient (BG Frame). The Live HPC profile uses a dark `#221F26` hero with a single saffron diagonal wedge. No photos; 3D-style spot illustrations on quick-action cards.
- **Cards:** white, 1px hairline border (`#E5E6E1` / `#E4E1DD`), radius 16–18, **no drop shadow**. Option rows radius 10; inputs radius 8, height 50. Dashed-border sunken card (`#F1EFEC`) for “coming later” placeholders.
- **Buttons:** full-width pill (h48, r999) saffron with white Poppins 500 15px; disabled = `#CDCDCD` fill with `#A7A4AC` text. Secondary = outline pill (saffron-100 fill, `#B55600` 1px border). Library buttons (r4) carry a subtle bevel inset shadow.
- **Selection state:** orange 1px border (`#E86E00`) + orange bold label, optionally `#FFFAF5` fill. No checkmarks needed on single-select rows.
- **Layout:** 412px mobile; 16px screen padding, 20px section gaps, 12px list gaps, 96px bottom inset. Fixed status bar (36) + top app bar (68, `#FFFBF9`, back chevron + 18px title) + sticky footer CTA (12/16/24 padding) with gesture bar.
- **Borders/dividers:** 1px `#E4E1DD` full-width rules between home sections.
- **Shadows:** almost none; `0 1px 2px rgba(0,0,0,.05)` on small elements only.
- **Transparency/blur:** only on the dark hero (white 50% pill border) and the gesture bar (`rgba(63,61,69,.7)`). No blur.
- **Motion:** not specified in the file. Keep it minimal — simple push/pop screen transitions, no bounces.
- **Hover/press:** mobile-first; library tokens define hover as one step darker surface (`--button-surface-*-hover`). Press = darker saffron (`#E86E00`).
- **Imagery vibe:** warm, bright, friendly 3D illustrations (lightbulb, puzzle, report sheet).

## ICONOGRAPHY
- The file uses an **Untitled-UI-style 1.5px-stroke outline set** (names like `mail-01`, `user-01`, `check-verified-01`, `log-out-01`, `x-close`) plus a few filled “hx_” glyphs (`hx_home-02`, `hx_trend-up-01-filled`, `hx_clipboard-duotone`). All 25 are extracted to `components/icons/icon-data.js` → `<Icon name="…" />`, painting with `currentColor`. Extra screen-specific SVGs (pencil, eye, clipboard-check, menu, user) are in `assets/icons/`.
- Icons are 16–24px, usually saffron (`#E56F3D`) on light chips or ink/grey on rows. Right-chevron / arrow affordance ends every tappable row.
- Emoji appear only as data markers on the student profile (see Content). Unicode “↗” marks trends.
- No icon font.

## Brand marks
No app logo exists in the source; the product name “Holistic Progress Card” is set in type in the app bar. Partner/government logos (PNG) are in `assets/logos/`.

## Fonts
Poppins, Inter, Open Sans and Montserrat load from Google Fonts (`tokens/fonts.css`) — no font binaries were provided.
