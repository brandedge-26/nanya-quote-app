# NANYA CNC — Quotation Studio

A responsive, buildless redesign of the NANYA CNC quotation application. Published privately through Sites.

## Run locally

Run `npm start` with Node.js 18+ and open `http://localhost:8080`. No install or build step is required. All application assets are bundled. Alternatively, serve `dist/` with a static HTTP server, for example `python -m http.server 8080 --directory dist`. Use `npm run models` to regenerate the seven GLB machine models.

## Features

- Seven original machine photos and complete technical specifications.
- Original per-model pricing and six optional accessories, including optical scale pricing on request.
- Four quotation steps, live totals, machine comparison, and customer validation.
- Product photography with pointer motion and seven separate reference-based GLB machine models with 215–361 modeled details each. Interactive component explanations, sliding doors, an exploded view, camera presets, a motion study, wireframe and keyboard controls are included.
- Locally generated PDF quotation containing customer details, selected options, terms, full specifications and the standard accessories package.
- Responsive desktop and mobile layouts, native keyboard controls, modal focus handling and reduced motion support.
- Configuration saved in local storage; customer fields retained only in session storage. No server submission, email service, CRM integration, or connection to the original app's backend.

## Content

`dist/data.json` contains machine information and commercial terms transcribed from `https://nanya-quote-app.vercel.app/` on 31 October 2026. Prices are in USD. The source describes packing as included in its terms while also listing an optional packing charge; both source statements are preserved. Production owners should confirm their commercial policy before changing those terms.

Each machine has its own portable GLB model. The 2.1 update replaces the single shared exterior with seven individually composed enclosures in `dist/models/exterior-builder.js`. Compact motor towers, braced early NV doors, deep service cabinets, extended beds, console positions, glazed side access, steps and conveyors follow the individual photos. Worktable widths and depths follow the original quotation data. Model identity and revision are checked on load, so a different machine asset cannot silently substitute for the selected one. The software renderer now uses a depth buffer to prevent diagonal panel artifacts when WebGL is unavailable.

Each model is a reference-based reconstruction, not a manufacturer CAD model. Exact hidden engineering geometry cannot be recovered from the product photographs alone.

 Enclosures, glazing, bracing, cabinets, consoles, roof profiles, chip handling, worktable dimensions and steps follow the individual reference photo and product specification. Interior layouts are explanatory, not manufacturer engineering CAD. Original product photographs remain available in the studio. Models are generated from `dist/models/model-builder.js` with `node scripts/build-models.mjs`. The splash screen appears once per session and can be skipped or replayed from the header. It has no artificial loading delay.

## Files

- `dist/index.html` — application shell
- `dist/styles.css` — visual system and responsive layouts
- `dist/app.js` — configuration flow and application logic
- `dist/data.json` — product specifications and prices
- `dist/machine-explorer.js` — interactive 3D renderer and software fallback
- `dist/studio-experience.js` — splash, component explanations and explorer controls
- `dist/models/` — seven GLB models, model source and GLB loader
- `scripts/build-models.mjs` — regenerate all seven GLB files
- `dist/experience.css` — Studio 02 visual enhancements
- `dist/quotation-pdf.js` — PDF export

Three.js (MIT) and pdf-lib (MIT) are bundled locally. Plus Jakarta Sans is licensed under SIL Open Font License. NANYA product photographs and branding are from the supplied app and remain their owner's property.
