"""
ARCADA — Gemini Batch Room Image Generator  v2.0
=================================================
Generates AI room preview images for all 70 tile variants × 4 rooms.

Automatically reads each tile's real dimensions (10x30, 15x30, 20x20)
from the text printed in the product image using OCR, then builds a
precise prompt for Gemini so tiles are rendered at the correct scale.

HOW TO RUN:
  Windows:
    1. Open terminal (CMD or PowerShell) in the project root folder
    2. pip install Pillow pytesseract
    3. Also install Tesseract OCR engine:
       → Download from: https://github.com/UB-Mannheim/tesseract/wiki
       → Install it (default path is fine)
    4. set GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
    5. python generate-previews.py

  Mac/Linux:
    1. pip install Pillow pytesseract
    2. brew install tesseract    (Mac)
       sudo apt install tesseract-ocr  (Linux)
    3. export GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
    4. python3 generate-previews.py

OUTPUT:
  public/previews/bathroom/atelier-pb-miel.jpg
  public/previews/bathroom/silos-terracota.jpg
  public/previews/living-room/atelier-pb-miel.jpg
  public/previews/bedroom/atelier-pb-miel.jpg
  ... (70 variants × 4 rooms = 280 images)

RESUME SUPPORT:
  If the script stops for any reason, just re-run it.
  It reads generate-previews-progress.json and skips already-done images.

ADDING A NEW ROOM LATER:
  Add an entry to the ROOMS dict below, place the image in public/rooms/,
  then re-run. Only the new room's images will be generated.
"""

import os
import sys
import re
import time
import base64
import json
import io
from pathlib import Path

# ─── CONFIGURATION ────────────────────────────────────────────────────────────

# Your Gemini API key.
# Best practice: set it as an environment variable in your terminal:
#   Windows : set GEMINI_API_KEY=AIzaSy...
#   Mac/Linux: export GEMINI_API_KEY=AIzaSy...
# Or paste directly below (but don't commit this file to git with the key in it)
API_KEY = os.environ.get("GEMINI_API_KEY", "PASTE_YOUR_KEY_HERE")

# Tile product images folder
TILES_DIR = Path("public/products")

# Output folder (created automatically)
OUTPUT_DIR = Path("public/previews")

# ─── ROOM DEFINITIONS ─────────────────────────────────────────────────────────
# For each room:
#   image            → path to the room photo
#   wall_zone        → plain-English description of which surface to tile
#   original_surface → what's currently on that surface (helps Gemini understand)
#
# Update wall_zone if you change room photos.

ROOMS = {
    "bathroom": {
        "image": "public/rooms/bathroom.jpg",
        "wall_zone": "the entire main wall — the large wall surface currently covered with chevron/herringbone-pattern tiles, filling from floor to ceiling and from left edge to right edge",
        "original_surface": "chevron herringbone ceramic wall tiles in a beige/taupe color",
    },
    "living-room": {
        "image": "public/rooms/living-room.jpg",
        "wall_zone": "the entire back wall — the large brick wall behind the TV and furniture, from floor to ceiling edge-to-edge",
        "original_surface": "exposed red brick wall",
    },
    "kitchen": {
        "image": "public/rooms/kitchen.jpg",
        "wall_zone": "the entire tiled wall surface — all the wall area currently covered with blue-and-white patterned tiles, from the countertop up to the top of the tiled zone, edge to edge",
        "original_surface": "blue and white decorative patterned ceramic tiles",
    },
    "bedroom": {
        "image": "public/rooms/bedroom.jpg",
        "wall_zone": "the central feature wall panel behind the bed — the rectangular wall section currently covered with geometric patterned tiles, situated between the two plain marble side panels, filling the full height of the tiled area",
        "original_surface": "geometric patterned decorative ceramic tiles in grey, white, and multicolor",
    },
}

# Files to skip — category overview images, not individual product variants
SKIP_FILES = {
    "ARC-ATL-CAT.jpg",
    "ARC-CHI-CAT.jpg",
    "ARC-DUC-CAT.jpg",
    "ARC-GON-CAT.jpg",
    "ARC-LEA-CAT.jpg",
}

