# 2. Model A: teaching it to read faces

The loop needed a sense of what a person's expression was doing, so I trained a facial-expression model (EfficientNet-B0, transfer-learned on FER2013).

The accuracy is fine for what it is: about 0.63 accuracy and 0.59 macro-F1, which sits near the roughly 65 percent human ceiling people cite for this dataset, and well above a from-scratch CNN and the majority-class floor. I trained it across five seeds and reported the spread, not a single lucky run, and I checked its calibration (expected calibration error around 0.04) so that a confident prediction means something.

But the accuracy is not the part I am proud of. The part I am proud of is catching a data leak before it flattered me.

FER2013 has near-duplicate images, and some of them straddle the train and test split. If you do not check, the model "memorizes" a few test faces during training and your reported accuracy is quietly inflated. I pixel-hashed the images, found the overlaps, and removed them before trusting any number. It is an unglamorous half-day of work that makes every later number honest, and it set the tone for the rest of the project: be suspicious of your own good results.

**The honest limit, stated plainly.** A FER2013 label is the emotion an annotator assigned to a posed or in-the-wild photo. It is not the same thing as what a person is actually feeling, and the model has not been calibrated to a webcam in the deployment space. So Model A is a useful perceptual signal, not a mind-reader, and the system never treats it as one.
