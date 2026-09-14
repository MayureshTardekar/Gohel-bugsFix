"""Generate 4 skeleton pose variations with transparent background using Nano Banana."""
import asyncio
import base64
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv(Path(__file__).parent / ".env")

REFERENCE_IMAGE = "/tmp/original_skeleton.png"
OUT_DIR = Path("/app/frontend/public/skeletons")
OUT_DIR.mkdir(parents=True, exist_ok=True)

POSES = [
    ("standing", "The full articulated human skeleton standing straight upright in neutral anatomical position, arms relaxed at sides, front view. Photographic quality, museum-lit, dramatic side lighting from top-left, cinematic composition. Completely isolated on a pure fully transparent background (no floor, no wall, no shadow surface, no beads, no marble, nothing behind the skeleton — only the skeleton itself). Full body from skull to toes, centered."),
    ("contrapposto", "The full articulated human skeleton in a graceful contrapposto pose with weight shifted onto the right leg, left hip slightly raised, right arm gently extended forward as if reaching, head turned slightly to the right. Photographic quality, museum-lit, cinematic dramatic lighting. Completely isolated on a pure fully transparent background (no floor, no wall, no shadow, nothing behind — only the skeleton). Full body visible."),
    ("thinker", "The full articulated human skeleton seated on nothing in a contemplative Rodin-Thinker pose — leaning slightly forward, right elbow resting on left knee, right hand supporting the skull's chin, deep in thought. Photographic quality, museum-lit, dramatic side light. Completely isolated on a pure fully transparent background (no chair, no floor, no wall, nothing behind — only the skeleton floating). Full body visible."),
    ("reaching", "The full articulated human skeleton standing tall with both arms raised triumphantly overhead reaching upward, spine slightly arched back, head tilted up. Photographic quality, museum-lit, cinematic dramatic lighting from below. Completely isolated on a pure fully transparent background (no floor, no wall, no shadow, nothing behind — only the skeleton). Full body from raised fingertips to feet."),
]


async def generate_pose(name: str, prompt: str, ref_bytes: bytes):
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(
        api_key=api_key,
        session_id=f"osteon-skeleton-{name}",
        system_message="You are an expert anatomical photographer generating museum-quality skeleton exhibit photographs.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])

    image_b64 = base64.b64encode(ref_bytes).decode("utf-8")
    msg = UserMessage(text=prompt, file_contents=[ImageContent(image_b64)])

    print(f"[{name}] Generating...")
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] FAILED — no images returned. Text: {text[:200]}")
        return False

    img = images[0]
    image_bytes = base64.b64decode(img["data"])
    out_path = OUT_DIR / f"skeleton_{name}.png"
    with open(out_path, "wb") as f:
        f.write(image_bytes)
    print(f"[{name}] Saved -> {out_path} ({len(image_bytes)} bytes)")
    return True


async def main():
    with open(REFERENCE_IMAGE, "rb") as f:
        ref = f.read()
    print(f"Reference size: {len(ref)} bytes")

    # Run sequentially to avoid rate limits
    results = []
    for name, prompt in POSES:
        try:
            ok = await generate_pose(name, prompt, ref)
            results.append((name, ok))
        except Exception as e:
            print(f"[{name}] ERROR: {e}")
            results.append((name, False))

    print("\n=== RESULTS ===")
    for name, ok in results:
        print(f"{name}: {'OK' if ok else 'FAIL'}")


if __name__ == "__main__":
    asyncio.run(main())