# Map each product image filename → variant ID used in the website's catalogue.ts
FILENAME_TO_VARIANT_ID = {
    # ATELIER
    "ARC-ATL-001.jpg": "atelier-pb-miel",
    "ARC-ATL-002.jpg": "atelier-ec-blanc",
    "ARC-ATL-003.jpg": "atelier-pb-vert",
    "ARC-ATL-004.jpg": "atelier-pb-bleu",
    "ARC-ATL-005.jpg": "atelier-mtl-gold",
    "ARC-ATL-006.jpg": "atelier-mtl-rose-gold",
    "ARC-ATL-007.jpg": "atelier-mtl-silver",
    "ARC-ATL-008.jpg": "atelier-mtl-bleu-petrole",
    "ARC-ATL-009.jpg": "atelier-ird-rose",
    "ARC-ATL-010.jpg": "atelier-ird-bleu",
    "ARC-ATL-011.jpg": "atelier-floral-3",
    "ARC-ATL-012.jpg": "atelier-floral-4",
    # SILOS
    "ARC-SIL-001.jpg": "silos-terracota",
    "ARC-SIL-002.jpg": "silos-beige",
    "ARC-SIL-003.jpg": "silos-dec-natura-beige",
    "ARC-SIL-004.jpg": "silos-dec-jamaica-beige",
    "ARC-SIL-005.jpg": "silos-dec-celestina-beige",
    "ARC-SIL-006.jpg": "silos-antracita",
    "ARC-SIL-007.jpg": "silos-gris",
    "ARC-SIL-008.jpg": "silos-dec-natura-gris",
    "ARC-SIL-009.jpg": "silos-dec-jamaica-gris",
    "ARC-SIL-010.jpg": "silos-dec-celestina-gris",
    "ARC-SIL-011.jpg": "silos-dec-gold",
    "ARC-SIL-012.jpg": "silos-dec-beige",
    "ARC-SIL-013.jpg": "silos-dec-mix-beige",
    "ARC-SIL-014.jpg": "silos-dec-silver",
    "ARC-SIL-015.jpg": "silos-dec-gris",
    "ARC-SIL-016.jpg": "silos-dec-mix-gris",
    # DUCAL
    "ARC-DUC-001.jpg": "ducal-terracota",
    "ARC-DUC-002.jpg": "ducal-beige",
    "ARC-DUC-003.jpg": "ducal-dec-tucan",
    "ARC-DUC-004.jpg": "ducal-dec-jamaica",
    "ARC-DUC-005.jpg": "ducal-antracita",
    "ARC-DUC-006.jpg": "ducal-gris",
    "ARC-DUC-007.jpg": "ducal-dec-celestina",
    "ARC-DUC-008.jpg": "ducal-dec-gold",
    "ARC-DUC-009.jpg": "ducal-dec-beige",
    "ARC-DUC-010.jpg": "ducal-dec-silver",
    "ARC-DUC-011.jpg": "ducal-dec-gris",
    # LEAF
    "ARC-LEA-001.jpg": "leaf-pb-bleu",
    "ARC-LEA-002.jpg": "leaf-pb-miel",
    "ARC-LEA-003.jpg": "leaf-pb-vert",
    "ARC-LEA-004.jpg": "leaf-ec-blanc",
    "ARC-LEA-005.jpg": "leaf-mtl-rose-gold",
    "ARC-LEA-006.jpg": "leaf-mtl-mauve",
    "ARC-LEA-007.jpg": "leaf-mtl-bleu-petrole",
    "ARC-LEA-008.jpg": "leaf-floral-1",
    "ARC-LEA-009.jpg": "leaf-floral-2",
    "ARC-LEA-010.jpg": "leaf-floral-3",
    "ARC-LEA-011.jpg": "leaf-floral-4",
    # GONOS
    "ARC-GON-001.jpg": "gonos-dec-girl",
    "ARC-GON-002.jpg": "gonos-blanc",
    "ARC-GON-003.jpg": "gonos-dec-boy",
    # CHIC
    "ARC-CHI-001.jpg": "chic-r1-pb-bleu",
    "ARC-CHI-002.jpg": "chic-r1-pb-miel",
    "ARC-CHI-003.jpg": "chic-r1-pb-vert",
    "ARC-CHI-004.jpg": "chic-r1-ec-blanc",
    "ARC-CHI-005.jpg": "chic-r2-pb-bleu",
    "ARC-CHI-006.jpg": "chic-r2-pb-miel",
    "ARC-CHI-007.jpg": "chic-r2-pb-vert",
    "ARC-CHI-008.jpg": "chic-r2-ec-blanc",
    "ARC-CHI-009.jpg": "chic-r2-mtl-bleu-cobalte",
    "ARC-CHI-010.jpg": "chic-r2-mtl-mauve",
    "ARC-CHI-011.jpg": "chic-r2-mtl-gold",
    "ARC-CHI-012.jpg": "chic-r2-mtl-rose-gold",
    "ARC-CHI-013.jpg": "chic-r2-mtl-silver",
    "ARC-CHI-014.jpg": "chic-r2-mtl-bleu-petrole",
    # KRONFEL
    "ARC-KRO-001.jpg": "kronfel-classic",
    # CASBAH
    "ARC-CAS-001.jpg": "casbah-classic",
    # YASMINE
    "ARC-YAS-001.jpg": "yasmine-classic",
}

