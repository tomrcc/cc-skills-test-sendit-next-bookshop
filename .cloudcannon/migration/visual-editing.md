# Phase 4 — Visual editing (Next.js, Pages Router, former Bookshop site)

No todo tool was available, so the checklists live here and are ticked as each item is met.

## Section census

Every block is registered: `componentMap` spreads `blockMap`, and `Blocks` puts `data-component={_type}` on each array item. Sub-components (`global/faqItem`, `pricing/item`) render inside their block and re-render with it. Paths inside a block are relative to its `content_blocks` item.

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| All page-builder pages (index, about, features, pricing, contact, privacy, login, signup, 404) | Blocks loop | array + component | `<div data-editable="array" data-prop="content_blocks" data-component-key="_type">`; each block in `<div data-editable="array-item" data-component={_type}>` | All block data in front matter | — |
| Home | `home/hero` | component + text + image | `title` span, `description` block, `button.text` editable-text, image `data-prop-src="image" data-prop-alt="image_alt"` | All in front matter | — |
| Home, about | `global/counter` | component + text + array | `title`, `title_suffix`, `description` block; `data-prop="numbers"` on `.counter-up-wrapper`, `.counter-up-content` items; `prefix`, `number`, `suffix`, `text` | `number` quoted (Phase 2). Count-up script skipped in editor | — |
| Home | `home/video` | component + image | image `src`/`alt` | `video_url` is a link → sidebar | Play button is a link with no text |
| Home, features | `global/header` | component + text | `title`, `title_suffix`, `description` block | All in front matter | — |
| Home, features | `global/feature` (both `reversed` branches) | component + text + image | `title`, `description` block, `button.text`, image | All in front matter | — |
| Home, features | `global/testimonial` | component + text + array | `title`, `title_suffix`, `description` block; `data-prop="slider"` on the `.row`, `.col-*` items; `author`, `designation`, `message`, image `src` | Image `alt` is hardcoded `"logo"` and `image_alt` is output as the class (template bug) → only `src` bound | No carousel JS: the "slider" is a static grid |
| About | `about/hero` | component + text + array | `title`, `description` block, `button.text`; `data-prop="hero_images"` on a new `display: contents` wrapper inside `.about-hero-two-banner` (the `.pattern` sibling stays outside); image per item | `placement` is a select → sidebar; the class follows on re-render | — |
| About | `about/video` | component + text + image | `title`, `description` block, `button.text`, image `video.image`/`video.image_alt` | `video.link` → sidebar | — |
| About | `about/team` | component + text + array | `title`; `data-prop="team_members"` on the `.row`, `.col-*` items; `name`, `designation`, image | All in front matter | — |
| Features | `feature/hero` | component + text + image | `title`, `description` block, `button.text`, image | Decorative shape image is presentation | — |
| Pricing | `pricing/hero` | component + text | `title`, `description` block | All in front matter | — |
| Pricing | `pricing/table` | component + array (nested array) | `data-prop="pricing_tier"` on the `.row`, `pricing/item` root `.col-lg-4` as item; `tier`, `description`, `currency_symbol`, `price`, `discount_price`, `button.text`; `data-prop="features"` on the `ul`, `li` items, `item` | `highlight_tier`, `has_discount`, `active_feature` are switches → sidebar, re-rendered | — |
| Pricing | `global/faq` | component + text + array | `title`, `title_suffix`, `description` block; `data-prop="FAQ"` on `.accordion`, `faqItem` root as item; `title`, `description` block | `0N` number is the computed index | — |
| Contact | `contact/hero` | component + text | `title`, `description` block | All in front matter | — |
| Contact | `contact/form` | component + text + image | `address.heading`, `address.address`, `phone.heading`, `phone.cell`, `phone.image`, `email.heading`, `email.email`, `email.image`, `form.heading`, `form.<field>.heading`, `form.submit_button.text` | Placeholders are attributes → sidebar. Form backend → Phase 5 | — |
| Privacy | `privacy/hero` | component + text | `title` | — | — |
| Privacy | `privacy/privacy` | component + text + array | `data-prop="terms_and_conditions"` on `.scrollspy-example`, `.privacy-items` as items; `heading`, `description` block. The side nav repeats `heading` and re-renders with the block | — | Side nav is a second render of the same array; it is not a second array region |
| Login | `global/login` | component + text | `title`, `fullname.heading`, `email.heading`, `checkbox_text`, `log_in_button.text`, `sign_up_button.text`, plus the labels moved into front matter below | "Forget Password", "or", "Sign In with Google", "Sign In with FaceBook" were hardcoded → new fields | — |
| Signup | `global/signup` | component + text | `title`, `form.fullname.heading`, `form.email.heading`, `form.password.heading`, `form.retype_password.heading`, `form.checkbox_text`, `form.sign_up_text`, `form.log_in_button.text`, plus the moved labels | "or", "Sign In with Google", "Sign In with FaceBook" were hardcoded → new fields under `form` | — |
| 404 | `global/error` | component + text + image | `description` block on the existing `<h3>`, image, `button.text` | "Try again" button was hardcoded → new `button` field | — |
| Blog listing (`blog.md`) | Intro | text | `title` span on `h1` (only when no tag `headline`), `description` block | All in `blog.md` | — |
| Blog listing, post pages | Post cards (`posts/summary`) | sidebar-only | — | Fields belong to other post files | Every visible card field (thumb, title) sits inside a link, so clicking follows the link; title and featured image are wired on each post's own page, `thumbImg` is edited in that post's sidebar |
| Blog listing | Pagination | none | — | Computed | Generated from the post count |
| Post | Title, author | text | `title`, `author` spans | All in front matter | — |
| Post | Date | sidebar-only | — | `date` | Dates must not be text regions; formatted by luxon |
| Post | Reading time, word count | text (labels only) | `@data[blog].reading_time_label`, `@data[blog].word_count_label` | Counts are computed. Labels were hardcoded → `data/blog.json` | — |
| Post | MDX body | text | `<div data-editable="text" data-type="block" data-prop="@content">` around `<MDXRemote>` | Snippets: `ButtonSnippet`, `IframeSnippet` | — |
| Post | Featured image | image | `featuredImg.image` / `featuredImg.image_alt` | — | — |
| Post | "Recent Blog" | text + sidebar-only list | heading `@data[blog].recent_posts_heading`; cards as above | Heading was hardcoded → `data/blog.json` | — |
| All pages | Navigation | data-file | Unregistered (loads `data/nav.json` itself, fields map straight to elements); logo `@data[nav].logo`; `@data[nav].items` on `ul.navbar-nav`, `li` items, `text`; `@data[nav].button.text` | Active link class computed from the page slug, updates after a rebuild | — |
| All pages | Footer | data-file + array | Unregistered; logo `@data[footer].logo`; `@data[footer].copyright`; `@data[footer].social` on the `ul`; section titles by index `@data[footer].sections.N.title`; `@data[footer].sections.N.links` on each `ul`, `text` per link | Year is computed. Social icons are select values → sidebar | Section columns share the `.row` with the static logo column and need Bootstrap's `.row > *` gutter, so the sections can't have their own array wrapper: bound by index (no on-page add/remove/reorder of sections) |
| Tag and paginated listings | All | none | — | Generated | No content file opens them in the editor |

