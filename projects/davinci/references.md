# References

Bibliography for the project. **Part 1** is the heavily-cited work of the four target advisors
(the research grounding); **Part 2** is the third-party technical methods the build stands on.

> **Accuracy:** every advisor entry was verified against ≥2 fetched sources (Google Scholar, DBLP,
> arXiv, ACL Anthology, PMLR, ETH/ASU/Purdue/Disney pages); known mis-attributions were excluded
> (see the notes). A small number of arXiv IDs / DOIs / author-orderings are flagged at the end as
> "confirm before formal submission" — verify those strings against the source before citing formally.

---

# Part 1 — Target advisors

## Markus Gross — ETH Zürich (Computer Graphics Lab) / Disney Research

**Interactive digital humans / conversational characters**
1. Wampfler, R., Yang, C., Elste, D., Kovačević, N., Witzig, P., & Gross, M. (2025). *A Platform for Interactive AI Character Experiences.* SIGGRAPH Conference Papers '25. arXiv:2601.01027; doi:10.1145/3721238.3730762. — *the "Digital Einstein" platform; reference architecture for a perceptive conversational character.*
2. Wampfler, R., Kovačević, N., Witzig, P., Yang, C., & Gross, M. (2024). *Immersive Conversations with Digital Einstein: Linking a Physical System and AI.* SIGGRAPH Asia 2024 Emerging Technologies. doi:10.1145/3681755.3688939. — *the physical install (screen/camera/mic) linking sensing to AI dialogue.*

**Photorealistic / neural digital-human faces & facial animation**
3. Beeler, T., Bickel, B., Beardsley, P., Sumner, R. W., & Gross, M. (2010). *High-Quality Single-Shot Capture of Facial Geometry.* ACM TOG 29(4) (SIGGRAPH 2010). doi:10.1145/1778765.1778777. — *foundation of Disney's Medusa rig; sub-mm face geometry.*
4. Beeler, T., Hahn, F., Bradley, D., Bickel, B., Beardsley, P., Gotsman, C., Sumner, R. W., & Gross, M. (2011). *High-Quality Passive Facial Performance Capture using Anchor Frames.* ACM TOG 30(4) (SIGGRAPH 2011). doi:10.1145/2010324.1964970. — *markerless performance capture; expressive face animation.*
5. Zoss, G., Beeler, T., Gross, M., & Bradley, D. (2019). *Accurate Markerless Jaw Tracking for Facial Performance Capture.* ACM TOG 38(4) (SIGGRAPH 2019). doi:10.1145/3306346.3323044. — *jaw/mouth tracking; critical for believable speech-driven animation.*

**Generative & diffusion methods (image / video / motion)**
6. Kansy, M., Naruniec, J., Schroers, C., Gross, M., & Weber, R. M. (2024/2025). *Reenact Anything: Semantic Video Motion Transfer Using Motion-Textual Inversion.* arXiv:2408.00458; SIGGRAPH 2025 (Conf. Track). — *transfers motion/face-body reenactment onto a target image.*
7. Kansy, M., Raël, A., Mignone, G., Naruniec, J., Schroers, C., Gross, M., & Weber, R. M. (2023). *Controllable Inversion of Black-Box Face Recognition Models via Diffusion.* ICCV Workshops, 3167–3177. arXiv:2303.13006. — *identity-controlled diffusion face generation.*

**Robot-character motion**
8. Serifi, A., Grandia, R., Knoop, E., Gross, M., & Bächer, M. (2024). *Robot Motion Diffusion Model (RobotMDM): Motion Generation for Robotic Characters.* SIGGRAPH Asia 2024. doi:10.1145/3680528.3687626. — *diffusion motion generation respecting robot limits (robotic da Vinci).*
9. Serifi, A., Grandia, R., Knoop, E., Gross, M., & Bächer, M. (2024). *VMP: Versatile Motion Priors for Robustly Tracking Motion on Physical Characters.* SCA 2024, Computer Graphics Forum. doi:10.1111/cgf.15175. — *robust motion tracking on physical/robotic characters.*