# Rate limiting
DELAY_BETWEEN_REQUESTS = 7   # seconds between API calls (safe under 10 RPM free limit)
MAX_RETRIES            = 4
RETRY_WAIT             = 35  # seconds to wait after a 429 rate-limit error

# Output image max width (pixels) — website shows at max ~1200px, 1280 is plenty
OUTPUT_MAX_WIDTH = 1280

# ─── OCR: READ TILE DIMENSIONS FROM PRODUCT IMAGE ─────────────────────────────

def extract_tile_dimensions(image_path: Path) -> str:
    """
    Reads the tile dimensions (e.g. '10x30', '15x30', '20x20') from the
    text printed in the bottom portion of the product catalogue image.

    Returns a string like '10x30 cm' or a fallback if OCR fails.
    """
    try:
        import pytesseract
        from PIL import Image

        img = Image.open(image_path)
        w, h = img.size
        # The dimension text is always in the bottom 28% of the image
        bottom_strip = img.crop((0, int(h * 0.72), w, h))
        raw_text = pytesseract.image_to_string(bottom_strip)

        # Look for patterns like 10x30, 15x30, 20x20, 10X30, etc.
        match = re.search(r'(\d{1,2})[xX×](\d{1,2})', raw_text)
        if match:
            width_cm  = int(match.group(1))
            height_cm = int(match.group(2))
            return f"{width_cm}x{height_cm} cm"

    except ImportError:
        pass   # pytesseract not installed — use fallback
    except Exception:
        pass

    # Fallback: infer from filename prefix
    name = image_path.name.upper()
    if name.startswith("ARC-CHI"):
        return "20x20 cm"
    if name.startswith("ARC-LEA") or name.startswith("ARC-GON"):
        return "15x30 cm"
    return "10x30 cm"   # Silos, Atelier, Ducal, Kronfel, Casbah, Yasmine


# Pre-read all tile dimensions once at startup to avoid re-running OCR in the loop
def preload_dimensions(tile_files: list) -> dict:
    dims = {}
    print("\n🔍 Reading tile dimensions via OCR...")
    for tf in tile_files:
        dims[tf.name] = extract_tile_dimensions(tf)
    # Print a summary grouped by dimension
    by_dim = {}
    for fname, dim in dims.items():
        by_dim.setdefault(dim, []).append(fname)
    for dim, fnames in sorted(by_dim.items()):
        print(f"   {dim:10s} → {len(fnames)} tiles")
    return dims


