#!/usr/bin/env python3
"""Pull the lecture figures that serve a learning objective out of the source decks.

The study app shows real figures from the lectures, never stock or redrawn art. This
script walks the five decks in source/, keeps only the images named in MANIFEST below,
downscales them, and writes src/figures.json with inline data URIs.

Selection is by learning objective, not by looks: a slide's figure is kept because an
LO needs it. That is why the corpus luteum, corpus albicans, Zika, Fragile X, Dilantin
and hormone plates are absent — no objective covers them.

    pip install pymupdf     (needs cffi first; the system cryptography build is broken)
    python3 tools/extract_figures.py
"""

import base64
import hashlib
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
SOURCE = ROOT / "source"
OUT = ROOT / "src" / "figures.json"

MAX_WIDTH = 900
JPEG_QUALITY = 78

# Decks keyed by module id.
DECKS = {
    "m1": "01-anatomical-terminology-of-trunk.pdf",
    "m2": "02-first-week-of-development.pdf",
    "m3": "03-second-to-eighth-week.pdf",
    "m4": "04-musculoskeletal-system.pdf",
    "m5": "05-human-birth-defects.pdf",
}

# (module, slide) -> one slot per figure on that slide, in the order PyMuPDF reports them.
# A slot is a list of (objective id, caption): usually one, but a plate labelled for more
# than one objective earns a place under each, and an empty list skips a figure entirely.
# Captions describe what the plate actually shows, which is not always what the slide is
# titled — several decks reuse a figure under a heading it does not illustrate.
MANIFEST = {
    ("m1", 7): [[("m1-4", "The anatomical planes through the trunk")]],
    ("m1", 8): [[("m1-4", "Body cavities: dorsal and ventral, split by the diaphragm")]],

    ("m2", 4): [[("m2-2", "Ovulation — the oocyte leaving the mature follicle")]],
    ("m2", 16): [[], [("m2-3", "The three phases of fertilization")]],
    ("m2", 18): [[("m2-3", "The moment the sperm enters: cortical reaction and pronuclei")]],
    ("m2", 19): [[("m2-4", "The results of fertilization")]],
    ("m2", 21): [[], [("m2-5", "Cleavage through compaction to the 16-cell morula")]],
    ("m2", 22): [[("m2-1", "Implantation of the blastocyst in the endometrium")]],
    ("m2", 23): [[("m2-1", "First week summary: ovulation through implantation")]],
    ("m2", 24): [[("m2-6", "Abnormal sites of fertilization — ectopic pregnancy")]],

    # One week-two plate is labelled with epiblast, hypoblast, the amniotic cavity and
    # both trophoblast layers, so the deck repeats it across slides 6-8. It earns a place
    # under each objective it labels.
    ("m3", 6): [[("m3-2", "The embryoblast splits into epiblast and hypoblast")]],
    ("m3", 7): [[("m3-3", "The amniotic cavity above the epiblast, and the yolk sac below")]],
    ("m3", 8): [[], [("m3-1", "Cytotrophoblast within, syncytiotrophoblast without")]],
    ("m3", 9): [[("m3-4", "Lacunae in the syncytiotrophoblast, and the primary villi")]],
    ("m3", 10): [[("m3-4", "Secondary yolk sac and chorionic cavity at the end of week two")]],
    ("m3", 11): [[("m3-3", "The blastocyst fully embedded by the end of week two")]],
    ("m3", 12): [[("m3-5", "The primitive streak and primitive node on the epiblast"),
                  ("m3-7", "Prechordal plate and cloacal membrane on the bilaminar disc")]],
    ("m3", 13): [[("m3-5", "Gastrulation — epiblast cells invaginate at the streak")]],
    ("m3", 14): [[("m3-5", "A persistent primitive streak gives a sacrococcygeal teratoma")]],
    ("m3", 15): [[("m3-6", "Formation of the notochord from the primitive pit")]],
    ("m3", 16): [[("m3-6", "The notochord in sections through the early embryo"),
                  ("m3-7", "The cloacal membrane and neurenteric canal")]],
    ("m3", 17): [[("m3-9", "Neurulation — neural plate to neural groove to neural tube")]],
    ("m3", 18): [[("m3-9", "Neural crest cells migrating from the neural folds")]],
    ("m3", 19): [[("m3-10", "Paraxial, intermediate and lateral plate mesoderm")]],
    ("m3", 20): [[("m3-10", "Somites, and the sclerotome, myotome and dermatome")]],
    ("m3", 23): [[("m3-8", "Derivatives of the three germ layers")]],
    ("m3", 28): [[("m3-8", "The endoderm-lined primitive gut forming as the embryo folds")],
                 [("m3-8", "The gut tube in cross section, slung from the body wall")]],
    ("m3", 29): [[("m3-8", "Foregut, midgut and hindgut")]],

    ("m4", 3): [[("m4-1", "Germ layer derivatives, including the muscle lineages")]],
    ("m4", 4): [[("m4-1", "Somites appearing in craniocaudal sequence, days 20–28")]],
    ("m4", 5): [[("m4-2", "Somite to sclerotome, dermatome and myotome")]],
    ("m4", 6): [[("m4-3", "Epimere with its dorsal ramus, hypomere with its ventral ramus")]],
    ("m4", 7): [[("m4-5", "Origin of the head and limb musculature")]],
    ("m4", 8): [[]],  # the deck repeats the somite plate here; it does not show smooth muscle
    ("m4", 9): [[("m4-1", "Cardiac muscle from the splanchnic mesoderm around the heart tube")]],
    ("m4", 11): [[("m4-6", "Development of the skeletal system from mesenchyme")]],

    ("m5", 6): [[("m5-1", "What causes congenital malformations")]],
    ("m5", 8): [[("m5-4", "Risk of birth defects across gestation")]],
    ("m5", 9): [[("m5-4", "Critical periods: weeks 3–8 are the highly sensitive window")]],
    ("m5", 12): [[("m5-5", "Nondisjunction during meiosis")]],
    ("m5", 13): [[("m5-5", "Klinefelter syndrome (47,XXY)")], []],
    ("m5", 14): [[("m5-5", "Turner syndrome (45,X)")]],
    ("m5", 16): [[("m5-5", "Structural abnormality — translocation or deletion")]],
    ("m5", 17): [[("m5-5", "Cri-du-chat — terminal deletion of chromosome 5p")]],
    ("m5", 19): [[("m5-6", "Achondroplasia, a dominantly inherited single gene mutation")]],
    ("m5", 23): [[("m5-3", "Rubella — bilateral cataracts")]],
    ("m5", 25): [[("m5-3", "Thalidomide — amelia, meromelia and phocomelia")]],
    ("m5", 26): [[("m5-3", "Fetal alcohol syndrome — indistinct philtrum, thin upper lip")]],
}


