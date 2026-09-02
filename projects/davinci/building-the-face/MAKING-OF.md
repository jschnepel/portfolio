# Making of: getting the cartoon da Vinci right

*The detailed, chronological process behind `BUILDING-THE-FACE.md`, the specific experiments, roadblocks,
debugging, and tuning it took to land the animating cartoon. Honest: this is the real path, dead ends kept.*

## Starting point and the hard constraint
The identity had to come from his red-chalk self-portrait, but the animator (a landmark-driven warp) needs a
**face a detector can find**. The self-portrait is three-quarter chalk, no detector crops it. So every idea
below was judged by one concrete test: *does MediaPipe detect a face in the output?* If not, it cannot animate.
That test turned a vague goal ("make it look good / cartoonish") into a pass/fail gate.

## Iteration 1, photoreal frontal (kept, then replaced)
- **What:** Stable Diffusion (dreamshaper-8) text-to-image from a prompt of his documented features, across 6
  seeds, keeping only detector-accepted frontals.
- **Result:** it animated, but the identity was wrong, a generic photoreal old man, not clearly Leonardo.
- **Decision:** replace it. Labeled honestly in code as a generated approximation, not deleted.

## Iteration 2, choosing the cartoon method (research + a roadblock)
- **Research:** for restyling a specific face while keeping identity, IP-Adapter (CLIP-embedding, decouples
  identity from surface style) beats InstantID (entangles appearance). So IP-Adapter grounded on the
  self-portrait was the "correct" first choice.
- **Roadblock:** IP-Adapter needs a large (~2.5 GB) image-encoder download. Two runs died mid-download at the
  shell timeout, before printing anything (buffered output, killed on timeout).
- **Insight:** img2img *directly from the self-portrait* is both simpler and *more literally grounded* (it
  uses his actual pixels, not a CLIP embedding), and needs no extra download. Pivoted to that.

## The debugging that mattered, a silent native crash
The first module run produced **zero output and exited**, no error, no traceback. Isolating it with stepwise
`print(..., flush=True)` showed it died the instant `main()` imported diffusers, *after* MediaPipe was already
loaded. Cause: a **native OpenMP / DLL clash** between MediaPipe and PyTorch, order-dependent, and a hard abort
(so no Python traceback). Fix: **import torch and diffusers before MediaPipe**, plus `KMP_DUPLICATE_LIB_OK`.
The inline smoke test had worked only because it happened to import in the safe order. This is the kind of bug
that reads as "it works on my machine" until you pin the real cause.

## Iteration 3, tuning the cartoon (the strength sweep)
img2img "strength" sets how far the output moves from the source:
- **0.40:** closest to the chalk drawing, but too sketch-like / not cartoon enough.
- **0.55:** a clean stylized cartoon, tight on the face, faithful to the self-portrait.
- **0.70 (chosen):** a polished 3D cartoon character with shoulders/robe, more character, still his features.

All three passed the detector gate. 0.70 was chosen for the character look. Then a **10-seed batch** at 0.70
gave ten detector-accepted candidates (a montage), including one reading a book; seed 42 became the working
source. Every candidate is a deterministic function of its seed, so the set is reproducible.

## Wiring it to actually respond
The still had to be driven by the character's decisions, not hand-animated:
- `face/decision_bridge.py`, maps a restraint decision (PORTRAIT / NOTICES / ENGAGES) + the authored beat +
  the target's screen position into face controls (expression preset, gaze angle, mouth). Faithful by
  construction, derived only from the decision + the authored line.
- `face/demo_stream.py`, a scripted short performance (observe, notice, engage and speak three cited gaze
  beats, settle) that produces the control stream without a camera.
- `face/render_photoreal.py`, MediaPipe detects 478 landmarks on the cartoon and a thin-plate-spline warp
  animates it from the stream. Native, on the 3080.

## Getting it verified (does it actually move, and cleanly?)
Checked, not assumed. Across the 30-second clip the sampled frames all differ (mean pixel change 5 to 22), the
stream drives **head-yaw 0 to 12 degrees** and **mouth-open 0 to 0.82**, and the cartoon warps **cleanly**, no
distortion of the beard, hair, or face. Honest limit: the motion is **gentle** (a 12-degree turn is subtle);
the cartoon medium could take a larger yaw and more expressive brows/mouth. That is a tuning knob (scale the
yaw range + expression intensity), not a rebuild.

## What "getting it right" actually meant
1. The right *identity* method: img2img FROM the self-portrait, not a text-imagined man.
2. The right *style* strength: 0.70, cartoon character but still detectable.
3. The right *gate*: MediaPipe detectability on every candidate, so it always animates.
4. The right *plumbing*: the decision-driven bridge, so the face is faithful, not puppeteered.
5. An honest *label*: a generated stylized approximation grounded in the self-portrait.

## Artifacts (for the portfolio)
Source generator: `face/gen_davinci_cartoon.py`. Stream builder: `face/demo_stream.py`. Renderer:
`face/render_photoreal.py`. Chosen face: `assets/face/davinci_cartoon.png`. Candidate montage:
`assets/face/gen_cartoon/_cartoon_montage.png`. Final clip: `outputs/face/davinci_cartoon_beats.mp4`.
Catalog of all renditions: `docs/FACE-RENDITIONS.md`.
