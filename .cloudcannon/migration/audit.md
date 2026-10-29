# Phase 1 — Audit (Next.js, Pages Router, former Bookshop site)

Site: Sendit marketing template. Detected SSG: `nextjs` (`configure detect-ssg` scored nextjs 50, others 0). Git: clean tree, single commit `4ca1538 Initial commit`.

## Checklist

- [x] Quick checks run and recorded (nextjs/overview.md § Quick checks)
- [x] § 1 Router and export readiness, versions, package manager, next.config settings
- [x] § 1 Earlier CloudCannon setup — each piece found and routed
- [x] Bookshop step 1 (Baseline) — two clean builds, recorded below
- [x] § 2 Content sources, front matter, loader, parser, renderer, MDX setup
- [x] § 3 Pages and routing — every route
- [x] § 4 Layouts and components, classification and census table, follow-on censuses
- [x] § 5 Build pipeline
- [x] § 6 Flags and special patterns, load-time behaviour, forms
- [x] Shared audit: site-wide facts, markdown-extension syntax, components at a fixed point in the body
- [x] § 7 Sizing evaluated

## Quick-check output

Router:

```
$ ls -d app src/app pages src/pages
pages
```

Pages Router export blockers and data functions:

```
pages/[slug].jsx:14:export async function getStaticPaths() {
pages/[slug].jsx:25:		fallback: false
pages/blog/page/[page].jsx:17:export async function getStaticPaths() {
pages/blog/page/[page].jsx:37:    fallback: false
pages/tags/[slug].jsx:20:export async function getStaticPaths() {
pages/tags/[slug].jsx:31:    fallback: false
pages/blog/[slug].jsx:106:export async function getStaticPaths() {
pages/blog/[slug].jsx:113:		fallback: false
pages/tags/[slug]/page/[page].jsx:19:export async function getStaticPaths() {
pages/tags/[slug]/page/[page].jsx:47:    fallback: false
$ ls -d pages/api src/pages/api
(nothing)
```

Earlier CloudCannon setup:

```
$ grep package.json
13:    "@cloudcannon/filer": "^0.0.3",
14:    "@cloudcannon/react-connector": "^2.0.0",
$ grep -rln CloudCannonConnect|data-cms-bind|_bookshop_name (out/ and .next/ excluded)
content/pages/{pricing,contact,404,login,signup,privacy,about,features,index}.md
components/{home/video,home/hero,contact/hero,contact/form,privacy/hero,privacy/privacy,about/video,about/hero,about/team,feature/hero,pricing/hero,pricing/table}.jsx
components/global/{header,error,signup,login,counter,feature,faq,testimonial}.jsx
components/shared/blocks.jsx
pages/_app.js
lib/renderer.js
$ ls .cloudcannon/prebuild .cloudcannon/postbuild component-library
.cloudcannon/postbuild
.cloudcannon/prebuild
component-library: bookshop components
```

Next config:

```
./next.config.mjs:8:  output: "export",
./next.config.mjs:15:          loader: "import-glob-keyed",
```

Middleware or proxy: none. Server-only features (`revalidate`, `use server`, `cookies(`, `searchParams`, …): none. Route handlers and metadata routes: none (no `app/`).

Server-rendered routes — `npm run build` (unchanged script, after `npm ci`): no `ƒ` routes. Every route is `●` (SSG) or `○` (Static); 26 pages generated.

Dynamic routes (Pages Router):

```
pages/[slug].jsx
pages/blog/[slug].jsx
pages/tags/[slug].jsx
pages/tags/[slug]            (directory)
pages/blog/page/[page].jsx
pages/tags/[slug]/page/[page].jsx
```

All five have `getStaticPaths` with `fallback: false`.

`next/image`: not used anywhere (plain `<img>`).

Content and data files:

```
./cloudcannon.config.yaml
./schemas/post.mdx, ./schemas/page.md
./data/{nav,site,theme,footer}.json
./content/posts/*.mdx              (6 files)
./content/pages/*.md               (10 files: 404, about, blog, contact, features, index, login, pricing, privacy, signup)
./component-library/components/**/*.bookshop.yml   (20 files)
./public/vendor/phosphor-icons/font/Phosphor.json  (vendor asset, not content)
./LICENSE.md                                         (not content)
```

