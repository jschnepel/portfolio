# Da Vinci Project — Material Kit

Raw, modular building blocks for a project page. Pick / cut / rearrange freely.
(`README.md` in this folder is an optional ready-made draft if you want a starting layout.)

> NOTE: this kit was reframed to the current direction, **earned, intentional engagement** in public space,
> and scrubbed of the earlier "comment on what a person is wearing" copy (the character never remarks on
> anyone's appearance, body, or gaze). Media with identifiable people is pending redaction before external use.

---

## 1. Titles & taglines (options)
- **Looking Alive — An Interactive, Perceptive Leonardo da Vinci**
- *A character that notices you, and has the restraint to know when not to.*
- *Engagement that is earned and intentional, not constant.*
- *It can tell you why it engaged you, and why it left the person beside you alone.*
- *From screen, to projection, to robot, one believable, grounded host.*

## 2. Elevator pitch
- **One sentence:** A real-time interactive Leonardo da Vinci that perceives the people around it, decides with restraint who to engage and when to hold back, reacts in a historically grounded persona about the shared craft, and can re-derive every decision from its log.
- **One paragraph:** Most digital characters run a script, and the naive "reactive" version just greets whoever is nearest, which in a real public space is a nuisance. This one does the harder, more human thing: it reads who is genuinely present with it and engages **intentionally**, at most one person, only when a real relevance signal and a social-license signal are both there, and otherwise it waits. Every choice, including every deliberate restraint, is logged and re-derivable, so "why not her?" has an answer. When it does engage, it speaks from authored, fact-checked lines grounded in Leonardo's own notebooks and the historical record, always about the shared fascination, never about how a person looks. Leonardo is the persona on purpose: history's greatest observer, so the character's superpower and identity are one.

## 3. The problem / why it matters
- The naive reactive character engages whoever is closest, on whatever it can see about them. In a shared space that is a greeter, and a nuisance.
- The valuable, human behaviour is **restraint**: engage the one person for whom it is genuinely the right moment, respect everyone else, and be able to prove the call. This builds that as a real-time, explainable system.

## 4. The three phases (modular)
- **Phase 1 — Master's: Virtual Interactive Da Vinci.** On-screen Leonardo perceives people via camera, decides who/when to engage *and when to wait*, reacts in a grounded persona, logs every decision. *Status: in progress; the perception + restraint engine + the authored persona run today, chained by a live integration runner.*
- **Phase 2 — Projected Da Vinci.** Same brain projected into physical space: life-size, plays to a crowd, aims attention at the right individual, can highlight exhibits with light. *Status: designed; next build.*
- **Phase 3 — Robotic Da Vinci (PhD).** The believable character transferred to a physical robot, reactive, expressive embodiment, sim-to-real. *Status: research roadmap.*
- **Through-line:** same heart (perceive, decide with restraint, react believably, stay auditable); the body changes, screen, projection, robot.

## 5. What's built today (capability bullets, plain language)
- Sees and tracks each person in a live camera feed with a stable ID, across a small group.
- Reads each person's **gaze / head orientation**, graded and directional ("present with it" vs "passing by").
- **Engages with restraint:** commits to at most one person, only when a genuine relevance signal *and* a social-license signal (proximity + dwell) are both present, otherwise it waits.
- Built to be measured against an **indiscriminate baseline** (engage the nearest person every chance): the baseline and the selectivity metrics are implemented; the measured run is pending consented/synthetic footage + an ethics annex.
- Speaks from **authored, fact-checked lines** grounded in the historical Leonardo, about the shared craft, never about a person's appearance or body.
- **Every decision is re-derivable from the log,** including every deliberate restraint. Auditable, not a black box. This is the real differentiator.

## 6. Key facts / specs (plain, honest)
- Runs in **real time** on a **single consumer GPU** (an earlier perception build measured ~26 FPS in small scenes; end-to-end numbers for the integrated runner are pending the camera run).
- Real-time multi-person perception + tracking; graded, directional attention/gaze sensing.
- A **restraint policy**: relevance gate + social-license gate + rate limits (cooldown, per-window cap, no re-engaging the same person).
- A grounded, **source-cited persona**: authored beats pinned to Leonardo's notebooks, his *Treatise on Painting*, Vasari, the Anonimo Gaddiano, and Isaacson.
- Full decision logging with **re-derivable audit** (reconstruct who was engaged, who was passed over, and why).
- *Honest scope:* the measured selectivity run and the believability study are designed but not yet run; no facial-expression model decides anything; audio + an animated face are a later layer.

## 7. Screenshot captions (file → caption + what it shows)
- **`media/dashboard.png`** — *Every decision on the record.* Analytics of who was engaged, who was passed over, for how long, and which signals drove each choice. → trustworthy & tunable; the core differentiator. (No people; safe to use.)
- **Analytics/plots** (`01_engagement_timeline`, `02_decision_funnel`, `03_score_components`, `07_dwell_per_target`, `baseline_comparison`, etc.) — decision timelines, the engage/wait funnel, per-signal contributions, and the restraint-vs-baseline comparison. → the auditability + selectivity story. (Charts; safe to use.)
- **Hero shots of people** (`hero_corridor`, `hero_gaze`, `hero_faces`, `hero_speaking`, `hero_engage_3people`, `hero_openvocab`) — live-scene captures of the system choosing whom to engage. → **REDACTION PENDING**: identifiable non-consenting people; do not use externally until redacted (Thread F). Refreshed captures on consented/synthetic footage to follow.
- **`media/explainability.mp4`** — *Live capture* of an earlier build (boxes, target, the "why" panel). → being refreshed for the reframed system.

## 8. The four advisors (name → blurb)
- **Markus Gross** *(ETH Zürich / Disney Research)* — interactive digital characters and the tech that makes them feel present, including projection into physical space.
- **Heni Ben Amor** *(Arizona State, Interactive Robotics Lab)* — reactive control and robot learning: characters/robots that respond to people in the moment. The engine behind the robotic phase.
- **Joseph Campbell** *(Purdue, CAMP Lab)* — theory of mind, anticipating human intent, and *interpretable* interaction, a character that reasons about people and can explain why it acts. Backbone of the "justify every decision" principle.
- **Stelian Coros** *(ETH Zürich, Computational Robotics Lab)* — physics-based, expressive character and robot motion, moving a believable performance into a body that obeys physics.
- **Mapping to the arc:** Gross (believable character + projection) → Campbell (perceive & reason, explainably) → Ben Amor / Coros (into a physical reactive robot).

## 9. Why it fits public-space & immersive experiences
- A character in a shared space earns its keep by engaging the right person at the right moment and respecting everyone else, the opposite of a greeter that talks at whoever is nearest.
- This delivers that as a real-time, restrained, explainable system: notice genuine signals, engage intentionally, react in a grounded persona about the craft, and prove every call. A themed-character deployment is one possible demo, not the framing.
- Da Vinci is the first character; the earned-engagement + auditability engine is the reusable product.

## 10. Suggested page structure (assemble as you like)
1. Hero: title + tagline + one strong **chart/dashboard** image (people-shots pending redaction).
2. Elevator pitch.
3. "What's built today" bullets + the auditability/selectivity plots.
4. Short "how it works" flow (perceive → decide with restraint → react, all explainable).
5. The three-phase arc.
6. The four advisors.
7. Why public-space / immersive.
8. Roadmap + the live clip (once refreshed).

## 11. Roadmap (modular)
- **Now:** perception + the restrained who/when-or-wait decision engine + full auditability + the authored, fact-checked persona, chained by a live integration runner (camera run pending a webcam session).
- **Next:** the measured selectivity result (restraint vs the indiscriminate baseline, on consented/synthetic footage); an expressive talking face + richer voice; more persona concepts (hands, light, flight).
- **Phase 2:** projection + crowd play + attention-to-the-right-person + exhibit highlighting.
- **Phase 3 (PhD):** transfer to a physical reactive robot.

---
*Drop new charts in `media/` and dated progress notes in `journal/` as the project grows. People-shots need redaction before external use.*
