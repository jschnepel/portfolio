# 09 · The reframe: earned engagement, and a Leonardo who is actually grounded

This is the entry where the project grew up.

The earlier version had a clever hook: the character would notice something distinctive about a person, the bold colour they were wearing, and open on it. It demoed well. But two things were wrong with it, and both mattered.

First, it was the wrong *behaviour*. A character that engages whoever is nearest, on whatever it can see about them, is a greeter. In a real public space that is a nuisance, not magic. The interesting, human thing is not engaging more, it is engaging **intentionally**: noticing the one person for whom it is genuinely the right moment, and leaving everyone else alone.

Second, opening on what someone is *wearing* or how they *look* is exactly the kind of comment a character should never make. It reads as intrusive at best. So I pulled that whole idea out.

## What replaced it

The engine now runs on **restraint**. It engages at most one person, and only when two independent signals are both present: a genuine relevance signal (are you oriented toward it, are you present *with* it) and a social-license signal (have you come close, have you lingered, is this a moment where approach is warranted). If either is missing, the honest output is to **wait**. I measure this against an indiscriminate baseline that engages the nearest person every chance it gets, the "salesman", because restraint only means something if you can show what the greedy version would have done instead.

And every one of those choices, including every deliberate choice to hold back, is logged and **re-derivable from the log**. You can reconstruct, frame by frame, not just who it engaged but who it passed over and why. "Why not her?" has an answer. That auditability is the part I am most confident in.

## Giving him a real voice

The other half was the persona. Instead of improvised lines, I built a **source-grounded persona bible** from the historical record, fact-checked, and pinned every claim to a source: Leonardo's own notebooks and his *Treatise on Painting* for how he actually thought, and Vasari, the Anonimo Gaddiano, and Isaacson's biography for his character. The record corrected me more than once, I had wanted a slightly aloof, difficult Leonardo; the sources describe a charming, generous, endlessly distractible perfectionist who "began many things and never finished one of them." So that is who he is. When a citation outran its source, I fixed the citation, not the source.

What he says is drawn from **authored, fact-checked lines**, each about the shared craft: how a painted gaze seems to follow you across a room, why he abandoned so much to chase the next question. Never about the person in front of him.

## The parts that did not work (kept, per tradition)

Two reviews earned their place here.

- One flagged that a few of my authored lines still drifted toward the *person* rather than the *craft*, and read as too intimate. That was a fair hit. I rewrote them onto the work and added two hard guard rails: the character never comments on anyone's gaze, face, or body, and never on appearance or skin tone. A test now enforces it.
- Another caught a real hole in the live runner: if the character engaged someone but had run out of fresh lines for that topic, it printed nothing *and logged nothing*, an engagement with no audit trail, which quietly broke the one guarantee the whole project rests on. Now every engagement is recorded even when there is no line to say.

## Where it stands

The perception, the restraint policy, the auditability, and the grounded persona are built, and a **live integration runner** now chains them end to end: camera in, a restrained decision out, and when it engages, a fact-checked line plus the two-channel audit (what he says in one channel, why he engaged in the other, never mixed). The real camera run is waiting on a webcam session; the measured selectivity result and the believability study are designed but not yet run. Honest, and on the record, which is the whole idea.
