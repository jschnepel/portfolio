import { BentoTile } from "../BentoTile";
import { ScrollReveal } from "../ScrollReveal";
import { VideoFigure } from "../VideoFigure";
import { ACCENT, SectionLabel, ImageFrame, PlaceholderFrame } from "./shared";

const FACE = "/projects/davinci/face";

/** The four hand-designed control channels the decision stream drives. */
const controls = [
  {
    label: "// lips",
    title: "A mouth timeline written from the text",
    body: "Each vowel in the spoken line opens the mouth toward 0.85, each consonant closes it toward 0.25, punctuation rests it at zero — then the whole track is smoothed so it doesn't strobe. No lip-sync model, and the same line always animates identically.",
  },
  {
    label: "// eyes & brows",
    title: "Presets that scale with the engagement score",
    body: "Each decision state carries a set of ARKit weights: relaxed while observing, brows raised and inviting on a bid, warm on engage. The eye-widen and smile weights scale with the logged score, so a person who is closer and more attentive gets a warmer face than a marginal one.",
  },
  {
    label: "// head & gaze",
    title: "Geometry, straight from the target's position",
    body: "Yaw and pitch are a direct function of where the engaged person sits in frame, capped at 28° and 12°, and damped across held targets so the head doesn't jitter. It turns toward the person it chose — not toward the camera.",
  },
  {
    label: "// the warp",
    title: "478 landmarks and a thin-plate spline",
    body: "MediaPipe finds 478 face landmarks on the still, the weights above move the control points, and a thin-plate spline deforms the image per frame — using per-landmark depth for a pseudo-3D turn. A classical interpolation, not a learned renderer.",
  },
];

const pipeline = [
  {
    img: "01_self_portrait",
    cap: "The documented likeness: the red-chalk Turin self-portrait. Three-quarter, no photographic texture — no face detector can crop it, so it cannot be animated directly.",
    alt: "Leonardo da Vinci's red-chalk self-portrait in three-quarter view",
  },
  {
    img: "04_selfportrait_crop",
    cap: "The head crop taken from that drawing, fed straight into image-to-image as the base. His actual pixels, not a text description of him.",
    alt: "A head crop taken from the self-portrait, used as the image-to-image source",
  },
  {
    img: "05_cartoon_candidates",
    cap: "Ten seeds at strength 0.70, every one passed through the detector gate. One candidate even read a book. Seed 42 became the working source.",
    alt: "A montage of ten generated cartoon da Vinci candidates",
  },
  {
    img: "06_cartoon_chosen",
    cap: "The chosen face: recognisably from the self-portrait — long wavy hair, very long beard, high forehead, heavy brow — and reliably detectable, so it always animates.",
    alt: "The chosen cartoon rendition of da Vinci",
  },
];

const replaced = [
  {
    img: "02_photoreal_frontal",
    cap: "Attempt one: a photoreal frontal generated from his documented features. It animated well.",
    alt: "A generated photoreal frontal portrait of an older man",
  },
  {
    img: "03_photoreal_animated",
    cap: "But the identity was wrong — a generic photoreal old man, not clearly Leonardo. Kept and labelled in the code as a generated approximation, not deleted.",
    alt: "The photoreal frontal portrait under animation",
  },
];

const tuning = [
  {
    img: "09_expression_grid_default",
    cap: "Default tuning: nine expressions — neutral, warm, brow-raised, wide-eyed, engaged, speaking, glancing — rendered through the real animation warp.",
    alt: "A three-by-three grid of cartoon da Vinci at nine default-tuned expressions",
  },
  {
    img: "10_expression_grid_lively",
    cap: "The same nine at intensity ×1.6 and head-turn ×1.8. This is close to the practical ceiling of a 2.5D warp — the range is genuinely gentle, and that's a property of the method, not a bug.",
    alt: "The same nine expressions with expression intensity and head-turn range increased",
  },
];

