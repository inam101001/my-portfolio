---
name: Magnetic Operations Archive
description: A production-minded portfolio rendered as a late-1960s computer operations archive.
colors:
  paper: "#e9e2d0"
  paper-bright: "#f4eddb"
  paper-muted: "#b9b2a2"
  ink: "#0b0d0c"
  ink-raised: "#171a18"
  magnetic-cobalt: "#1d3fe0"
  magnetic-cobalt-dark: "#112dad"
  registration-orange: "#e66332"
  line-dark: "rgba(11, 13, 12, 0.26)"
  line-light: "rgba(233, 226, 208, 0.24)"
typography:
  display:
    fontFamily: '"Cabinet Grotesk", "Arial Narrow", "Bahnschrift", Arial, sans-serif'
    fontSize: "clamp(4rem, 7.3vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Cabinet Grotesk", "Arial Narrow", "Bahnschrift", Arial, sans-serif'
    fontSize: "clamp(3.25rem, 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  title:
    fontFamily: '"Cabinet Grotesk", "Arial Narrow", "Bahnschrift", Arial, sans-serif'
    fontSize: "clamp(2rem, 3vw, 3.7rem)"
    fontWeight: 650
    lineHeight: 0.93
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Cabinet Grotesk", "Arial Narrow", "Bahnschrift", Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.68
  operations-label:
    fontFamily: '"SFMono-Regular", "Cascadia Code", Consolas, "Liberation Mono", monospace'
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "0.08em"
rounded:
  machine: "0px"
  diagram: "2px"
  circular: "50%"
spacing:
  micro: "6px"
  compact: "10px"
  control-x: "19px"
  record: "24px"
  panel: "34px"
  section: "clamp(8rem, 13vw, 13rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-bright}"
    typography: "{typography.operations-label}"
    rounded: "{rounded.machine}"
    padding: "0 19px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.operations-label}"
    rounded: "{rounded.machine}"
    padding: "0 19px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.magnetic-cobalt}"
    textColor: "{colors.paper-bright}"
  navigation-link:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
    typography: "{typography.operations-label}"
    rounded: "{rounded.machine}"
    padding: "0 18px"
    height: "44px"
  project-record:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.machine}"
    padding: "{spacing.record}"
---

# Design System: Magnetic Operations Archive

## Overview

**Creative North Star: "Magnetic Operations Archive"**

The portfolio behaves like a late-1960s computer operations room opened for inspection. Punch-card paper, carbon machine housings, magnetic tape, registration marks, and machine-record typography make invisible infrastructure feel tangible. The world is cinematic because it has physical logic, not because it adds decorative spectacle.

Information density is editorial at the headline level and operational in the details. Large Cabinet Grotesk statements establish a clear reading order; compact monospace metadata records commands, systems, dates, and status. Motion explains handoffs, state, and lifecycle, while every important fact remains readable without it.

The system explicitly rejects the generic neon terminal dashboard. It should feel authored, archival, and production-minded: warm paper against near-black machinery, one decisive cobalt signal, and rare orange registration marks.

**Key Characteristics:**

- Tactile archive paper paired with carbon-black machine panels.
- Cobalt magnetic tape as the primary system and action signal.
- Orange used sparingly for registration, state, and focus.
- Sharp rectangular mechanics balanced by circular reels and punch holes.
- Oversized editorial statements supported by compact operations metadata.
- Scroll motion that reveals sequence and cause-and-effect.

## Colors

The palette combines warm document stock with industrial machine neutrals, then uses cobalt and orange as functional signals.

### Primary

- **Magnetic Cobalt** (`magnetic-cobalt`): The dominant operational signal for tape, delivery controls, system records, calls to action, and the contact field.
- **Deep Magnetic Cobalt** (`magnetic-cobalt-dark`): A darker extension for depth or pressed system states; it never replaces the brighter cobalt as the main signal.

### Secondary

- **Registration Orange** (`registration-orange`): Focus rings, machine registration marks, active lifecycle indicators, and isolated status details. Its rarity gives it authority.

