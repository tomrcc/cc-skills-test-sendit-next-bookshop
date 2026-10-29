# Phase 2 — Configuration (Next.js, Pages Router, former Bookshop site)

## Checklist

Shared checklist (cloudcannon-configuration/configuration.md § Verification checklist):

- [x] Schemas downloaded to `.cloudcannon/migration/*.schema.json` (gitignored)
- [x] Structures: the four rules pass (field completeness checked by script, every array/object linked by full path, previews on every value, object preview icons)
- [x] `npx @cloudcannon/cli validate` passes (exit 0, 26 files valid)
- [x] `cloudcannon.config.yml` exists and is valid YAML (renamed from `cloudcannon.config.yaml`)
- [x] Build settings nested under `build` in `.cloudcannon/initial-site-settings.json`
- [ ] The build command alone produces the complete output — **deferred to Phase 5** (theme step lives in `.cloudcannon/prebuild`; audit open question 4)
- [x] `.cloudcannon/README.md` written
- [x] `collections_config` entry for every audit collection: `pages`, `blog`, `data`
- [x] No defunct keys; no collection over `pages/` or code folders; no single-file collection
- [x] `collection_groups`: Content (pages, blog), Site settings (data)
- [x] Every collection has a `url` or `disable_url: true`
- [x] Every file's computed URL matches its built page (16/16, checked against `out/` after a fresh build)
- [x] Index page (`blog.md`) has its own schema (`blog_index`)
- [x] Every visible field has an explicit input; selects have options; icon select has named values
- [x] Enum-like keys inside structure values have inputs on the value itself (`placement`, `icon`)
- [x] Numeric values mapped to `text` inputs are quoted (content and structure defaults)
- [x] `_schema` hidden on the `pages` collection; no other routing keys in content
- [x] `file_config` uses the array format
- [x] `paths.uploads` is `public/images` (where the site keeps images)
- [x] `_enabled_editors`: pages `[visual, data]`, blog `[visual, content, data]`, data `[data]`
- [x] Styled HTML in front matter: `privacy.md` item descriptions are HTML rendered through markdown-it (`html: true`); input is `markdown` (see Decisions)
- [x] No markdown tables in content; no YAML anchors; every `type: markdown` has `options`
- [x] Every boolean input has a conditional render (`alternate_style`, `reversed`, `remove_top_padding`, `highlight_tier`, `has_discount`, `active_feature`, `no_index`)
- [x] Select backed by a data file uses `values: data.tags`; `tags.json` is a top-level array with `id` per item and a structure
- [x] `add_options` limit Add to the page and post schemas; `blog_index` is not creatable
- [x] Creatable page schema has `new_preview_url: /about`; post add option has `editor: content`
- [x] Page builder schema exists (20 block types)

Next.js checklist (cloudcannon-configuration/nextjs/configuration.md):

- [x] `"ssg": "nextjs"`, `output_path: out`, `build_command: npm run build` (no `next export`)
- [x] `output: "export"` already set; no `next/image`; no routes in § What changes under export
- [x] No collection over `pages/`; no hard-coded-route collection needs `disable_add` (pages are built by `pages/[slug].jsx`; `index`, `blog`, `404` have their own routes and stay off the Add button)
- [x] `paths.static: public`, `paths.uploads` under it
- [x] Every data file a template reads is JSON

Snippets checklist (cloudcannon-snippets, Next.js `next-mdx-remote` path):

- [x] Component inventory grep over `content/posts`: only `ButtonSnippet`; `IframeSnippet` is registered but unused. Both have `_snippets` entries
- [x] `snippet: true` in `_editables.content`
- [x] No `import` lines in MDX content; the single render site (`pages/blog/[slug].jsx`) passes one map `{ ButtonSnippet, IframeSnippet }`
- [ ] Round-trip in the Content Editor — needs CloudCannon; Phase 5 hand-off check

Bookshop step 2 (Structures):

- [x] Ran `@bookshop/generate@latest --skip-live --skip-components` on a copy of `component-library/` in a gitignored scratch folder; 20 structures generated. Folder and its `.gitignore` entry deleted afterwards
- [x] One structure value per component, from the generated output, `_type` = full Bookshop name, no `id_key`
- [x] Generated inline item structures written as named `_structures`
- [x] Invalid icons fixed, `_inputs` keys placed where their fields are

## What was written

- `cloudcannon.config.yml` — rewritten. Collections, groups, `data_config`, global SEO inputs, `_editables`, `markdown`, `_structures` (page builder via `values_from_glob` plus 13 named item structures), `file_config` for each data file, `_snippets`.
- `components/<group>/<name>.cloudcannon.structure-value.yml` ×20 — one per block, beside its component. Filename prefix is the component's short name in its group folder (`components/home/hero.cloudcannon.structure-value.yml` ↔ `_type: home/hero`).
- `.cloudcannon/inputs/*.cloudcannon.inputs.yml` — shared inputs pulled in with `_inputs_from_glob`: `title` (+ `title_suffix`), `description` (markdown with toolbar), `image` (+ `image_alt`), `button` (+ `text`, `link`).
- `.cloudcannon/schemas/page.md`, `post.mdx` (moved from `schemas/`), `blog-index.md` (new).
- `.cloudcannon/initial-site-settings.json` — `ssg` plus `build` (`npm ci`, `npm run build`, `out`, `node_modules/,.next/`). The old flat `build_configuration` key is gone.
- `.cloudcannon/README.md` — editor-facing.
- `data/tags.json` — tag dataset for the post `tags` multiselect.
- `.gitignore` — `.cloudcannon/migration/*.schema.json`.

Content edits (mechanical, for the config to work):