Shared-UI treatment table: navigation (data file `nav`, primitive `@data[nav]` regions), footer link columns (data file `footer`, by index, see above), footer credits (`@data[footer].copyright`). The site has no CTA rendered by a layout, no share block, no author card (post `author` is a plain string) and no announcement bar.

## Checklist

React connector (nextjs/visual-editing.md § Sites using the React connector):

- [x] `@cloudcannon/react-connector` removed from `package.json`
- [x] `CloudCannonConnect` and its `valueOptions` removed; `_app` renders `<Component {...pageProps} />` inside `<EditableRegions>`
- [x] Every `data-cms-bind` had a census row (the block roots → the blocks loop row) and is removed; the `dataBinding` prop is gone from `Blocks` and all 20 signatures, which are now `(block)`
- [x] `grep -rn "react-connector\|CloudCannonConnect"` outside `node_modules`, build output and these notes: no matches
- [x] Build command unchanged (`npm ci` installs the new dependency from the lockfile)

Infrastructure:

- [x] `@cloudcannon/editable-regions` 0.0.22 in dependencies
- [x] `output: "export"` set
- [x] No `tsconfig.json`
- [x] `pages/_app.js` has exactly one `<EditableRegions tag="div">`, wrapping `<Component {...pageProps} />`; `DefaultLayout` (nav, blocks, footer) renders inside it
- [x] `<CloudCannonEditor />` rendered in `_app`, after the root
- [x] `components/CloudCannonEditor.jsx` imports `../cloudcannon/registerComponents` inside the `window.inEditorMode` check
- [x] No component, map or helper under `pages/`
- [x] No client component imports `registerReactComponent` at the top level; `Blocks` imports `blockMap` from `componentMap.js` (the shared-map pattern)
- [x] `next build` passes