# ─── PROMPT BUILDER ───────────────────────────────────────────────────────────

def build_prompt(wall_zone: str, original_surface: str, tile_dims: str) -> str:
    """
    Builds a precise Gemini prompt tailored to the specific room and tile dimensions.
    """
    return f"""You are a professional interior design rendering specialist.

I am giving you TWO images:
  Image 1 → A room photo (the scene to edit)
  Image 2 → A ceramic tile product photo (the tile to install on the wall)

═══════════════════════════════════════════════
TASK
═══════════════════════════════════════════════
Replace {wall_zone} with the ceramic tile shown in Image 2.
The surface currently shows: {original_surface}.

═══════════════════════════════════════════════
TILE SPECIFICATIONS
═══════════════════════════════════════════════
Real-world tile size: {tile_dims} per individual tile piece.
Scale the tile pattern realistically for this room so tiles appear at the
correct physical size in perspective — not too large and not too small.

═══════════════════════════════════════════════
STRICT REQUIREMENTS — FOLLOW EXACTLY
═══════════════════════════════════════════════
1. FULL COVERAGE — The new tiles must cover the ENTIRE wall zone with ZERO
   gaps, bare patches, or empty spots. Every pixel of the original surface
   must be replaced with the new tile pattern.

2. PRESERVE EVERYTHING ELSE — Do not change anything outside the wall zone.
   Keep all furniture, fixtures, plants, mirrors, countertops, ceiling, floor,
   lighting, and decorative objects exactly as they appear in Image 1.

3. NO TEXT OR LOGOS — The output image must contain absolutely no text,
   watermarks, logos, product names, page numbers, or ARCADA branding.
   The product image (Image 2) has a logo and text — ignore them completely,
   use only the tile's shape, color, and surface texture.

4. REALISTIC INSTALLATION — Tiles should be laid in a professional pattern
   with thin consistent grout lines between each piece. The tile surface must
   interact naturally with the room's existing lighting and cast realistic
   reflections or shadows where appropriate.

5. CLEAN EDGES — At the wall boundaries (corners, ceiling line, floor line,
   around fixtures), tile pieces should be cleanly cut to fit, exactly as a
   professional tiler would finish the job.

6. SAME FRAMING — Output image must have exactly the same dimensions and
   camera angle as Image 1. Do not crop, zoom, rotate, or reframe.

7. PHOTOREALISTIC — The result must look like a real photograph of the room
   after the tiles were physically installed, not a digital compositing job.
"""


# ─── IMAGE HELPERS ────────────────────────────────────────────────────────────

def load_image_as_base64(path: str) -> tuple:
    """Load image, convert to RGB JPEG, return (base64_string, mime_type)."""
    from PIL import Image
    img = Image.open(path)
    if img.mode in ("RGBA", "P", "LA", "L"):
        img = img.convert("RGB")
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=92)
    b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    return b64, "image/jpeg"


