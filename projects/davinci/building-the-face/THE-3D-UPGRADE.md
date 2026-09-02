# The 3D Upgrade: da Vinci Gets a Real Head

*The next chapter of the build story. The warp gave da Vinci a face that moves, but it could only move the
head and eyes, it could not reshape expressions. This is how he got a true 3D head that can actually emote,
what it cost to stand up, and the honest limits we hit. Images in `./images/`.*

## Why upgrade: the warp cannot do expressions

The landmark warp (previous chapter) is deterministic, auditable, and runs on a single GPU, and those are real
virtues. But a thin-plate spline can only push pixels around a flat still: it can turn the head, widen the
eyes, and open the mouth on a timeline, but it cannot build the inside of a mouth, cannot round the cheeks
into a real smile, cannot produce a genuinely new expression. The SD expression-variants grid worked around
this by generating separate images per expression, which proved the point: to get real, dramatic expressions
from ONE identity you need a 3D model of the head, not a 2D warp.

## What we chose: GAGAvatar

GAGAvatar (Chu and Harada, NeurIPS 2024) reconstructs a controllable 3D head from a **single image**. It builds
a 3D Gaussian-splatting head you can orbit around, and drives its expressions with FLAME parameters (jaw, gaze,
brow, and a learned expression space), in real time. That is exactly the capability the warp lacked: one still
of da Vinci in, a posable and expressive 3D head out.

## What it cost to stand up (the honest setup)

This was not a `pip install`. GAGAvatar is a Linux and CUDA research stack, so the build ran inside WSL2 on the
same RTX 3080:

1. **WSL2 plus Ubuntu plus CUDA in the Linux userspace** (the one manual, reboot-level step).
2. **A conda environment** pinned to PyTorch 2.4.1, CUDA 12.1, and pytorch3d 0.7.8.
3. **A custom CUDA renderer compiled from source:** GAGAvatar ships its own 32-dimensional Gaussian rasterizer
   (the standard splatting renderer carries 3 color channels, theirs carries 32 feature channels). Compiling it
   meant matching the toolchain by hand: nvcc 12.1, a compatible gcc-12 (Ubuntu's gcc-15 is too new for CUDA
   12.1), and the CUDA C++ core headers (CUB, Thrust, libcudacxx). Getting that combination right was the crux
   of the build.
4. **FLAME registration:** the head model is license-gated, so it needed a one-time sign-up at the FLAME site.
   Worth recording honestly: the sign-up is only a license agreement, the model files themselves come bundled in
   the author's released resources, so no FLAME file had to be placed by hand.

## The result: da Vinci reenacting a driver

Single cartoon still in, tracked, reconstructed as a 3D Gaussian head, then driven frame by frame through an
expressive demo sequence (a talking-head clip that ships with GAGAvatar). The output is a three-panel video:
**da Vinci source, the driver, and da Vinci reenacting the driver's expression and head pose.**

On a near-neutral, forward-facing frame he holds his identity cleanly:

> **[image withheld from the shared portfolio]** — *GAGAvatar da Vinci, neutral reenactment* (`12_gagavatar_reenact_neutral.png`). This is a three-panel
> reenactment figure whose middle panel is the GAGAvatar demo driver, an identifiable real
> public figure, and it carries a burned-in GAGAvatar logo. Held back pending Joey's call,
> consistent with the 2026-07-04 B1 media redaction. The full figure is in the repo at
> `docs/portfolio/building-the-face/images/12_gagavatar_reenact_neutral.png`.

And on a talking frame he genuinely emotes: mouth open, head turned to match. This is the thing the warp could
never do, a real expression on the one identity:

> **[image withheld from the shared portfolio]** — *GAGAvatar da Vinci, talking reenactment* (`13_gagavatar_reenact_talking.png`). This is a three-panel
> reenactment figure whose middle panel is the GAGAvatar demo driver, an identifiable real
> public figure, and it carries a burned-in GAGAvatar logo. Held back pending Joey's call,
> consistent with the 2026-07-04 B1 media redaction. The full figure is in the repo at
> `docs/portfolio/building-the-face/images/13_gagavatar_reenact_talking.png`.

