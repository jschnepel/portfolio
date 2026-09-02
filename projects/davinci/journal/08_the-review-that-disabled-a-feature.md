# 8. The review that disabled a feature (and why that was the win)

Every build phase on this project goes through an adversarial review: a panel of specialist reviewers
whose only job is to attack the work in their domain (ethics, statistics, systems, ML, scope), and a chair
who synthesizes one verdict. They do not praise. They find the thing that is wrong and they name it with a
file and a line number. This entry is about one stretch where I ran that review five times in a row against
the same body of work, fixing what it found and handing it back, until it passed clean. The point of the
entry is not that it passed. It is what it caught on the way.

**The catch that mattered.** A few rounds in, the ethics reviewer found something I had not. The evaluation
runs on public stock footage of real pedestrians who never agreed to be in it. I had already written that
honestly into the scope: a technical benchmark, no identity computed or stored, stated as a limitation. I
thought that was the careful version. The reviewer pointed out that the system was also running a facial
expression model on every face in that footage, by default, and logging the result. That is emotion
recognition on non-consenting people. Disclosing it is not the same as being allowed to do it, and worse,
that expression channel was not even load-bearing: it was an unused control in the evaluation, and there
was already a flag to turn it off.

So I turned it off. I gated the expression model behind an explicit consent flag, regenerated every log
with it disabled, and confirmed there were zero emotion labels left on those people. The honest cost is
that the evaluation lost a comparison it used to report, which made one of my results read a little weaker.
That was the right trade. Not running emotion recognition on people who did not consent matters more than a
noisy comparison number, and a result that is slightly weaker but clean is worth more than one that is
slightly stronger and quietly indefensible.

**The lesson that kept recurring.** The other thing the five rounds taught me is duller and just as useful.
I kept fixing a claim in the documents I was looking at, and missing the same claim a second time in the
one file that mattered most: the authoritative status file. The reviewer eventually named the fix as a rule:
treat that file as the place corrections flow *to*, not from, and check it last. The next time I did, it
caught two more stale lines my first pass had missed. A process insight, written down so it stops happening.

**Why I keep paying for this.** Running a hostile review five times is not free, and it would have been
easy to stop after the technical work passed in round two. I did not, because the rounds after that were
the ones that found the emotion-recognition problem and the places where two different versions of the
project's scope were both still on the record. None of those were code bugs. They were the kind of thing
that is invisible from inside the work and obvious to someone trying to break it. The character is supposed
to be honest about what it can perceive. The least I can do is hold the project to the same standard, which
means letting someone try hard to prove it is not.
