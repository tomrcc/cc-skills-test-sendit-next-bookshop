# Phase 3 — Content (Next.js, Pages Router, former Bookshop site)

## Checklist

Parity baseline (content.md § Parity baseline):

- [x] Baseline rebuilt from commit `4ca1538` in a temporary `git worktree` at `.parity-worktree/` (gitignored, removed afterwards). CSS `28a3b4d70a1c9255.css` and 25 HTML files, matching the audit baseline
- [x] Baseline HTML kept in `.parity/baseline/` (gitignored), with `.parity/compare.mjs` comparing visible text, `href`s, image names, `alt`s, `<title>`, meta description, and markup with scripts and hashed asset paths stripped
- [x] Comparator checked against a deliberately changed copy: it reports text and markup differences

Review checklist (content.md):

- [x] Front matter: every page file has every page-schema key (`seo` written into `index.md` and `404.md`, empty); all 6 posts have every post key
- [x] Defaults: no template default hidden from editors; `seo` fallbacks to `data/site.json` are layout fallbacks, not field defaults
- [x] `draft`: not used by the site
- [x] Dates: one ISO 8601 format across posts (`2022-06-10T00:00:00Z`)
- [x] Image paths: site-root paths under `public/images` everywhere
- [x] Field naming: content keys match component prop names; no reserved keys in content
- [x] Mixed-type fields: none
- [x] String references: post `tags` (handled in Phase 2 with `data.tags`)
- [x] Markdown bodies: only `ButtonSnippet` in `email-delivery-tips.mdx`; no inline HTML in posts; no markdown plugins
- [x] Styled HTML in front matter: none with `class`/`style`; privacy descriptions hold plain `<p>`/`<ul>`/`<li>` in a `markdown` input
- [x] Page-builder content: field completeness re-run after the rename — 90 items (22 blocks, 68 array items) against their structure values, 0 missing or extra keys
- [x] One field per visual slot: no `a || b` slots in block components
- [x] API-driven content: none
- [x] Settings in code: nav, footer, site and theme are already data files; the remaining hardcoded strings (audit § Content in code) are Phase 4 census rows
- [x] Data collections: `data/` has `disable_url`; `tags.json` is a top-level array with `id`

Next.js (nextjs/content.md):

- [x] Loader called only from `getStaticProps`/`getStaticPaths`
- [x] `@cloudcannon/filer` checked against § `@cloudcannon/filer`: no `content_html` key in front matter; `listItemSlugs` results filtered like `getItems`; `JSON.parse(JSON.stringify(…))` around every Filer item kept
- [x] `[slug]` routes: `fallback: false`; at least one file per folder
- [x] Props stay `page: { data, … }` while the React connector is installed
- [x] No `next/image`, static image imports, `import` lines in MDX, or `fetch()`

Bookshop steps 3 and 4 (cloudcannon-bookshop/migrating-to-editable-regions.md, nextjs/migrating-to-editable-regions.md):

- [x] `_bookshop_name` → `_type` in all 9 page-builder files and `lib/renderer.js`; schemas and structure values already used `_type`
- [x] `blockMap` in `cloudcannon/componentMap.js` (beside `pages/`), 20 flat keys = every name in content = every structure value; direct imports
- [x] `components/shared/blocks.jsx` renders `blockMap[block._type]`, throws on an unknown `_type`, passes `{...block}` plus `dataBinding`
- [x] All 20 block components take `({ dataBinding, ...block })`; bodies unchanged
- [x] `grep -rn _bookshop_name --exclude-dir=node_modules .` (outside build output and these notes): no matches
- [x] `npx "@bookshop/generate"` removed from `.cloudcannon/postbuild`; other hook steps left for Phase 5
- [x] `component-library/` deleted (20 `*.bookshop.yml` + empty `bookshop.config.js`)
- [x] Glob loader gone: unused snippet glob import removed from `pages/blog/[slug].jsx`, `import-glob-keyed` uninstalled, the `webpack` function removed from `next.config.mjs`
- [x] No `@bookshop/*` packages, npm scripts, path aliases, CSS tooling paths or `.gitignore` entries to remove
- [x] Clean build (`.next/` and `out/` deleted) and baseline diff: **0 differences** across 25 pages; CSS file name and md5 (`635f9fd9…`) identical to the baseline
- [x] `@cloudcannon/react-connector` and `data-cms-bind` left for Phase 4

Addendum:

- [x] Field completeness (script, above)
- [x] Fields the original page didn't pass hold resolved defaults or empty values (Phase 2 backfills; `seo` on `index`/`404` empty, matching the layout's fallbacks)
- [x] No block-level HTML in front matter outside `markdown` inputs
- [x] Every array in a structure-value file links to its `_structures` entry (Phase 2; validated)
- [x] Data-file components: nav and footer read every editor-facing value from their data files
- [x] No new collection or data files this phase; computed URLs unchanged
- [x] This note records every structural change

## What changed

- `content/pages/{404,about,contact,features,index,login,pricing,privacy,signup}.md` — `_bookshop_name:` → `_type:` (values kept, e.g. `_type: home/hero`).
- `content/pages/index.md`, `404.md` — empty `seo` block added (same keys as `.cloudcannon/schemas/page.md`).
- `cloudcannon/componentMap.js` — new; exports `blockMap`.
- `components/shared/blocks.jsx` — rewritten around `blockMap`.
- `components/{about,contact,feature,global,home,pricing,privacy}/*.jsx` ×20 — signature `({ dataBinding, ...block })`.
- `lib/renderer.js` — key renamed (file is dead code, see Open questions).
- `pages/[slug].jsx`, `pages/blog/[slug].jsx` — `getStaticPaths` skips `_`-prefixed files, as Filer's `getItems` does.
- `pages/blog/[slug].jsx` — unused glob import and its commented-out loop removed.
- `components/layouts/default.jsx` — reads `seo.featured_image` / `featured_image_alt`.
- `next.config.mjs` — `webpack` function removed.
- `package.json`, `package-lock.json` — `import-glob-keyed` removed.
- `.cloudcannon/postbuild` — Bookshop line removed.
- `component-library/` — deleted.
- `.gitignore` — `/.parity/`.

## Findings

- The only rendered change after this phase is `og:image` on the 6 post pages: it now shows each post's `seo.featured_image` instead of the site image. Every other byte of markup (scripts and hashed asset paths aside) matches the baseline; pages have empty `featured_image`, so they keep the site image.
- `__NEXT_DATA__` now carries `_type` in place of `_bookshop_name`; it sits in a script tag, so the comparator ignores it.
- Filer's `listItemSlugs` returns every file name in the folder, `_`-prefixed included, while `getItems` skips those. Without the filter, a `_draft.md` would build as a page.
- `.parity/` holds the baseline HTML, `compare.mjs` (baseline diff) and `fields.mjs` (field completeness), for Phase 4 and 5 to rerun: `node .parity/compare.mjs .parity/baseline out`, `node .parity/fields.mjs`. Delete the folder and its `.gitignore` line when the migration ends.
- `npx @cloudcannon/cli validate` passes (exit 0).

## Decisions and why

- **Keep `@cloudcannon/filer`.** nextjs/content.md § `@cloudcannon/filer`: it meets the loader rules, and it is replaced only when the user wants the dependency gone. The front matter and config are the same either way. Applied the doc's checks instead (slug filter, no `content_html` keys, JSON round trip kept).
- **`blockMap` in `cloudcannon/componentMap.js`**, the Pages Router location visual-editing.md § Setup steps gives, so Phase 4 registers from the same map. It exports `blockMap` only; Phase 4 adds `componentMap`.
- **The renderer stays at `components/shared/blocks.jsx`** with its `content_blocks` prop, so the three routes that use it are unchanged.
- **`dataBinding` still passed** beside the spread fields until Phase 4 removes the connector.
- **Hooks keep their non-Bookshop steps** (`rm -rf node_modules`, `npm i`, theme colour, telemetry); Phase 5 moves them.
- **`seo` written into `index.md` and `404.md`**: content.md requires every schema key in every file, and empty values hit the same layout fallbacks the missing block did, so the build is unchanged.
- **Layout reads `featured_image`** (configuration.md open question 6 default): content, schema and inputs all use that name.
- **Baseline rebuilt from `4ca1538`** in a worktree; it reproduced the audit's CSS hash, so it is the same baseline.

## Open questions

1. **Replace `@cloudcannon/filer` with a local loader?** It is a 0.0.x package with a fixed `content/` root. Default: keep it; nothing in CloudCannon needs it gone.
2. **Post sharing image.** Posts now share their `seo.featured_image` (previously always the site image). Default: keep — it is the field editors fill in.
3. **`lib/renderer.js` is dead code** (an unused switch nothing imports). Default: left in place with the key renamed; delete it if the team agrees.
