#!/usr/bin/env python3
"""Build the stand-in frame set for the De Zegen scroll-film.

The real film is five chained Seedance clips (see ../meta/storyboard.json). Those
clips live in the Higgsfield account and cannot be reached from the build
environment, so this script draws a geometric substitute with the same length,
frame rate and chapter-by-chapter colour progression. It exists so the scrub
engine can be verified against real frames rather than assumed to work.

Replace it by running ../tools/build-film.sh, which writes the same filenames.

    python3 make-standin-film.py ../frames
"""
import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter

W, H = 1024, 576
FPS = 24
SECONDS = 25.0
FRAMES = int(FPS * SECONDS) + 1  # 601
DOORWAYS = 5  # the camera passes five thresholds

# Chapter colour states: (wall, floor, light). Index 0 is the room the camera
# starts in; each later entry is the room beyond the next doorway. Cool and
# stripped at the start, warm and finished at the end.
CHAPTERS = [
    ((138, 126, 118), (110, 106, 102), (185, 196, 206)),  # KAAL   bare brick, cold
    ((201, 198, 192), (184, 178, 170), (216, 220, 224)),  # STUC   fresh plaster
    ((220, 230, 242), (201, 204, 210), (234, 241, 250)),  # VERF   blue-white paint
    ((223, 231, 240), (201, 155, 98), (240, 223, 192)),   # AFWERK wallpaper + oak
    ((233, 240, 248), (211, 164, 107), (255, 235, 200)),  # THUIS  sunlit, finished
    ((238, 244, 250), (216, 170, 112), (255, 240, 210)),  # final resting room
]
FRAME_WOOD = (176, 143, 104)

VP_X, VP_Y = W * 0.5, H * 0.47  # vanishing point, a touch above centre


def lerp(a, b, t):
    return a + (b - a) * t


def mix(c1, c2, t):
    return tuple(int(round(lerp(c1[i], c2[i], t))) for i in range(3))


def chapter_colours(i):
    """Colours for room i, clamped to the table."""
    return CHAPTERS[max(0, min(len(CHAPTERS) - 1, i))]


def opening_rect(depth):
    """Screen rect of a doorway opening at the given depth (in room units)."""
    s = 1.0 / max(depth, 1e-3)
    hw = W * 0.150 * s
    hh = H * 0.330 * s
    return (VP_X - hw, VP_Y - hh, VP_X + hw, VP_Y + hh)


def draw_room(d, cam_z):
    """Paint the corridor for one camera position."""
    room = int(math.floor(cam_z))
    wall, floor, light = chapter_colours(room)

    # Near room: wall wash with a soft light falloff from the left window.
    d.rectangle([0, 0, W, H], fill=wall)
    for x in range(0, W, 8):
        t = (x / W) ** 1.4
        d.rectangle([x, 0, x + 8, H], fill=mix(mix(light, wall, 0.45), wall, t))

    # Floor plane, running back to the vanishing point.
    d.polygon([(0, H), (W, H), (VP_X + W * 0.16, VP_Y), (VP_X - W * 0.16, VP_Y)], fill=floor)

    # Doorways, near to far, each nested inside the previous opening.
    for i in range(room + 1, room + 5):
        depth = i - cam_z
        if depth <= 0.06:
            continue
        x0, y0, x1, y1 = opening_rect(depth)
        if x1 - x0 < 2 or y1 - y0 < 2:
            break
        if x0 > W or x1 < 0:
            break
        bw = max(2.0, (x1 - x0) * 0.055)  # wooden frame thickness
        d.rectangle([x0 - bw, y0 - bw, x1 + bw, y1 + bw], fill=FRAME_WOOD)
        bwall, bfloor, blight = chapter_colours(i)
        d.rectangle([x0, y0, x1, y1], fill=mix(bwall, blight, 0.25))
        # a sliver of floor visible through the opening
        fy = y0 + (y1 - y0) * 0.74
        d.rectangle([x0, fy, x1, y1], fill=bfloor)


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "../frames"
    os.makedirs(out, exist_ok=True)
    rnd = random.Random(7)

    for n in range(FRAMES):
        t = n / (FRAMES - 1)
        # Ease very slightly at both ends so the scrub has somewhere to settle.
        e = t * t * (3 - 2 * t) * 0.12 + t * 0.88
        cam_z = e * DOORWAYS

        img = Image.new("RGB", (W, H))
        draw_room(ImageDraw.Draw(img), cam_z)
        img = img.filter(ImageFilter.GaussianBlur(0.4))

        # Vignette + film grain, fading as the rooms brighten.
        px = img.load()
        warmth = 1.0 - 0.55 * t
        for y in range(0, H, 2):
            dy = (y - H / 2) / (H / 2)
            for x in range(0, W, 2):
                dx = (x - W / 2) / (W / 2)
                v = 1.0 - 0.30 * warmth * (dx * dx + dy * dy)
                g = rnd.randint(-4, 4)
                r0, g0, b0 = px[x, y]
                px[x, y] = (
                    max(0, min(255, int(r0 * v) + g)),
                    max(0, min(255, int(g0 * v) + g)),
                    max(0, min(255, int(b0 * v) + g)),
                )

        img.save(os.path.join(out, "f_%04d.jpg" % (n + 1)), quality=72, optimize=True)
        if n % 100 == 0:
            print("  %d/%d" % (n, FRAMES), flush=True)

    print("wrote %d frames to %s" % (FRAMES, out))


if __name__ == "__main__":
    main()