**Foundational point/splat rendering (lineage to today's Gaussian-splat avatars)**
10. Pfister, H., Zwicker, M., van Baar, J., & Gross, M. (2000). *Surfels: Surface Elements as Rendering Primitives.* SIGGRAPH 2000, 335–342. doi:10.1145/344779.344936.
11. Zwicker, M., Pfister, H., van Baar, J., & Gross, M. (2001). *Surface Splatting.* SIGGRAPH 2001, 371–378. doi:10.1145/383259.383300.
12. Megaro, V., Thomaszewski, B., Nitti, M., Hilliges, O., Gross, M., & Coros, S. (2015). *Interactive Design of 3D-Printable Robotic Creatures.* ACM TOG 34(6) (SIGGRAPH Asia 2015). — *(joint Gross–Coros) co-design of form + motion for printable robot characters.*

*Excluded (commonly mis-attributed, Gross NOT an author): AMOR (Alegre et al., SIGGRAPH 2025); High-Resolution Neural Face Swapping (Naruniec et al., EGSR 2020); the Aflorithmic "Digital Einstein" TTS paper (Rownicka et al., Interspeech 2021). Projection-mapped Disney characters (Mine et al., Computer 2012) — see Part 2; Gross authorship not confirmed.*

---

## Heni Ben Amor — Arizona State University (Interactive Robotics Lab)

**Interaction Primitives & Bayesian Interaction Primitives**
1. Ben Amor, H., Neumann, G., Kamthe, S., Kroemer, O., & Peters, J. (2014). *Interaction Primitives for Human-Robot Cooperation Tasks.* ICRA 2014. — *foundational: interactive skills from human-human demos.*
2. Campbell, J., & Ben Amor, H. (2017). *Bayesian Interaction Primitives: A SLAM Approach to Human-Robot Interaction.* CoRL 2017, PMLR 78:379–387. — *fast online inference of partner intent (core anticipation method).*
3. Campbell, J., Stepputtis, S., & Ben Amor, H. (2019). *Probabilistic Multimodal Modeling for Human-Robot Interaction Tasks.* RSS 2019. arXiv:1908.04955. — *multimodal BIP; temporally-aligned real-time response.*

**Reactive control & imitation learning**
4. Ben Amor, H., Vogt, D., Ewerton, M., Berger, E., Jung, B., & Peters, J. (2013). *Learning Responsive Robot Behavior by Imitation.* IROS 2013, 3257–3264. — *early "responsive behavior by imitation" — on-theme for reactive characters.*
5. Stepputtis, S., Campbell, J., Phielipp, M., Lee, S., Baral, C., & Ben Amor, H. (2020). *Language-Conditioned Imitation Learning for Robot Manipulation Tasks.* NeurIPS 2020 (spotlight). arXiv:2010.12083. — *natural-language-conditioned policies.*
6. Liu, X., Zhou, Y., Weigend, F., Sonawani, S., Ikemoto, S., & Ben Amor, H. (2024). *Diff-Control: A Stateful Diffusion-based Policy for Imitation Learning.* IROS 2024, 7453–7460. arXiv:2404.12539. — *stateful diffusion policy robust to perturbations.*
7. Drolet, M., Stepputtis, S., Kailas, S., Jain, A., Peters, J., Schaal, S., & Ben Amor, H. (2024). *A Comparison of Imitation Learning Algorithms for Bimanual Manipulation.* IEEE RA-L 9(10):8579–8586. arXiv:2408.06536. — *practical IL benchmarking.*

**Robot learning at scale**
8. Open X-Embodiment Collaboration (incl. Ben Amor, H.) (2023/2024). *Open X-Embodiment: Robotic Learning Datasets and RT-X Models.* arXiv:2310.08864; ICRA 2024, 6892–6903. — *cross-embodiment generalist policies.*
9. Ben Amor, H., Graesser, L., Iscen, A., D'Ambrosio, D. B., et al. (2025). *SAS-Prompt: Large Language Models as Numerical Optimizers for Robot Self-Improvement.* arXiv:2504.20459; ICRA 2025, 10087–10094. — *LLM-driven iterative policy self-improvement.*

**Reactive control / anticipation / intent**
10. Wang, Z., Mülling, K., Deisenroth, M. P., Ben Amor, H., Vogt, D., Schölkopf, B., & Peters, J. (2013). *Probabilistic Movement Modeling for Intention Inference in Human-Robot Interaction.* IJRR 32(7):841–858. doi:10.1177/0278364913478447. — *intention-driven dynamics; real-time intent inference.*
11. Sur, I., & Ben Amor, H. (2017). *Robots that Anticipate Pain: Anticipating Physical Perturbations from Visual Cues through Deep Predictive Models.* IROS 2017. — *visual anticipation of disturbances.*
12. D'Ambrosio, D. B., Abeyruwan, S., Graesser, L., Iscen, A., Ben Amor, H., et al. (2024/2025). *Achieving Human Level Competitive Robot Table Tennis.* arXiv:2408.03906; ICRA 2025, 74–82. — *first amateur-human-level competitive play; real-time reactive control (DeepMind line).*
13. Weigend, F. C., Kumar, N., Aran, O., & Ben Amor, H. (2024). *WearMoCap: Multimodal Pose Tracking for Ubiquitous Robot Control Using a Smartwatch.* Frontiers in Robotics and AI, 11. — *lightweight real-time human pose input.*
14. Lahr, G. J. G., Sirintuna, D., Tassi, F., Ajoudani, A., & Ben Amor, H. (2026, in press). *A Non-parametric Approach to Exploring and Quantifying the Information Flow in Human-Robot Collaboration.* ACM THRI 15(1). — *quantifies human↔robot information flow.*

*Excluded (Ben Amor not an author): Maeda et al., "Probabilistic Movement Primitives for Coordination…" (Auton. Robots 2017).*

---

## Joseph Campbell — Purdue University (CAMP Lab); PhD under Ben Amor (ASU); postdoc with Sycara (CMU)

**(a) Interaction Primitives / Bayesian Interaction Primitives & variants**
1. Campbell, J., & Ben Amor, H. (2017). *Bayesian Interaction Primitives: A SLAM Approach to Human-Robot Interaction.* CoRL 2017, PMLR 78:379–387. — *founding BIP paper; recursive Bayesian inference of interaction state.*
2. Campbell, J., Stepputtis, S., & Ben Amor, H. (2019). *Probabilistic Multimodal Modeling for Human-Robot Interaction Tasks.* RSS 2019. arXiv:1908.04955. — *multimodal ensemble BIP.*
3. Campbell, J., Hitzmann, A., Stepputtis, S., Ikemoto, S., Hosoda, K., & Ben Amor, H. (2019). *Learning Interactive Behaviors for Musculoskeletal Robots Using Bayesian Interaction Primitives.* IROS 2019. arXiv:1908.05552. — *real-time BIP on a model-free robot.*
4. Drolet, M., Campbell, J., & Ben Amor, H. (2023). *Learning and Blending Robot Hugging Behaviors in Time and Space.* ICRA 2023. arXiv:2212.01507. — *blending BIP (B-BIP) for superposed responsive interaction.*
5. Campbell, J., & Yamane, K. (2020). *Learning Whole-Body Human-Robot Haptic Interaction in Social Contexts.* ICRA 2020. — *whole-body, socially reactive physical interaction.*
6. Clark, G., Campbell, J., Sorkhabadi, S. M. R., Zhang, W., & Ben Amor, H. (2020). *Predictive Modeling of Periodic Behavior for Human-Robot Symbiotic Walking.* ICRA 2020. — *predictive periodic models for coupled motion.*
7. Clark, G., Campbell, J., & Ben Amor, H. (2020). *Learning Predictive Models for Ergonomic Control of Prosthetic Devices.* CoRL 2020. arXiv:2011.07005 *(ID to confirm)*. — *predictive control via interaction modeling.*
8. Bagewadi, K., Campbell, J., & Ben Amor, H. (2019). *Multimodal Dataset of Human-Robot Hugging Interaction.* AAAI Fall Symposium (AI for HRI) 2019. arXiv:1909.07471. — *dataset underpinning reactive HRI models.*
9. Campbell, J. (2021). *Probabilistic Imitation Learning for Spatiotemporal Human-Robot Interaction.* PhD dissertation, Arizona State University. — *synthesizes the BIP program.*

**(b) Human intent estimation & action anticipation**
10. Bhagat, S., Li, S., Campbell, J., Xie, Y., Sycara, K., & Stepputtis, S. (2024). *Let Me Help You! Neuro-Symbolic Short-Context Action Anticipation.* IEEE RA-L 9(11):9749–9756. doi:10.1109/LRA.2024.3421848. — *predicts human intent from short context.*
11. Bhagat, S., Stepputtis, S., Campbell, J., & Sycara, K. (2023). *Knowledge-Guided Short-Context Action Anticipation in Human-Centric Videos.* ICCV 2023 Workshop. arXiv:2309.05943. — *knowledge-graph-boosted long-term anticipation.*
12. Stepputtis, S., Campbell, J., Phielipp, M., Lee, S., Baral, C., & Ben Amor, H. (2020). *Language-Conditioned Imitation Learning for Robot Manipulation Tasks.* NeurIPS 2020. arXiv:2010.12083. — *language-grounded intent for reactive manipulation.*
13. Stepputtis, S., Campbell, J., Phielipp, M., Baral, C., & Ben Amor, H. (2019). *Imitation Learning of Robot Policies by Combining Language, Vision and Demonstration.* NeurIPS 2019 Workshop on Robot Learning. arXiv:1911.11744 *(ID to confirm)*.

**(c) Theory of Mind (computational/Bayesian; intrinsic-motivation; via LLMs)**
14. Oguntola, I., Campbell, J., Stepputtis, S., & Sycara, K. (2023). *Theory of Mind as Intrinsic Motivation for Multi-Agent Reinforcement Learning.* ICML 2023 Workshop on ToM in Communicating Agents. arXiv:2307.01158. — *interpretable beliefs; 2nd-order belief prediction as intrinsic reward.*
15. Li, H., Chong, Y. Q., Stepputtis, S., Campbell, J., Hughes, D., Lewis, M., & Sycara, K. (2023). *Theory of Mind for Multi-Agent Collaboration via Large Language Models.* EMNLP 2023, 180–192. arXiv:2310.10701. — *emergent ToM in LLM agents vs MARL/planning.*
16. Stepputtis, S., Campbell, J., Xie, Y., Qi, Z., Zhang, W. S., Wang, R., Rangreji, S., Lewis, M., & Sycara, K. (2023). *Long-Horizon Dialogue Understanding for Role Identification in the Game of Avalon with LLMs.* Findings of EMNLP 2023, 11193–11208. arXiv:2311.05720. — *deception/hidden-role inference (applied ToM).*
17. Rahimirad, S., Gergerli, G., Romero, L., Qian, A., Olson, M. L., Stepputtis, S., Campbell, J., & Sycara, K. (2025). *Bayesian Social Deduction with Graph-Informed Language Models.* arXiv:2506.17788. — *Bayesian belief modeling over agents.*
18. Olson, M. L., Ratzlaff, N., Hinck, M., Nguyen, T., Lal, V., Campbell, J., Stepputtis, S., et al. (2026). *LieCraft: A Multi-Agent Framework for Evaluating Deceptive Capabilities in Language Models.* AAAI 2026, 37802–37811. arXiv:2603.06874. — *deception/intent concealment in LLM agents. (author ordering varies by source; Campbell 6th in both.)*

**(d) Interpretable / explainable RL & HRI**
19. Zabounidis, R.\*, Campbell, J.\*, Stepputtis, S., Hughes, D., & Sycara, K. (2022). *Concept Learning for Interpretable Multi-Agent Reinforcement Learning.* CoRL 2022. arXiv:2302.12232. — *(co-first) concept-bottleneck policies with run-time expert intervention.*
20. Zabounidis, R., Oguntola, I., Zhao, K., Campbell, J., Kim, W., Stepputtis, S., & Sycara, K. (2026). *Disentangled Concept-Residual Models: Bridging the Interpretability–Performance Gap for Incomplete Concept Sets.* TMLR 2026. (OpenReview NKgNizwDa6) — *kills concept "leakage" that breaks faithfulness.*
21. Campbell, J., Guo, Y., Xie, F., Stepputtis, S., & Sycara, K. (2023). *Introspective Action Advising for Interpretable Transfer Learning.* CoLLAs 2023, PMLR 232:1072–1090. arXiv:2306.12314. — *advice gated by the model's own value estimate.*
22. Guo, Y., Campbell, J., Stepputtis, S., Li, R., Hughes, D., Fang, F., & Sycara, K. (2023). *Explainable Action Advising for Multi-Agent Reinforcement Learning.* ICRA 2023. arXiv:2211.07882. — *advice + explanations enabling student self-reflection.*
23. Zhang, X.-J., Guo, Y., Chen, S., Stepputtis, S., Gombolay, M. C., Sycara, K., & Campbell, J. (2025). *Model-Agnostic Policy Explanations with Large Language Models.* COLM 2025. arXiv:2504.05625. — *(senior author) NL explanations from states/actions — the **plausible-only baseline** the project's faithful design improves on.*
24. Zhang, X., Guo, Y., Stepputtis, S., Sycara, K., & Campbell, J. (2023). *Explaining Agent Behavior with Large Language Models.* IROS 2023 Workshop. arXiv:2309.10346 *(ID to confirm)*. — *workshop precursor to the COLM 2025 work.*
25. Mao, L., Liu, A. H., Zabounidis, R., Niu, Y., Kingston, Z., & Campbell, J. (2025). *CDE: Concept-Driven Exploration for Reinforcement Learning.* arXiv:2510.08851. — *(senior author) interpretable concepts drive RL exploration.*
26. Guo, Y., Zhang, X., Stepputtis, S., Campbell, J., & Sycara, K. (2024). *Adaptive Action Advising with Different Rewards.* CoLLAs 2024, PMLR 274:252–267. — *action-advising transfer across reward mismatch.*

**(e) Multi-agent RL (+ LLM-guided)**
27. Lin, M., Shi, S., Guo, Y., Tadiparthi, V., Chalaki, B., Moradi-Pari, E., Stepputtis, S., Kim, W., Campbell, J., & Sycara, K. (2025). *Speaking the Language of Teamwork: LLM-Guided Credit Assignment in Multi-Agent RL.* arXiv:2502.03723.
28. Lin, M., Shi, S., Guo, Y., Chalaki, B., Tadiparthi, V., Moradi-Pari, E., Stepputtis, S., Campbell, J., & Sycara, K. (2024). *Navigating Noisy Feedback: Enhancing RL with Error-Prone Language Models.* Findings of EMNLP 2024. arXiv:2410.17389 *(ID to confirm)*.
29. Deng, Z., Ghosh, J., Xie, F., Lu, Y., Sycara, K., & Campbell, J. (2025). *Energy-Based Transfer for Reinforcement Learning.* arXiv:2506.16590. — *(senior author).*
30. Zeng, W., Campbell, J., Stepputtis, S., & Sycara, K. (2024). *Multi-Agent Transfer Learning via Temporal Contrastive Learning.* ICRA 2024 Workshop. arXiv:2406.01377 *(ID to confirm)*.

**(f) Neuro-symbolic, scene-graph & trust/transparency-adjacent**
31. Zhang, C., Stepputtis, S., Campbell, J., Sycara, K., & Xie, Y. (2024). *HiKER-SGG: Hierarchical Knowledge Enhanced Robust Scene Graph Generation.* CVPR 2024, 28233–28243. arXiv:2403.12033. — *neuro-symbolic robust scene understanding.*
32. Li, S., Bhagat, S., Campbell, J., Xie, Y., Kim, W., Sycara, K., & Stepputtis, S. (2024). *ShapeGrasp: Zero-Shot Task-Oriented Grasping with LLMs through Geometric Decomposition.* IROS 2024. arXiv:2403.18062. — *LLM + geometric decomposition for grounded reasoning.*
33. Hughes, D., Li, H., Chis, M., Oguntola, I., Stepputtis, S., Zheng, K., Campbell, J., et al. (2023). *A Framework for Intervention-Based Team Support in Time-Critical Tasks.* IEEE SMC 2023. — *transparency-oriented team-support intervention.*

*Excluded namesake: "User intent estimation during robot learning using physical HRI primitives" (Auton. Robots 2022) is by Lai/Paul/Cui/Matsubara — NOT this Campbell.*

---

## Stelian Coros — ETH Zürich (Computational Robotics Lab)

**Physics-based / RL character control & animation**
1. Coros, S., Beaudoin, P., & Van de Panne, M. (2010). *Generalized Biped Walking Control.* ACM TOG 29(4) (SIGGRAPH 2010). — *optimization-based biped locomotion.*
2. Coros, S., Beaudoin, P., & Van de Panne, M. (2009). *Robust Task-Based Control Policies for Physics-Based Characters.* ACM TOG 28(5) (SIGGRAPH Asia 2009).
3. Coros, S., Karpathy, A., Jones, B., Reveret, L., & Van de Panne, M. (2011). *Locomotion Skills for Simulated Quadrupeds.* ACM TOG 30(4) (SIGGRAPH 2011).
4. Yin, K., Coros, S., Beaudoin, P., & Van de Panne, M. (2008). *Continuation Methods for Adapting Simulated Skills.* ACM TOG 27(3) (SIGGRAPH 2008).

**Motion style / content disentanglement**
5. Zargarbashi, F., Agrawal, D., Buhmann, J., Guay, M., Coros, S., & Sumner, R. W. (2026). *VQ-Style: Disentangling Style and Content in Motion with Residual Quantized Representations.* Computer Graphics Forum. doi:10.1111/cgf.70377; arXiv:2602.02334. — *RVQ-VAE separates motion content from expressive style.*

**Differentiable simulation**
6. Geilinger, M., Hahn, D., Zehnder, J., Bächer, M., Thomaszewski, B., & Coros, S. (2020). *ADD: Analytically Differentiable Dynamics for Multi-Body Systems with Frictional Contact.* ACM TOG 39(6) (SIGGRAPH Asia 2020). arXiv:2007.00987.
7. Bern, J. M., Schnider, Y., Banzet, P., Kumar, N., & Coros, S. (2020). *Soft Robot Control with a Learned Differentiable Model.* IEEE RoboSoft 2020.

**Robot design & control / sim-to-real**
8. Coros, S., Thomaszewski, B., Noris, G., Sueda, S., Forberg, M., Sumner, R. W., Matusik, W., & Bickel, B. (2013). *Computational Design of Mechanical Characters.* ACM TOG 32(4) (SIGGRAPH 2013). — *designing mechanisms that realize desired character motions.*
9. Megaro, V., Thomaszewski, B., Nitti, M., Hilliges, O., Gross, M., & Coros, S. (2015). *Interactive Design of 3D-Printable Robotic Creatures.* ACM TOG 34(6) (SIGGRAPH Asia 2015). — *(joint with Gross) form+motion co-design for printable robot characters.*
10. Zimmermann, S., Poranne, R., & Coros, S. (2021). *Go Fetch! — Dynamic Grasps using Boston Dynamics Spot with an External Robotic Arm.* ICRA 2021.
11. Kang, D., Cheng, J., Zamora, M., Zargarbashi, F., & Coros, S. (2023). *RL + Model-Based Control: Using On-Demand Optimal Control to Learn Versatile Legged Locomotion.* IEEE RA-L 8(10):6619–6626. arXiv:2305.17842.
12. Molnar, C., Cheng, J., Fadini, G., Kang, D., Zargarbashi, F., & Coros, S. (2026). *Whole-Body Inverse Dynamics MPC for Legged Loco-Manipulation.* IEEE RA-L 11(1):898–905.

**Expressive / style-conditioned motion (robotic phase — most on-point)**
13. Kang, D., Cheng, J., Zargarbashi, F., Yoon, T., Choi, S., & Coros, S. (2025). *Walk Like Dogs: Learning Steerable Imitation Controllers for Legged Robots from Unlabeled Motion Data.* arXiv:2507.00677. — *style-preserving, steerable real-robot imitation.*
14. Cheng, J., Kang, D., Fadini, G., Sumner, R. W., & Coros, S. (2025). *RAMBO: RL-Augmented Model-Based Whole-Body Control for Loco-Manipulation.* IEEE RA-L.

*Excluded (Coros not an author): CARL (Luo et al.); DeepMimic (Peng et al.). On-theme but NOT Coros: "Design and Control of a Bipedal Robotic Character" (Grandia et al., Disney, arXiv:2501.05204) — cite as background, not under Coros.*

---

# Part 2 — Technical methods & background

**Interactive digital characters & believable agents**
- Bates, J. (1994). *The Role of Emotion in Believable Agents.* Communications of the ACM 37(7).
- Loyall, A. B. (1997). *Believable Agents: Building Interactive Personalities.* PhD thesis, Carnegie Mellon University.
- Mine, M., van Baar, J., Grundhöfer, A., Rose, D., & Yang, B. (2012). *Projection-Based Augmented Reality in Disney Theme Parks.* Computer 45(7):32–40. — *projection-mapped characters (background; not a Gross-authored work).*

**Visitor engagement (museums / informal learning)**
- Glas, D. F., Shiomi, M., Kanda, T., et al. (2017). *Personal Greetings: Personalizing Robot Utterances Based on Novelty of Observed Behavior.* Int. J. of Social Robotics.
- Serrell, B. (1998). *Paying Attention: Visitors and Museum Exhibitions.* American Association of Museums.
- Bitgood, S. (2013). *Attention and Value: Keys to Understanding Museum Visitors.* Routledge.

**Perception — detection, tracking, pose & gaze**
- Jocher, G., et al. (2024). *Ultralytics YOLO11* (software). github.com/ultralytics/ultralytics.
- Cheng, T., Song, L., Ge, Y., et al. (2024). *YOLO-World: Real-Time Open-Vocabulary Object Detection.* CVPR 2024. arXiv:2401.17270.
- Zhang, Y., Sun, P., Jiang, Y., et al. (2022). *ByteTrack: Multi-Object Tracking by Associating Every Detection Box.* ECCV 2022. arXiv:2110.06864.
- Lin, T.-Y., Maire, M., Belongie, S., et al. (2014). *Microsoft COCO: Common Objects in Context.* ECCV 2014.
- Abdelrahman, A. A., et al. (2022). *L2CS-Net: Fine-Grained Gaze Estimation.* *(documented upgrade for true eye-gaze).*

**3D face & head reconstruction**
- Li, T., Bolkart, T., Black, M. J., Li, H., & Romero, J. (2017). *Learning a Model of Facial Shape and Expression from 4D Scans (FLAME).* ACM TOG (SIGGRAPH Asia 2017).
- Feng, Y., Feng, H., Black, M. J., & Bolkart, T. (2021). *Learning an Animatable Detailed 3D Face Model from In-the-Wild Images (DECA).* ACM TOG (SIGGRAPH 2021). arXiv:2012.04012.
- Daněček, R., Black, M. J., & Bolkart, T. (2022). *EMOCA: Emotion Driven Monocular Face Capture and Animation.* CVPR 2022.
- Zielonka, W., Bolkart, T., & Thies, J. (2022). *Towards Metrical Reconstruction of Human Faces (MICA).* ECCV 2022.

**Speech-driven facial animation & talking heads**
- Fan, Y., Lin, Z., Saito, J., Wang, W., & Komura, T. (2022). *FaceFormer: Speech-Driven 3D Facial Animation with Transformers.* CVPR 2022.
- Xing, J., Xia, M., Zhang, Y., et al. (2023). *CodeTalker: Speech-Driven 3D Facial Animation with Discrete Motion Prior.* CVPR 2023.
- Cudeiro, D., Bolkart, T., Laidlaw, C., Ranjan, A., & Black, M. J. (2019). *Capture, Learning, and Synthesis of 3D Speaking Styles (VOCA).* CVPR 2019.
- Peng, Z., et al. (2023). *EmoTalk: Speech-Driven Emotional Disentanglement for 3D Face Animation.* ICCV 2023.
- Daněček, R., et al. (2023). *Emotional Speech-Driven Animation with Content-Emotion Disentanglement (EMOTE).* SIGGRAPH Asia 2023.
- Prajwal, K. R., Mukhopadhyay, R., Namboodiri, V. P., & Jawahar, C. V. (2020). *A Lip Sync Expert Is All You Need (Wav2Lip).* ACM Multimedia 2020.
- Zhang, W., et al. (2023). *SadTalker: Stylized Audio-Driven Single Image Talking Face Animation.* CVPR 2023.
- NVIDIA (2023). *Audio2Face* (Omniverse; later open-sourced).

**Single-image-to-3D & neural head avatars**
- Tochilkin, D., et al. (2024). *TripoSR: Fast 3D Object Reconstruction from a Single Image.* arXiv:2403.02151.
- Xu, J., et al. (2024). *InstantMesh: Efficient 3D Mesh Generation from a Single Image.* arXiv:2404.07191.
- Xiang, J., et al. (2024). *FlashAvatar: High-Fidelity Head Avatar with Efficient Gaussian Embedding.* CVPR 2024. — *the one self-trainable head avatar on a single consumer GPU.*

---

## Verification flags (confirm before formal submission)
- **arXiv IDs to confirm** (paper + authorship verified; the specific number is best-effort): Campbell #7 (2011.07005), #13 (1911.11744), #24 (2309.10346), #28 (2410.17389), #30 (2406.01377).
- **Author-ordering soft points:** Campbell #18 LieCraft (DBLP vs Scholar differ; Campbell 6th in both); Ben Amor #9 SAS-Prompt (ASU/Scholar list him first, DBLP leads with Graesser).
- **Date oddities (verified, not typos):** Gross #1 platform arXiv:2601.01027 (Jan-2026 listing, SIGGRAPH 2025); Coros #5 VQ-Style arXiv:2602.02334 (Feb-2026); Campbell #18 arXiv:2603.06874 (Mar-2026).
- **DOIs inferred from ACM patterns (verify on doi.org):** Gross #3, #4, #5; Surface Splatting (#11).
- **Part 2 tools:** the third-party graphics/vision papers are real and well-known, but confirm exact author lists/venues/years/IDs against each source before formal citation.
