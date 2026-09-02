# Tuning da Vinci's face

*How the face's expression is tuned, and the 3x3 grids that show the range. The face is driven by a small set
of control weights, tuning is dialing those, not retraining anything (see `HOW-EACH-PART-WORKS.md`).*

## What "tuning" means here
The face has no learned parameters; its expression is a handful of **control weights** on the still image:
- **smile** (`mouthSmile`), **brow-raise** (`browInnerUp` / `browOuterUp`), **eye-widen** (`eyeWide`),
  **mouth-open** (the lip-sync value), and **head-turn** (gaze yaw / pitch).
- Two global scales make it easy to dial the whole feel: **expression intensity** (multiplies smile + brow)
  and **head-turn range** (multiplies the yaw).

Tuning is choosing those values. Because the same weights feed the cartoon warp, the FLAME head, and a
MetaHuman, what you dial in transfers to any renderer.

## The grids
Each grid is a 3x3 of the cartoon da Vinci at nine expressions (neutral, gentle/warm smile, brow-raised,
wide-eyed, engaged, speaking, glance left/right), rendered through the real animation warp.

- `images/09_expression_grid_default.png`, **default tuning** (intensity 1.0, head-turn 1.0).
- `images/10_expression_grid_lively.png`, **tuned lively** (intensity x1.6, head-turn x1.8), the same nine
  expressions, pushed.

## Honest note on the range
The current animator is a **2.5D thin-plate-spline warp of a still**, so it moves the mouth, brows, eyes, and
head, but it **cannot make dramatic expressions** (it can't reshape a smile or add teeth the way a rigged 3D
face or a learned model could). So the grids read as a **subtle, gentle** range, that is a real property of
the method, not a bug. The "lively" grid is close to the practical ceiling of the warp. Bigger, more
cartoon-exaggerated expressions are the payoff of the 3D upgrade (a FLAME rig or GAGAvatar), on the roadmap.

The interactive version (`face/tune_grid.py`, a Gradio app with live sliders) exists for dialing settings in
real time, but these two static grids are the portfolio images; no re-render needed to read them.