const gaga = [
  {
    img: "12_gagavatar_neutral_nodriver",
    cap: "Source still on the left, the reconstructed 3D head on the right. Near-neutral and forward-facing, he holds his identity cleanly.",
    alt: "The cartoon source beside its GAGAvatar 3D reconstruction in a neutral pose",
  },
  {
    img: "12_gagavatar_expressive_a_nodriver",
    cap: "Driven to a talking expression: the mouth genuinely opens and the head turns to match. This is the thing the warp could never do — a real new expression on the one identity.",
    alt: "The cartoon source beside its 3D reconstruction showing an open-mouth talking expression",
  },
  {
    img: "12_gagavatar_expressive_b_nodriver",
    cap: "A second expressive frame. The mouth interior is where the domain gap shows: the cartoon source has a closed mouth, so the model has never seen its teeth.",
    alt: "The cartoon source beside a second expressive 3D reconstruction frame",
  },
];

const specs = [
  ["Identity", "img2img from the self-portrait"],
  ["Gate", "MediaPipe-detectable, every candidate"],
  ["Animation", "478-landmark thin-plate-spline warp"],
  ["3D head", "GAGAvatar Gaussian splatting"],
  ["Determinism", "Same decision → same frame"],
  ["Hardware", "One RTX 3080, native, no cloud"],
];

const stack = [
  ["Identity generation", "Stable Diffusion / dreamshaper-8", "img2img, inference only"],
  ["Face landmarks", "MediaPipe FaceLandmarker", "Google, 478 points"],
  ["3D head reconstruction", "GAGAvatar", "Chu & Harada, NeurIPS 2024"],
  ["Head model", "FLAME", "Li et al., SIGGRAPH Asia 2017"],
  ["Expression encoding", "ARKit blendshapes", "Apple, de-facto standard"],
];

const remaining = [
  "Articulated head rig: eyes, brow, and jaw in hardware",
  "Gaze actuation driven by the attention signal that already exists",
  "Real TTS voice, with Audio2Face lip-sync replacing the text rule",
  "Affect read → expression mapping on physical actuators",
];

