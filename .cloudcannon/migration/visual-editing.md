# Visual editing census

Pages Router site. `EditableRegions` wraps `<Component>` in `pages/_app.js`; registered components live in `cloudcannon/componentMap.js`.

Page-builder pages (`content/pages/*.md` with `content_blocks`): index, about, features, pricing, contact, login, signup, privacy, 404. Every block renders through `components/shared/blocks.jsx` inside one array region (`data-prop="content_blocks"`, `data-component-key="_type"`); each block's wrapper is an `array-item` with `data-component="<_type>"`. Paths inside blocks are relative to the block.

## Census

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| All pages | Header / navigation | data-file + array | Unregistered (reads `data/nav.json`, active link derives from the page); logo `data-prop-src="@data[nav].logo"`; `ul` array `@data[nav].items`, items `editable-text data-prop="text"`; button `editable-text data-prop="@data[nav].button.text"` | Logo, items, button in `data/nav.json`. Link hrefs sidebar | — |
| All pages | Footer | data-file + component + array | `<editable-component data-component="footer" data-prop="@data[footer]">` in the layout; inside: logo image, `copyright` text, `social` array (icon via re-render), `sections.N.title` and `sections.N.links` arrays bound by index | All values in `data/footer.json`; year computed | Sections are bound by index, not as an array region: they share Bootstrap `.row` (`.row > *`) with the static logo column, so add/remove/reorder of columns is sidebar-only |
| Home | `home/hero` | component + text + image | `title`, `description` (block), `button.text`, `image`/`image_alt` | All in front matter | — |
| Home, About | `global/counter` | component + text + array | `title`, `title_suffix`, `description`; `numbers` array (`data-direction="row"`), items: `prefix`, `number`, `suffix`, `text` | `number` quoted as strings for text regions | — |
| Home | `home/video` | component + image | `image`/`image_alt`; `video_url` sidebar | All in front matter | — |
| Home, Features | `global/header` | component + text | `title`, `title_suffix`, `description` | `remove_top_padding` via re-render | — |
| Home, Features | `global/feature` | component + text + image | Both `reversed` branches carry `title`, `description`, `button.text`, image | All in front matter | — |
| Home, Features | `global/testimonial` | component + text + array | `title`, `title_suffix`, `description`; `slider` array (row), items: image, `author`, `designation`, `message` | All in front matter | — |
| Features | `feature/hero` | component + text + image | `title`, `description`, `button.text`, image | Decorative `effect-4.png` shape stays hardcoded | — |
| About | `about/hero` | component + text + array + image | `title`, `description`, `button.text`; `hero_images` array (wrapper `display: contents` inside the banner), items: image | `placement` via re-render | — |
| About | `about/video` | component + text + image | `title`, `description`, `button.text`, `video.image` | `video.link` sidebar | — |
| About | `about/team` | component + text + array + image | `title`; `team_members` array on `.row` (row), items: image, `name`, `designation` | All in front matter | — |
| Pricing | `pricing/hero` | component + text | `title`, `description` | — | — |
| Pricing | `pricing/table` | component + array | `pricing_tier` array on `.row` (row); items: `tier`, `description`, `currency_symbol`, `price`, `discount_price`, `button.text`; nested `features` array, items `item` | Prices quoted as strings; `highlight_tier`, `has_discount`, `active_feature` via re-render | — |
| Pricing | `global/faq` | component + text + array | `title`, `title_suffix`, `description`; `FAQ` array on `.accordion`, items `title`, `description` (block) | Item numbering computed | — |
| Contact | `contact/hero` | component + text | `title`, `description` | — | — |
| Contact | `contact/form` | component + text + image | `address.*`, `phone.heading`, `phone.cell`, `phone.image`, `email.heading`, `email.email`, `email.image`, `form.heading`, `form.*.heading`, `form.submit_button.text` | Placeholders are input attributes: sidebar | Placeholders: attribute values, no text node to host a region |
| Login | `global/login` | component + text | `title`, `fullname.heading`, `email.heading`, `checkbox_text`, `forgot_password.text`, `log_in_button.text`, `divider_text`, `google_button_text`, `facebook_button_text`, `sign_up_button.text` | Hardcoded labels extracted to front matter (`forgot_password`, `divider_text`, `google_button_text`, `facebook_button_text`). Placeholders sidebar | Placeholders: attribute values |
| Sign up | `global/signup` | component + text | `title`, `form.*.heading`, `form.checkbox_text`, `form.sign_up_text`, `form.divider_text`, social button texts, `form.log_in_button.text` | Hardcoded labels extracted to `form.*` | Placeholders: attribute values |
| Privacy | `privacy/hero` | component + text | `title` | — | — |
| Privacy | `privacy/privacy` | component + array | `terms_and_conditions` array on `.scrollspy-example`, items `heading`, `description` (block); side nav re-renders | `description` holds HTML; rendered through markdown-it, so a markdown input | — |
| 404 | `global/error` | component + text + image | image, `description` (block), `button.text` | "Try again" button extracted to `button` | — |
| Blog index (`blog.md`) | Hero | text | `h1 data-prop="title"`, `description` (block); only on `/blog` and `/blog/page/N`, not tag pages (headline is the tag) | — | — |
| Blog index | Post cards + pagination | sidebar-only | — | Cards come from other files (posts); pagination computed | Each card is another file's data on a computed, paginated listing; edit posts on their own page |
| Blog post | Title, author | text | `title`, `author` | Date, reading time and word count are computed | Date is a datetime input (sidebar) |
| Blog post | Meta labels, "Recent Blog" heading | data-file | `@data[blog].reading_time_label`, `@data[blog].word_count_label`, `@data[blog].recent_posts_title` | Extracted from the route file to `data/blog.json` | — |
| Blog post | Body | text | `data-prop="@content"` on a wrapper div; MDX rendered to HTML at build | MDX components are snippets (`_snippets`) | — |
| Blog post | Featured image | image | `data-prop-src="featuredImg.image"`, `data-prop-alt="featuredImg.image_alt"` | — | — |
| Blog post | Recent posts cards | sidebar-only | — | Other files' data | Cards are other posts; edit them on their own page |
| Tag pages | Hero + cards | sidebar-only | — | Headline is the tag | Not a content file's URL; no file to edit |

## Shared-UI table

- Header / navigation: `data/nav.json`, in `data_config` as `nav`, with `file_config`.
- Footer link columns: `data/footer.json` `sections[{title, links[]}]`, in `data_config` as `footer`.
- Footer credits: copyright in `data/footer.json`.
- CTA banner: not applicable — the site has no CTA above the footer.
- Share block: not applicable — posts have no share block.
- Author card: not applicable — `author` is a plain name shown as text on the post, with no card or authors list.
- Cookie banner / announcement bar: not applicable.

## Editor-only behaviour

- `public/js/script.js` skips the count-up animation and the Vimeo lightbox when `window.inEditorMode` is set; both rewrite or intercept editable elements.
- Login, sign-up and contact forms don't submit in the editor, so clicking into a button label doesn't navigate.
