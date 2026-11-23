# SPEC: Purple Flying Kite & Right-Hand Green Kite

Status: FINALIZED
Date: 2026-11-23

## 1. Objective
1. Add a rich, vibrant Purple/Violet kite SVG palette (`#kt2`).
2. Position the Green kite (`#kt5`) on the right-hand side of the hero section.
3. Configure the Purple kite to fly freely around the website with organic multi-axis drift, elevation shifts, and graceful banking.

## 2. Requirements
- **Purple Kite SVG (`#kt2`)**:
  - Top Left: `#9333ea` (electric purple)
  - Top Right: `#581c87` (deep royal violet)
  - Bottom Left: `#c084fc` (bright lavender)
  - Bottom Right: `#e9d5ff` (soft lilac)
  - Tail & Bows: `#a855f7` and `#c084fc`
- **Right-Hand Green Kite (`#kt5`)**:
  - The hero right kite (`.fk.b`) uses `<use href="#kt5"/>` (Emerald Teal/Green).
- **Free-Flying Purple Kite**:
  - An ambient `.fly` SVG element referencing `<use href="#kt2"/>`.
  - Continuous CSS animation spanning across the viewport width and height with dynamic wind lift and tilts.
