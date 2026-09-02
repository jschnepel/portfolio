# 3. Model B: an honest negative

The obvious next step was to read *engagement* from the face: chain the expression model into a model that predicts whether a person is engaged, trained on DAiSEE, a dataset built for exactly that.

It did not work. And I kept the negative result instead of quietly dropping it.

Here is the part that makes it a real finding rather than a shrug. A failed model can fail for two very different reasons, and they have opposite implications. Either the *idea* is wrong (facial expression just does not carry engagement), or the *pipeline* is wrong (the features I fed it were too thin). I did not want to confuse the two, so I ran a diagnostic instead of guessing:
- A simple probe asked whether any classifier could beat the floor using the expression probabilities. It could not.
- A frame-shuffle control destroyed the time order and re-measured. The score did not change, which means the temporal model was using no temporal structure at all. So "add a fancier sequence model" was not the answer.

That localized the bottleneck to the features. When I swapped in head-pose and action-unit features instead of raw expression probabilities, the model cleared the floor, modestly but measurably, on a heavily imbalanced task. That is consistent with the published literature, which finds head-pose and gaze carry engagement better than expression alone.

**Why this entry matters more than a working model would.** A portfolio full of green checkmarks is not believable. This is the entry where the system told me something I did not want to hear, I designed a clean test to make sure it was telling the truth, and I wrote down the honest conclusion: expression-only is a weak engagement signal, and I can prove it is the features and not the construct. That is a better result than a mediocre model dressed up as a win.