Content tooling:

```
17:    "@mdx-js/loader": "^3.1.0",
18:    "@mdx-js/react": "^3.1.0",
19:    "@next/mdx": "^15.1.7",
22:    "gray-matter": "^4.0.3",
24:    "markdown-it": "^12.2.0",
26:    "next-mdx-remote": "^5.0.0",
```

Fetches: none (`fetch(` not found in `pages/`).

## 1. Router and export readiness

- Router: Pages Router only, at `pages/` (no `src/`).
- Export blockers: **none**. No `getServerSideProps`, `getInitialProps`, API routes, middleware, rewrites/redirects/headers, `i18n`, ISR or server actions. Every dynamic route has `getStaticPaths` with `fallback: false`. No `_document`.
- `output: "export"` already set. `distDir`, `trailingSlash`, `basePath`, `images` all unset. Pages export as `out/about.html` etc.
- `trailingSlash` off: internal links ending in `/` are only in `data/nav.json` (`/features/`, `/pricing/`, `/about/`, `/blog/`, `/contact/`, `/signup/`), all rendered through `<Link>`, which normalises them. Links rendered with plain `<a>` (pagination in `components/blog/list.jsx`, content `button.link` values, `login`/`signup` cross-links) have no trailing slash. No 404 risk found.
- Versions: Next 13.4.2, React 18.2.0, react-dom 18.2.0 (React 18 meets the editable-regions requirement; Next ≥ 13.3 has `output: "export"`; webpack, not Turbopack). No `.nvmrc`, `.node-version` or `engines`; local Node is v24.22.1.
- Package manager: npm (`package-lock.json`), local npm 11.19.1.
- `next.config.mjs` also has `pageExtensions: ['js','jsx','md','mdx','ts','tsx']`, `reactStrictMode: true`, `@next/mdx` wrapper with no plugins, and a `webpack` function that adds the `import-glob-keyed` loader to every `.jsx` file. No `process.env` reads.
- `node_modules` did not match the lockfile at the start (it held `@cloudcannon/editable-regions` and lacked `@cloudcannon/react-connector` and `import-glob-keyed`); `npm ci` brought it in line before the baseline. `npm ls --depth=0` now matches `package.json`.

### Earlier CloudCannon setup — routing

