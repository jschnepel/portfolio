# Added to the portfolio — 2026-09-02

Deposited from `Desktop/masters thesis/`. Nothing already here was modified, moved, or deleted.

## What was added

**`building-the-face/`** — the "Building the Face" write-up, the story of taking Leonardo's own
self-portrait to a controllable, expressive 3D head. Five documents:

| File | What it is |
|---|---|
| `BUILDING-THE-FACE.md` | the main narrative |
| `HOW-EACH-PART-WORKS.md` | the mechanism, part by part |
| `MAKING-OF.md` | how the cartoon rendition was chosen and built |
| `THE-3D-UPGRADE.md` | the GAGAvatar 3D Gaussian-head upgrade, and the honest limit it hit |
| `TUNING.md` | the expression/head-turn tuning pass |

**`building-the-face/images/`** — 14 figures. Every one visually inspected: no identifiable real
people, no third-party logos or watermarks. (`01_self_portrait.jpg` and `04_selfportrait_crop.png`
are Leonardo's own historical drawing.)

**`media/davinci_cartoon_beats.mp4`** — 30s, 512x576, 25fps. The cartoon da Vinci moving and
speaking authored beats, with the engagement state and caption burned in. No driver panel, no logo,
no real people. This is the first moving clip in the portfolio; the previous demo videos were
archived offline in the 2026-07-04 B1 redaction and never replaced.

**`site/`** — the single-file portfolio page scaffold (`index.html`, titled "Joey Schnepel —
Interactive AI Characters") and its setup notes. It still carries four TODOs: demo video, resume
link, GitHub link, contact.

## What was deliberately WITHHELD — needs your decision

Four figures from `building-the-face/images/` were **not** copied:

- `12_gagavatar_reenact_neutral.png`
- `13_gagavatar_reenact_talking.png`
- `14_teeth_frontal_realistic.png`
- `15_teeth_cartoon_muddy.png`

Each is a three-panel reenactment figure whose **middle panel is the GAGAvatar demo driver — an
identifiable real public figure** — and each carries a **burned-in GAGAvatar logo**. Two independent
reasons to hold them, and both match standing decisions here: the 2026-07-04 B1 redaction pulled
identifiable people from this same folder, and the existing `media/face/` set kept only the
`_nodriver` variants, which reads as the same call already made once.

`THE-3D-UPGRADE.md` embeds all four. In the copies here those embeds are replaced with an inline
note pointing back to the repo. **The source repo is untouched** — the originals remain at
`docs/portfolio/building-the-face/images/`.

If you want that section whole, the clean fix is the one the project already prefers: re-render the
reenactment against a consented or synthetic driver, and crop the logo.

Three video files were withheld for the same reason:
`outputs/face/gagavatar_davinci_obama.mp4`, `gagavatar_obama_davinci_cartoon_nologo.mp4`, and
`gagavatar_obama_davinci_frontal_nologo.mp4`. The `_nologo` pair has no watermark but still shows
the driver.

## Also considered, not added

- `demo/reactive_agent/outputs/face/davinci_photoreal.mp4` — superseded by the cartoon, and
  `docs/FACE-RENDITIONS.md:48` records that it was driven by the **old** decision stream (old bid
  lines). Stale; re-render before using.
- `davinci_portrait.mp4` (44 MB) and `run_log_corridor_bust.mp4` — earlier, cruder renditions.
  Both are people-free (the corridor one renders a stylized line face, not the footage), so neither
  is a privacy problem — they just aren't portfolio-grade.
- `archive/portfolio-media-2026-07-04/` — the B1-redacted material. Left where it is, deliberately.

## Still outstanding from the 2026-07-04 redaction

These were flagged as account-owner actions and, as far as this deposit can tell, remain open:
purge Dropbox Trash and version history for the 10 archived people-files; confirm the portfolio URL
was not already shared or cached; and the age call on the two uninspected videos.
