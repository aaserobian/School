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