Universal completeness:

- [x] Editor enablement: `pages` and `blog` have `visual`
- [x] Census coverage: every row is wired or has a written reason
- [x] Array containers: every rendered front matter or data array has `array` + `array-item`, except footer sections (by index, reason in the census) and the privacy side nav (second render of the same array)
- [x] Per-loop census and nested editables: counter numbers, testimonials, hero images, team, pricing tiers and features, FAQ, privacy sections, nav items, footer social and links. Footer social items have no text or image field to nest (icon is a select, label is visually hidden)
- [x] Array path scope: relative paths inside every item
- [x] Array container purity: `about/hero` images moved into their own `display: contents` wrapper so `.pattern` sits outside the array
- [x] Image editables on every front matter or data image except testimonial `alt` (template bug, see Open questions)
- [x] Child component labels: hardcoded labels in `global/error`, `global/login`, `global/signup` moved into front matter; post-page labels moved into `data/blog.json`
- [x] Shared partials backed by data: nav and footer use `@data[...]`
- [x] Data file completeness: every visible nav and footer value comes from its data file except the computed year
- [x] Cross-collection select wiring: none (tags are not rendered through a lookup)
- [x] `_inputs` audit: every `data-prop` key has an input of a matching type (markdown → `block`; text/textarea/email → `span`); new keys added to the login, signup and error structure values and `file_config` for `data/blog.json`
- [x] Schema-file seed audit: post and blog-index schemas hold every wired field; page builder blocks seed from structure values
- [x] Markdown body: `@content` wrapper around `<MDXRemote>` on posts
- [x] Source editables: none needed (no one-off hardcoded page text remains)
- [x] Conditional guards: optional objects (`button`, `video`, contact sections, prefix/suffix) keep their guards; the new error `button` is guarded
- [x] Inline vs block: every `description` is `data-type="block"` on a `<div>` (or the existing `<h3>` in `global/error`, see Findings)
- [x] Component prop contract: blocks take the item's fields as props; `Blocks` passes only `{...block}`
- [x] Cross-collection editable guard: post cards carry no regions
- [x] `<template>` blueprints: none needed — page builder is fully registered; sub-arrays sit inside re-rendered blocks; nav and footer lists always have items (see Open questions)
- [x] Data file input config: `blog` added to `data_config` and `file_config`

Page builder:

- [x] Array wrapper with `data-component-key="_type"` and `data-prop="content_blocks"`
- [x] `data-editable="array-item"` and `data-component={_type}` on each block's wrapper `<div>`
- [x] Widget nested editables, sub-arrays and both `global/feature` branches wired
- [x] Keys match `_type`; all 20 types registered (`componentMap` spreads `blockMap`, `Blocks` renders from `blockMap` and throws on an unknown type)
- [x] Build output has `data-component-key` (9 pages), `data-component=` (28 blocks, all 20 keys), `data-editable="array-item"`

Next.js completeness:

- [x] `_enabled_editors` and `file_config` per the configuration guide
- [x] Every region sits inside the root (header and footer render inside `<Component>`)
- [x] Every `componentMap` key is referenced by `data-component` in the output
- [x] Registered components are client-safe: no `async`, `fs`, `useRouter` or `next/headers`; they import `markdown-it`, `next/link`, `@makotot/ghostui` and two sub-components
- [x] Rich text hosts: every `block` region gets its HTML through `dangerouslySetInnerHTML` on the host; the MDX body renders inside its host
- [x] No `<template>` blueprints, so no `RawTemplate`
- [x] Spread props: blocks render as `<Block {...block} />`

Pre-handoff sweep:

- [x] Census walk-through: every row implemented as written
- [x] Shared-UI table walk-through: above
- [x] Build grep: `@data[nav]`, `@data[footer]` on all 25 pages, `@data[blog]` on the 6 posts, `@content` on the 6 posts

## What changed

- `package.json`, `package-lock.json` — `@cloudcannon/react-connector` removed, `@cloudcannon/editable-regions` added.
- `pages/_app.js` — `EditableRegions` root and `CloudCannonEditor`.
- `components/CloudCannonEditor.jsx`, `cloudcannon/registerComponents.js` — new. `cloudcannon/componentMap.js` — exports `componentMap`.
- `components/shared/blocks.jsx` — array wrapper and per-block array items.
- All 20 block components plus `global/faqItem`, `pricing/item` — regions; `data-cms-bind` and `dataBinding` removed. `global/error`, `global/login`, `global/signup` read their labels from front matter; `contact/form`, `global/login`, `global/signup` forms cancel submit in the editor.
- `components/layouts/navigation.jsx`, `footer.jsx`, `components/blog/list.jsx`, `pages/blog/[slug].jsx` — regions; post labels come from `data/blog.json`.
- `lib/data.js`, `data/blog.json` (new), `cloudcannon.config.yml` (`data_config.blog`, `file_config` entry), `.cloudcannon/README.md` (blog labels line).
- `content/pages/404.md`, `login.md`, `signup.md` and the matching structure values — new label fields, with inputs.
- `public/js/script.js` — magnific-popup and count-up skipped under `window.inEditorMode`.
- `styles/_cloudcannon.scss` (new, imported last in `theme.scss`) — editor-only box for empty arrays. `_pricing.scss`, `_privacy.scss`, `_contact-form.scss` — `:has()` copies of the three block-to-block sibling rules. `_about.scss` — `.about-hero-two-images { display: contents }`.

## Findings

- **Parity.** `node .parity/compare.mjs .parity/baseline out`: 25 MARKUP differences, no text, `href`, image, `alt`, title or description differences. A one-off check that stripped region attributes, `<editable-text>` tags, `data-cms-bind`, the post `og:image` (Phase 3 change) and the added wrapper `<div>`s left 0 differing pages, with each page's extra closing `</div>`s equal to its added wrappers. So every markup change is one of: region attributes, `<editable-text>` around text that was a bare text node, the `EditableRegions` root `<div>` (every page), the `Blocks` array `<div>` and one `<div>` per block (page-builder pages), the hero-images wrapper (about), and the removed `data-cms-bind`. The labels moved into content render the same strings. The check script was deleted afterwards. `node .parity/fields.mjs`: 90 items, 0 problems.
- **Wrappers and CSS.** Three block-to-block sibling rules (`.pricing-inner + .pricing`, `.privacy-hero + .privacy`, `.contact-hero + .contact`) stop matching once each block has its own wrapper; each now has a `:has(> a) + :has(> b) > b` copy, confirmed in the compiled CSS. No child combinator, `:first-child` or `:nth-child` rule targets the blocks themselves.
- **Positional CSS on array children** (audit § 6). Counter `nth-child(2|4)`, pricing feature `li:last-child`, footer social `li:last-child` and the privacy nav `:last-child` all keep their DOM: the existing parent is the array host, no wrapper or `<template>` is added. The privacy nav is not an array region. FAQ `:first/last-child` rules are on `.accordion-flush`, which this site doesn't use.
- **Global DOM scripts.** Count-up rewrites `.counter` text (would overwrite the `number` region) and magnific-popup takes the play-link click; both skip in the editor. The password eye toggle and the jQuery nav toggle stay; they don't touch regions. Neither re-binds to re-rendered markup, which is fine since neither runs or matters in the editor.
- **Testimonial "slider"** is a static grid with no carousel script; nothing to stop.
- **Numbers as text.** `number`, `price`, `discount_price` are quoted strings with `text` inputs (Phase 2), bound as `span` regions. Price and currency symbol shared one text node, so each now has its own `<editable-text>`.
- **Markdown descriptions.** markdown-it output goes through `dangerouslySetInnerHTML` on each `block` host. `global/error` renders its description inside an `<h3>`; the host stays an `<h3>` to keep the styling. The HTML parser keeps `<p>` and lists inside it, so the region works, but the markup is semantically off.
- **Buttons, links and labels with regions.** Clicking a region inside a `<Link>` follows the link; editors change those labels through the sidebar or the item's panel. Regions inside submit buttons would submit the form, so the three forms cancel submit when `window.inEditorMode` is set (no HTML change). FAQ titles sit inside the accordion button: clicking one also toggles that answer open, which is how editors reach the answer text.
- **Navigation active state** compares `page.slug` with link text, so a renamed link's active highlight changes after a rebuild.
- **`lib/renderer.js`** still mentions `dataBinding`; it is dead code (Phase 3 open question 3) and not imported.