- `content/pages/blog.md` — `_schema: blog_index`.
- `content/pages/index.md`, `about.md` — counter `number` values quoted; `about.md` counter items backfilled with empty `prefix`/`suffix`.
- `content/pages/pricing.md` — `price` and `discount_price` quoted.
- `content/pages/features.md` — `global/header` backfilled with `remove_top_padding: false`.

All render identically: rebuilt with `npm run build` (25 HTML files); counters, prices and the header class checked in `out/`. The rebuild overwrote the baseline `out/`; the baseline stays reproducible from commit `4ca1538`.

## Findings

- Generated structures had four icons outside the schema enum: `phone`, `email`, `drive_file_rename_outline` (contact form) → `call`, `mail`, `edit_note`. Every other generated icon is valid.
- Bookshop cascaded `description: { type: markdown }` and `features: { type: array }` into item structures that have no such field (counter numbers, testimonial slides, pricing features). Dropped there; kept on items that have the field (FAQ, privacy terms).
- Generated blueprint values with errors: `contact/hero` title `Let&#39;s talk.` (React would print the entity) → `Let's talk.`; `feature/hero` button link `/sign-up` (no such route) → `/signup`. Other blueprint copy is kept as generated, including placeholder text (FAQ "Lorem ipsum", the long `about/video` description).
- `contact/form` and `global/login`/`signup` reuse key names at several depths (`email` object vs `email.email` string, `address` vs `address.address`). Typed with plain keys for the objects and dotted keys for the strings.
- Numbers shown as text (counter `number`, pricing `price`/`discount_price`) are `text` inputs with quoted values, so Phase 4 text regions can bind them.
- Every `description` in blocks and items renders through markdown-it → `markdown` input. `pricing_tier.description` and testimonial `message` render escaped → `textarea`.
- Page-builder content still uses `_bookshop_name`; the structures use `_type`. Phase 3 renames the content key (audit § Earlier CloudCannon setup), after which items match their structures. Until then the editor shows items as unmatched.
- The layout reads `seo.feature_image`/`feature_image_alt`, while content, schemas and inputs use `featured_image`/`featured_image_alt`. Config follows the content; the template fix is a rendering change for Phase 3.
- `data/nav.json`, `footer.json`, `site.json` carry their own small `_inputs`; they agree with `file_config` and are left in place.
- Field completeness script (every block and array item in `content/pages` vs its structure value): no missing or extra keys after the backfills above.

## Decisions and why

- **File name `cloudcannon.config.yml`** — the docs and validator default; renamed with no second config left behind.
- **Split co-located structure values** (20 block types ≥ 5), loaded with `values_from_glob: /components/*/*.cloudcannon.structure-value.yml`. Nested item structures are named entries in the main config so each has one preview and inputs.
- **`_type` holds the full grouped name** (`home/hero`), matching the audit; no `id_key` anywhere.
- **Shared inputs via `_inputs_from_glob`** for `title`, `description`, `image`, `button`, so every structure value carries its own inputs without copies.
- **Schema files moved to `.cloudcannon/schemas/`**, where the docs place them; nothing else read `schemas/`.
- **`blog.md` gets the `blog_index` schema**, off the Add button; `index.md` and `404.md` use the default page schema (their missing `seo` defaults to "absent" behaviour) and are also not creatable as copies.
- **Pages Add button offers one Page type** (default schema, previews on `/about`); `pages/[slug].jsx` builds any new file.
- **Tags are a dataset** (`data/tags.json`, `values: data.tags`, `value_key: id`): editors may need a new tag while writing. The site doesn't read the file; tag pages still come from post front matter.
- **Footer social icon is a select with named Phosphor values and `allow_create: true`** — the Phosphor font resolves any `ph-*` class.
- **Privacy descriptions use `markdown`**, matching the renderer. Their HTML renders the same, and CloudCannon rewrites it as Markdown on the first edit.
- **`_editables.content`** keeps the site's existing toolbar, adds lists, image and remove-format, and drops `embed`: post bodies compile as MDX, which rejects much raw HTML.
- **`_snippets_imports` removed**; explicit snippets only. The iframe snippet uses `IframeSnippet`, the name `pages/blog/[slug].jsx` registers (the old config said `IframeComponent`).
- **`markdown: commonmark` with `html: true`**, matching markdown-it's `html: true`.
- **`timezone: Etc/UTC`** — post dates are stored as UTC (`…T00:00:00Z`).
- **`node_version` left unset** (CloudCannon default Node 22), per build-commands.md § Node version for a site with no `.nvmrc`/`engines`; the local build runs on Node 24. This differs from the audit's default of pinning 20 — see Open questions.
- **Theme build step and hook files untouched**; they are Phase 5 (and Phase 3 for the Bookshop line).

## Open questions

1. **Timezone.** The site sets none. Default: `Etc/UTC`.
2. **Node version.** The docs leave it unset when the repo has no pin; the audit suggested pinning 20. Default: unset (Node 22 on CloudCannon); suggest adding an `.nvmrc` with the version the team builds with.
3. **Placeholder copy in new blocks.** The generated defaults include "Lorem ipsum" (FAQ item) and filler text (`about/video`). Default: kept as Bookshop had them; replace if the team wants real starter copy.
4. **Tag list in `data/tags.json`.** It needs a new tag added before posts can use it. Default: keep the dataset.
5. **Raw HTML embeds in posts.** `embed` is off in the post toolbar. Default: off; the Embed snippet covers iframes.
6. **`seo.feature_image` layout mismatch.** Default: Phase 3 changes the layout to read `featured_image`/`featured_image_alt`, so the page-level sharing image applies (it never has).
