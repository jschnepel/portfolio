# 6. Where it stands, and what is next

It is worth being precise about what is real, what is honestly not finished, and where this goes.

**What is real and working:**
- A real-time reactive system that perceives the people in front of it, decides who to engage and what to open on, and reacts in persona, at around 27 frames per second on one GPU.
- Every engagement decision is auditable: an independent re-implementation of the decision rule reproduces the logged choice on every frame. You never have to take the character's word for it.
- A trained, calibrated facial-expression model, with a real data-leak caught and removed.
- An honest, well-diagnosed investigation of reading engagement from the face, including a clean negative result.
- A rigorous methodology for asking whether the character's stated reasons are its real reasons, with an adversarial review process that repeatedly kept the claims in line with the evidence.

**What is honestly not done:**
- Whether the *displayed* explanation is faithful, as opposed to merely auditable, is not statistically established on the footage I have. It needs denser, multi-person footage and a study with human raters. That is the conclusive test, and it is the clear next step.
- Object naming is the weakest perceptual channel and is currently off, because it could not meet the faithfulness bar on commodity-resolution footage. Better, higher-resolution detection could bring it back, gated properly.

**Where it goes:**
- The human-rater faithfulness study, on footage with real competition for the character's attention.
- A richer embodiment: from the current on-screen host toward a 3D animated bust, and eventually a physical one.
- Stronger held-object grounding, validated against the skeleton, so the character can once again open on a specific item, but only when it can honestly justify seeing it.

The honest one-line summary: this is a real-time character that decides who to engage and can prove why, built and evaluated under the discipline that it is never allowed to claim something it cannot show.
