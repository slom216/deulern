---
version: beta
name: DeuLern poster collage
description: Bright interwar poster on cream paper: black ink, signal red, mustard and sky blue, heavy geometric headlines, condensed subheads, cut-paper artwork.
colors:
  paper: "#E6DDCC"
  paper-deep: "#DDD3C0"
  paper-tint: "#EBE4D6"
  ink: "#141414"
  ink-muted: "#3F3A33"
  red: "#C63F1E"
  accent: "#C63F1E"
  on-red: "#FBF5EA"
  blue: "#2F5F8F"
  mustard: "#F2A82C"
  table: "#CFC4AE"
colors-dark:
  paper: "#1C1A17"
  paper-deep: "#25221E"
  paper-tint: "#2E2A25"
  table: "#100F0D"
  ink: "#EFE6D6"
  ink-muted: "#B8AD9A"
  accent: "#E8603F"
  blue: "#8FB3DC"
typography:
  display:
    fontFamily: "Outfit"
    fontWeight: 800
    fontSize: "clamp(40px, 5.8vw, 64px)"
    lineHeight: "0.98"
  h2:
    fontFamily: "Outfit"
    fontWeight: 800
    fontSize: "clamp(34px, 4.8vw, 52px)"
    lineHeight: "1"
  h2-why:
    fontFamily: "Outfit"
    fontSize: "clamp(40px, 5.8vw, 64px)"
  h2-faq:
    fontFamily: "Oswald"
    fontWeight: 600
    fontSize: "clamp(28px, 3vw, 34px)"
  h3-band:
    fontFamily: "Oswald"
    fontSize: "clamp(24px, 3vw, 32px)"
  h3:
    fontFamily: "Oswald"
    fontWeight: 600
    fontSize: "clamp(20px, 2vw, 22px)"
    lineHeight: "1.15"
  benefit:
    fontFamily: "Oswald"
    fontSize: "22px"
  wordmark:
    fontFamily: "Manrope"
    fontSize: "26px"
  lead:
    fontFamily: "Manrope"
    fontSize: "clamp(16px, 1.6vw, 17px)"
    lineHeight: "1.5"
  button:
    fontFamily: "Manrope"
    fontSize: "16px"
    fontWeight: 700
  body:
    fontFamily: "Manrope"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "23px"
  body-sm:
    fontFamily: "Manrope"
    fontSize: "14px"
  caption:
    fontFamily: "Manrope"
    fontSize: "13px"
  chip:
    fontFamily: "Manrope"
    fontSize: "12px"
  eyebrow:
    fontFamily: "Manrope"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  footer-label:
    fontFamily: "Manrope"
    fontSize: "11px"
rounded:
  sm: "2px"
  md: "3px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "14px"
  md: "28px"
  lg: "40px"
  xl: "88px"
  gutter: "clamp(16px, 4vw, 44px)"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.md}"
    trailing: "→"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "2px solid {colors.ink}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.paper-deep}"
    border: "1px solid ink at 20%"
    rounded: "{rounded.sm}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    border: "1px solid ink at 60%"
    rounded: "{rounded.full}"
---
# DeuLern poster collage

## Overview
A printed poster rather than an app screen. Cream paper with a faint grain, bright cut-paper collage art, and big geometric headlines like a Bauhaus-era broadsheet. Warm, a little European, never glossy.

## Colors
Paper carries the page. Ink is used for text and structure. Red is the one action colour: primary buttons, the accent phrase in each headline and the CTA band. Blue is for small labels (eyebrows). Mustard lives in the artwork and in the strip at the edge of the CTA band. Night mode swaps the paper for near-black and lifts the accent and blue so they stay legible; the art is transparent and sits directly on the dark paper. Button red stays the same in both themes so cream text keeps 4.7:1.

## Typography
Display headlines (h1 and the section h2s) are Outfit 800, tight tracking, one accent phrase in red. Card titles, benefit titles, the FAQ heading and the CTA line use Oswald 600, which echoes the condensed lettering printed in the art. Body and UI text use Manrope. Eyebrows are small, tracked capitals in blue; the apps and FAQ eyebrows run a hairline rule to the right edge.

## Layout
The page is one 1100px sheet. The art is cropped from a 964px mockup, so the sheet stops there to keep it within ~1.15x native; wider screens show a darker table around it. The hero collage is pinned to the sheet's top-right corner and runs up behind the header (which is therefore not sticky); the toggle and language pill sit in its empty notch. Cut-paper strips are pinned to the left edge beside the apps and why sections. Why and FAQ share one two-column grid: heading beside the benefits, then the staircase (bleeding from the left edge down onto the CTA band) beside the FAQ. The CTA band has a mustard strip at the edge and a slanted right end; the black "Mehr Deutsch" corner sits to its right and overlaps into the footer.

On phones everything is one column: the nav hides (its anchors are in the footer), the collage sits under the hero copy at up to native size, edge strips, staircase and corner panel are dropped.

## Shapes
Corners are small (2–3px), like trimmed paper. Chips and the language pill are the only pills. Angles come from `clip-path`, not rotated elements.

## Do's and Don'ts
- Do use the supplied collage art. Do not draw new illustrations in CSS.
- Do keep red for actions and one accent phrase per heading.
- Don't add shadows. Depth comes from overlapping paper.
- Don't upscale the rasters much past their native size.
