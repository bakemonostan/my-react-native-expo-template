# Design system handoff — what “complete” looks like

A **well-structured** system you can implement without guessing has **named tokens**, **semantic rules**, **component contracts**, and **edge cases** spelled out. Below is a practical outline you can copy; fill each section before build.

---

## 1. Principles & scope

- **Product**: what the app is (1–2 sentences).
- **Platforms**: iOS / Android / web (which matter for v1).
- **Non-goals**: what this DS explicitly does *not* cover yet.

---

## 2. Foundations (tokens)

Everything below should use **stable names** (e.g. `color.surface.default`, not “light gray bg”). Export as a flat or nested table: **name → value → usage note**.

### 2.1 Color

- **Primitives**: ramps (e.g. neutral 0–900, brand primary/secondary, success/warning/error/info).
- **Semantic**: `background`, `surface`, `surface-elevated`, `text-primary`, `text-secondary`, `border`, `focus`, `disabled`, `overlay`.
- **States**: hover / pressed / disabled / selected (if web); **pressed + disabled** for native.
- **Dark mode**: full parallel set *or* explicit rules (e.g. “swap neutral-900 ↔ neutral-0”).
- **Contrast**: minimum pairs called out (WCAG target, e.g. AA for body text).

### 2.2 Typography

- **Font families**: regular / medium / bold (and where they fail—e.g. tabular figures).
- **Scale**: numbered steps (e.g. `display`, `h1`–`h4`, `body`, `caption`) with **font size, line height, letter spacing** per step.
- **Weights** allowed per step.
- **Rules**: max line length, truncation vs wrap, heading hierarchy.

### 2.3 Spacing & layout

- **Spacing scale**: 4/8-based (or your grid) — list numeric steps only used in UI (`space.1` … `space.n`).
- **Insets / page margins** for phone (and tablet if applicable).
- **Touch targets**: minimum size (e.g. 44×44 pt) for tappable areas.

### 2.4 Radius, border, dividers

- **Radius tokens** (e.g. `none`, `sm`, `md`, `full`) and which components use which.
- **Border width** tokens; **divider** style (color, thickness).

### 2.5 Elevation / shadow (platform-realistic)

- **Levels** (e.g. 0–3) with **iOS** and **Android** expectations called out (RN does not match CSS shadow 1:1—spec **intent**, not only CSS box-shadow).

### 2.6 Motion

- **Durations** (e.g. fast / base / slow) and **easings** (named).
- **Patterns**: screen transition, sheet, toast, skeleton—when to use which.

### 2.7 Icons & illustration

- **Icon set** (name + grid size, stroke vs fill).
- **Sizes** tokenized (`icon.sm` / `icon.md`).
- **Asset pipeline**: SVG vs PNG, @1x/@2x/@3x if raster.

---

## 3. Semantic mapping (critical)

One table: **UI role** → **token(s)**. Examples:

| Role            | Light              | Dark               |
|-----------------|--------------------|--------------------|
| Screen bg       | `color.background` | `color.background` |
| Card            | `color.surface`    | `color.surface`    |
| Primary action  | `color.action.primary` | same + pressed token |

Without this, engineers will invent mappings per screen.

---

## 4. Components (library spec)

For **each** component, a short spec block:

- **Name** + **when to use / when not to**.
- **Anatomy**: slots (e.g. left icon, label, right chevron).
- **Variants**: primary / secondary / ghost / danger (list all).
- **Sizes**: sm / md / lg (dimensions tied to spacing + type scale).
- **States**: default, pressed, disabled, loading, error, focus (as applicable).
- **Content rules**: min/max label length, optional vs required subcopy.
- **Accessibility**: role, label behavior, focus order, min hit area.

Priority order for implementation: **Button, Text, Input, List row, Nav bar, Modal/Sheet, Toast, Empty state, Error state**.

---

## 5. Patterns (not just atoms)

- **Forms**: validation timing, error text placement, helper text.
- **Lists**: loading skeleton, empty, error, pagination/infinite rules.
- **Navigation**: stack vs tabs; back behavior; modal vs full screen.
- **Feedback**: success/error toasts, inline errors, blocking vs non-blocking.

---

## 6. Content & localization (if relevant)

- **Tone** (brief).
- **Date/number/currency** conventions.
- **RTL**: supported or not; mirroring rules for icons.

---

## 7. Handoff artifacts (what to attach)

- **Token file**: JSON or CSS variables — **single source of truth**.
- **Figma** (or similar): components linked to same names as tokens.
- **Changelog** when tokens or components change.

---

## 8. Definition of done

A design system is **implementation-ready** when:

1. Every screen in v1 can be built from **tokens + listed components** without one-off hex codes.
2. **Dark mode** is fully specified or explicitly deferred with a plan.
3. **States** (loading / empty / error / disabled) are defined for data-heavy UI.
4. Names are **stable** enough to survive a few releases without renames.

---

*Use this file as a template: duplicate it per product and fill the sections before engineering starts.*