### Neutral

- **Punch-Card Paper** (`paper`): The default documentary surface and warm body background.
- **Bright Archive Stock** (`paper-bright`): High-contrast text on dark fields, reel faces, and selected contact controls.
- **Aged Paper Edge** (`paper-muted`): Mechanical rims, hardware details, and subdued machine labels.
- **Carbon Ink** (`ink`): Primary text, machine housings, and the deepest background.
- **Raised Carbon Panel** (`ink-raised`): A subtle dark surface step for records that must separate from the base machine field.
- **Dark Document Line** (`line-dark`): Rules and dividers on paper.
- **Light Machine Line** (`line-light`): Rules and dividers on dark or cobalt surfaces.

**The Signal Rarity Rule.** Orange marks state or registration; it is not a general fill color.

**The Paper-or-Machine Rule.** Every major surface should clearly read as either document stock or machine housing. Avoid ambiguous gray dashboard panels.

## Typography

**Display Font:** Cabinet Grotesk (with Arial Narrow, Bahnschrift, Arial, and sans-serif fallbacks)  
**Body Font:** Cabinet Grotesk (with the same fallbacks)  
**Label/Mono Font:** SFMono-Regular, Cascadia Code, Consolas, Liberation Mono, monospace

**Character:** Cabinet Grotesk supplies dense, confident headlines with an industrial editorial voice. The monospace stack behaves as an annotation layer: commands, indexes, dates, and operational state rather than long-form decoration.

### Hierarchy

- **Display** (800, responsive 4rem–6rem, 0.86 line-height): The identity in the first viewport; keep it short enough to hold as one decisive line when space allows.
- **Headline** (700, responsive 3.25rem–6rem, 0.9 line-height): Section statements and major narrative pivots.
- **Title** (650, responsive 2rem–3.7rem, 0.93 line-height): Project records, lifecycle phases, and system-card conclusions.
- **Body** (400, 1rem, 1.68 line-height): Explanatory copy, generally constrained to 58–66 characters for easy scanning.
- **Operations Label** (700, 0.68rem, 0.08em tracking): Uppercase commands, metadata, navigation, serials, tags, and dates.

**The Two-Voice Rule.** Cabinet Grotesk makes the claim; monospace records the evidence.

**The Compressed Headline Rule.** Major headings use tight leading and negative tracking. Do not loosen them into generic marketing typography.

## Layout

The desktop composition uses a wide `min(1600px, calc(100% - 64px))` shell and an asymmetric first viewport split of 58/42 between punch-card identity and machine artifact. System records use a gapless 12-column ledger: one 8-column, two-row delivery record balanced by two 4-column records. Project records become a horizontal accordion on fine pointers, with the focused record expanding while adjacent records compress.

Section rhythm is intentionally large: the shared vertical interval is `clamp(8rem, 13vw, 13rem)`. Space is not empty decoration; it creates pauses between identity, systems, proof, lifecycle, field record, and contact.

At 820px, asymmetric multi-column structures collapse into readable single-column or two-column records, the project accordion becomes a vertical archive, and navigation moves into a machine-black menu. At 560px, shells use `calc(100% - 28px)`, ledger records stack, hero actions become full-width, and experience rows become single-column. The system must remain coherent at 320px without horizontal page overflow.

**The Gapless Record Rule.** Related data cards share borders instead of floating as isolated rounded tiles.

**The Asymmetry Rule.** Pair one dominant narrative field with a smaller operational field; avoid evenly weighted dashboard grids.

## Elevation & Depth

The system is flat by default. Depth comes from tonal contrast, paper grain, inset machine outlines, overlapping tape geometry, and border hierarchy. Shadows are reserved for physically plausible hardware, elevated fixed navigation, image depth, and responsive overlays.

### Shadow Vocabulary

