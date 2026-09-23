# DeuLern transparent website assets

Lossless PNG crops of the supplied transparent screenshot, at original resolution.

## Main assets
Use `artwork/hero.png`, all four `apps/` images, the three `benefits/` icons, `artwork/staircase.png`, `decorations/`, and `branding/` to reconstruct the layout. `details/` offers optional overlapping hero crops. `ui-icons/` and `ui-references/` are included as raster references; normal text, buttons, cards and FAQ interactions should be recreated in HTML/CSS.

## Transparency
All 32 PNGs are RGBA. Original alpha values are preserved. Only the hero and two decorative elements have an additional hard outer crop mask to exclude unrelated page content. No opaque background was added, and no image was regenerated or upscaled. Any existing cream areas inside illustrations, buttons or panels remain opaque as in the upload.

The uploaded image already contains colored edge speckles, partial paper remnants and rough antialiasing from its earlier background removal. These are preserved rather than silently changing the art. Small symbols have limited source resolution. The app artwork includes overlapping printed index numbers; do not add duplicate numbers without hiding them.

`preview.jpg` is a labelled contact sheet composited over a checkerboard for inspection. The checkerboard is only in this preview, not the asset PNGs. `manifest.json` lists every crop and its original page position.
