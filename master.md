# FlexStock Multivendor — Design System Guide

> This document is the single source of truth for all UI components, tokens,
> and patterns used across the FlexStock Multivendor addon pages.
> When building a new component, start here.

---

## Table of Contents

1. [File Structure](#file-structure)
2. [Tech Stack](#tech-stack)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Spacing](#spacing)
6. [Border Radius](#border-radius)
7. [Shadows](#shadows)
8. [Animations](#animations)
9. [Components](#components)
   - [Buttons](#buttons)
   - [Badges & Pills](#badges--pills)
   - [Status Indicators](#status-indicators)
   - [Cards](#cards)
   - [Navigation](#navigation)
   - [Tables](#tables)
   - [Form Inputs](#form-inputs)
   - [Avatar](#avatar)
   - [Dividers](#dividers)
10. [Layout Patterns](#layout-patterns)
11. [Icons](#icons)
12. [Topbar / Announcement Bar](#topbar--announcement-bar)
13. [How to Add a New Component](#how-to-add-a-new-component)

---

## File Structure

```
Multistore-Addon/
├── hero.html          # Main page (currently hero section)
├── master.md          # This file — design system guide
├── css/
│   └── main.css       # Custom CSS only (animations, glow, etc.)
└── js/
    └── main.js        # All JavaScript (countdown, nav, scroll reveal)
```

> **Rule:** Tailwind utility classes go directly in HTML.
> `css/main.css` is only for things Tailwind cannot express
> (keyframe animations, radial gradients, `backdrop-filter`, etc.).

---

## Tech Stack

| Tool | Usage |
|------|-------|
| **Tailwind CSS** | via Play CDN (`https://cdn.tailwindcss.com`) |
| **Plus Jakarta Sans** | Primary font via Google Fonts |
| **Vanilla JS** | Countdown, nav toggle, scroll reveal |
| **Inline SVG** | All icons — no icon library dependency |

### Tailwind Config (in `<script>` tag of each HTML file)

```js
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        // SF Pro Display = Apple system font; Plus Jakarta Sans = web fallback
        sans: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Plus Jakarta Sans"', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#7334C1',   // Primary purple
          dark:    '#5e28a8',   // Hover state
          light:   '#f5f0ff',   // Light tint bg
          border:  'rgba(115,52,193,0.2)',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted:   '#f9fafb',
          subtle:  '#f3f4f6',
        },
        sidebar: {
          DEFAULT: '#1e1f2e',   // Dark sidebar bg
          border:  '#2d2e42',
        },
        ink: {
          DEFAULT: '#111827',   // Primary text
          muted:   '#4B5563',   // Secondary text
          light:   '#6B7280',   // Tertiary / placeholder
        },
      },
      boxShadow: {
        'brand-sm': '0 4px 16px rgba(115,52,193,.25)',
        'brand-md': '0 8px 24px rgba(115,52,193,.35)',
        'brand-lg': '0 10px 40px rgba(115,52,193,.14)',
        'float':    '0 8px 30px rgba(0,0,0,.12)',
        'mockup':   '0 40px 80px rgba(0,0,0,.08)',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
    },
  },
}
```

---

## Color Palette

### Brand

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| `brand` | `#7334C1` | `bg-brand` / `text-brand` | Primary buttons, links, accents |
| `brand-dark` | `#5e28a8` | `bg-brand-dark` | Hover state of primary |
| `brand-light` | `#f5f0ff` | `bg-brand-light` | Badge backgrounds, light tints |
| `brand-border` | `rgba(115,52,193,.2)` | `border-brand-border` | Subtle brand-colored borders |

### Ink (Text)

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| `ink` | `#111827` | `text-ink` | Body text, headings |
| `ink-muted` | `#4B5563` | `text-ink-muted` | Secondary text, nav labels |
| `ink-light` | `#6B7280` | `text-ink-light` | Placeholder, metadata, subtitles |

### Surface (Backgrounds)

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| `surface` | `#ffffff` | `bg-surface` | Page / card backgrounds |
| `surface-muted` | `#f9fafb` | `bg-surface-muted` | Table headers, input bg |
| `surface-subtle` | `#f3f4f6` | `bg-surface-subtle` | URL bar, hover backgrounds |

### Sidebar (Dark UI)

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| `sidebar` | `#1e1f2e` | `bg-sidebar` | Dashboard sidebar bg |
| `sidebar-border` | `#2d2e42` | `border-sidebar-border` | Sidebar dividers |

### Semantic

| Purpose | Background | Text | Border |
|---------|-----------|------|--------|
| Success / Active | `bg-green-50` | `text-green-700` | `border-green-200` |
| Warning / Pending | `bg-yellow-50` | `text-yellow-700` | `border-yellow-200` |
| Info / Syncing | `bg-orange-50` | `text-orange-700` | — |
| Danger / Error | `bg-red-50` | `text-red-700` | `border-red-200` |

---

## Typography

**Font family:** `SF Pro Display` (Apple system font) with `Plus Jakarta Sans` as the web fallback — both imported via `css/main.css`.

- Apple devices: render **SF Pro Display** natively (no download)
- Other devices: load **Plus Jakarta Sans** from Google Fonts

```html
<link rel="stylesheet" href="css/main.css" />
```
(The `@import` for Plus Jakarta Sans lives in `css/main.css`)

### Scale

| Role | Size | Weight | Line Height | Class |
|------|------|--------|-------------|-------|
| Hero headline | `clamp(38px, 5.5vw, 58px)` | 800 | 1.12 | `text-[clamp(38px,5.5vw,58px)] font-extrabold leading-[1.12]` |
| Section heading | `36px` | 700 | 1.2 | `text-4xl font-bold` |
| Sub-heading | `24px` | 700 | 1.3 | `text-2xl font-bold` |
| Card title | `16px` | 700 | — | `text-base font-bold` |
| **Button (CTA)** | **`22px`** | **500** | **120%** | **`text-[22px] font-medium leading-[120%]`** |
| Body large | `18px` | 400 | 1.625 | `text-lg` |
| Body | `15px` | 400 | — | `text-[15px]` |
| Body small | `13–13.5px` | 400–500 | — | `text-[13px]` |
| Label / uppercase | `11px` | 600 | — | `text-[11px] font-semibold uppercase tracking-wider` |
| Micro | `10.5px` | 600 | — | `text-[10.5px] font-semibold` |

### Letter Spacing

```
Hero headline:  tracking-tightest  (-0.03em)
Normal body:    tracking-normal    (default)
Labels/caps:    tracking-wider     (0.05em)
```

### Line Height

```
Headlines:  leading-[1.12]   tight, impactful
Sub-text:   leading-relaxed  (1.625)
Labels:     leading-none     (1)
```

---

## Spacing

Uses Tailwind's default spacing scale (4px base).

| Token | px | Use |
|-------|----|-----|
| `1` | 4px | Icon gaps, micro spacing |
| `1.5` | 6px | Button icon gap |
| `2` | 8px | Avatar gap, tight padding |
| `2.5` | 10px | Table cell padding |
| `3` | 12px | Button padding Y |
| `3.5` | 14px | Button padding Y (large) |
| `4` | 16px | Card padding, nav padding |
| `5` | 20px | Section inner padding |
| `7` | 28px | Badge margin-bottom |
| `8` | 32px | Page horizontal padding |
| `9` | 36px | Hero spacing |
| `14` | 56px | Hero trust-bar margin |
| `20` | 80px | Hero top padding |

---

## Border Radius

| Size | px | Tailwind | Use |
|------|-----|----------|-----|
| `rounded-md` | 6px | — | Table badges |
| `rounded-lg` | 8px | — | Icon containers |
| `rounded-full` | 9999px | — | **All buttons** (primary, secondary, nav), pills, avatars, dots |
| `rounded-xl` | 12px | — | Floating cards |
| `rounded-[16px]` | 16px | custom | Mockup wrapper top corners |

---

## Shadows

Defined in Tailwind config. Use these — don't add arbitrary shadows.

| Class | Value | Use |
|-------|-------|-----|
| `shadow-brand-sm` | `0 4px 16px rgba(115,52,193,.25)` | Default CTA button |
| `shadow-brand-md` | `0 8px 24px rgba(115,52,193,.35)` | CTA hover state |
| `shadow-brand-lg` | `0 10px 40px rgba(115,52,193,.14)` | Section-level brand glow |
| `shadow-float` | `0 8px 30px rgba(0,0,0,.12)` | Floating notification cards |
| `shadow-mockup` | `0 40px 80px rgba(0,0,0,.08)` | Product screenshot mockup |
| `shadow-sm` | Tailwind default | Cards, inputs |
| `shadow-md` | Tailwind default | Nav on scroll |

---

## Animations

Defined in `css/main.css`. Apply via class name.

### Fade Slide Up (Page Load Stagger)

```html
<!-- 6 delay steps: d0 → d5 -->
<div class="anim-fade-up">     <!-- delay: 0s   --></div>
<div class="anim-fade-up-d1">  <!-- delay: .08s --></div>
<div class="anim-fade-up-d2">  <!-- delay: .16s --></div>
<div class="anim-fade-up-d3">  <!-- delay: .24s --></div>
<div class="anim-fade-up-d4">  <!-- delay: .32s --></div>
<div class="anim-fade-up-d5">  <!-- delay: .38s --></div>
```

### Float (Infinite hover float for cards)

```html
<div class="anim-float">        <!-- continuous, no delay --></div>
<div class="anim-float-delay">  <!-- continuous, 1s delay  --></div>
```

### Pulsing Dot (Live status indicator)

```html
<span class="w-1.5 h-1.5 rounded-full bg-green-500 dot-live"></span>
```

### Hero Radial Glow

```html
<!-- Add to the section wrapper — CSS pseudo-element handles the rest -->
<section class="hero-glow relative ...">
```

---

## Components

---

### Buttons

> **Base spec** (from `.btn.get_btn` on wppool.dev):
> `font: "SF Pro Display" 22px / 500 / 120% line-height`
> `padding: 16px 32px` · `border-radius: 500px` (pill) · `border: 1px solid #7334C1`
> `background: #7334C1` · `color: #fff` · `box-shadow: none` · `outline: 0`

#### Primary Button (filled)

```html
<a href="#"
   class="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark
          text-white text-[22px] font-medium leading-[120%]
          px-8 py-4 rounded-full border border-brand
          transition-all duration-200 hover:-translate-y-0.5 outline-none">
  <!-- Optional icon -->
  <svg class="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 20 20">...</svg>
  Get Now
</a>
```

#### Secondary Button (ghost / outline)

```html
<a href="#"
   class="inline-flex items-center gap-2.5 bg-transparent hover:bg-brand
          text-brand hover:text-white text-[22px] font-medium leading-[120%]
          px-8 py-4 rounded-full border border-brand
          transition-all duration-200 hover:-translate-y-0.5 outline-none">
  <div class="w-6 h-6 rounded-full border border-current flex items-center justify-center flex-shrink-0">
    <svg class="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 20 20">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
    </svg>
  </div>
  Live Demo
</a>
```

#### Nav Button (small pill)

```html
<a href="#"
   class="text-sm font-medium text-white bg-brand hover:bg-brand-dark
          px-5 py-2 rounded-full border border-brand
          transition-all duration-150 hover:-translate-y-px outline-none">
  Buy Now
</a>
```

#### Small Dashboard Button

```html
<button class="inline-flex items-center gap-1 bg-brand text-white
               text-[11.5px] font-medium px-3 py-1.5 rounded-full
               border border-brand hover:bg-brand-dark transition-colors outline-none">
  <svg class="w-2.5 h-2.5 fill-white" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
  </svg>
  Add Vendor
</button>
```

---

### Badges & Pills

#### Hero Badge (icon + label)

```html
<div class="inline-flex items-center gap-1.5 bg-brand-light
            border border-brand-border rounded-full px-3.5 py-1.5
            text-[13px] font-semibold text-brand">
  <div class="w-5 h-5 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
    <svg class="w-2.5 h-2.5 fill-white" viewBox="0 0 20 20">...</svg>
  </div>
  New Addon — Label Text
</div>
```

#### Simple Status Badge

```html
<!-- Active (green) -->
<span class="inline-flex items-center gap-1 bg-green-50 text-green-700
             text-[10.5px] font-semibold px-2 py-0.5 rounded-full">
  ● Active
</span>

<!-- Pending (yellow) -->
<span class="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700
             text-[10.5px] font-semibold px-2 py-0.5 rounded-full">
  ◌ Pending
</span>

<!-- Syncing (orange) -->
<span class="inline-flex items-center gap-1 bg-orange-50 text-orange-700
             text-[10.5px] font-semibold px-2 py-0.5 rounded-full">
  ⟳ Syncing
</span>
```

---

### Status Indicators

#### Live Sync Indicator (pulsing dot)

```html
<div class="inline-flex items-center gap-1 bg-green-50 border border-green-200
            rounded-md px-2 py-1 text-[10.5px] font-semibold text-green-700">
  <span class="w-1.5 h-1.5 rounded-full bg-green-500 dot-live"></span>
  Synced
</div>
```

#### Topbar Announcement Countdown

```html
<span id="cd-days">00</span>d
<span id="cd-hours">00</span>h
<span id="cd-minutes">00</span>m
<span id="cd-seconds">00</span>s
<!-- Timer logic in js/main.js — auto-persists deadline in localStorage -->
```

---

### Cards

#### Floating Notification Card

```html
<div class="anim-float flex items-center gap-2.5 bg-white border border-gray-100
            rounded-xl px-3.5 py-3 shadow-float text-[12.5px] whitespace-nowrap">
  <!-- Icon container -->
  <div class="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
    <!-- SVG icon -->
  </div>
  <!-- Text -->
  <div>
    <div class="font-semibold text-ink">Card Title</div>
    <div class="text-[11.5px] text-ink-light">Subtitle text</div>
  </div>
  <!-- Optional badge -->
  <div class="inline-flex items-center gap-1 bg-green-50 border border-green-200
              rounded-md px-2 py-1 text-[10.5px] font-semibold text-green-700">
    <span class="w-1.5 h-1.5 rounded-full bg-green-500 dot-live"></span>
    Live
  </div>
</div>
```

#### Content Card (general)

```html
<div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md
            transition-shadow duration-150">
  <!-- Card content -->
</div>
```

---

### Navigation

#### Full Navbar Structure

```html
<nav id="main-nav"
     class="sticky top-0 z-50 bg-white/95 navbar-blur border-b border-gray-100
            px-8 transition-shadow duration-200">
  <div class="max-w-[1200px] mx-auto flex items-center gap-8 h-16">
    <!-- Logo -->
    <!-- Nav menu (ul) -->
    <!-- Nav actions (ml-auto) -->
  </div>
</nav>
```

#### Nav Menu Item

```html
<a href="#"
   class="text-sm font-medium text-ink-muted hover:text-ink hover:bg-gray-100
          px-3 py-1.5 rounded-lg transition-all duration-150">
  Page Name
</a>
```

#### Sidebar Nav Item (Dashboard)

```html
<!-- Default -->
<div class="flex items-center gap-2 px-4 py-2 text-[12.5px] text-gray-400
            hover:text-gray-200 hover:bg-white/5 cursor-pointer transition-colors">
  <svg class="w-3.5 h-3.5 flex-shrink-0 fill-current" viewBox="0 0 20 20">...</svg>
  Page Label
</div>

<!-- Active state -->
<div class="flex items-center gap-2 px-4 py-2 text-[12.5px] text-blue-300
            bg-brand/15 border-r-2 border-brand cursor-pointer">
  <svg class="w-3.5 h-3.5 flex-shrink-0 fill-current" viewBox="0 0 20 20">...</svg>
  Active Page
</div>
```

---

### Tables

#### Vendor / Data Table

```html
<table class="w-full text-[12px] border-collapse">
  <thead>
    <tr>
      <th class="text-left px-2.5 py-2 text-[11px] font-semibold uppercase
                 tracking-wider text-ink-light border-b border-gray-100 bg-gray-50">
        Column
      </th>
    </tr>
  </thead>
  <tbody>
    <tr class="vendor-table-row">  <!-- adds hover:bg-[#fafbff] via CSS -->
      <td class="px-2.5 py-2.5 border-b border-gray-50 text-ink-muted">
        Cell content
      </td>
    </tr>
  </tbody>
</table>
```

> Add `vendor-table` class to `<table>` to get the hover effect from `css/main.css`.

---

### Form Inputs

#### Text Input

```html
<input type="text"
       class="w-full bg-surface-muted border border-gray-200 rounded-lg
              px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-light
              focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
              transition-all duration-150"
       placeholder="Enter value..." />
```

#### Select

```html
<select class="w-full bg-surface-muted border border-gray-200 rounded-lg
               px-3.5 py-2.5 text-sm text-ink
               focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
               transition-all duration-150 appearance-none cursor-pointer">
  <option>Option 1</option>
</select>
```

#### Label

```html
<label class="block text-[13px] font-semibold text-ink mb-1.5">
  Field Label
</label>
```

---

### Avatar

#### Initials Avatar

```html
<!-- Colors: indigo, pink, amber, emerald, blue, violet -->
<div class="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center
            text-[10px] font-bold text-white flex-shrink-0">
  AB
</div>

<!-- Large version -->
<div class="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center
            text-xs font-bold text-white flex-shrink-0">
  TC
</div>
```

---

### Dividers

#### Horizontal

```html
<div class="border-t border-gray-100 my-4"></div>
```

#### Vertical (trust bar separator)

```html
<div class="w-px h-4 bg-gray-200"></div>
```

#### Sidebar divider

```html
<div class="border-t border-sidebar-border my-2 pt-4"></div>
```

---

## Layout Patterns

### Section Spacing

| Gap | px | Tailwind | Use |
|-----|----|----------|-----|
| Inter-section top padding | `160px` | `pt-[160px]` | Space between consecutive page sections (e.g. Hero → Pain Points) |
| Section bottom padding | `96px` | `pb-24` | Default bottom padding for all sections |

> **Rule:** Each section uses `pt-[160px] pb-24 px-8` as its padding baseline.
> The `160px` top padding creates the breathing room between sections.

---

### Page max-width

```html
<div class="max-w-[1200px] mx-auto px-8">
  <!-- Content -->
</div>
```

### Hero content width

```html
<div class="max-w-[820px] mx-auto text-center">
```

### Dashboard split layout

```html
<div class="grid grid-cols-[220px_1fr] min-h-[340px]">
  <aside class="bg-sidebar">...</aside>
  <main class="bg-white">...</main>
</div>
```

### Two-column section

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
```

### Feature card grid

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
```

---

## Icons

All icons are **inline SVG** — no external library.

- `viewBox="0 0 20 20"` — 20×20 Heroicons style (most common)
- Fill color: `fill-current` + parent text color, or explicit `fill-brand`, `fill-white`
- Common sizes: `w-3.5 h-3.5` (small), `w-4 h-4` (medium), `w-5 h-5` (large)
- Google Sheets icon: uses the official multi-path SVG with `viewBox="0 0 87.3 78"`

```html
<!-- Inline icon pattern -->
<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
  <path d="..."/>
</svg>
```

---

## Topbar / Announcement Bar

```html
<div class="bg-[#0D1117] text-white text-center text-[13.5px] font-medium
            py-2.5 px-5 tracking-[.01em]">
  🎉 Announcement text —
  <span class="text-amber-400 mx-1 font-semibold">Highlighted</span>
  label.
  <a href="#section" class="text-blue-300 underline underline-offset-2 ml-1.5
                            hover:text-blue-200 transition-colors">
    CTA link →
  </a>
</div>
```

---

## How to Add a New Component

1. **Check this guide first** — find the closest existing component pattern.
2. **Use Tailwind classes** in the HTML directly.
3. **Only touch `css/main.css`** if you need keyframe animations, radial/complex
   gradients, or pseudo-elements.
4. **Only touch `js/main.js`** if you need interactivity. Use `data-reveal` on
   any element you want to animate in on scroll (already wired up).
5. **Document it here** under `## Components` with a code snippet.
6. **Follow the token system** — use `text-ink`, `bg-brand`, etc. instead of
   arbitrary hex values.

### Scroll Reveal (automatic)

Add `data-reveal` to any element and it will fade/slide in when scrolled into view:

```html
<div data-reveal class="opacity-0 translate-y-4 transition-all duration-500">
  This will animate in on scroll.
</div>
```

---

*Last updated: March 2026*
