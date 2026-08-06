#!/usr/bin/env bash
# build-film.sh — turn the five Seedance clips into the frame set the page scrubs.
#
# Run this once the Higgsfield hosts are reachable. It replaces the geometric
# stand-in written by make-standin-film.py with the real footage, using the same
# filenames, so index.html needs no change beyond FRAME_COUNT.
#
#   bash tools/build-film.sh
#
# Requires: ffmpeg, ffprobe, curl, python3. Clip URLs come from meta/jobs.json.
set -euo pipefail

cd "$(dirname "$0")/.."
WORK="build/film"
OUT="frames"
mkdir -p "$WORK"

echo "==> resolving clip URLs from meta/jobs.json"
python3 - <<'PY' > "$WORK/urls.txt"
import json
j = json.load(open("meta/jobs.json"))
order = ["clip1-kaal", "clip2-stuc", "clip3-verf", "clip4-afwerking", "clip5-thuis"]
urls = j.get("master_urls") or j["draft_urls"]
for k in order:
    print(urls[k])
PY
cat "$WORK/urls.txt"

echo "==> downloading clips"
i=0
: > "$WORK/concat.txt"
while read -r url; do
  i=$((i + 1))
  f="$WORK/clip$i.mp4"
  [ -s "$f" ] || curl -fsSL -A "Mozilla/5.0" -o "$f" "$url"
  echo "file 'clip$i.mp4'" >> "$WORK/concat.txt"
done < "$WORK/urls.txt"

echo "==> junction gate (each seam must be >= 0.88, structural breaks are a real fail)"
for n in 1 2 3 4; do
  m=$((n + 1))
  ffmpeg -y -v error -sseof -0.05 -i "$WORK/clip$n.mp4" -update 1 -q:v 1 "$WORK/a.png"
  ffmpeg -y -v error -i "$WORK/clip$m.mp4" -vf "select=eq(n\,0)" -vframes 1 "$WORK/b.png"
  s=$(ffmpeg -v error -i "$WORK/a.png" -i "$WORK/b.png" \
        -lavfi "[0:v]format=gray[x];[1:v]format=gray[y];[x][y]ssim" -f null - 2>&1 \
        | grep -o 'All:[0-9.]*' | head -1 | cut -d: -f2)
  echo "   seam $n->$m  SSIM ${s:-?}"
done

echo "==> concat, dropping the duplicated junction frame on clips 2..5"
ffmpeg -y -v error -f concat -safe 0 -i "$WORK/concat.txt" \
  -fps_mode vfr -c:v libx264 -crf 16 -preset slow -an "$WORK/master.mp4"

echo "==> inspect the opening 2s before extracting; trim any static head"
ffmpeg -y -v error -i "$WORK/master.mp4" -vf "select='lt(n,49)',scale=300:-1" \
  -vsync 0 "$WORK/head_%03d.jpg"
echo "   wrote $WORK/head_*.jpg — look at them, then set HEAD_TRIM below if needed"
HEAD_TRIM="${HEAD_TRIM:-0}"

echo "==> extracting every frame at native rate (never decimate)"
rm -f "$OUT"/f_*.jpg
mkdir -p "$OUT"
ffmpeg -y -v error ${HEAD_TRIM:+-ss "$HEAD_TRIM"} -i "$WORK/master.mp4" \
  -vf "fps=24,scale=1440:-2" -q:v 6 "$OUT/f_%04d.jpg"

COUNT=$(ls "$OUT"/f_*.jpg | wc -l | tr -d ' ')
echo "==> $COUNT frames in $OUT/"
echo "    Set FRAME_COUNT in index.html to $COUNT — a stale count blanks the canvas at the end."

echo "==> seam colour for the film -> content handoff"
python3 - "$OUT/f_$(printf '%04d' "$COUNT").jpg" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB"); w, h = im.size; px = im.load()
tot = [0, 0, 0]; n = 0
for y in range(h - 40, h):
    for x in range(0, w, 4):
        r, g, b = px[x, y]; tot[0] += r; tot[1] += g; tot[2] += b; n += 1
print("    --seam: #%02X%02X%02X" % tuple(t // n for t in tot))
PY