- **Navigation lift** (`0 14px 36px rgba(11, 13, 12, 0.18)`): Separates the fixed archive navigation from moving content.
- **Mobile menu lift** (`0 20px 42px rgba(0, 0, 0, 0.34)`): Makes the opened menu read as a machine panel above the page.
- **Primary action signal** (`0 10px 24px rgba(29, 63, 224, 0.2)`): Appears only when the dark hero action becomes cobalt.
- **Hardware depth** (`0 10px 22px rgba(0, 0, 0, 0.42)`): Grounds tape guides and mechanical parts.

**The Structural Depth Rule.** Use rules, material shifts, and overlap before reaching for a shadow.

## Shapes

Controls, navigation, records, and containers use square corners. Small diagram nodes may use the observed 2px softening, but product UI does not become rounded. Circles belong to the physical archive vocabulary: magnetic reels, guide wheels, punch holes, fasteners, and lifecycle markers.

Borders are usually one pixel and use the line token appropriate to the surface. Circular hardware may use heavier rings to suggest material thickness. Content panels remain rectangular even when the illustration inside them is circular.

**The Mechanics Rule.** Rectangles organize information; circles describe machinery.

## Components

### Buttons

- **Shape:** Square machine control (`machine` radius) with a one-pixel border and a 48px minimum height.
- **Primary:** Carbon fill, bright archive text, compact monospace label, and 19px horizontal padding.
- **Secondary:** Transparent paper field with carbon text and the same dimensions.
- **Hover / Focus:** Primary actions become cobalt; context-specific secondary actions may become registration orange. Keyboard focus is a 3px orange outline with a 4px offset. Pressed controls scale to 0.97.

### Chips

- **Style:** Technology and tool tags are unboxed monospace labels prefixed by an orange slash.
- **State:** Tags describe evidence; they are not interactive filters and do not use selected states.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Alternate punch-card paper, raised carbon, and cobalt according to content role.
- **Shadow Strategy:** Flat; shared one-pixel rules create structure.
- **Border:** Related cards share edges in a gapless ledger or archive.
- **Internal Padding:** 24px on project records, scaling up to 42px for large ledger records.

### Navigation

The fixed wordmark combines a cobalt serial block with a carbon nameplate. Desktop links form a bright paper strip with shared borders; hover inverts a link to carbon, while the CV control stays cobalt and becomes orange on hover. Below 820px, a 46px square menu control reveals a stacked carbon panel with 48px rows.

### Magnetic Hero

The signature hero pairs a perforated personnel card with an oversized magnetic reel. The reel may rotate with scroll, and the cobalt tape may draw forward, but the identity, thesis, summary, and calls to action remain the dominant reading order.

### Project Archive

Three machine records form a horizontal accordion on fine pointers and a vertical archive on touch/mobile. Expansion is triggered by hover or keyboard focus-within, uses the shared easing, and never hides project copy or proof links.

### Lifecycle Rail

Eight equal lifecycle controls span the bottom of the pinned process machine. The active phase reveals a 3px orange registration bar and brightens its label. Every phase remains directly keyboard selectable; reduced-motion mode replaces the pinned scene with a complete static record grid.

## Do's and Don'ts

### Do:

- **Do** make infrastructure visible through sequences, diagrams, system records, and traceable evidence.
- **Do** use paper grain, shared rules, and physical overlap to create material depth.
- **Do** reserve cobalt for operational pathways and decisive action.
- **Do** keep orange rare and semantic: focus, registration, or active state.
- **Do** make motion reversible, purposeful, and fully legible under reduced-motion preferences.
- **Do** preserve strong typography, keyboard focus, touch targets, and a 320px minimum viewport.

### Don't:

- **Don't** regress into a generic neon terminal, glassmorphic dashboard, or glowing cyberpunk interface.
- **Don't** scatter rounded cards, pill controls, or soft SaaS containers across the archive.
- **Don't** use orange as a broad background or decorative wash.
- **Don't** add motion that merely spins or floats without explaining a system state.
- **Don't** put long prose in monospace or use operations labels as decorative filler.
- **Don't** invent project claims, metrics, employers, qualifications, or outcomes to fill visual space.
