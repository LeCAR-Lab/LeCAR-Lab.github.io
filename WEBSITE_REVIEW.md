# LeCAR website review — September 9, 2026

## Scope and structure

Reviewed all authored HTML, CSS, and JavaScript in the repository, including the eight historical pages in `archive/`, and inventoried the media folders. Inspected the live homepage and the requested article reference in a browser. Checked the new Blog locally. Existing-site findings below are proposals only; none of these audit fixes has been applied.

The original site has six standalone pages: Home, People, Publications, Research Topics, Join, and Robots. They share `styles.css`, `theme.js`, Google Fonts, Font Awesome, and manually repeated headers and footers. `theme.js` manages the saved theme choice and system preference. There is no package manifest or build pipeline in this checkout; it is directly servable static HTML.

`assets/` contains shared branding and demos, `people/` contains portraits, `publications/` contains paper media, and `research/` contains older topic graphics. `archive/` is a separate historical design with its own stylesheet; its differences should not be treated as current-site design errors.

## What works well

- The restrained serif headings, sans-serif body, cardinal accents, and shared spacing give the current pages a consistent academic identity.
- The homepage demonstrations make the research immediately concrete. Publication summaries and topic disclosures offer useful ways to browse the work.
- All browser-normalized local `href`, `src`, and `poster` targets resolve across the original 14 HTML pages. This is a local-path check, not a claim that every external website is reachable.
- Shared publication records match between Publications and Research in titles, authors, venues, awards, summaries, links, and media.
- Current images have alt attributes, and the current pages consistently include the shared theme behavior.

## Proposed changes requiring approval

| Finding | Evidence | Proposed change |
| --- | --- | --- |
| Mobile navigation is unavailable to keyboard users on the original pages. | `styles.css:219` sets `.nav-toggle` to `display: none`. The clickable label is not keyboard-focusable and is marked `aria-hidden`. | Keep the same hamburger appearance and menu behavior; make the checkbox visually hidden but focusable and show focus on its label. The newly added blog pages already handle this locally. |
| SPIDER's year group conflicts with its displayed venue year. | `publications.html:408` starts the 2025 section; SPIDER at lines 415–417 lists IROS 2026. Other 2025 preprints with 2026 venues appear under 2026. | Move SPIDER into 2026 if grouping is by conference/publication year. Keep the original media filename and links. |
| The alumni explanation conflicts with an internal program transition. | `people.html:297` says dates indicate leaving the lab. Wenli Xiao is a current PhD student at lines 138–140 and a 2025 MS alumnus at lines 346–348. | Preserve both listings and replace the note with: “Years indicate completion of the listed program or the end of a lab appointment; some alumni continue in the lab in another role.” |
| Research uses contribution symbols without explaining them. | The legend appears at `publications.html:44`, while Research uses the same `*` and dagger symbols throughout. | Add the existing equal-contribution/equal-advising legend near the Research papers. |
| Some journal entries omit publication years. | Neural-Fly and Neural-Swarm2 show only journal names at `publications.html:743` and `publications.html:814`; the broad “2023 and Before” group does not resolve their years. | Verify publication dates against the papers, then include years consistently in both Publications and Research. |
| The current Robots page is not discoverable through current internal navigation. | `robots.html` exists and uses the current design, but no current page links to it. | If the page is intended to remain public-facing, add a small contextual “Our robots” link on Home or Research. This need not add another main-menu item. |
| Some small muted text narrowly misses a 4.5:1 contrast ratio in light mode. | `--muted: #7a756c` against `--bg: #fdfcfa` computes to approximately 4.46:1. People roles and publication venues use this combination. | Slightly darken the light-mode muted token while preserving the palette. The dark-mode pair is approximately 5.37:1. |
| Media files create a substantial loading burden. | Referenced unique local media totals approximately 49.85 MiB on Home, 128.37 MiB on Publications, and 102.79 MiB on Research. These are file-size inventory totals, not measured browser transfers. Original pages have no lazy-loaded images; videos autoplay. | Optimize oversized portraits, defer offscreen media where appropriate, and evaluate smaller video equivalents for large GIFs. Preserve the visible demonstrations and controls. |

## Maintenance observations

Publication and Research selections intentionally differ, so papers appearing on only one page are not automatically errors. The existing shared records are synchronized, but manually duplicated article markup creates an ongoing maintenance cost. A shared data source could be a later, separately approved refactor; it is unnecessary for this Blog addition.

Archived pages intentionally retain the older fixed-width, table-based design. There are archive-only markup problems, including a stray `s` at `archive/publications.html:94` and unclosed markup around `archive/people.html:238` and `archive/people.html:467`. Any archive cleanup should be separate from changes to the live design.

## Blog addition

- Added `blog.html`, `blog/test/index.html`, and `blog.css`, plus authoring instructions in `BLOGGING.md`.
- Added Blog after Join to each of the six existing navigation menus. These six single-line additions are the only modifications to existing site HTML. Existing `styles.css`, `theme.js`, media, and archives are unchanged.
- The article adapts the reference's centered title and byline, narrow reading column, captioned figures, mathematical discussion, and expandable supporting notes to LeCAR's fonts and color tokens.
- Test includes three numbered display equations, inline math, a feedback diagram, an existing Neural-Fly demo, two expandable notes, and two real paper references with citation backlinks. It is explicitly labeled as placeholder content and marked `noindex`.
- Math uses pinned KaTeX CDN files only on the article. Other pages incur no new math dependency. Equations retain TeX source in the HTML if the CDN cannot load.

## Validation

Checked local links, asset paths, fragment targets, and duplicate IDs across all eight current pages after adding the Blog. Browser checks cover the index-to-post journey, rendered math and accessible math output, light/dark switching and persistence, expandable notes, citation navigation and backlinks, and the new menu's keyboard behavior. Phone checks at 320 and 375 CSS pixels show no page-wide horizontal overflow; long equations have their own horizontal scrolling area. Existing content and design remain unchanged apart from the requested Blog links.

No commit, push, or deployment has been performed.
