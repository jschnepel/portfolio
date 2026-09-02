# 5. The day I caught it hallucinating

This is the entry I would point a reviewer to first.

I was reviewing screenshots of the character in action, the ones meant for this portfolio, and something was off. The character was addressing a man and saying, in persona, "the handbag caught the light, and so did my curiosity." There was no handbag. It was the man's leg. In other frames it called a woman's face glasses, a person's hair a hat, and the pattern on a dress a necklace. The character was confidently narrating things that were not there, and asserting them as fact.

For most projects this is a funny bug. For this one it was the worst possible failure, because the entire thesis is *faithful* explanation. A character that hallucinates a detail and then claims it noticed that detail is not a small glitch. It is the exact thing the project exists to prevent.

I traced it. The open-vocabulary object detector was running at a 3 percent confidence threshold, so it would label almost any patch of a person as almost any object, and the narrator would then state the result as if it were real. The fix took three escalating attempts, and the honesty is in the escalation:

1. **Raise the confidence floor.** This killed the low-confidence ghosts, but some hallucinations were confident: hair scored as a hat at 0.55, glasses at 0.65. A threshold alone could not save it.
2. **Curate the vocabulary.** I removed the classes the detector confuses with body parts (hats from hair, glasses from faces, necklaces from necklines). This handled the wearables.
3. **A skeleton gate.** Using the pose skeleton already in every frame, I required a held object to actually sit near a wrist. A bag on a foot is not a bag.

And then the honest, uncomfortable part: even after all three, the handbag survived. A hand or forearm that the detector mislabels "handbag" sits *right at the wrist*, so the skeleton gate is powerless against it, a bag is *supposed* to be near a hand. So I removed the bag classes entirely. The end state is that on this footage the object channel finds nothing at all, and the character falls back to grounding it can defend: your distinctive color, where you are looking, how close you are.

**The consequence I did not expect.** Those false objects were not cosmetic. They were 758 of the roughly 975 "hooks" feeding the engagement decision, which meant my entire evaluation had been running on hallucination-driven data. So I regenerated everything and re-ran the headline test. The honest conclusion held: removing the noise did not manufacture a result, it just made the system tell the truth.

The lesson is the whole project in miniature. Faithfulness is not a feature you add once. It is a property you have to keep defending, and the most valuable thing a system like this can do is make its own mistakes visible enough to catch.
