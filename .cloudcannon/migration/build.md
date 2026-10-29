# Phase 5 — Build and test (Next.js, Pages Router, former Bookshop site)

## Checklist

From migrate-to-cloudcannon/build.md and nextjs/build.md.

- [x] Full build: `.next/` and `out/` deleted, then `npm ci` and `npm run build` (the settings' commands; no environment variables). Exit 0, 26 routes, 25 HTML files plus `feed.xml` and `robots.txt`.
- [x] Frozen install: `npm ci` with no `node_modules` and an empty npm cache, npm 11.19.1, exit 0.
- [x] Export mode: `output: "export"` in `next.config.mjs`; no `next/image`, so no `images` setting needed. `trailingSlash`, `basePath`, `distDir` unset; no `rewrites`/`redirects`/`headers`.
- [x] Every page in the output: 10 page files, 6 posts, plus `/blog/page/1`, 4 tag pages and 4 tag page-1 pages.
- [x] Regions in the output: `_dynamic` 25 (one root per page), `array` 146, `array-item` 590, `image` 86, `text` 260 (43 of them `data-type="block"`). All 20 block types appear as `data-component`. Home page 91 regions; `blog/email-delivery-tips.html` 38, including `@content`, `title`, `author`, the `@data[blog]` labels, nav and footer.
- [x] Images load: all 39 distinct `<img src>` values resolve to files in `out/`; no remote images.
- [x] Base path: not used.
- [x] Config validates: `npx @cloudcannon/cli validate` exit 0.
- [x] Collection URLs: all 16 files in `pages` (`/[slug]`) and `blog` (`/blog/[slug]`) match a built page; `data` has `disable_url`.
- [x] Schema keys resolve: `_schema: blog_index` (`content/pages/blog.md`) and both `add_options` `schema: default` are keys under their collection's `schemas`.
- [x] Search index: none on this site.
- [x] Schema round-trip: `contact.md` and `signup.md` lacked `seo.featured_image_alt`. Filled with the schema default (empty), rebuilt: contact, signup, home and blog pages render the same. The key stays in both files.
- [x] Hydration errors: no browser in this session; pages listed for the user below.
- [x] Build command: `build` runs the theme step then `next build`; `build_command` is `npm run build`, `output_path` `out`, `node_version` unset.
- [x] Hand off: checks below.

## What changed

- `package.json` — `build` is `npm run prebuild:fetch-theme-color && next build`; `packageManager: "npm@11.19.1"`.
- `.cloudcannon/prebuild`, `.cloudcannon/postbuild` — deleted.
- `content/pages/contact.md`, `signup.md` — `seo.featured_image_alt:` added (empty).
- `.gitignore` — `/.parity/` line removed; `.parity/` deleted (migration ends here).

## Findings

- **Parity with the Bookshop baseline.** `compare.mjs` on the final clean build: 25 pages, 25 `MARKUP` differences, no text, link, image, alt, title or description differences, the same result Phase 4 explained (region attributes, `<editable-text>`, wrapper `<div>`s, removed `data-cms-bind`, plus the post `og:image` from Phase 3). `fields.mjs`: 90 items, 0 problems.
- **Theme step is deterministic.** With `data/theme.json` unchanged, the build leaves `styles/_variables.scss` byte-for-byte the same (it matches the committed colours). After a theme edit, the local build rewrites that tracked file, so the developer commits it alongside the `theme.json` change.
- **`detect-build-commands`** suggests `npm run build` and `out`, matching the settings.
- **Hydration risk:** `components/layouts/footer.jsx` renders `new Date().getFullYear()`. It matches the build until the year turns, then mismatches until the next build. Nothing else in components, pages or lib reads `Date`, `Math.random`, portals or `window` during render.
- **Contact form** still posts nowhere (`method="post"`, no `action`); the build docs prescribe nothing for it.

## Decisions and why

- **Theme step in the `build` script, before `next build`.** build-commands.md: a step that reads source content goes in `build` before the SSG, and `build_command` stays `npm run build` so local and CloudCannon builds match. This replaces the audit's default of chaining it only into the CloudCannon command.
- **Theme output kept tracked.** build-commands.md allows a pre-build step to write a tracked file when the output is deterministic; it is, and moving the colours to a gitignored generated partial would change the styles setup and break `next dev` on a fresh clone.
- **Hook files deleted.** build-commands.md forbids `.cloudcannon/` hook files. Their steps: theme colour moved into `build`; `rm -rf .next`, `rm -rf node_modules` and `npm i` dropped (`npm ci` covers install, `.next/` is a preserved build cache); `next telemetry disable` dropped (audit default).
- **`packageManager` pinned to npm 11.19.1**, the version that ran the frozen install, per build-commands.md § Package manager.
- **`node_version` unset** (CloudCannon default, Node 22): the repo has no `.nvmrc` or `engines`, and Next 13.4 runs on Node 22.
- **Contact form not wired** to an Inbox; that needs the user's hosting answer and an Inbox key.

## Open questions

1. **Contact form backend.** Default: if CloudCannon hosts production, add a hidden `inbox_key` field with the key of a CloudCannon Inbox the user creates; until then the form posts nowhere, as before.
2. **Node version.** Default: unset (Node 22 on CloudCannon); add an `.nvmrc` with the team's version if they want it pinned.
3. **Telemetry.** Default: dropped. Set `NEXT_TELEMETRY_DISABLED=1` in `build.environment_variables` if the team wants it off on CloudCannon.
4. **Footer year rendered with `new Date()`.** Default: left as is (a mismatch only between New Year and the next build); a fixed year from data would remove it.
5. **Theme edits rewrite `styles/_variables.scss` locally.** Default: keep; commit the regenerated file with the `theme.json` change.

## Handoff

Already checked locally: clean `npm ci` and `npm run build`, `validate`, collection URLs, schema keys, region counts, images, parity with the Bookshop baseline.

Commands, from the site root:

- Site dev server: `npm run dev`
- CloudCannon dev server: `npm run build`, then `npx @cloudcannon/cli dev out --port 10101`, and open `http://localhost:10101`. Rebuild with `npm run build` to refresh the preview. Commit or stash first: editor changes write straight to disk.

Checks for the user (one answer each):

1. Run `npm ci && npm run build` from the site root. Did it exit 0? (If not, paste the last 30 lines.)
2. Run `npx serve out`, open `/`, `/about`, `/pricing`, `/contact`, `/blog`, `/blog/email-delivery-tips`, `/tags/marketing`, `/404` with the console open. Any hydration errors? (Paste the first one.)
3. In CloudCannon, on the home page, does clicking the hero title let you type in place?
4. Does clicking the home hero image open the image picker?
5. On the home page, does each block show add, move and delete controls?
6. On the about page, do the counter numbers show as typed (not counting up from 0)?
7. Edit a nav link label on any page and save. Does the commit change only `data/nav.json`?
8. Edit "Recent Blog" on a post page and save. Does the commit change only `data/blog.json`?
9. On `/blog/email-delivery-tips`, edit one word in the body and save. Does the git diff show only that word changed in the body?
10. Change `primary_color` in Site settings → theme and save. After the rebuild, does the site use the new colour?
11. Does the CloudCannon build log show `npm ci` and `npm run build` with no hook-file steps? (Paste the first error if it failed.)
