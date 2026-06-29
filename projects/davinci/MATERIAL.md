# Da Vinci Project — Material Kit

Raw, modular building blocks for a project page. Pick / cut / rearrange freely.
(`README.md` in this folder is an optional ready-made draft if you want a starting layout.)

---

## 1. Titles & taglines (options)
- **Looking Alive — An Interactive, Perceptive Leonardo da Vinci**
- *A character that doesn't just talk at you — it notices you.*
- *Being noticed specifically is what makes a character feel alive.*
- *The "it noticed me" moment — built as a real-time system.*
- *From screen, to projection, to robot — one believable host.*

## 2. Elevator pitch
- **One sentence:** A real-time interactive Leonardo da Vinci that perceives the guests in front of it, decides — like a good host — who to engage and what specific detail to open on, and reacts in character, explainably.
- **One paragraph:** Most digital characters run a script. This one *sees you first* — your red hat, the camera around your neck, a kid's toy lightsaber — and opens on that, in persona. The premise: being noticed *specifically* (real perception, not generic friendliness) is what makes a character feel alive. Leonardo is the persona on purpose — history's greatest observer — so the character's superpower and identity are the same. Built for guests in real spaces (queues, exhibits, lobbies), where a character that reacts to *this* person turns a wait into a moment.

## 3. The problem / why it matters
- The most repeatable bit of theme-park magic is a character who makes a guest feel *seen* — today that depends on a gifted human performer.
- This builds it as a real-time, repeatable, explainable system: notice the specific guest, react in persona, play to a crowd, eventually step off the screen into the room.

## 4. The three phases (modular)
- **Phase 1 — Master's: Virtual Interactive Da Vinci.** On-screen Leonardo perceives guests via camera, decides who/what/when to engage, reacts believably — real time, fully explainable. *Status: in progress; the perception + decision engine runs today.*
- **Phase 2 — Projected Da Vinci.** Same brain projected into physical space: life-size, plays to a crowd, aims gaze at the right individual, can highlight exhibits with light. *Status: designed; next build.*
- **Phase 3 — Robotic Da Vinci (PhD).** The believable character transferred to a physical robot — reactive, expressive embodiment, sim-to-real. *Status: research roadmap.*
- **Through-line:** same heart (perceive → decide → react believably); the body changes — screen → projection → robot.

## 5. What's built today (capability bullets, plain language)
- Sees people and objects in a live camera feed; tracks each person with a stable ID.
- Reads each guest's **gaze / head orientation** — graded and directional ("looking at me" vs "looking away").
- **Open-vocabulary** recognition of specific details — hat, glasses, tie, scarf, even a "toy lightsaber" — not a fixed object list.
- A **"host" decision**: out of everyone in view, choose *who* is open to a moment and *what* specific detail to open on.
- **Earns attention** when a guest is close but distracted — a catchy, respectful bid before fully engaging.
- **Every decision is logged and visualized** — fully explainable and tunable, no black box.

## 6. Key facts / specs (plain, honest)
- Runs in **real time (~26 FPS)** on a **single consumer GPU**.
- Real-time multi-person perception + tracking.
- Graded, directional attention/gaze sensing.
- Open-vocabulary detail recognition (you can edit the list of "commentable" things).
- Three behaviour states: **engage / bid-for-attention / wait.**
- Decision logging + analytics dashboard for trust & tuning.

## 7. Screenshot captions (file → caption + what it shows)
- **`media/hero_corridor.png`** — *Choosing who to engage.* Three guests in a corridor; the character scores each, commits to one on a specific detail, and the panel says who it passed over and why. → demonstrates the "good host" judgment.
- **`media/hero_openvocab.png`** — *Noticing specific things by name.* Engages a guest on "the glasses" — an item recognized open-vocabulary, not from a fixed list. → the raw material of "it noticed me."
- **`media/hero_gaze.png`** — *Knowing when you're looking.* Graded, directional read of a guest's gaze/head orientation. → engages people who are present *with* it.
- **`media/hero_bid.png`** — *Earning attention.* A guest is close but distracted, so the character throws a catchy, respectful bid ("…yes, you! Your eyes are missing something marvelous.") before engaging. → the most human touch.
- **`media/hero_faces.png`** — *Two guests, one choice.* Engages the one facing it; passes the one turned away ("not attending"). → selection logic at a glance.
- **`media/dashboard.png`** — *Every decision on the record.* Analytics of who was engaged, for how long, and which factors drove each choice. → trustworthy & tunable.
- **`media/explainability.mp4`** — *Live capture* of the running system (boxes, target, the "why" panel moving in real time).

## 8. The four advisors (name → blurb)
- **Markus Gross** *(ETH Zürich / Disney Research)* — interactive digital characters and the tech that makes them feel present, including projection into physical space. Closest lineage to a believable, deployable character host.
- **Heni Ben Amor** *(Arizona State, Interactive Robotics Lab)* — reactive control and robot learning: characters/robots that respond to people in the moment. The engine behind the robotic phase.
- **Joseph Campbell** *(Purdue, CAMP Lab)* — theory of mind, anticipating human intent, and *interpretable* interaction — a character that reasons about people and can explain why it acts. Backbone of the "explain every decision" principle.
- **Stelian Coros** *(ETH Zürich, Computational Robotics Lab)* — physics-based, expressive character and robot motion — moving a believable performance into a body that obeys physics.
- **Mapping to the arc:** Gross (believable character + projection) → Campbell (perceive & reason, explainably) → Ben Amor / Coros (into a physical reactive robot).

## 9. Why it fits immersive / themed entertainment
- The single most repeatable theme-park magic is a character who makes a guest feel *seen*.
- This delivers that as a real-time, repeatable, explainable system — notices the specific guest, reacts in persona, plays to a crowd, and (eventually) steps into the room.
- Da Vinci is the first host; the perception + decision engine is the reusable product.

## 10. Suggested page structure (assemble as you like)
1. Hero: title + tagline + one strong screenshot (`hero_corridor` or `hero_openvocab`).
2. Elevator pitch.
3. "What's built today" bullets + the gaze / open-vocab / bid screenshots.
4. Short "how it works" flow (perceive → decide → react, all explainable).
5. The three-phase arc.
6. The four advisors.
7. Why immersive / themed entertainment.
8. Roadmap + the live clip.

## 11. Roadmap (modular)
- **Now:** perception + who/what/when-to-engage decision engine (running).
- **Next:** expressive talking face; richer in-character voice; an affect read so Leonardo senses how a guest responds and adapts.
- **Phase 2:** projection + crowd play + gaze-to-the-right-guest + exhibit highlighting.
- **Phase 3 (PhD):** transfer to a physical reactive robot.

---
*Drop new screenshots in `media/` and dated progress notes in `journal/` as the project grows.*