- `@cloudcannon/react-connector` 2.0.0 — `CloudCannonConnect(Component, { valueOptions: { keepMarkdownAsHTML: false } })` in `pages/_app.js`. → **Phase 4**, cloudcannon-visual-editing/nextjs/visual-editing.md § Sites using the React connector (removes the connector, settles each binding).
- `data-cms-bind={dataBinding}` on the root `<section>` of all 20 block components; the binding string `#content_blocks.${i}` comes from `components/shared/blocks.jsx`. → **Phase 4**, same section. Until then the renderer keeps passing `dataBinding`.
- `@cloudcannon/filer` 0.0.3 — the build-time loader in every route file (`new Filer({ path: 'content' })`: `getItem`, `listItemSlugs`, `getItems`, `getPaginatedItems`). → **Phase 3**, nextjs/content.md § `@cloudcannon/filer`.
- Bookshop — `component-library/bookshop/bookshop.config.js` (empty `module.exports = {}`), 20 `component-library/components/<group>/<name>/<name>.bookshop.yml` files (no templates, no preview images), `npx "@bookshop/generate"` in `.cloudcannon/postbuild`, `_bookshop_name` in 9 page files. No `@bookshop/*` package in `package.json`. Routed per cloudcannon-bookshop/migrating-to-editable-regions.md § Steps (Next.js row in SKILL.md § SSG support: Migrate):
  - Step 1 Baseline → **Phase 1** (done, below).
  - Step 2 Structures → **Phase 2**: run `@bookshop/generate@latest --skip-live --skip-components` in a gitignored scratch folder at the repo root on a copy of `component-library/`, then hand-write `_structures.content_blocks` (20 values) and nested item structures from its real output. Leave out `id_key: _bookshop_name`.
  - Steps 3 and 4 → **Phase 3**, one unit: rename `_bookshop_name` → `_type` (content, schemas, structures, `lib/renderer.js`), replace the glob lookup in `components/shared/blocks.jsx` with a `blockMap` keyed by the full names, change each component from `({ block, dataBinding })` to `({ dataBinding, ...block })`, then remove Bookshop (postbuild line, `component-library/`, the `import-glob-keyed` loader and `webpack` rule once `pages/blog/[slug].jsx`'s snippet glob is gone too).
  - Step 5 Regions → **Phase 4**. Step 6 Verify → **Phase 5**.
- `.cloudcannon/prebuild` — `npx next telemetry disable`, `rm -rf .next`, `npm i`, `npm run prebuild:fetch-theme-color`. `.cloudcannon/postbuild` — `rm -rf node_modules`, `npm i`, `npx "@bookshop/generate"`. The non-Bookshop steps → **Phase 5**, build-commands.md § `.cloudcannon/` hook files (move `fetch-theme-color` into the build command; the clean/install steps are CI housekeeping). The Bookshop line is removed in Phase 3 (step 4).
- `.cloudcannon/initial-site-settings.json` — `ssg: nextjs`, `output_path: out`, empty install/build commands. → **Phase 2/5** build settings.
- `cloudcannon.config.yaml` (existing, `.yaml` extension) → **Phase 2** rewrites it. Findings for Phase 2:
  - Collections `data` (`data/`), `pages` (`content/pages`, url `/[slug]`, schema `schemas/page.md`, visual editor only), `blog` (`content/posts`, url `/blog/[slug]`, schema `schemas/post.mdx`).
  - `_structures` has only `features` (`item`, `isActive` — names no field in content; pricing features use `item` and `active_feature`). No `content_blocks` structure; Bookshop generated it on CloudCannon only.
  - `_inputs` includes a typo `faivcon_image` (field is `favicon_image`), and `isActive` (field is `active_feature`).
  - `_snippets.mdx_iframe` names `component_name: IframeComponent`, but `pages/blog/[slug].jsx` registers it as `IframeSnippet`; no post uses it. `button` snippet matches `ButtonSnippet`.
  - No `data_config`; the layout reads `data/footer.json`, `data/nav.json`, `data/site.json` at build time.

## Baseline (Bookshop step 1)

Two builds of the unmodified site, each after deleting `.next/` and `out/`, both on `npm run build` with the lockfile installed. Both produced identical results: 25 HTML files, CSS `out/_next/static/css/28a3b4d70a1c9255.css` md5 `635f9fd9e6e043a9e77128ff1dca8cf2`, identical per-page text hashes. The baseline is reproducible at any time from commit `4ca1538`.

Text hash = md5 (first 10 chars) of the body text with `<head>`, `<script>` and `<style>` removed and tags stripped. The footer year comes from `new Date()`, so a year change shifts every hash.

| Page (`out/`)                                            | `<img>` | inline `style` | words | text hash  |
| -------------------------------------------------------- | ------- | -------------- | ----- | ---------- |
| 404.html                                                 | 3       | 0              | 41    | e35453b835 |
| about.html                                               | 14      | 1              | 164   | 55563624ef |
| blog.html                                                | 8       | 0              | 118   | 5896bf8e21 |
| blog/5-things-to-improve-your-email-templates.html       | 6       | 0              | 610   | 820be43c5c |
| blog/7-things-you-didn't-know-about-email.html           | 6       | 0              | 610   | 5d7d279440 |
| blog/best-email-sending-services.html                    | 6       | 0              | 607   | 93d52af5ae |
| blog/email-delivery-tips.html                            | 6       | 0              | 609   | f1cb95bf3b |
| blog/how-to-host-better-email-marketing-campaigns.html   | 6       | 0              | 610   | 7ed8c71378 |
| blog/page/1.html                                         | 8       | 0              | 118   | 5896bf8e21 |
| blog/what-are-the-best-email-clients.html                | 6       | 0              | 609   | a358df9ecd |
| contact.html                                             | 4       | 1              | 77    | 4d1911c1ff |
| features.html                                            | 10      | 0              | 249   | 66dfd7ea8f |
| index.html                                               | 10      | 0              | 296   | 94676db979 |
| login.html                                               | 2       | 0              | 59    | 6b1807ee0b |
| pricing.html                                             | 4       | 0              | 310   | 985de2dd89 |
| privacy.html                                             | 2       | 0              | 126   | c76f04c0b6 |
| signup.html                                              | 2       | 0              | 69    | 8aefcd093c |
| tags/blog.html                                           | 8       | 0              | 111   | ad04c4bdb4 |
| tags/blog/page/1.html                                    | 8       | 0              | 111   | ad04c4bdb4 |
| tags/email.html                                          | 3       | 0              | 70    | e7dbbcd162 |
| tags/email/page/1.html                                   | 3       | 0              | 70    | e7dbbcd162 |
| tags/marketing.html                                      | 6       | 0              | 100   | e2e09d8ed1 |
| tags/marketing/page/1.html                               | 6       | 0              | 100   | e2e09d8ed1 |
| tags/technology.html                                     | 3       | 0              | 71    | 4071bb3044 |
| tags/technology/page/1.html                              | 3       | 0              | 71    | 4071bb3044 |

Also in `out/`: `feed.xml` (written to `public/feed.xml` by `pages/blog/index.jsx` during the build, gitignored), `robots.txt`.

## 2. Content sources

### `content/pages/` — 10 Markdown files, front matter only (no bodies)

- Read by `@cloudcannon/filer` (`filer.getItem('<slug>.md', { folder: 'pages' })`); slug = file name.
- Front matter:
  - `title` (string, always) — `<title>` via `DefaultLayout`, nav active state.
  - `seo` (object, all but `index.md` and `404.md`): `page_description`, `canonical_url`, `featured_image`, `featured_image_alt`, `author_twitter_handle`, `open_graph_type`, `no_index` — read by `components/layouts/default.jsx`. The layout reads `seo.feature_image` / `seo.feature_image_alt`, but content and schema use `featured_image` / `featured_image_alt`, so the page-level image never applies.
  - `content_blocks` (array, all but `blog.md`) — each item has `_bookshop_name` plus that component's fields; rendered by `components/shared/blocks.jsx`.
  - `blog.md` only: `description` (markdown string), `pagination.size` (number, 9).
- Rendered with `markdown-it` (`html: true`) inside components (`md.render(block.description)` into `dangerouslySetInnerHTML`). `privacy.md` holds raw `<p>`/`<ul><li>` HTML inside `privacy` item descriptions.

### `content/posts/` — 6 MDX files

- Read twice in `pages/blog/[slug].jsx`: Filer for listing/paging, and `fs.readFileSync` + `next-mdx-remote/serialize` (`parseFrontmatter: true`) for the body. Listings (`blog/index`, `blog/page/[page]`, `tags/*`) use Filer only (`excerpt: true`, `sortKey: 'date'`). Slug = file name. One file name contains an apostrophe (`7-things-you-didn't-know-about-email.mdx`), and its URL is `/blog/7-things-you-didn't-know-about-email`.
- Front matter (all 6 files have every key): `date` (ISO datetime), `title`, `tags` (array of strings: `blog` ×6, `marketing` ×4, `email` ×1, `technology` ×1), `author`, `thumbImg { image, image_alt }` (listing card), `featuredImg { image, image_alt }` (post page), `seo { … same keys as pages … }`.
- Body rendered by `<MDXRemote components={{ ButtonSnippet, IframeSnippet }}>`. `@next/mdx` is configured in `next.config.mjs` but no `.md`/`.mdx` file sits under `pages/`, so it compiles nothing; `@mdx-js/react` and `@mdx-js/loader` are unused at runtime.
- RSS: `lib/rss.js` builds `public/feed.xml` from Filer's `content_html` during the `/blog` page build.

### MDX setup

- Renderer: `next-mdx-remote` 5 (`serialize` + `<MDXRemote>`); components from the `components` object in `pages/blog/[slug].jsx`.
- `pages/blog/[slug].jsx` also does `import allComponents from '../../components/snippets/**/*.*'` through `import-glob-keyed`; the result is unused.
- Components in bodies: `ButtonSnippet` (`button_text`, `button_link`) — 1 file (`email-delivery-tips.mdx`), mid-prose. `IframeSnippet` (`src`) — 0 files. Both are inline components → snippets (Phase 2, cloudcannon-snippets/nextjs). No component sits at a fixed point in 3+ files, so no layout-field candidates.
- No inline HTML in post bodies. No remark/rehype plugins; markdown-extension grep (footnotes, math, citations, alerts) found nothing.

### `data/` — 4 JSON files

- `footer.json` (`logo`, `logo_url`, `copyright`, `social[] {link, icon, icon_alt}`, `sections[] {title, links[] {text, link}}`) — `components/layouts/footer.jsx` via `lib/data.js`.
- `nav.json` (`logo`, `items[] {link, text}`, `button {link, text}`, `_inputs`) — `components/layouts/navigation.jsx`.
- `site.json` (`baseurl`, `site_title`, `description`, `favicon_icon`, `favicon_image`, `twitter_site`, `image`, `image_alt`, `_inputs`) — layout SEO, RSS, post JSON-LD.
- `theme.json` (`primary_color`, `secondary_color`, `anchor_color`, `background_effects_color`) — read only by `fetch-theme-color.js`, which rewrites `styles/_variables.scss` before the build. The script runs from `.cloudcannon/prebuild` only, not from `npm run build` (`prebuild:fetch-theme-color` is not an npm lifecycle name). Current values in `_variables.scss` equal `theme.json`.
- Like-shaped items (`social`, `sections`, `items`) are small nav/footer lists inside site-wide files, not entity collections → stay as data files.

### Content in code

- `pages/blog/[slug].jsx`: "Recent Blog", "minutes read", "words".
- `components/global/login.jsx`, `signup.jsx`: "Sign In with Google", "Sign In with FaceBook", "Forget Password".
- `components/global/error.jsx`: "Try again".
- `lib/renderer.js`: dead code (unused switch on `_bookshop_name`).

## 3. Pages and routing

Page routes (each backed by a content file):

- `pages/index.jsx` → `/` — `content/pages/index.md`, page builder (`content_blocks`).
- `pages/[slug].jsx` → `/about`, `/contact`, `/features`, `/login`, `/pricing`, `/privacy`, `/signup` — `content/pages/<slug>.md`, page builder. `getStaticPaths` lists Filer slugs in `pages`, skipping `index`, `blog`, `404`, `feed` (no `feed.md` exists). `fallback: false`.
- `pages/404.jsx` → `/404` (`out/404.html`) — `content/pages/404.md`, page builder (`global/error`).
- `pages/blog/index.jsx` → `/blog` — `content/pages/blog.md` (intro + pagination size) and page 1 of posts; writes `public/feed.xml`.
- `pages/blog/[slug].jsx` → `/blog/<file name>` ×6 — `content/posts/*.mdx`. `fallback: false`, no ignored slugs.

Generated listing pages (not counted for sizing):

- `pages/blog/page/[page].jsx` → `/blog/page/1` (same content as `/blog`).
- `pages/tags/[slug].jsx` → `/tags/{blog,email,marketing,technology}`.
- `pages/tags/[slug]/page/[page].jsx` → `/tags/<tag>/page/1`. The page count is `Math.ceil(count / size || 9)`, a precedence slip that only matters when `pagination.size` is unset.

Special files: `pages/_app.js` (theme SCSS + `CloudCannonConnect`). No `_document`. No router reads (`useRouter` not used).

Collection URLs (no `trailingSlash`): pages `/[slug]` (index collapses to `/`; `blog.md` → `/blog`; `404.md` → `/404`); posts `/blog/[slug]`.

## 4. Layouts and components

- Layout: no shared layout in `_app`; every page renders `components/layouts/default.jsx` (NextSeo head, `Navigation`, `Footer`, and vendor scripts: jQuery, Bootstrap, countup, magnific-popup, `public/js/script.js`).
- All components are client code (Pages Router); only `getStaticProps`/`getStaticPaths` read files. `Navigation`, `Footer`, `DefaultLayout`, `lib/rss.js` and `pages/blog/[slug].jsx` import `lib/data.js` (JSON imports), so the header/footer read data themselves rather than via props.
- Block renderer: `components/shared/blocks.jsx` glob-imports `components/**/*.jsx` and matches `../../components/${_bookshop_name}.jsx`; throws on a missing component. Passes `block` and `dataBinding`.
- 20 block components, each `({ block, dataBinding })` (props under one `block` key — good co-location; Phase 3 changes the signature to spread):
  - `home/hero` (title, description, image, image_alt, button), `home/video` (image, image_alt, video_url)
  - `global/counter` (title, title_suffix, description, alternate_style, numbers[] {prefix, number, suffix, text}), `global/header` (title, title_suffix, description, remove_top_padding), `global/feature` (image, image_alt, title, description, button, reversed), `global/testimonial` (title, title_suffix, description, slider[] {image, image_alt, author, designation, message}), `global/faq` (+ `faqItem` sub-component), `global/error`, `global/login`, `global/signup`
  - `about/hero`, `about/video`, `about/team`
  - `contact/hero`, `contact/form` (address, phone, email, form {heading, fullname, phone_number, email, message, submit_button})
  - `feature/hero`
  - `pricing/hero`, `pricing/table` (pricing_tier[] {tier, highlight_tier, description, currency_symbol, price, has_discount, discount_price, features[] {item, active_feature}, button}; + `pricing/item`)
  - `privacy/hero`, `privacy/privacy`
- Sub-components not used as blocks: `global/faqItem`, `pricing/item`, `posts/summary`, `blog/list`, `icon`, `snippets/button`, `snippets/iframe`.
- Visual-editing candidates: every block component (heroes, counter, features, testimonials, FAQ, pricing, team, video, contact). Sidebar/data editing: nav, footer, site SEO, theme colours.
- No context providers. No `next/image`.

### Classifying static pages

Every page route already reads a content file, so no route is hardcoded. The classification confirms the existing model:

| Page file                                     | Distinct content sections                                         | Layout repeated on other pages? | Editor will add similar pages? | Recommended pattern                                      | Needs editable region? |
| --------------------------------------------- | ----------------------------------------------------------------- | ------------------------------- | ------------------------------ | -------------------------------------------------------- | ---------------------- |
| `pages/index.jsx` (`content/pages/index.md`)  | home/hero, counter, home/video, header, feature ×3, testimonial  | Blocks shared with features     | Yes                            | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → about                    | about/hero, counter, about/video, about/team                      | Counter shared                  | Yes                            | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → features                 | feature/hero, header, feature ×3, testimonial                     | Shared with home                | Yes                            | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → pricing                  | pricing/hero, pricing/table, faq                                   | No                              | Maybe                          | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → contact                  | contact/hero, contact/form                                         | No                              | Maybe                          | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → privacy                  | privacy/hero, privacy/privacy (title + HTML/markdown items)        | No                              | Maybe (terms)                  | Page builder in `pages` (existing)                       | Yes                    |
| `pages/[slug].jsx` → login                    | global/login (form labels, buttons)                                | Shares form styling with signup | No                             | Page builder in `pages` (existing)                       | Yes (labels/headings)  |
| `pages/[slug].jsx` → signup                   | global/signup (form labels, buttons)                               | As login                        | No                             | Page builder in `pages` (existing)                       | Yes (labels/headings)  |
| `pages/404.jsx` (`content/pages/404.md`)      | global/error (title, description, image)                           | No                              | No                             | Page builder in `pages` (existing; editors already edit) | Yes                    |
| `pages/blog/index.jsx` (`content/pages/blog.md`) | intro title + description, post list, pagination              | Listing shared with tags pages  | No                             | `pages` collection file with its own schema (blog intro) | Yes (title, description) |
| `pages/blog/[slug].jsx` (posts)               | title, meta, MDX body, featured image, recent posts                | Yes (6 posts)                   | Yes                            | Fixed-schema `blog` collection (existing)                | Yes (title, author, body, featured image) |
| `pages/blog/page/[page].jsx`, `pages/tags/*`  | generated listings                                                 | —                               | —                              | Leave as code                                            | No                     |
| Navigation, footer                            | logo, links, button / logo, copyright, social, sections            | Every page                      | —                              | Data files (existing `data/`)                            | Yes (data regions)     |

### Follow-on censuses

Primitive-vs-computed (route files):

- `pages/blog/[slug].jsx` computes `readingTime`, `wordCount`, `dateFormatted` (luxon), the JSON-LD image fallback, and renders the "Recent Blog" list — derived values, not editor fields; the editable fields (`title`, `author`, `featuredImg`) are read as-is.
- `components/layouts/default.jsx` computes title/description/image fallbacks from `seo` + `data/site.json` (head only).
- `components/layouts/navigation.jsx` computes the active link from `page.slug`; `footer.jsx` computes the year.
- `pages/[slug].jsx`, `index.jsx`, `404.jsx`: no computed output; they pass `content_blocks` to `Blocks`.

Frontmatter co-location: each block component's fields are one `content_blocks` item. Navigation and footer each read one data file. Nothing to reshape beyond the Phase 3 prop spread and passing nav/footer data as props if Phase 4 re-renders them.

## 5. Build pipeline

- `build`: `next build` only. Under `output: "export"` it writes `out/`.
- `pages/blog/index.jsx` writes `public/feed.xml` during the build (gitignored).
- `fetch-theme-color.js` rewrites `styles/_variables.scss` from `data/theme.json`; run only in `.cloudcannon/prebuild`.
- Env vars: none read (no `.env*`, no `process.env`).
- Hosting config: no `vercel.json`, `netlify.toml`, `.github/`, `_headers`, `_redirects`; no headers/redirects/rewrites in the Next config. `public/robots.txt` points at `https://example.com/sitemap.xml`, which the site doesn't generate.

## 6. Flags and special patterns

- **Positional CSS** on future array regions: `.counter-up-content:nth-child(2|4)` (`styles/components/_counter-up.scss`, counter `numbers`); `:first-child`/`:last-child` in `_pricing.scss` (pricing tier/feature lists), `_privacy.scss` (privacy nav items), `_feature.scss`, `_blog.scss`, `_footer.scss`, and `.accordion-flush .accordion-item:first-child/:last-child` (`_root.scss`, FAQ).
- **Global DOM scripts**: `public/js/script.js` on `$(document).ready` binds magnific-popup to `.popup-vimeo` (home/video, about/video) and counter-up to `.counter` via `IntersectionObserver`; password toggle on `.viewPassword`. `navigation.jsx` toggles `bg-nav` with jQuery and a scroll listener.
- **Numbers displayed as text**: `global/counter` `numbers[].number` (200, 2016, 40, 4322); `pricing/table` `price`, `discount_price`.
- **Styled HTML in strings**: every `description` is rendered with `markdown-it` (`html: true`) into `dangerouslySetInnerHTML`; `privacy.md` item descriptions hold raw `<p>`, `<ul>`, `<li>`.
- **Load-time behaviour**: count-up animation on `.counter` (`public/js/script.js` + `public/vendor/counter-up/countup.js`) — counters start from 0 until in view. Testimonial `slider` (check carousel behaviour in Phase 4). Sticky nav class via scroll listener (`navigation.jsx`). `opacity: 0` in `_navbar.scss` is the mobile toggler icon, not a reveal.
- **Forms**: `contact/form` — `<form method="post">` with no `action`, a `_gotcha` honeypot and `_replyto` (Formspree-style naming); `global/login` and `global/signup` — sign-in/sign-up forms with no action (template markup).
- **Bugs noticed, left for their phase**: `contact/form` email link uses `tel:` for the email address; `pricing/hero` has a literal `@@bg-color` class; React `for`/`spellcheck` attributes in `contact/form`; layout reads `seo.feature_image` while content has `seo.featured_image`.

## Site-wide facts

- Package manager: npm (lockfile v3), npm 11.19.1 locally; no Node pin.
- Production hosting: nothing in the repo says; `initial-site-settings.json` targets CloudCannon with `output_path: out`. See Open questions.
- Headers and redirects: none.

## 7. Sizing

- Total pages (content files or static routes; listings/tags/pagination excluded): 10 page files + 6 posts = **16** (threshold > 30: ok)
- Hardcoded template → YAML conversions: **0** — every page already reads `content_blocks` or a post file (threshold > 15: ok)
- Distinct collections: **3** — `pages`, `blog`, `data` (threshold > 5: ok)
- Tripped: **0/3** → no `plan.md`.

## Decisions and why

- **Keep the existing content model.** All pages are already page-builder entries in one `pages` collection plus a fixed-schema `blog` collection and site-wide `data` files; this matches the decision table, so Phase 2 configures it rather than redesigning it.
- **Migrate off Bookshop to editable regions** inside the migration phases, per cloudcannon-bookshop SKILL.md (Next.js: Migrate; the site is joining CloudCannon through `migrate-to-cloudcannon`). Steps map as recorded in § Earlier CloudCannon setup.
- **Keep the grouped component names** (`home/hero`, `global/counter`, …) as `_type` values and `blockMap` keys; rename only the key.
- **Structures come from `@bookshop/generate`'s real output** (Phase 2), not from the `.bookshop.yml` files or the committed `_structures`, which has no `content_blocks` entry.
- **`blog.md` stays in `pages`** with its own schema (intro title, description, pagination size); it is not a page-builder page.
- **`404.md` stays an editable page-builder entry**; `pages/404.jsx` keeps rendering it.
- **Nav, footer and site SEO stay data files**; Phase 2 adds `data_config` for `footer`, `nav`, `site` (and `theme` as a sidebar-only data file).
- **Post MDX keeps `next-mdx-remote`**; `ButtonSnippet` (and `IframeSnippet`, unused) become snippets in Phase 2, with the `IframeComponent`/`IframeSnippet` name mismatch resolved to the name the renderer registers.
- **The baseline is the two identical clean builds above**, reproducible from commit `4ca1538`; later phases diff `out/` against it.

## Open questions

1. **Where is production hosted?** Nothing in the repo says. Default: CloudCannon hosts production (the existing `initial-site-settings.json` points at `out`).
2. **Contact form backend.** It posts to nowhere (`method="post"`, no action; field names suggest Formspree). Default: if CloudCannon hosts, wire it to a CloudCannon Inbox in Phase 4/5 (`inbox_key` hidden field); keep the markup and fields editable.
3. **Login and sign-up pages** can't authenticate on static hosting. Default: keep them as editable demo pages (labels, headings, buttons), with forms left non-functional as they are now.
4. **Theme colours build step.** `fetch-theme-color.js` only runs in `.cloudcannon/prebuild`. Default: Phase 5 chains it into the CloudCannon build command (`node fetch-theme-color.js && next build`) so editing `data/theme.json` keeps working; the npm `build` script stays as is.
5. **Old CI steps in the hooks** (`rm -rf node_modules`, `npm i`, `next telemetry disable`). Default: drop them when the hooks are emptied in Phase 3/5; CloudCannon's install step covers dependencies.
6. **Node version.** No pin exists. Default: Phase 2 pins a current LTS Node supported by Next 13.4 (e.g. 20) in the build settings; confirm if the team needs another.
7. **Bugs noticed in passing** (email `tel:` link, `@@bg-color` class, `seo.feature_image` vs `featured_image`, `faivcon_image` input typo). Default: fix only the config typo and the SEO key mismatch where the phase touches them; leave template bugs untouched unless the user asks, so the baseline diff stays clean.
