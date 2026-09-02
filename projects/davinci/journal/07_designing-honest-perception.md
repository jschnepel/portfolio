# 7. Designing honest perception (and deciding what not to build)

After catching the system hallucinating objects (entry 5), the obvious next move was to throw a better,
trained model at the problem. The more useful engineering happened in deciding, carefully, *which* model
and *whether to build it yet*. This entry is about the design decisions and the reasoning, because the
reasoning is the point.

**The chain of fixes, and the one principle underneath them.** Every perception fix this round came from
the same rule: the character may assert only what the input genuinely supports. That rule produced a
sequence of decisions, each recorded with its why: raise the object detector's confidence floor; remove
the wearable classes the detector confuses with body parts (hair becomes "hat", a face becomes "glasses");
add a skeleton gate so a held object has to actually be near a hand; and finally remove the bag classes
entirely, because a bag is *expected* at the hand, so no gate can tell a real handbag from a forearm the
model mislabels. Then the same rule caught a quieter failure: the colour read was calling 98% of guests
"brown," because a tiny low-resolution torso patch averages to mud. So the colour cue now speaks only when
the colour is genuinely vivid and confident, and stays silent otherwise.

The honest result of all of this is that on low-quality footage the character says **nothing specific**,
and leans on what it can defend: that you are looking at it, that you have come close. That is not a
failure to hide. It is the system telling the truth about what it can see.

**The harder decision: a trained model, and the discipline not to ship it.** The right long-term fix is a
trained perception model that classifies what is distinctive about a person (a colour, a hat, a held cup)
with a confidence you can trust, and narrates only above that confidence. I researched the model families,
landed on the one actually designed for this domain, and wrote up the plan. Then I put it through the same
adversarial review the rest of the project gets, and the review said, correctly: not yet, and not as
framed.

The reasons are worth keeping, because they are the difference between an engineer who adds models and one
who knows their cost:
- The whole value of the upgrade is a *calibrated* confidence, and a confidence learned on one domain and
  applied to another lies with confidence. That is the exact failure I had just removed, wearing a more
  respectable label.
- The real measure of success is whether the narrated detail is *correct*, not whether the model is
  confident. Those are different things, and only the first one matters to a guest.
- These models predict sensitive attributes by default. Logging the full attribute vector "for
  auditability" would quietly build a demographic profile of every visitor, which is the surveillance harm
  the feature was meant to avoid.
- The real-time loop is already at the edge of its frame budget. A third network does not fit without
  shortcuts, and the obvious shortcut (reuse a cached read across frames) breaks under crowding in a way
  that makes the character confidently address the wrong person.

So the decision was to **defer** the trained model behind the thesis's actual contribution (proving the
explanation is faithful), to write down the exact conditions under which it would become worth building,
and to keep the honest, simpler version running in the meantime.

The maturity in a project like this is not the number of models. It is knowing that the cheaper, honest
version that admits what it cannot see is worth more than an impressive one that confidently makes things
up. The full reasoning, decision by decision, lives in the project's design-decision log.
