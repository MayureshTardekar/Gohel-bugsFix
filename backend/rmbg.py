"""Remove background from generated skeleton PNGs using rembg."""
from pathlib import Path
from rembg import remove
from PIL import Image
import io
import shutil

DIR = Path("/app/frontend/public/skeletons")
files = [f for f in DIR.glob("*.png") if not f.name.endswith("_clean.png")]
print(f"Processing {len(files)} images...")

for f in files:
    print(f"Processing {f.name}...")
    with open(f, "rb") as fp:
        data = fp.read()
    out = remove(data)
    img = Image.open(io.BytesIO(out)).convert("RGBA")
    img.save(f, "PNG", optimize=True)
    print(f"  {f.name} -> {f.stat().st_size} bytes (RGBA)")

stand_skele = DIR / "stand-skele.png"
if stand_skele.exists():
    shutil.copy(stand_skele, DIR / "skeleton_standing.png")
    print("Updated skeleton_standing.png from stand-skele.png")

print("Done.")
