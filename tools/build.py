#!/usr/bin/env python3
"""Assemble study-guide.html from the pieces in src/.

The published page is one self-contained file: the CSS, the content, the extracted
lecture figures and the app all inlined, because an Artifact can't load images or
stylesheets from anywhere but a short CDN allowlist.

    python3 tools/extract_figures.py     # first, to build src/figures.json
    python3 tools/build.py

`--preview` additionally writes a full HTML document to the given path for opening
in a local browser; the published file is a fragment, since the Artifact host
supplies the doctype, head and body around it.
"""

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = ROOT / "study-guide.html"

TITLE = "Trunk Anatomy &amp; Embryology"

FONTS = (
    "https://fonts.googleapis.com/css2?"
    "family=IBM+Plex+Mono:wght@500&"
    "family=IBM+Plex+Sans:wght@400;500;600&"
    "family=Newsreader:ital,opsz,wght@0,6..72,600;1,6..72,400&display=swap"
)

SHELL = """<div class="app">
  <aside class="rail">
    <div class="brand">
      <h1>Trunk Anatomy &amp; Embryology</h1>
      <span class="label"><span id="total-objectives">32</span> learning objectives</span>
    </div>
    <nav class="nav" id="nav"></nav>
    <div class="rail-stat">
      <div class="big" id="known-count">0 / 32</div>
      <span class="label">objectives known</span>
      <div class="sync" id="sync"></div>
    </div>
  </aside>
  <main class="main" id="main"></main>
</div>
<nav class="tabs" id="tabs" aria-label="Study modes"></nav>"""


def check_content(content_js, figures):
    """Guard the two things that would quietly teach the wrong thing: a question
    pointing at an objective that doesn't exist, and an answer index out of range."""
    objective_ids = set(re.findall(r"id:\s*'(m\d-\d+)'", content_js))
    problems = []

    if len(objective_ids) != 32:
        problems.append(f"expected 32 objectives, parsed {len(objective_ids)}")

    for lo in set(re.findall(r"\{\s*lo:\s*'([^']+)'", content_js)):
        if lo not in objective_ids:
            problems.append(f"question or card points at unknown objective {lo}")

    for placement in figures["placements"]:
        if placement["objective"] not in objective_ids:
            problems.append(f"figure points at unknown objective {placement['objective']}")
        if placement["image"] not in figures["images"]:
            problems.append(f"placement references missing image {placement['image']}")

    return problems


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--preview", help="also write a standalone document here")
    args = parser.parse_args()

    for name in ("app.css", "content.js", "app.js", "figures.json"):
        if not (SRC / name).exists():
            sys.exit(f"missing {SRC / name}. Run tools/extract_figures.py first.")

    css = (SRC / "app.css").read_text()
    content_js = (SRC / "content.js").read_text()
    app_js = (SRC / "app.js").read_text()
    figures = json.loads((SRC / "figures.json").read_text())

    problems = check_content(content_js, figures)
    if problems:
        for problem in problems:
            print("  ! " + problem, file=sys.stderr)
        sys.exit("content check failed")

    # `</script>` inside a string would close the tag early; nothing else needs escaping.
    figures_js = "const FIGURES = " + json.dumps(figures, separators=(",", ":")).replace(
        "</", "<\\/"
    ) + ";"

    page = "\n".join([
        f"<title>{TITLE}</title>",
        f'<link rel="stylesheet" href="{FONTS}">',
        "<style>",
        css.strip(),
        "</style>",
        SHELL,
        "<script>",
        figures_js,
        content_js.strip(),
        app_js.strip(),
        "</script>",
        "",
    ])

    OUT.write_text(page)
    size = len(page.encode())
    print(f"{OUT.relative_to(ROOT)}  {size // 1024} KB  "
          f"({len(figures['images'])} figures, {len(figures['placements'])} placements)")
    if size > 15_000_000:
        print("  ! close to the 16 MB artifact limit", file=sys.stderr)

    if args.preview:
        path = pathlib.Path(args.preview)
        path.write_text(
            '<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            "<style>:root{color-scheme:light dark}body{margin:0;font:14px system-ui}"
            "img{max-width:100%}[hidden]{display:none!important}</style>"
            f"</head><body>{page}</body></html>"
        )
        print(f"preview -> {path}")


if __name__ == "__main__":
    main()