This was verified by eye on the rendered frames, not assumed from a clean exit code.

## The honest limit we hit: out-of-distribution teeth

GAGAvatar is trained on real human faces. The stylized cartoon is **out of distribution**, and it shows most in
the mouth interior. Because the cartoon source has a closed mouth, the model never sees its teeth, so when the
jaw opens it can only hallucinate a muddy smear:

> **[image withheld from the shared portfolio]** — *Cartoon source: muddy mouth interior* (`15_teeth_cartoon_muddy.png`). This is a three-panel
> reenactment figure whose middle panel is the GAGAvatar demo driver, an identifiable real
> public figure, and it carries a burned-in GAGAvatar logo. Held back pending Joey's call,
> consistent with the 2026-07-04 B1 media redaction. The full figure is in the repo at
> `docs/portfolio/building-the-face/images/15_teeth_cartoon_muddy.png`.

The same pipeline on a realistic frontal source (in distribution for the model) reconstructs a real, plausible
row of teeth, which confirms the cause is the source, not a bug:

> **[image withheld from the shared portfolio]** — *Realistic source: real teeth reconstruct* (`14_teeth_frontal_realistic.png`). This is a three-panel
> reenactment figure whose middle panel is the GAGAvatar demo driver, an identifiable real
> public figure, and it carries a burned-in GAGAvatar logo. Held back pending Joey's call,
> consistent with the 2026-07-04 B1 media redaction. The full figure is in the repo at
> `docs/portfolio/building-the-face/images/14_teeth_frontal_realistic.png`.

## The fix we tried, why it did not work, and the call we made

We kept the chosen cartoon **character** and tried to give the reconstructor teeth to work from: regenerate the
cartoon source with a gentle open-mouth smile (a low-strength image-to-image pass from the chosen cartoon, using
the same dreamshaper-8 pipeline that created it, so the identity is preserved and only the mouth opens). We swept
four strengths (0.35, 0.45, 0.55, 0.65) across four seeds, 16 candidates plus a montage.

**It did not work, and we are honest about why.** At every strength the mouth stayed shut. da Vinci's long
mustache structurally covers the mouth, so the image-to-image pass never parted the lips or added teeth, the low
strengths (which keep the cartoon look) least of all. No candidate gave the reconstructor teeth to copy.

**Decision (2026-07-07, Joey):** keep the chosen cartoon exactly as it is, and handle the teeth at the driving
stage instead of the source. The muddy smear only appears on wide-open-mouth frames, so we drive da Vinci with
gentle, mostly closed-mouth expressions (a good fit for a dignified Renaissance sage), which is where the smear
does not show, and we accept the occasional smear on the rare wide-open frame rather than change the character.
A targeted mouth-only inpaint would be the way to force real teeth if a later stage needs open-mouth speech, but
it is not worth trading away the cartoon we chose.

We also removed the tool's watermark logo from the rendered output, since these clips are ours to present.

## What this adds to the story

- **The right tool for the claim.** The warp was correct for an auditable, deterministic demo. For *real
  expressions from one identity*, only a 3D head suffices, and knowing when to change tools is part of the craft.
- **Honest about the domain gap.** The cartoon is a generated stylized approximation, and it is out of
  distribution for a real-face model. We showed the limit (muddy teeth), proved its cause (source, via the
  frontal A/B), tried the obvious source-side fix, reported that it failed and why (the mustache keeps the mouth
  shut), and chose to manage the limit at the driving stage rather than hide the frame or abandon the character.
- **Setup is part of the work.** The value here was diagnosis: reading the actual build scripts, matching the
  CUDA and compiler versions, and isolating each failure (conda license gate, unbound-variable activation hooks,
  missing CUDA headers) one at a time until the renderer compiled.

## What is next

- Teeth: resolved by choice, keep the cartoon, drive gentle closed-mouth expressions, tolerate the rare smear
  (mouth-only inpaint parked as a future option if open-mouth speech is ever needed).
- Render the **3D orbit** (rotating around the head), the headline proof that this is genuinely 3D, not
  reenactment alone.
- Drive it with a da Vinci-specific expressive sequence instead of the demo clip.