def resize_and_save(image_bytes: bytes, output_path: Path) -> tuple:
    """Decode image bytes, resize to max width, save as JPEG. Returns (w, h)."""
    from PIL import Image
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    if img.width > OUTPUT_MAX_WIDTH:
        ratio = OUTPUT_MAX_WIDTH / img.width
        img = img.resize((OUTPUT_MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, "JPEG", quality=90, optimize=True)
    return img.size


# ─── PROGRESS TRACKING ────────────────────────────────────────────────────────

PROGRESS_FILE = Path("generate-previews-progress.json")

def load_progress() -> set:
    if PROGRESS_FILE.exists():
        with open(PROGRESS_FILE) as f:
            return set(json.load(f).get("completed", []))
    return set()

def save_progress(completed: set):
    with open(PROGRESS_FILE, "w") as f:
        json.dump({"completed": sorted(completed)}, f, indent=2)


# ─── GEMINI API CALL ──────────────────────────────────────────────────────────

def call_gemini(room_b64: str, room_mime: str,
                tile_b64: str, tile_mime: str,
                prompt: str) -> bytes | None:
    """
    Posts both images + prompt to Gemini Flash image generation.
    Returns raw image bytes on success, None on failure.
    """
    import urllib.request
    import urllib.error

    # Using gemini-2.5-flash-image (GA model as of May 2026)
    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        "gemini-2.5-flash-image:generateContent"
        f"?key={API_KEY}"
    )

    payload = {
        "contents": [{
            "parts": [
                {"inline_data": {"mime_type": room_mime, "data": room_b64}},
                {"inline_data": {"mime_type": tile_mime, "data": tile_b64}},
                {"text": prompt},
            ]
        }],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"],
        },
    }

    body = json.dumps(payload).encode("utf-8")

    for attempt in range(1, MAX_RETRIES + 1):
        req = urllib.request.Request(
            url, data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                result = json.loads(resp.read())

            parts = result["candidates"][0]["content"]["parts"]
            for part in parts:
                if "inlineData" in part:
                    return base64.b64decode(part["inlineData"]["data"])

            # No image in response — print any text Gemini returned
            print("    ⚠️  Gemini returned no image. Response text:")
            for part in parts:
                if "text" in part:
                    print(f"       {part['text'][:300]}")
            return None

        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = RETRY_WAIT * attempt
                print(f"    ⏳ Rate limited. Waiting {wait}s (retry {attempt}/{MAX_RETRIES})...")
                time.sleep(wait)
            elif e.code == 400:
                err_body = e.read().decode("utf-8", errors="replace")
                print(f"    ❌ Bad request: {err_body[:400]}")
                return None
            else:
                print(f"    ❌ HTTP {e.code}: {e.reason}")
                if attempt < MAX_RETRIES:
                    time.sleep(RETRY_WAIT)
        except Exception as ex:
            print(f"    ❌ Error: {ex}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_WAIT)

    print(f"    ❌ Failed after {MAX_RETRIES} attempts.")
    return None


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    from PIL import Image   # validate Pillow is installed early

    print("\n" + "═" * 62)
    print("  ARCADA — Gemini Batch Room Preview Generator  v2.0")
    print("═" * 62)

    # ── Validate API key ──
    if not API_KEY or API_KEY == "PASTE_YOUR_KEY_HERE":
        print("\n❌ No API key found!")
        print("   Windows : set GEMINI_API_KEY=AIzaSy...")
        print("   Mac/Linux: export GEMINI_API_KEY=AIzaSy...")
        print("   Then re-run the script.\n")
        sys.exit(1)
    print(f"\n✅ API key loaded (ends in ...{API_KEY[-6:]})")

    # ── Validate tiles directory ──
    if not TILES_DIR.exists():
        print(f"\n❌ Tiles folder not found: {TILES_DIR}")
        print("   Run this script from the project root (folder containing /public/)\n")
        sys.exit(1)

    # ── Collect tile files ──
    tile_files = sorted([
        f for f in TILES_DIR.iterdir()
        if f.suffix.lower() in (".jpg", ".jpeg", ".png")
        and f.name not in SKIP_FILES
        and f.name in FILENAME_TO_VARIANT_ID
    ])

    unmapped = [
        f.name for f in TILES_DIR.iterdir()
        if f.suffix.lower() in (".jpg", ".jpeg", ".png")
        and f.name not in SKIP_FILES
        and f.name not in FILENAME_TO_VARIANT_ID
    ]
    if unmapped:
        print(f"\n⚠️  {len(unmapped)} tile files not in the variant map (will be skipped):")
        for u in unmapped:
            print(f"   - {u}")

    # ── Validate room images ──
    available_rooms = {
        rid: cfg for rid, cfg in ROOMS.items()
        if Path(cfg["image"]).exists()
    }
    missing_rooms = [rid for rid in ROOMS if rid not in available_rooms]
    if missing_rooms:
        print(f"\n⚠️  Room images not found (skipped): {', '.join(missing_rooms)}")
    if not available_rooms:
        print("\n❌ No room images found in public/rooms/. Add them and retry.\n")
        sys.exit(1)

    # ── OCR: read all tile dimensions ──
    tile_dimensions = preload_dimensions(tile_files)

    # ── Job summary ──
    total = len(tile_files) * len(available_rooms)
    completed = load_progress()
    remaining = total - len(completed)
    eta_min = (remaining * DELAY_BETWEEN_REQUESTS) / 60

    print(f"\n📊 Job summary:")
    print(f"   Tile variants : {len(tile_files)}")
    print(f"   Rooms         : {len(available_rooms)}  →  {', '.join(available_rooms)}")
    print(f"   Total images  : {total}")
    print(f"   Already done  : {len(completed)}")
    print(f"   Remaining     : {remaining}")
    print(f"   Est. time     : ~{eta_min:.0f} min  (free tier, 7s between requests)")
    print(f"   Output folder : {OUTPUT_DIR.resolve()}/")

    if remaining == 0:
        print("\n✅ All images already generated. Nothing to do.\n")
        return

    print("\nStarting in 3 seconds... (Ctrl+C to abort)\n")
    time.sleep(3)

    success_count = 0
    fail_count    = 0
    skip_count    = 0
    seq           = 0   # absolute sequence across all rooms × tiles

    # ── Main generation loop ──
    for room_id, room_cfg in available_rooms.items():

        print(f"\n{'─' * 55}")
        print(f"🏠  Room: {room_id.upper()}")
        print(f"{'─' * 55}")

        room_b64, room_mime = load_image_as_base64(room_cfg["image"])

        for tile_file in tile_files:
            seq += 1
            variant_id   = FILENAME_TO_VARIANT_ID[tile_file.name]
            job_key      = f"{room_id}/{variant_id}"
            output_path  = OUTPUT_DIR / room_id / f"{variant_id}.jpg"
            pct          = seq / total * 100

            # ── Skip if already done ──
            if job_key in completed or output_path.exists():
                if output_path.exists() and job_key not in completed:
                    completed.add(job_key)
                    save_progress(completed)
                skip_count += 1
                print(f"  [{seq:3d}/{total}] ⏭   {job_key}  (done)")
                continue

            tile_dims = tile_dimensions[tile_file.name]
            print(f"  [{seq:3d}/{total}] ({pct:4.0f}%) ⚙   {job_key}  [{tile_dims}]")

            tile_b64, tile_mime = load_image_as_base64(str(tile_file))

            prompt = build_prompt(
                wall_zone        = room_cfg["wall_zone"],
                original_surface = room_cfg["original_surface"],
                tile_dims        = tile_dims,
            )

            result_bytes = call_gemini(room_b64, room_mime, tile_b64, tile_mime, prompt)

            if result_bytes:
                try:
                    dims = resize_and_save(result_bytes, output_path)
                    completed.add(job_key)
                    save_progress(completed)
                    success_count += 1
                    print(f"               ✅  Saved → {output_path}  ({dims[0]}×{dims[1]}px)")
                except Exception as e:
                    fail_count += 1
                    print(f"               ❌  Save error: {e}")
            else:
                fail_count += 1
                print(f"               ❌  Generation failed — will retry on next run")

            # Rate-limit delay (skip after last item)
            if seq < total:
                time.sleep(DELAY_BETWEEN_REQUESTS)

    # ── Final summary ──
    print(f"\n{'═' * 62}")
    print(f"  ✅  Run complete!")
    print(f"  Generated : {success_count}")
    print(f"  Skipped   : {skip_count}  (already existed)")
    print(f"  Failed    : {fail_count}")
    if fail_count:
        print(f"\n  ⚠️  Re-run the script to retry {fail_count} failed image(s).")
        print(f"      Progress is saved — already-done images won't be repeated.")
    print(f"\n  Output : {OUTPUT_DIR.resolve()}/")
    print(f"{'═' * 62}\n")


if __name__ == "__main__":
    main()