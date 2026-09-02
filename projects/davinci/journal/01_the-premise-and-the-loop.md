# 1. The premise and the first loop

The bet behind this whole project is small and stubborn: a character feels alive the moment it notices *you* in particular, not a generic friendly greeting, but a reaction to something true about the person actually standing there. Leonardo is the persona on purpose. History's greatest observer is the right host for a system whose superpower is observation.

So the first thing I built was not a face or a voice. It was a perception-to-decision loop that runs in real time and can explain itself.

**What it does, in one pass per frame:**
- Finds the people in front of the camera and tracks them with stable IDs, so "person 2" stays person 2 across frames (YOLO11-pose plus ByteTrack).
- Reads a graded "is this person facing me" signal from facial keypoints. I am careful to call this head orientation, not gaze. It is an honest proxy, and labeling it accurately mattered later.
- Scores each person for engagement from five named cues: how much they are attending, how close they are, how central, whether there is a specific distinctive detail to open on, and whether they are alone. The score is a plain weighted sum.
- Picks a state: engage one person, bid for someone's attention, or idle. A hysteresis rule keeps it from flickering back and forth between two equally good candidates, the way a good host holds a conversation instead of head-snapping around the room.

It runs around 27 frames per second on a single commodity GPU.

**The design rule that shaped everything after.** Every one of those cues is a number that gets logged, and every decision is the arg-max of those logged numbers. That was a deliberate constraint, not a convenience. If the character is going to claim it noticed you, I wanted to be able to open the log and show exactly why it picked you and not the person next to you. That constraint is easy to write down and, as later entries show, surprisingly hard to actually honor.
