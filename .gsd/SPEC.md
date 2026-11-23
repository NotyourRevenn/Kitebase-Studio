# SPEC: Kite Animations and Color Customization

Status: FINALIZED
Date: 2026-11-23

## 1. Objective
Enhance the Kitebase Studio portfolio by upgrading the visual presence of the kites:
1. Provide rich, distinct color variations across kites (adding vibrant contrasting palettes such as warm amber/coral and fresh teal/cyan alongside classic sapphire/navy).
2. Transform rigid back-and-forth wobble animations into smooth, organic, free-flowing aerial motion (wind drafts, realistic lift, sway, banking, and fluid sky cross-drifting).

## 2. Requirements
- **Color Variations**:
  - Define distinct kite symbols in SVG (`#kt` classic royal blue, `#kt2` deep navy, `#kt3` warm sunset amber/gold, `#kt4` vibrant coral/crimson, `#kt5` emerald/cyan).
  - Assign distinct colors to hero kites and roaming ambient kites.
- **Organic Free-Flowing Animations**:
  - Replace rigid 2-frame `@keyframes fly` with multi-stage buoyant wind simulation `@keyframes float-free-a`, `float-free-b`, `float-free-c`.
  - Add gentle variable tilt, altitude rise/fall, and horizontal sway with easing.
  - Enhance the sky-crossing kite (`.fly`) and introduce an additional ambient drifting kite at variable depth/speed for a lively sky ambiance.
  - Retain `prefers-reduced-motion` compliance.
- **Scope of Files**:
  - `index.html`: SVG symbols and kite element instances.
  - `style.css`: Flight keyframes, kite positioning, wind current timings, and motion dynamics.

## 3. Verification Criteria
- All kite SVG symbols render with proper fills, tail strokes, and bow ties.
- Kites move fluidly with independent, desynchronized timing and natural floating paths.
- No console errors, no overflow or layout disruptions.
- Tested across light and dark modes.
