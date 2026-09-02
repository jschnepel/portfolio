# How each part of the face is driven (designed, not trained)

*Honest framing: the face animation is NOT a trained model. Every part, lips, timing, eyes, brows, head, is a
DETERMINISTIC, hand-designed rule or preset that is a function of the logged decision + the spoken line. That
is a deliberate choice: it makes the face faithful and auditable by construction (the same decision always
produces the same face, no learned black-box), which is the project's core property. The only TRAINED models
involved are pretrained, off-the-shelf ones we run for inference, listed at the end.*

## The parts, and how each is driven

### Lips / mouth (`face/speech.py`, `speak_timeline`)
- **Rule, not trained.** The spoken line's TEXT is turned into a mouth-openness value per frame: a vowel
  (`a e i o u y`) opens the mouth (target 0.85, viseme "open"), any other letter closes it toward 0.25
  ("closed"), a space or punctuation rests it at 0.0. Values are smoothed (`0.55*prev + 0.45*target`) so the
  mouth does not strobe. Output: `mouth_open` in [0,1] per frame.
- In the render, `mouth_open` drives the lower-lip landmarks (opens the mouth in the warp).
- Deterministic: the same line always animates identically.

### Timing / speaking rate (`face/speech.py`)
- **Fixed rate, not learned.** Duration = `max(0.6 s, len(text) / 14)` at ~14 characters per second (a calm
  narrator pace), sampled once per render frame (fps). Longer lines take proportionally longer. Idle beats are
  a short ~0.6-0.7 s rest. No timing model, a chosen constant.

### Eyes (`face/controls.py` presets + the warp)
- **Preset weight, not trained.** The `eyeWide` ARKit weight is set by the decision STATE, idle 0.0, notice
  (bid) 0.12, engage scales with warmth (`0.05 + 0.12*score`). So the eyes widen as engagement rises. In the
  warp this lifts the upper-eyelid landmarks; the head-turn shifts the eyes with the face.

### Eyebrows (`face/controls.py` presets)
- **Preset weights, not trained.** `browInnerUp` / `browOuterUp` are set per state, idle ~0.04 (relaxed),
  NOTICE/bid raised and inviting (`browOuterUp 0.34`, `browInnerUp 0.22`), engage moderate (`browInnerUp 0.20`).
  The brows lift most when he is trying to catch a distracted person's attention. In the warp this raises the
  brow landmarks.

### Head / gaze (`face/controls.py`, `face_from_record`)
- **Geometry, not trained.** The head turns toward wherever the engaged person is on screen:
  `yaw = (cx_norm - 0.5) * 2 * MAX_YAW` (cap 28 deg), `pitch = (cy_norm - 0.5) * 2 * MAX_PITCH` (cap 12 deg),
  from the target's normalized pixel position. A held target (hysteresis) is damped (`0.6*yaw + 0.4*prev_yaw`)
  so the head does not jitter. Pure function of the logged target position.

### Expression / warmth (`face/controls.py` `PRESETS`)
- **Hand-designed presets, score-scaled.** Each state has a base set of ARKit weights (a calm observing face,
  an inviting bid face, a warm interested engage face). On engage, `mouthSmile` (`0.15 + 0.45*warmth`) and
  `eyeWide` scale with the engagement score, a stronger, closer, attending person gets a warmer face than a
  marginal one. The "warmth" is the logged decision score, not an inferred emotion.

### The warp itself (`face/render_photoreal.py`)
- **Classical algorithm + a pretrained detector.** MediaPipe detects 478 face landmarks on the still; the
  weights/gaze/mouth above move the control-point landmarks; a **thin-plate-spline** (a standard interpolation,
  not learned) deforms the image per frame. We did not train the warp; the landmark detector is Google's
  pretrained model.

## What IS trained (pretrained, used for inference, not trained by us)
- **MediaPipe FaceLandmarker** (Google), the 478-point detector. Pretrained; we run it.
- **Stable Diffusion / dreamshaper-8**, generated the cartoon image (img2img from the self-portrait).
  Pretrained; we ran inference, no fine-tuning.
- **(Separate, and NOT in the face path) Model A, the FER expression reader (D804)** is the one model WE
  trained (EfficientNet-B0 on FER2013). It reads a VISITOR'S expression, not da Vinci's, and it is
  deliberately DECOUPLED from the engagement decision and the face. It does not drive any of the above.

## If you want a TRAINED version of a part (future)
Each rule above has a learned upgrade, if the payoff warrants the complexity:
- **Lips:** replace the text-rule timeline with **audio-driven lip-sync** (e.g. NVIDIA Audio2Face) that
  predicts visemes from a TTS `.wav`, the standard learned lip-sync, and it emits the same ARKit weights, so
  it drops into this exact pipeline.
- **Expression / head:** a learned motion model conditioned on the decision, but that trades away the
  by-construction faithfulness the current design guarantees, so it would be a deliberate tradeoff.
- **The head geometry:** already exact; no training needed.

## Training and epochs (the honest answer)
There are **no epochs for the face**, none of the parts above is trained, so there is nothing to report per
part. The training and epochs in this project belong to the **perception models (D804)**, which are separate
from the face:
- **Model A, FER (the only trained neural network):** EfficientNet-B0 transfer-learned on FER2013, **12
  epochs, 5 seeds**, cross-entropy, 112 px, on exact-pixel-deduped data. Results: accuracy 0.634 +/- 0.008,
  macro-F1 0.593 +/- 0.009, ECE 0.042; sanity-checked (loss-at-init 1.942 vs the theoretical ln 7 = 1.946;
  overfit-one-batch ~7e-5). It reads a VISITOR'S expression and is decoupled from the face and the decision.
  Full details: `docs/d804/D804-PA-report.md` + `docs/d804/d804-results-report.md`.
- **Model B, engagement (DAiSEE):** NOT epoch-based, a GMM-HMM fit by expectation-maximization plus
  logistic / random-forest / gradient-boost classifiers, evaluated across 10 CV seeds. No neural epochs.
- **The cartoon image:** Stable Diffusion INFERENCE (a pretrained checkpoint), no training, no epochs.

So the only "epochs" anywhere in the project is **Model A's 12**. The face's realism comes from design, not
from training.

The honest headline for the portfolio: **this face is a transparent, deterministic control system, not a
learned one, and that is a feature, not a gap.**