def usable(width, height):
    """Skip the template banners and rails that pad every slide."""
    if width < 200 or height < 200:
        return False
    ratio = width / height
    return 0.25 < ratio < 4


def encode(doc, xref, smask_xref):
    """Flatten onto white, downscale to MAX_WIDTH, return a JPEG data URI.

    These plates are line art on a white ground, so a transparent background has to
    become white — compositing onto black would bury the labels.
    """
    pix = pymupdf.Pixmap(doc, xref)
    if smask_xref and not pix.alpha:
        try:
            pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(doc, smask_xref))
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
        height = round(img.height * MAX_WIDTH / img.width)
        img = img.resize((MAX_WIDTH, height), Image.LANCZOS)

    buffer = io.BytesIO()
    img.save(buffer, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    uri = "data:image/jpeg;base64," + base64.b64encode(buffer.getvalue()).decode()
    return uri, img.width, img.height


def main():
    # Images are stored once and referenced by placements, because a single plate can
    # serve several objectives — the week-two disc is labelled with epiblast, hypoblast,
    # the amniotic cavity and both trophoblast layers, so it earns a place under three.
    images = {}
    placements = []
    seen = {}
    wanted = set(MANIFEST)

    for module, filename in DECKS.items():
        path = SOURCE / filename
        if not path.exists():
            sys.exit(f"missing deck: {path}")
        doc = pymupdf.open(path)
        for page_no in range(len(doc)):
            key = (module, page_no + 1)
            if key not in MANIFEST:
                continue
            wanted.discard(key)
            slots = MANIFEST[key]
            on_slide = [i for i in doc[page_no].get_images(full=True) if usable(i[2], i[3])]
            if len(on_slide) != len(slots):
                print(f"  ! {module} slide {page_no+1}: manifest lists {len(slots)} "
                      f"figure(s), deck has {len(on_slide)}", file=sys.stderr)
            for slot, info in zip(slots, on_slide):
                if not slot:
                    continue
                uri, width, height = encode(doc, info[0], info[1])
                digest = hashlib.md5(uri.encode()).hexdigest()[:10]
                if digest not in seen:
                    seen[digest] = f"{module}s{page_no+1}"
                    images[digest] = {"w": width, "h": height, "src": uri}
                for objective, caption in slot:
                    placements.append({
                        "objective": objective,
                        "caption": caption,
                        "module": module,
                        "slide": page_no + 1,
                        "image": digest,
                    })
        doc.close()

    if wanted:
        print(f"  ! manifest entries never matched a slide: {sorted(wanted)}", file=sys.stderr)

    duplicated = len(placements) - len(images)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"images": images, "placements": placements}, indent=1))

    total = sum(len(i["src"]) for i in images.values())
    print(f"{len(placements)} placements over {len(images)} unique images "
          f"({duplicated} shared) -> {OUT.relative_to(ROOT)}, {total // 1024} KB")
    by_module = {}
    for placement in placements:
        by_module[placement["module"]] = by_module.get(placement["module"], 0) + 1
    for module in sorted(by_module):
        print(f"  {module}: {by_module[module]} placements")


if __name__ == "__main__":
    main()