## Decisions and why

- **Navigation and footer stay unregistered with primitive `@data` regions.** nextjs/visual-editing-reference.md § Registered components, case 2: they load their own data and each field maps straight to an element.
- **Footer section columns bound by index.** They share the `.row` with the static logo column and need Bootstrap's `.row > *` gutter, so a `display: contents` array wrapper would drop the gutter. Each column's `links` list is still an array region.
- **Hardcoded labels moved into data**, not source regions: block labels into each block's front matter (so new blocks carry them), post-page labels into a new `data/blog.json` (shared by every post; source regions are not allowed in route files).
- **Post cards carry no regions.** Every card field is inside a link, and the same fields are wired on each post's page.
- **Testimonial image binds `src` only.** The template outputs `image_alt` as the class and a fixed `alt="logo"`; binding `alt` would show a different value in the editor from the built page.
- **No `<template>` blueprints.** The page builder and every sub-array re-render through registered blocks; nav items, footer social and footer links are never empty in content, so "Add" clones an existing item.
- **Removed `dataBinding` entirely** rather than keeping it: no `data-cms-bind` remains for it to feed.

## Open questions

1. **Testimonial image `alt`.** The template uses `image_alt` as the class and hardcodes `alt="logo"`. Default: left as is (template bug, keeps parity); only `src` is editable on the page. Fixing it is a one-line change.
2. **Footer columns add/remove/reorder on the page.** Bound by index, so editors add or reorder columns in the sidebar. Default: keep; restructuring the footer grid would change the layout.
3. **Empty footer link lists.** If an editor deletes every link in a column, the on-page "Add" has nothing to clone. Default: no blueprint (it would need `RawTemplate` and shifts `:last-child`); the sidebar still adds links.
4. **`global/error` description inside `<h3>`.** Default: keep the `<h3>` host for styling; change it to a `<div>` with the same class if the team wants valid markup.
5. **Contact form backend.** Unchanged here. Default: Phase 5, per the audit (CloudCannon Inbox if CloudCannon hosts).
6. **Login and sign-up pages.** Default: editable demo pages; their forms stay non-functional.

## To check in CloudCannon

These can only be confirmed in the Visual Editor:

- Each page-builder page shows add, move and delete controls on every block, and adding a block of each type renders it (no error card).
- Text and image regions edit in place on home, about, pricing, contact, privacy, login, signup and 404.
- Counter numbers stay as typed (no count-up from 0) and clicking a video play button doesn't open the popup.
- Switching `reversed`, `alternate_style`, `highlight_tier`, `has_discount`, `active_feature` or an about-hero `placement` in the sidebar re-renders the block.
- Nav links and footer links edit in place and save to `data/nav.json` / `data/footer.json`; "Recent Blog" saves to `data/blog.json`.
- A post body edits in place and the Button snippet shows as a snippet.
- The pricing/hero overlap, privacy hero overlap and contact form overlap look the same as on the live build.
