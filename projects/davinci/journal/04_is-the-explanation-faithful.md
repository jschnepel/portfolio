# 4. The headline question: is the explanation faithful?

Most interactive characters can tell you a story about why they did something. The harder, more honest question is whether that story is actually *why*. A plausible explanation and a faithful one look identical from the outside, and only the faithful one is worth anything.

So the centerpiece of the project is not "it engages people." It is a serious attempt to measure whether the character's stated reason matches its real reason. I measured it two ways.

**Auditable by construction.** The engage decision is a deterministic function of the logged cues plus the hysteresis lock. So I wrote an independent re-implementation of the shipped decision rule and replayed it over the entire recorded session, holding the same internal lock state the live controller holds. It reproduces the logged decision, and the logged state, on every single frame. This is the strong claim: you do not have to trust the character's narration, because you can re-derive the exact decision from the numbers it logged.

**Forward-simulatability.** The weaker, more interesting question: if I show a neutral observer only the character's *displayed* explanation, can they predict who it chose? I built a held-out test with leak-free grouped cross-validation to answer that, in the spirit of the simulatability literature.

The honest result is that this second test is **inconclusive on the footage I have**. The displayed reasons predict the choice a little better than a position-only baseline, but the data is underpowered (one dominant clip, few genuine decision-changes), so the interval is too wide to claim a real effect, and a feature the decision does not even use predicts about as well. I did not round that up into a win. I built a synthetic control to confirm the test itself works (it is positive when the explanation truly encodes the decision and null when it does not), and I left the real-footage claim where it honestly sits: not established, pending a denser dataset and a human-rater study.

**The thing I want a reviewer to notice.** Throughout this, an adversarial review process poked holes after every step, and more than once it stopped me from shipping a number that looked good but did not hold up. The most valuable skill on display here is not getting a high score. It is refusing to claim one I did not earn.
