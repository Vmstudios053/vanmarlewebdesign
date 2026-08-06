# Klusbedrijf De Zegen — scroll-film site

A single-page site for Klusbedrijf De Zegen (De Lutte, Twente). The hero is the page:
one continuous shot through a house that finishes itself around the camera, scrubbed by
scroll, dissolving into the services and the quote request.

Concept: **Van Kaal naar Thuis** — five chapters, `KAAL → STUC → VERF → AFWERKING → THUIS`,
one camera vector throughout (the camera only ever pushes forward, deeper into the house).

## Run it

```bash
python3 tools/make-standin-film.py frames   # writes frames/ (601 JPEGs, ~44MB)
python3 -m http.server 8099                 # then open http://127.0.0.1:8099/
```

`frames/` is generated, not source, so it is gitignored.

## The film

The real footage is five 5-second Seedance 2.0 clips generated from six chained
keyframes. Every job id and result URL is in `meta/jobs.json`; the prompts and the
declared camera vector are in `meta/storyboard.json`.

**The footage is not in this repo yet.** The build environment's egress policy denies
every Higgsfield host (`d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net`,
`upload.higgsfield.ai`), so the clips cannot be downloaded and cut into frames here.
Until that is lifted, `tools/make-standin-film.py` draws a geometric substitute with the
same length, frame rate and chapter-by-chapter colour progression. It exists so the scrub
engine could be verified against real frames rather than assumed to work — it is not the
design.

Once the hosts are reachable:

```bash
bash tools/build-film.sh     # downloads, gates each seam, concats, extracts frames
```

It writes the same filenames, prints the new frame count and the sampled seam colour.
Update `FRAME_COUNT` and `--seam` in `index.html` to match — a stale frame count blanks
the canvas at the end of the scroll.

Two caveats on the current clips, both worth fixing before this goes live:

- They are 480p drafts. Masters at 1080p cost ~45 credits each.
- Each clip is pinned between two keyframes rather than to the previous clip's real
  extracted last frame. That is the weaker chaining method, and the four junctions have
  never been measured. `build-film.sh` prints an SSIM per seam; below ~0.88, regenerate
  that clip.

## What still needs a human

- **Contact details.** The closing section links to the live site rather than showing a
  phone number or email, because none could be verified. Fill them into the `.actions`
  and `.foot` blocks in `index.html`.
- **Brand assets.** No logo, colours or photography were supplied, so the palette, the
  Bricolage Grotesque / Figtree pairing and the spirit-level mark are all art direction,
  not the company's existing identity.
- **A portrait pass.** On a phone the 16:9 film letterboxes, and the dead bands are filled
  with a blurred continuation of the frame. A real 9:16 generation would be better; keep
  both frame sets the same length so the playhead maps 1:1.

## Verifying

```bash
node ~/.claude/skills/scroll-film-studio/scripts/copy-gate.js index.html   # must exit 0
CHROME_PATH=... node .../verify.js jank http://127.0.0.1:8099/            # max < 50ms
CHROME_PATH=... node .../shot.js http://127.0.0.1:8099/ out.png 1440 900 3679
```

The page implements the dev contract the harness needs: `?jump=<scrollY>` lands
pre-scrolled with every scroll-driven value force-settled, and `window.__ready` flips
true only once frames are decoded and drawn.

Last verified: jank max 48.6ms / p95 30.8ms over a full scroll-through, copy gate clean,
no horizontal overflow at 1440×900 or 390×844.
