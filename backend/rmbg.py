"""Remove background from generated skeleton PNGs using rembg."""
from pathlib import Path
from rembg import remove
from PIL import Image
import io

DIR = Path("/app/frontend/public/skeletons")
files = list(DIR.glob("skeleton_*.png"))
print(f"Processing {len(files)} images...")

for f in files:
    with open(f, "rb") as fp:
        data = fp.read()
    out = remove(data)
    img = Image.open(io.BytesIO(out)).convert("RGBA")
    img.save(f, "PNG", optimize=True)
    print(f"  {f.name} -> {f.stat().st_size} bytes (RGBA)")
print("Done.")
