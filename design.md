---
version: beta
name: DeuLern cubist paper
description: Interwar poster collage on cream paper: ink black, brick red, steel blue and mustard, condensed serif headlines, cut-paper artwork.
colors:
  paper: "#EFE1C8"
  paper-deep: "#E6D4B2"
  paper-tint: "#E3D2AF"
  ink: "#1E1C19"
  ink-muted: "#4A453D"
  red: "#A53727"
  on-red: "#F5EAD6"
  blue: "#2E5574"
  mustard: "#D29842"
  charcoal: "#383A37"
colors-dark:
  paper: "#1D1B18"
  paper-deep: "#282520"
  paper-tint: "#2F2B25"
  ink: "#EFE1C8"
  ink-muted: "#B9AD95"
  red: "#D9573F"
  blue: "#86ABC8"
typography:
  display:
    fontFamily: "Serif Display"
    fontSize: "clamp(44px, 6.4vw, 78px)"
    lineHeight: "0.98"
  h2:
    fontFamily: "Serif Display"
    fontSize: "clamp(34px, 4.6vw, 50px)"
    lineHeight: "1.02"
  h2-why:
    fontFamily: "Serif Display"
    fontSize: "clamp(40px, 5.6vw, 64px)"
  h3-band:
    fontFamily: "Serif Display"
    fontSize: "clamp(24px, 3vw, 34px)"
  h3:
    fontFamily: "Serif Display"
    fontSize: "clamp(22px, 2.2vw, 26px)"
    lineHeight: "1.1"
  title-lg:
    fontFamily: "Serif Display"
    fontSize: "24px"
  title-md:
    fontFamily: "Manrope"
    fontSize: "22px"
  lead:
    fontFamily: "Manrope"
    fontSize: "clamp(16px, 1.6vw, 18px)"
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
  eyebrow:
    fontFamily: "Manrope"
    fontSize: "12px"
    fontWeight: 800
    letterSpacing: "0.16em"
    textTransform: "uppercase"
rounded:
  sm: "3px"
  md: "6px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "14px"
  md: "28px"
  lg: "40px"
  xl: "88px"
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
    backgroundColor: "{colors.paper}"
    border: "1px solid ink at 20%"
    rounded: "{rounded.sm}"
  chip:
    backgroundColor: "{colors.paper-tint}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
---
# DeuLern cubist paper

## Overview
A printed poster rather than an app screen. Cream paper with a faint grain, cubist collage art, and headlines set like a 1920s broadsheet. It should feel warm, a little European and hand-made, and never glossy.

## Colors
Paper carries the page. Ink is used for text and structure. Red is the one action colour: primary buttons, the accent phrase in each headline and the CTA band. Blue is used only for small labels (eyebrows, the FAQ `+`). Mustard and charcoal live in the artwork, not in the UI. Dark mode swaps the paper for charcoal and lifts red and blue so they stay legible. The artwork keeps its cream paper, so in dark mode it gets a hairline frame and reads as printed cards.

## Typography
Headlines use a condensed high-contrast serif (Noto Serif Display at 700 and 75% width, self-hosted under the family name `Serif Display`). Each headline carries one accent phrase in red. Body and UI text use Manrope. Eyebrows are small, widely tracked capitals in blue.

## Layout
The layout is a 1200px container with artwork that breaks out of it. The hero collage and the staircase bleed to the viewport edge, and cut-paper shapes are pinned to the page edges. The apps section sits on a slightly darker sheet with angled edges, and the CTA is a slanted red band. The edge shapes are dropped on narrow screens.

## Shapes
Corners are small (3–6px), like trimmed paper. Chips are the only pills. Angles come from `clip-path` on section bands, not from rotated elements.

## Do's and Don'ts
- Do use the supplied collage art. Do not draw new illustrations in CSS.
- Do keep red for actions and one accent phrase per heading.
- Don't add shadows or gradients. Depth comes from overlapping paper.
- Don't upscale the rasters past their native size, because they are crops from a 964px mockup.
