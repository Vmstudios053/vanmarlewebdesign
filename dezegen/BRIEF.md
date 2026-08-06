# BRIEF — Klusbedrijf De Zegen scroll-film site

## >>> PAUSED 2026-08-06 by user. READ THIS FIRST ON RESUME <<<
Nothing is in flight. Credits spent: 19.5 of 329.5 (12 keyframes + 7.5 clip-1 draft).
DONE: concept approved, storyboard vector-check PASS, all 6 keyframes generated
      (chained refs, they look right), clip-1 draft generated (480p fast).
NOT DONE: clip-1 pin measurement, clips 2-5, all gates, assembly, the website.

TWO BLOCKERS, both need a human decision:
 1. Egress policy denies every Higgsfield host from this environment (see below).
    User chose "get the hosts allowlisted" -- that action is still OUTSTANDING.
    Ask whether it happened; re-probe with:
      curl -s -o /dev/null -w '%{http_code}' https://d8j0ntlcm91z4.cloudfront.net/
    Non-000/403 means it landed and everything below can run LOCALLY.
 2. User denied mcp__higgsfield__sandbox_exec twice, then chose "Stoppen".
    Do NOT call sandbox_exec again without asking first.

RESUME ORDER (once blocker 1 or 2 clears):
 a. Measure clip 1: SSIM(clip1 frame0, kf1) = does Seedance honour the START pin?
    >=0.88 pass. This decides PATH A (chain 5x5s) vs PATH B (single <=15s take).
    Also SSIM(clip1 last frame, kf2) for the end pin, and sample every 8th frame
    inside clip 1 for mid-clip teleports.
 b. Only if the start pin holds: clips 2-5 SEQUENTIALLY. clip N start_image =
    clip N-1's ffmpeg-extracted LITERAL last frame (upload it, use the media_id),
    end_image = kf(N+1). Never parallel, never kf->kf.
 c. Show drafts to user -> approve -> masters at 1080p std (45 credits each, 225 total).
 d. continuity-gate.sh, junction gates, assemble.sh (-fps_mode vfr, native fps,
    ALL frames at 1024px -q:v 6), head-trim, set FRAME_COUNT.
 e. Build the page, copy-gate.js exit 0, verify.js, commit+push. NO PR unless asked.

If the user gives up on Lane B, Lane A (pure GSAP/Lenis, no video, no transfer
problem) delivers to the repo with zero further credits -- but the 6 keyframes
become unusable, since they cannot be downloaded either.


## Client
Klusbedrijf De Zegen, De Lutte (Twente). Diensten: schilderwerk, stucwerk, vloeren, behangen.
Trustoo 9.1. Vibe gekozen door gebruiker: **fris & betrouwbaar** (licht, helder, blauw/wit).
Geen brand-assets ontvangen (gebruiker levert mogelijk later; huidige site onbereikbaar vanuit deze omgeving).

## Concept (approved by user)
**"Van Kaal naar Thuis"** — Lane B, Higgsfield seedance_2_0.
One continuous forward push through doorways; house finishes itself around the camera.
5 clips × 5s = 25s. Vector: "the camera only ever pushes forward, deeper into the house."
Chapters: 1 KAAL → 2 STUC → 3 VERF → 4 AFWERKING → 5 THUIS.
No humans/hands/rollers prominent in frame (i2v hallucination risk). Paint = brand blue-white.

## Budget (user approved)
Total plan ≈ 275 credits of 329.5. Keyframes nano_banana_pro (~2/st), drafts 480p fast (7.5/clip),
masters 1080p std (45/clip) ONLY after user approves drafts. Audio OFF always.

## Art direction (locked)
- Palette: page base #F6F4EF (warm stuc-wit) · primary Zegen-blauw #2D64C8 · ink #152438
  · sky tint #DCE9F7 · oak accent #C99B62
- Type: Bricolage Grotesque (display) + Figtree (body), vendored via @fontsource (npm — allowed through proxy)
- GSAP + Lenis vendored via npm (CDNs blocked by proxy; registry.npmjs.org is allowlisted)
- Logo: inline SVG lockup — spirit-level mark (rounded rect + centered bubble) + "DE ZEGEN" wordmark,
  sub "Klusbedrijf · De Lutte"
- After-film sections: Diensten (4 ambachten) + compacte offerte/contact CTA-afsluiting. User picked
  only "Diensten"; CTA footer is minimal.

## Delivery
Site as files in repo /home/user/vanmarlewebdesign on branch claude/skill-installation-uhvhkr,
folder dezegen/ (index.html + frames/ + assets/). Commit+push. NO PR unless asked. No Vercel deploy.
Do NOT touch the existing Vite site at repo root.

## Film pipeline state (update as you go)
- storyboard: meta/storyboard.json — vector-check PASS required before generating
- keyframes: keyframes/kf1.png … kf6.png (nano_banana_pro, 16:9, chained refs: kfN+1 uses kfN as image ref)
- job ids: meta/jobs.json — persist EVERY job id the moment it is issued
- chaining law: clip N start_image = ffmpeg-extracted LITERAL last frame of clip N-1 (uploaded via media_upload),
  end_image = kf(N+1). Clip 1 starts from kf1. SEQUENTIAL — never parallel.
- preflight: verify on FIRST junction that seedance_2_0 honours the start pin before generating clip 3+.
- gates: continuity-gate.sh <frames-dir> 8 PASS; junction SSIM ≥ 0.88 pass, 0.80–0.88 watch in motion.
- assemble: assemble.sh, -fps_mode vfr, native fps, ALL frames at 1024px -q:v 6. Head-trim, then set FRAME_COUNT.
- ffmpeg binary: /opt/pw-browsers/ffmpeg-1011/ffmpeg-linux (no system ffmpeg!). No ffprobe — use ffmpeg -i.
- Chromium for verify: /opt/pw-browsers/chromium (set CHROME_PATH)

## EGRESS BLOCKER (user chose: get hosts allowlisted)
This environment's egress policy DENIES all Higgsfield hosts (403 on CONNECT):
  d8j0ntlcm91z4.cloudfront.net   (generation results)
  d2ol7oe51mr4n9.cloudfront.net  (uploaded files)
  upload.higgsfield.ai           (presigned uploads)
=> Generation + sandbox processing work fine (MCP channel). ONLY the final
   frames->repo copy is blocked. Do NOT engineer a bridge around the policy
   (/root/.ccr/README.md: report, don't route around). Wait for allowlist.
Workaround used meanwhile: run the ENTIRE chain inside Higgsfield's sandbox --
download clip, ffmpeg-extract last frame, PUT it back to upload.higgsfield.ai,
use returned media_id as next clip's start_image. Never needs local disk.

## Do-nots
- Never master before user approves drafts. Never regenerate a paid clip without checking billing state.
- No dissolves over bad seams. No frame decimation. No foreground preview servers (nohup + curl poll + pkill).
- copy-gate.js must exit 0 (page never narrates its own mechanic; no placeholder text; no fake brand logos).
- prefers-reduced-motion respected.
