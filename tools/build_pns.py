#!/usr/bin/env python3
"""Build the Peripheral Nervous System study set from the Module 2 lecture deck.

The set is two things: Learn, which asks multiple-choice rounds and repeats a card until it
sticks, and Practice questions, which are multiple choice and true/false, scored, with the
misses to review. Every answer shows the lecture figure that goes with it.

    pns/cards.json                            the cards, sections and figure manifest (edit this)
    pns/study.html                            the page: title, styles, markup and script
    source/06-peripheral-nervous-system.pdf   the deck the figures are lifted from

    share/Peripheral-Nervous-System-Study-Set.html   standalone page, figures embedded

    pip install pymupdf pillow     (needs cffi first; the system cryptography build is broken)
    python3 tools/build_pns.py
    python3 tools/build_pns.py --fragment /tmp/pns.html    # the page without a document skeleton
"""

import argparse
import base64
import io
import json
import pathlib
import sys

try:
    import pymupdf
    from PIL import Image
except ImportError:
    sys.exit("dependencies missing. Run: pip install cffi pymupdf pillow")

ROOT = pathlib.Path(__file__).resolve().parent.parent
CARDS = ROOT / "pns" / "cards.json"
PAGE = ROOT / "pns" / "study.html"
OUT = ROOT / "share" / "Peripheral-Nervous-System-Study-Set.html"

MAX_WIDTH = 1100
JPEG_QUALITY = 88
PLACEHOLDER = "__DECK_JSON__"

# What a published page is wrapped in. The standalone file gets the same skeleton, so the
# page looks identical whether it is opened from disk or from a link.
SKELETON = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
:root{{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}}
body{{margin:0;font:14px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fafaf8;color:#1a1a1a}}
img{{max-width:100%}}
[hidden]{{display:none!important}}
</style>
</head>
<body>
{page}
</body>
</html>
"""


def usable(width, height):
    """Skip the template banners and rails that pad every slide (same rule as
    extract_figures.py)."""
    if width < 200 or height < 200:
        return False
    return 0.25 < width / height < 4


def load_deck():
    deck = json.loads(CARDS.read_text())
    sections = {s["id"] for s in deck["sections"]}
    figures = deck["figures"]
    seen_ids, seen_terms = set(), set()
    for card in deck["cards"]:
        where = f"card {card['id']!r}"
        if card["id"] in seen_ids:
            sys.exit(f"{where}: duplicate id")
        seen_ids.add(card["id"])
        if card["t"] in seen_terms:
            sys.exit(f"{where}: duplicate term {card['t']!r}")
        seen_terms.add(card["t"])
        if card["s"] not in sections:
            sys.exit(f"{where}: unknown section {card['s']!r}")
        if card.get("img") and card["img"] not in figures:
            sys.exit(f"{where}: unknown figure {card['img']!r}")
        if card["src"] not in ("notes", "slides"):
            sys.exit(f"{where}: src must be 'notes' or 'slides'")
        for key in ("t", "d"):
            text = card[key]
            if not text or text != text.strip() or any(ch in text for ch in "\t\n\r"):
                sys.exit(f"{where}: {key!r} is empty or has a tab, newline or stray space")
    unused = set(figures) - {c["img"] for c in deck["cards"] if c.get("img")}
    if unused:
        print(f"  ! figures no card uses: {sorted(unused)}", file=sys.stderr)
    return deck


def figure_jpeg(doc, slide, n):
    """The nth usable image on a slide, as JPEG bytes.

    Every plate in this deck is already a JPEG, so it is copied byte for byte rather than
    re-encoded. Only images wider than MAX_WIDTH are downscaled.
    """
    page = doc[slide - 1]
    found = [i for i in page.get_images(full=True) if usable(i[2], i[3])]
    if n >= len(found):
        sys.exit(f"slide {slide} has {len(found)} usable image(s); a figure asks for #{n}")
    xref, smask, width, height = found[n][0], found[n][1], found[n][2], found[n][3]
    raw = doc.extract_image(xref)
    if raw["ext"] == "jpeg" and raw.get("colorspace") == 3 and width <= MAX_WIDTH and not smask:
        return raw["image"], width, height

    pix = pymupdf.Pixmap(doc, xref)
    if smask and not pix.alpha:
        try:
            pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(doc, smask))
        except Exception:
            pass  # mismatched mask; the unmasked image is still usable
    if pix.colorspace is not None and pix.colorspace.n == 4:  # CMYK
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    channels = pix.n - pix.alpha
    mode = {1: "LA" if pix.alpha else "L", 3: "RGBA" if pix.alpha else "RGB"}[channels]
    img = Image.frombytes(mode, (pix.width, pix.height), pix.samples)
    if img.mode in ("RGBA", "LA"):
        img = img.convert("RGBA")
        white = Image.new("RGB", img.size, (255, 255, 255))
        white.paste(img, mask=img.split()[-1])
        img = white
    img = img.convert("RGB")
    if img.width > MAX_WIDTH:
        img = img.resize((MAX_WIDTH, round(img.height * MAX_WIDTH / img.width)), Image.LANCZOS)
    buffer = io.BytesIO()
    img.save(buffer, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return buffer.getvalue(), img.width, img.height


def embed_figures(deck):
    """Add each figure's size and data URI, for only the figures a card uses."""
    pdf = ROOT / deck["deck"]
    if not pdf.exists():
        sys.exit(f"missing deck: {pdf}")
    doc = pymupdf.open(pdf)
    total = 0
    for fig in deck["figures"].values():
        data, width, height = figure_jpeg(doc, fig["slide"], fig["n"])
        fig["w"], fig["h"] = width, height
        fig["src"] = "data:image/jpeg;base64," + base64.b64encode(data).decode()
        total += len(data)
    doc.close()
    return total


def build_page(deck):
    template = PAGE.read_text(encoding="utf-8")
    if template.count(PLACEHOLDER) != 1:
        sys.exit(f"{PAGE.name} must contain {PLACEHOLDER} exactly once")
    payload = {
        "title": deck["title"],
        "module": deck["module"],
        "references": deck["references"],
        "sections": deck["sections"],
        "figures": {
            fig_id: {k: fig[k] for k in ("slide", "title", "alt", "w", "h", "src")}
            for fig_id, fig in deck["figures"].items()
        },
        "cards": [
            {k: card[k] for k in ("id", "s", "t", "d", "img", "src", "slide") if k in card}
            for card in deck["cards"]
        ],
    }
    # "</" inside a JSON script block would end it early.
    blob = json.dumps(payload, separators=(",", ":")).replace("</", "<\\/")
    return template.replace(PLACEHOLDER, blob)


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--fragment", metavar="PATH",
                        help="also write the page without the document skeleton (for publishing)")
    args = parser.parse_args()

    deck = load_deck()
    figures_bytes = embed_figures(deck)
    page = build_page(deck)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(SKELETON.format(page=page), encoding="utf-8")
    if args.fragment:
        pathlib.Path(args.fragment).write_text(page, encoding="utf-8")

    cards = deck["cards"]
    print(f"{len(cards)} cards ({sum(c['src'] == 'notes' for c in cards)} from the notes, "
          f"{sum(c['src'] == 'slides' for c in cards)} from the slides), "
          f"{sum(1 for c in cards if c.get('img'))} with a figure")
    print(f"{len(deck['figures'])} figures, {figures_bytes // 1024} KB of images")
    print(f"-> {OUT.relative_to(ROOT)}, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
