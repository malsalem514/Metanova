# Navigation Overhaul — Sliding Drawer Mobile Menu + Desktop Services Dropdown

## Goal

Replace the basic white mobile menu with a premium sliding drawer with parallax push effect, services accordion, and structural watermark. Add a hover dropdown for Services on desktop.

## Design System Reference

- Background: `#F5F0E6` (warm cream)
- Text: `#121212`
- Accent: `#0A5592` (blue)
- Footer/Dark: `#1B2E37` (dark teal)
- Cards border: `#E8E0D0`
- Font: Plus Jakarta Sans (500 headings, 400 body)
- Buttons: Square, 12px radius, `px-5 py-2.5`

## Mobile Menu — Sliding Drawer

### Opening/Closing

- Hamburger button triggers open (existing button, same position)
- Drawer slides in from right, 85% viewport width
- Main page content (everything below the header) shifts left: `translateX(-15%) scale(0.92)` with `transition: transform 500ms cubic-bezier(0.32, 0.72, 0, 1)`
- Pushed content gets a dark overlay (black at 30% opacity) — tapping this closes the menu
- Body scroll is locked while drawer is open (`overflow: hidden` on body)
- Close: drawer slides out right, content pushes back, overlay fades — reverse of open

### Drawer Layout (top to bottom)

```
┌─────────────────────────────────┐
│                            [X]  │  ← Close button, top-right
│                                 │
│  Home                           │  ← 20px, weight 500, #121212
│  About                          │
│  Services              [v]      │  ← Chevron toggles accordion
│    ┌─────────────────────────┐  │
│    │ 01  Structural Eng.     │  │  ← 14px, blue-tinted bg card
│    │ 02  Real Estate Dev.    │  │     rgba(#0A5592, 0.04)
│    │ 03  Project Management  │  │     border-radius: 8px
│    └─────────────────────────┘  │
│  Careers                        │
│  Contact                        │
│                                 │
│  ─────────────────────────────  │  ← Hairline #E8E0D0
│  ENGLISH         info@metanova  │  ← 13px, blue + muted
│                                 │
│         [structural watermark]  │  ← Truss SVG, 3.5% opacity
└─────────────────────────────────┘
```

### Animation Details

- **Drawer entry:** `translateX(100%)` → `translateX(0)`, 500ms, `cubic-bezier(0.32, 0.72, 0, 1)`
- **Content push:** `translateX(0) scale(1)` → `translateX(-15%) scale(0.92)`, same duration/easing
- **Link stagger:** Each link fades in with `opacity: 0, x: 20` → `opacity: 1, x: 0`, 60ms stagger delay, starting 200ms after drawer begins opening
- **Overlay:** `opacity: 0` → `opacity: 0.3`, 400ms ease
- **Accordion expand:** Height animation via `AnimatePresence` + `motion.div`, 300ms ease-out. Chevron rotates 180deg.
- **Close:** All animations reverse

### Services Accordion

- Tapping "Services" text navigates to `/services` page
- Tapping the chevron area (right side) toggles the sub-items accordion
- The tap target for the chevron should be generous (at least 44x44px for accessibility)
- Sub-items link to:
  - `01` → `/services/structural-engineering`
  - `02` → `/services/real-estate-development`
  - `03` → `/services/project-management-consulting`
- Sub-item cards: `padding: 12px 16px`, `background: rgba(10, 85, 146, 0.04)`, `border-radius: 8px`, `margin-bottom: 4px`
- Number prefix: `font-size: 11px`, `color: #0A5592`, `font-weight: 600`, `opacity: 0.5`

### Structural Watermark

- SVG truss/grid pattern positioned absolute, bottom-right of drawer
- `opacity: 0.035`, `transform: rotate(-12deg)`
- Decorative only (`aria-hidden="true"`)
- Extends slightly outside the drawer bounds (clipped by overflow:hidden)

### Accessibility

- Focus trap inside drawer when open
- Close on `Escape` key
- `aria-expanded` on hamburger button
- `role="dialog"` and `aria-modal="true"` on drawer
- `aria-label` on close button
- Reduced motion: skip parallax push and stagger, use simple opacity fade instead

## Desktop — Services Hover Dropdown

### Trigger

- Hovering over the "Services" nav link reveals a dropdown panel
- Dropdown appears below the nav link, aligned to its left edge

### Dropdown Layout

```
┌──────────────────────────────────┐
│  Structural Engineering        → │
│  Real Estate Development       → │
│  Project Management            → │
└──────────────────────────────────┘
```

- Background: `#F5F0E6` (cream) or `white`
- Border: `1px solid #E8E0D0`
- Shadow: `0 4px 20px rgba(0,0,0,0.08)`
- Border-radius: `8px`
- Padding: `8px`
- Each item: `padding: 10px 16px`, `border-radius: 6px`, `font-size: 12px`, uppercase, tracking `0.1em`
- Hover state on items: `background: rgba(10, 85, 146, 0.05)`, `color: #0A5592`

### Animation

- Fade in: `opacity: 0, y: -8` → `opacity: 1, y: 0`, 200ms ease-out
- Fade out: reverse, 150ms

### Hover Bridge

- Small invisible bridge element (8px tall) between the nav link and the dropdown to prevent the dropdown from closing when moving mouse from link to dropdown
- Dropdown stays open while mouse is over the link OR the dropdown
- Closes with 150ms delay on mouse leave (cancels if mouse re-enters)

## Files to Modify

- `src/components/layout/Header.tsx` — main changes (mobile drawer, desktop dropdown, all animations)

## Dependencies

- `motion/react` (already installed) — AnimatePresence, motion.div, motion.nav
- No new dependencies

## Out of Scope

- Contact page video (coming later from client)
- Desktop mega-menu with images/descriptions (keep it simple)
- Service detail page changes