export function ChapterFace() {
  return (
    <div>
      <SectionLabel>// chapter 02 · the digital face is running; the physical bust is next</SectionLabel>
      <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-12">
        Chapter one decides who to notice and what to say. This chapter makes that judgment{" "}
        <span className="text-[#CCC]">visible</span> — a face that turns toward the person it chose,
        warms its expression, and speaks the line. It runs on screen today. Putting it on a physical
        bust is what&apos;s still ahead.
      </p>

      {/* ── THE CLIP ── */}
      <section className="mb-16">
        <SectionLabel>// the face, responding</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          Thirty seconds of the character running its authored beats: observe, notice, engage, speak,
          settle. The engagement state and the spoken line are burned into the frame, because the
          animation is driven by the same logged decision the audit reads — the face and the record
          cannot disagree.
        </p>
        <ScrollReveal>
          <VideoFigure
            src={`${FACE}/davinci_cartoon_beats.mp4`}
            poster={`${FACE}/davinci_cartoon_beats_poster.jpg`}
            label="The cartoon da Vinci turning, expressing, and speaking his authored beats"
            accent={ACCENT}
          />
          <p className="text-[#666] text-[11.5px] mt-3 text-center font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
            Rendered natively on a single RTX 3080. Head-yaw 0–12°, mouth-open 0–0.82, no frame
            hand-animated.
          </p>
        </ScrollReveal>
      </section>

      {/* ── THE CONSTRAINT ── */}
      <section className="mb-16">
        <SectionLabel>// the constraint that shaped everything</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          The identity had to be <span className="text-[#CCC]">his</span>, and his documented likeness
          is a red-chalk drawing in three-quarter view. Every automatic face animator needs a
          detectable frontal face, and no detector can find one in chalk. That turned a vague goal —
          &ldquo;make it look like Leonardo&rdquo; — into a pass/fail gate: does MediaPipe detect a
          face in the output? If not, it cannot animate, so it does not ship.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pipeline.map((f, i) => (
            <ScrollReveal key={f.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`${FACE}/${f.img}.webp`} alt={f.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {f.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── THE ATTEMPT THAT WAS REPLACED ── */}
      <section className="mb-16">
        <SectionLabel>// the attempt that was replaced</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          The first solution generated a photoreal frontal from his documented features. It worked
          mechanically and failed on the thing that mattered. Kept here rather than quietly dropped,
          because the path from generic-photoreal to self-portrait-grounded cartoon{" "}
          <span className="text-[#CCC]">is</span> the result.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {replaced.map((f, i) => (
            <ScrollReveal key={f.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`${FACE}/${f.img}.webp`} alt={f.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {f.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div
          className="rounded-lg p-5 mt-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
            style={{ color: ACCENT }}
          >
            // the research call, and the roadblock
          </p>
          <p className="text-[#999] text-[13px] leading-[1.8]">
            For restyling a specific face while keeping its identity, the literature favours
            IP-Adapter — which decouples identity from surface style — over InstantID, which entangles
            them. So IP-Adapter was the correct first choice. It needs a ~2.5 GB image encoder, and two
            download runs died at the shell timeout with no output. The pivot turned out to be both
            simpler and <span className="text-[#CCC]">more literally grounded</span>: image-to-image
            straight from the self-portrait uses his actual pixels rather than a CLIP embedding of
            them, and needs no download at all.
          </p>
        </div>
      </section>

      {/* ── DESIGNED, NOT TRAINED ── */}
      <section className="mb-16">
        <SectionLabel>// designed, not trained</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          None of this face is a learned model. Every channel is a deterministic, hand-designed
          function of the logged decision and the spoken line — which is the point. It makes the face
          auditable by construction: the same decision always produces the same frame, with no
          black box between the reason and the expression.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {controls.map((c, i) => (
            <BentoTile key={c.title} delay={0.05 * (i + 1)}>
              <p
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[2px] mb-3"
                style={{ color: ACCENT }}
              >
                {c.label}
              </p>
              <h3 className="font-[family-name:var(--font-chakra-petch)] font-bold text-[17px] text-white mb-3 leading-tight">
                {c.title}
              </h3>
              <p className="text-[#999] text-[13.5px] leading-[1.8]">{c.body}</p>
            </BentoTile>
          ))}
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-start mt-8">
            <div>
              <ImageFrame
                src={`${FACE}/07_control_preview_stub.webp`}
                alt="A crude CPU-rendered control preview used to verify the face controls before rendering"
              />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                The control preview: a crude CPU render that verifies the controls before the real one
                runs.
              </p>
            </div>
            <div>
              <ImageFrame
                src={`${FACE}/08_cartoon_responding.webp`}
                alt="The cartoon da Vinci mid-response, turned toward the person he engaged"
              />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                The result: turned toward the person he engaged, expression warmed, speaking an
                authored, source-grounded line.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── TUNING ── */}
      <section className="mb-16">
        <SectionLabel>// tuning the range</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          With no learned parameters, tuning is dialling control weights — two global scales,
          expression intensity and head-turn range, move the whole feel. Because the same weights feed
          the warp, a FLAME rig, and a MetaHuman, what gets dialled in here transfers to any renderer.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tuning.map((f, i) => (
            <ScrollReveal key={f.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`${FACE}/${f.img}.webp`} alt={f.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {f.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── THE 3D UPGRADE ── */}
      <section className="mb-16">
        <SectionLabel>// the 3D upgrade — and knowing when to change tools</SectionLabel>
        <p className="text-[#999] text-[14px] leading-[1.8] max-w-[620px] mb-8">
          A thin-plate spline can only push pixels around a flat still. It turns the head, widens the
          eyes, and opens the mouth on a timeline — but it cannot build the inside of a mouth or round
          a cheek into a real smile. Generating a separate image per expression proved the point
          rather than solving it: to get genuinely new expressions from{" "}
          <span className="text-[#CCC]">one</span> identity, you need a 3D model of the head.
        </p>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-start mb-10">
            <div>
              <ImageFrame
                src={`${FACE}/11_expression_variants_grid.webp`}
                alt="A grid of separately generated images, one per expression, each a slightly different identity"
              />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                The workaround that showed the limit: generate a separate image per expression, and
                accept that each one drifts into a slightly different person.
              </p>
            </div>
            <div className="rounded-lg p-5" style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}22` }}>
              <p
                className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
                style={{ color: ACCENT }}
              >
                // what it cost to stand up
              </p>
              <p className="text-[#999] text-[13px] leading-[1.8]">
                GAGAvatar reconstructs a controllable 3D Gaussian head from a single image, driven by
                FLAME parameters. It is not a <span className="text-[#CCC]">pip install</span>: a Linux
                and CUDA research stack, so the build ran in WSL2 on the same 3080. A conda environment
                pinned to PyTorch 2.4.1 / CUDA 12.1 / pytorch3d 0.7.8, and — the crux — compiling their
                custom 32-channel Gaussian rasterizer from source, which meant matching nvcc 12.1
                against gcc-12 by hand because Ubuntu&apos;s gcc-15 is too new, and supplying the CUDA
                C++ core headers. The value here was diagnosis: reading the build scripts and isolating
                each failure until the renderer compiled.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {gaga.map((f, i) => (
            <ScrollReveal key={f.img} delay={0.04 * (i + 1)}>
              <ImageFrame src={`${FACE}/${f.img}.webp`} alt={f.alt} />
              <p className="text-[#666] text-[11.5px] mt-2.5 font-[family-name:var(--font-share-tech-mono)] leading-[1.6]">
                {f.cap}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div
          className="rounded-lg p-5 mt-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
            style={{ color: ACCENT }}
          >
            // the honest limit, and the fix that failed
          </p>
          <p className="text-[#999] text-[13px] leading-[1.8]">
            GAGAvatar is trained on real human faces, so a stylised cartoon is out of distribution —
            and it shows in the mouth interior. The source has a closed mouth, so the model never sees
            its teeth and can only hallucinate a smear when the jaw opens. Running the same pipeline on
            a realistic frontal source reconstructs a plausible row of teeth, which confirms the cause
            is the source rather than a bug. The obvious fix was to regenerate the cartoon with a
            gentle open-mouth smile — four strengths across four seeds, sixteen candidates.{" "}
            <span className="text-[#CCC]">It did not work.</span> His long moustache structurally covers
            the mouth, so no low-strength pass ever parted the lips. The call was to keep the character
            and manage the limit at the driving stage instead: drive gentle, mostly closed-mouth
            expressions — a good fit for a dignified Renaissance sage — and accept the rare smear rather
            than change the face. A mouth-only inpaint is parked for if open-mouth speech is ever needed.
          </p>
        </div>

        <div
          className="rounded-lg p-5 mt-4"
          style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
            style={{ color: ACCENT }}
          >
            // a note on what is shown
          </p>
          <p className="text-[#999] text-[13px] leading-[1.8]">
            The 3D frames above are cropped to the source and the reconstruction. The full reenactment
            figures include a driver panel showing an identifiable real person from the tool&apos;s demo
            footage, which was never consented for publication — so the driver is not shown here, on the
            same standing rule that de-identified the live frames in chapter one. Re-rendering against a
            consented or synthetic driver is the clean fix, and it is on the list.
          </p>
        </div>
      </section>

      {/* ── THE DEBUGGING THAT MATTERED ── */}
      <section className="mb-16">
        <BentoTile>
          <SectionLabel>// the debugging that mattered</SectionLabel>
          <p className="text-[#999] text-[13.5px] leading-[1.85] max-w-[700px]">
            The first run of the generator produced zero output and exited. No error, no traceback,
            nothing to search for. Isolating it with stepwise flushed prints showed it died the instant{" "}
            <span className="text-[#CCC]">diffusers</span> was imported — but only when MediaPipe had
            already loaded. The cause was a native OpenMP/DLL clash between the two, order-dependent,
            and a hard abort at the C level, which is why Python never got to raise anything. The fix
            was to import torch and diffusers <span className="text-[#CCC]">before</span> MediaPipe. The
            inline smoke test had passed the whole time because it happened to import in the safe
            order — the exact shape of bug that reads as &ldquo;works on my machine&rdquo; until you pin
            the real cause.
          </p>
        </BentoTile>
      </section>

      {/* ── SPECS ── */}
      <section className="mb-16">
        <SectionLabel>// specs</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
          {specs.map(([k, v], i) => (
            <ScrollReveal key={k} delay={0.04 * (i + 1)}>
              <div
                className="flex items-baseline justify-between gap-4 pb-3"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555]">
                  {k}
                </span>
                <span className="text-[#CCC] text-[13px] text-right">{v}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── MODELS ── */}
      <section className="mb-16">
        <SectionLabel>// models &amp; methods</SectionLabel>
        <p className="text-[#888] text-[14px] leading-[1.7] max-w-[620px] mb-8">
          Everything below is pretrained and run for inference. Nothing in the face path was trained
          here — the only network trained in this project is the expression reader in chapter one, and
          it reads a <span className="text-[#CCC]">visitor&apos;s</span> face, never da Vinci&apos;s. It
          drives none of this.
        </p>
        <div className="space-y-3">
          {stack.map(([cap, model, src], i) => (
            <ScrollReveal key={cap} delay={0.04 * (i + 1)}>
              <div
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 items-baseline py-3"
                style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] text-[#555] min-w-[180px]">
                    {cap}
                  </span>
                  <span
                    className="font-[family-name:var(--font-chakra-petch)] font-bold text-[15px]"
                    style={{ color: ACCENT }}
                  >
                    {model}
                  </span>
                </div>
                <span className="text-[#666] text-[12px] sm:text-right">{src}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── HONESTY LABEL ── */}
      <section className="mb-16">
        <div
          className="rounded-lg p-5"
          style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}22` }}
        >
          <p
            className="font-[family-name:var(--font-share-tech-mono)] text-[10px] uppercase tracking-[1.5px] mb-2"
            style={{ color: ACCENT }}
          >
            // the label that ships with the face
          </p>
          <p className="text-[#CCC] text-[13.5px] leading-[1.8]">
            This face is a generated stylised approximation grounded in Leonardo&apos;s self-portrait —
            not a documented likeness. That label travels with it wherever it is shown.
          </p>
        </div>
      </section>

      {/* ── STILL AHEAD ── */}
      <section
        className="pt-12"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <SectionLabel>// still ahead · the physical bust</SectionLabel>
        <p className="text-[18px] leading-[1.6] mb-8 max-w-[620px] italic" style={{ color: ACCENT }}>
          Take the face off the screen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-start mb-12">
          <ScrollReveal>
            <PlaceholderFrame label="bust concept render" ratio="16 / 10" />
          </ScrollReveal>
          <div>
            <p className="text-[#AAA] text-[14.5px] leading-[1.85] mb-6">
              The digital face proves the control system: the same logged decision that chooses a
              person also aims the gaze, sets the expression, and drives the mouth. Those controls are
              renderer-agnostic by design. The remaining work is making them move servos instead of
              pixels — a physical Leonardo bust whose eyes lock onto the chosen guest, whose brow and
              mouth react in persona, and which speaks with a real voice rather than a text-derived
              timeline.
            </p>
            <div className="rounded-lg p-4" style={{ background: `${ACCENT}08`, border: `0.5px solid ${ACCENT}22` }}>
              <p
                className="font-[family-name:var(--font-share-tech-mono)] text-[9px] uppercase tracking-[1.5px] mb-2"
                style={{ color: ACCENT }}
              >
                // done looks like
              </p>
              <p className="text-[#CCC] text-[13.5px] leading-[1.7]">
                A guest steps sideways and the eyes follow the person, not the camera.
              </p>
            </div>
          </div>
        </div>

        <SectionLabel>// what I&apos;ll build</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {remaining.map((b, i) => (
            <ScrollReveal key={b} delay={0.04 * (i + 1)}>
              <div className="flex gap-3 items-start">
                <span
                  aria-hidden="true"
                  className="shrink-0 mt-1 w-3 h-3 rounded-[2px]"
                  style={{ border: `1px solid ${ACCENT}88` }}
                />
                <p className="text-[#999] text-[13.5px] leading-[1.6]">{b}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
