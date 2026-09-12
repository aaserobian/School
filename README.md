# Trunk Anatomy & Embryology — interactive study guide

An interactive study app covering all 32 learning objectives from the five lecture decks on
trunk anatomy, human embryology and birth defects.

**Open it:** <https://claude.ai/code/artifact/a2b99cd0-6b15-4d7b-a914-4d25de411b52>

Progress follows you between devices, so you can read on a laptop and drill the same weak spots
on a phone.

## What's in it

Five ways to work, all organised around the objectives:

- **Learn** — every objective with its lecture figures, the distilled facts, the exam trap and
  the must-remember line.
- **Flashcards** — 81 cards on a five-box Leitner schedule, so weaker cards come round sooner.
- **Quiz** — 129 questions, scoped by module, by high-yield, or to just your weak spots. Exam
  mode holds the explanations back until the end.
- **Recall** — write what you remember about an objective from scratch and have it marked
  against the lecture facts.
- **Progress** — a mastery map across all 32 objectives, with accuracy and weak spots.

## Where the content comes from

Everything traces to a source file in `source/`. Nothing is invented.

The five lecture decks each state their own objectives (4 + 6 + 10 + 6 + 6 = 32), and those are
the spine of the app. The high-yield quiz guide condenses them to 16 and drops several real
objectives — ectopic pregnancy, yolk sac formation, uteroplacental circulation, the prechordal
plate, head and limb musculature, and the origin of the skeletal system. All 32 are covered here,
and the ones the guide does cover are flagged **high yield** so you know what to hit first. The
guide's own five practice questions are kept verbatim and labelled as its own.

The figures are the real plates from the lectures, filed under the objective each one
illustrates — never stock or redrawn art. Slides whose figures serve no objective (corpus luteum,
corpus albicans, Zika, Fragile X, the hormone plates) are deliberately left out.

## Just the objectives

`objectives.html` is the syllabus and nothing else: the 32 objectives as a tickable
checklist, grouped by module, with a high-yield filter and a print stylesheet. 16 KB, so
it opens instantly on a phone. Generated from the same `src/content.js` with
`node tools/build_objectives.js`, so it cannot drift from the full guide.

Unlike the main guide it declares no capabilities, which means it *can* be shared
publicly from its own share menu.

## Sharing it with someone else

`share/Trunk-Anatomy-and-Embryology-Study-Guide.html` is a standalone copy — send it by
email, WhatsApp or Drive and they open it by double-clicking. Everything is inside the one
file: all 46 figures, 129 questions and 81 cards. It needs no account and no internet after
it lands, and each person's progress saves in their own browser.

The only thing it cannot do is the AI tutor, which needs Claude's runtime; those buttons say
so rather than failing. Regenerate it with
`python3 tools/build.py --standalone <path>`.

Note the published Artifact link is *not* shareable this way: declaring the `db` capability
makes an artifact organization-internal by platform rule.

## Rebuilding

`study-guide.html` is generated — edit the files in `src/`, not the built page.

```sh
pip install cffi pymupdf pillow      # cffi first: the system cryptography build is broken
python3 tools/extract_figures.py     # source/*.pdf  ->  src/figures.json
python3 tools/build.py               # src/*         ->  study-guide.html
```

`tools/build.py --preview /tmp/preview.html` also writes a standalone document you can open in a
local browser. The build refuses to run if a question, card or figure points at an objective that
doesn't exist.

To change which figures appear, edit `MANIFEST` in `tools/extract_figures.py`: it maps each
(module, slide) to the objective and caption for each figure on that slide, and one plate can
serve several objectives.

## Layout

```
source/              the high-yield guide and the five lecture decks
src/content.js       32 objectives, 129 questions, 81 cards, the timeline
src/app.css          styling
src/app.js           the app
src/figures.json     extracted figures, generated
tools/               the extraction and build scripts
study-guide.html     the built single-file app, generated
```

## Working on this repo with Claude Code

`.mcp.json` gives Claude Code two extra tools whenever it opens this repo:

- **Playwright** — a headless browser, so Claude can open `study-guide.html` or
  `objectives.html`, click through them and take screenshots. It is started by
  `tools/playwright-mcp.sh`, which uses the Chromium pre-installed in Claude Code on the
  web when present and your own Google Chrome otherwise.
- **21st.dev** — the 21st component and UI MCP. It needs an API key from
  <https://21st.dev/mcp> in the `API_KEY_21ST` environment variable; without one the
  server just shows as unavailable.
