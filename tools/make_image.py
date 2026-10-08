#!/usr/bin/env python3
"""Turn original photos into small WebP images for the website.

Originals live in originals/ (not published). The results are written to
public/images/cards/ (mode "card") or public/images/hero/ (mode "hero") under
the same name with the ending .webp.

Usage:
    python tools/make_image.py card              all originals -> cards
    python tools/make_image.py card orang1       one original  -> card
    python tools/make_image.py hero river1       one original  -> hero
    python tools/make_image.py card orang1 --force   overwrite an existing image

"hero" always needs an image name. Existing images are skipped unless --force
is given. Setup: pip install Pillow pillow-heif (pillow-heif only for HEIC/HEIF).
"""

import argparse
import io
import sys
from pathlib import Path

try:
    from PIL import Image, ImageCms, ImageOps
except ImportError:
    sys.exit("Pillow is missing. Install it with: pip install Pillow")

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
    HEIF_AVAILABLE = True
except ImportError:
    HEIF_AVAILABLE = False

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS_DIR = ROOT / "originals"

# max_width: wider originals are scaled down, smaller ones are never enlarged.
# Cards are shown about 300-450 px wide, 800 px covers high-density screens.
MODES = {
    "card": {"max_width": 800, "quality": 80, "out_dir": ROOT / "public" / "images" / "cards"},
    "hero": {"max_width": 1920, "quality": 78, "out_dir": ROOT / "public" / "images" / "hero"},
}

INPUT_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"}
HEIF_EXTENSIONS = {".heic", ".heif"}


def find_originals(name):
    """Return the original files for `name`, or all originals if name is None."""
    if not ORIGINALS_DIR.is_dir():
        sys.exit(f"Folder not found: {ORIGINALS_DIR}")

    files = sorted(
        p for p in ORIGINALS_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in INPUT_EXTENSIONS
    )
    if name is None:
        return files

    # Accept "orang1" as well as "orang1.jpg".
    stem = name
    if Path(name).suffix.lower() in INPUT_EXTENSIONS:
        stem = Path(name).stem
    matches = [p for p in files if p.stem.lower() == stem.lower()]
    if not matches:
        sys.exit(f"No original named '{name}' in {ORIGINALS_DIR}")
    return matches


def to_srgb(img):
    """Convert an embedded color profile (e.g. Display P3 from iPhones) to sRGB.

    The profile is not saved in the WebP, so without this the colors would
    look dull in browsers.
    """
    icc = img.info.get("icc_profile")
    if not icc:
        return img
    try:
        source = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        target = ImageCms.createProfile("sRGB")
        mode = "RGBA" if "A" in img.getbands() else "RGB"
        return ImageCms.profileToProfile(img, source, target, outputMode=mode)
    except (ImageCms.PyCMSError, OSError):
        return img


def convert(source, target, max_width, quality):
    """Write `source` as WebP to `target`. Returns (old_size, new_size) in pixels."""
    with Image.open(source) as img:
        img = ImageOps.exif_transpose(img)  # apply camera rotation before resizing
        old_size = img.size
        img = to_srgb(img)
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.getbands() or "transparency" in img.info else "RGB")

        if img.width > max_width:
            height = round(img.height * max_width / img.width)
            img = img.resize((max_width, height), Image.LANCZOS)

        # No exif= or icc_profile= argument: GPS and camera data are not copied.
        img.save(target, "WEBP", quality=quality, method=6)
        return old_size, img.size


def format_bytes(size):
    if size >= 1024 * 1024:
        return f"{size / (1024 * 1024):.1f} MB"
    return f"{size / 1024:.0f} KB"


def main():
    parser = argparse.ArgumentParser(
        description="Create card or hero WebP images from the originals in originals/."
    )
    parser.add_argument("mode", choices=MODES, help="card (small) or hero (large)")
    parser.add_argument("name", nargs="?", help="image name in originals/, with or without ending")
    parser.add_argument("--force", action="store_true", help="overwrite existing images")
    args = parser.parse_args()

    if args.mode == "hero" and not args.name:
        parser.error("mode 'hero' needs an image name, e.g. make_image.py hero river1")

    settings = MODES[args.mode]
    out_dir = settings["out_dir"]
    out_dir.mkdir(parents=True, exist_ok=True)

    originals = find_originals(args.name)
    if not originals:
        sys.exit(f"No images found in {ORIGINALS_DIR}")

    # Two originals with the same name but different endings would collide.
    stems = [p.stem.lower() for p in originals]
    duplicates = sorted({s for s in stems if stems.count(s) > 1})
    if duplicates:
        sys.exit(f"Same name with different endings in originals/: {', '.join(duplicates)}")

    created = skipped = failed = 0
    for source in originals:
        target = out_dir / (source.stem + ".webp")

        if target.exists() and not args.force:
            print(f"skip   {source.stem}: already exists (use --force to overwrite)")
            skipped += 1
            continue

        if source.suffix.lower() in HEIF_EXTENSIONS and not HEIF_AVAILABLE:
            print(f"error  {source.name}: HEIC/HEIF needs pillow-heif: pip install pillow-heif")
            failed += 1
            continue

        try:
            old_size, new_size = convert(source, target, settings["max_width"], settings["quality"])
        except Exception as error:  # a broken file should not stop the whole batch
            target.unlink(missing_ok=True)
            print(f"error  {source.name}: {error}")
            failed += 1
            continue

        print(
            f"ok     {source.stem}: {old_size[0]}x{old_size[1]} -> {new_size[0]}x{new_size[1]}, "
            f"{format_bytes(source.stat().st_size)} -> {format_bytes(target.stat().st_size)}"
        )
        created += 1

    print(f"\n{created} created, {skipped} skipped, {failed} failed")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
