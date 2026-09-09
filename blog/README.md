# Publishing a LeCAR Lab blog post

To publish a post, copy the sample, write your article, add it to the Blog index, and submit a pull request. Posts are **plain HTML**; Markdown files are not automatically converted into blog posts. No build step is needed.

For a typical post, you will change just two things:

- A new folder at `blog/<your-post-name>/`, containing `index.html` and your figures or videos.
- `blog.html`, which lists posts by year.

## 1. Create your post folder

Start from an up-to-date checkout of `main`. Run these commands from the repository root:

```sh
git switch main
git pull --ff-only
git switch -c blog/learning-from-demonstrations
cp -R blog/test blog/learning-from-demonstrations
```

Replace `learning-from-demonstrations` throughout this guide with a short, unique name for your post. Use lowercase letters, numbers, and hyphens, without spaces. This name becomes part of the public URL:

```text
https://lecar-lab.github.io/blog/learning-from-demonstrations/
```

Keep this folder structure so the template's links continue to work:

```text
blog/
  test/                            # Sample to copy; keep it available
    index.html
  learning-from-demonstrations/     # Your new post
    index.html
    results.png
    demo.mp4                       # Optional
```

## 2. Replace the sample content

Open your new `index.html` in a text editor and update the following:

| Item | What to change |
| --- | --- |
| Browser title | Replace `<title>Test — LeCAR Lab Blog</title>` with your title, keeping the `— LeCAR Lab Blog` suffix. |
| Description | Replace the text in `<meta name="description" content="...">` with a short summary of your article. |
| Article title | Replace `Test` inside `<h1 id="post-title">`. |
| Author | Replace the `LeCAR Lab` byline and its link with your name and homepage. Add coauthors as needed. |
| Date | Update both `datetime="2026-09-09"` and the displayed `September 9, 2026` in the `<time>` element. |
| Article body | Replace the content inside `<div class="post-body">`, including the sample text, equations, figures, notes, and references. |
| Placeholder labels | Delete the `<p class="placeholder-note">...</p>` paragraph and the `<span>Placeholder post</span>` label. |
| Search indexing | Remove `<meta name="robots" content="noindex">` before publishing the finished article. |

Keep the shared font, stylesheet, KaTeX, and theme imports; the navigation; and the footers. Keep `id="post-content"` and `id="post-title"`: the template uses them for math rendering and article labeling. The existing classes automatically match the lab's fonts, colors, and dark mode, so normal posts do not require changes to `styles.css`, `blog.css`, or `theme.js`.

Use HTML for the article structure:

```html
<p>Introduce the question and explain why it matters.</p>

<section aria-labelledby="setup">
    <h2 id="setup">The setup</h2>
    <p>Describe the task, assumptions, and experimental setting.</p>
</section>
```

Each `id` must be unique within the page. When copying a section, give its heading a new ID and update the matching `aria-labelledby`. Use `&amp;` for a literal `&` and `&lt;` for a literal `<` in HTML text. Use `&quot;` for quotation marks inside a quoted attribute, such as the meta description's `content="..."`.

## 3. Add equations, figures, and references

Use the examples below as needed. Replace their text, filenames, IDs, and numbering with your own.

### Equations

Use `\( ... \)` for inline math:

```html
<p>The policy \(\pi_\theta(o_t)\) predicts an action from an observation.</p>
```

Use `\[ ... \]` inside the existing equation wrapper for a numbered display equation:

```html
<div class="equation" id="eq-loss">
    <div class="equation-math">\[
        \mathcal{L}(\theta) = \frac{1}{N}\sum_{i=1}^{N}
        \left\|\pi_\theta(o_i)-a_i\right\|_2^2.
    \]</div>
    <a class="equation-number" href="#eq-loss" aria-label="Equation 1">(1)</a>
</div>

<p>We minimize the loss in <a href="#eq-loss">Equation (1)</a>.</p>
```

Equations are numbered manually. Update the number, `aria-label`, ID, and links together. Keep the `.equation-math` wrapper so long equations can scroll on phones. Write LaTeX commands with a single backslash; use `\\` for a line break in an `aligned` environment and `&amp;` for its alignment markers in HTML source.

### Figures and videos

Save post-specific media in your post folder. Use descriptive filenames with matching capitalization; GitHub Pages paths are case-sensitive.

```html
<figure class="post-figure" id="fig-results">
    <img src="results.png"
         alt="Tracking error decreases as the number of demonstrations increases."
         width="960" height="540" loading="lazy" decoding="async">
    <figcaption><strong>Figure 1.</strong> Explain what the reader should notice.</figcaption>
</figure>
```

Set `width` and `height` to the image's actual dimensions. Write useful alt text and a caption. Compress large images and check that plot labels remain legible on a phone. Use `loading="lazy"` for images below the first screen.

For a video, replace the image element with:

```html
<video controls playsinline preload="metadata" aria-label="Robot demonstration">
    <source src="demo.mp4" type="video/mp4">
    <a href="demo.mp4">Download the demonstration video.</a>
</video>
```

Provide a caption describing the demonstration. For narrated videos, include captions or a transcript. Prefer a compact MP4 over a large animated GIF.

Links inside your post are relative to its folder:

| Destination | Example path |
| --- | --- |
| A figure in your post folder | `results.png` |
| The Blog index | `../../blog.html` |
| The Publications page | `../../publications.html` |
| Another blog post | `../another-post/` |

### Expandable notes

Use these for optional derivations, implementation details, or additional discussion:

```html
<details class="post-aside">
    <summary>How was the policy trained?</summary>
    <p>Add the supporting explanation here.</p>
</details>
```

### Citations

Add a numbered citation in the text:

```html
<p>This issue is discussed in prior work
    <a class="citation" id="cite-ross2011" href="#ref-ross2011"
       role="doc-biblioref" aria-label="Reference 1">[1]</a>.</p>
```

Replace the sample References section at the end of the article with your own entries. Preserve the section, heading, and list wrapper:

```html
<section aria-labelledby="references" role="doc-bibliography">
    <h2 id="references">References</h2>
    <ol class="references">
        <li id="ref-ross2011">
            Stéphane Ross, Geoffrey Gordon, and Drew Bagnell.
            <a href="https://proceedings.mlr.press/v15/ross11a.html">A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning.</a>
            AISTATS, 2011.
            <a href="#cite-ross2011" aria-label="Back to citation 1">↩</a>
        </li>
    </ol>
</section>
```

Number references in order of first appearance. Numbers and backlinks are maintained manually. Repeated citations can link to the same reference; omit the `id` on repeated citations so the page has no duplicate IDs. The return arrow links back to the first citation.

## 4. Add the post to the Blog index

Open `blog.html` and add an entry at the top of the correct year section, keeping posts newest first. For example:

```html
<article class="post-preview">
    <h3><a href="blog/learning-from-demonstrations/">Learning from Demonstrations</a></h3>
    <p class="post-meta">
        <span><time datetime="2026-09-09">September 9, 2026</time></span>
        <span>Your Name</span>
    </p>
    <p>A short summary explaining what readers will learn.</p>
    <p><a href="blog/learning-from-demonstrations/" aria-label="Read Learning from Demonstrations">Read post <span aria-hidden="true">→</span></a></p>
</article>
```

Update **both post links**, the title, `aria-label`, date, author, and summary. Match the title, date, and authors to the article itself.

If the year does not exist yet, create a new section above the older years. Use the new year consistently in `aria-labelledby`, the heading ID, and the heading text:

```html
<section aria-labelledby="year-2027">
    <h2 id="year-2027">2027</h2>
    <!-- Put the new post entry here. -->
</section>
```

## 5. Preview and check

From the repository root, start a local server:

```sh
python3 -m http.server 8777 --bind 127.0.0.1
```

Open both pages in your browser:

- [Blog index](http://127.0.0.1:8777/blog.html)
- [Your example post](http://127.0.0.1:8777/blog/learning-from-demonstrations/)

Refresh after editing. If an old version remains visible, use a hard refresh. If port 8777 is already in use, choose another port and update the URLs. Stop the server with **Ctrl+C** when finished. Math rendering needs an internet connection to load KaTeX.

Before submitting:

- [ ] The title, authors, date, and summary are correct on both pages.
- [ ] Sample content and placeholder labels are removed, and the finished post has no `noindex` tag.
- [ ] Equations render correctly, and equation/figure/reference numbers match their links.
- [ ] Figures and videos load, captions are informative, and plot labels are readable.
- [ ] Citation links, reference backlinks, external links, and “All posts” links work.
- [ ] The post reads well in light and dark mode and in a narrow browser window.
- [ ] The mobile menu works with click/tap and with **Tab → Space**.

## 6. Submit for publication

Stage your post folder and the index, inspect the staged changes, then commit and push your branch:

```sh
git add blog/learning-from-demonstrations/ blog.html
git diff --cached --stat
git diff --cached
git commit -m "Add Learning from Demonstrations blog post"
git push -u origin blog/learning-from-demonstrations
```

Open a pull request to `main` in [LeCAR-Lab/LeCAR-Lab.github.io](https://github.com/LeCAR-Lab/LeCAR-Lab.github.io). Include the post title, a short description, and a screenshot of the preview. Mention that you checked the items above. If you do not have write access, push your branch to your fork and open the pull request from there.

A maintainer can review and merge the post, then follow the site's existing GitHub Pages deployment process. Once deployment finishes, check the [live Blog index](https://lecar-lab.github.io/blog.html) and your post's public URL to confirm that the post and its media load correctly.
