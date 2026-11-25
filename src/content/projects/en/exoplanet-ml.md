---
title: "Exoplanet Detection XAI & Triage Engine"
description: "An end-to-end scientific platform and calibrated Ternary AI triage engine for NASA TESS telemetry. Features Monte Carlo Dropout for epistemic uncertainty, Temperature Scaling (ECE 2.35%), counterfactual XAI ablation, and an interactive Flask dashboard."
launchDate: 2026-07-26
techStack: ["Python", "1D CNN", "NASA MAST API", "Flask", "Plotly", "Grad-CAM & SHAP", "Monte Carlo Dropout", "Model Calibration"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
researchPaperUrl: "/portfolio/blog/exoplanet-research"
coverImage: "/portfolio/images/exoplanets/exoplanet-ml-cover.png"
---

> ### The Scientific Research Suite
> This project bridges full-stack engineering with formal astrophysical research. For deep mathematical and experimental analyses, explore the two companion papers:
> * **[Paper 1: Calibrated Ternary Triage Engine & Epistemic Uncertainty](/portfolio/blog/exoplanet-research)** — Solving Eclipsing Binary false positives with Villanova data, Monte Carlo Dropout (epistemic uncertainty), Temperature Scaling (ECE 2.35%), and empirical AI veto on TOI-700 & TOI-1231.
> * **[Paper 2: Representation Shift in Robust Normalization (Z-Score vs. MAD)](/portfolio/blog/mad)** — An empirical study demonstrating why mathematically superior scaling can trigger an attention diffusion and representation mismatch in a frozen CNN.

---

## 1. Automating Planetary Discovery

Inspired by the [2025 NASA Space Apps Challenge ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), I embarked on an independent mission to build an automated, trustworthy AI pipeline capable of detecting exoplanetary transits from raw space telescope telemetry—eliminating the need for manual crowd-sourced inspection on platforms like Zooniverse.

What began as a computer vision exploration evolved into an end-to-end scientific software system: exposing a corrupted public benchmark dataset, streaming live NASA satellite data, and developing a calibrated **Ternary AI Triage Engine** powered by Explainable AI (XAI) and epistemic uncertainty quantification.

![End-to-End System Pipeline & Triage Engine](/portfolio/images/exoplanets/E2E.jpg)

---

## 2. The Kaggle Failure & The Strategic Pivot

The initial hypothesis was that a planetary transit creates an identifiable morphological signature (a U-shaped dip in a light curve). However, my initial attempts—including 1D CNNs, Random Forests, and Lomb-Scargle phase-folding—failed entirely on standard Kaggle exoplanet datasets.

By applying NASA's Box-Least Squares (BLS) algorithm as a sanity check, I proved that the 37 light curves labeled as "Planets" in the Kaggle dataset were statistically indistinguishable from background noise. The dataset was inherently flawed and corrupted.

Rather than trying to force-fit a broken dataset, I rebuilt the entire data engineering foundation from scratch. I integrated directly with the **NASA MAST API** using the `lightkurve` library to fetch pristine, un-detrended TESS (Transiting Exoplanet Survey Satellite) Simple Prerelease Object Catalog (SPOC) data.

---

## 3. The Advanced Data & Signal Processing Pipeline

Processing raw astrophysical time-series required building a mathematically sound signal conditioning pipeline:

* **Corrupted Sector Filtering:** Individual sectors exhibiting negative median background flux are systematically pruned prior to stitching to prevent transit inversion during normalization.
* **High-Pass Spline Detrending:** A wide-window Savitzky-Golay filter (`window_length=401` to `1001`) decouples low-frequency stellar rotation (such as rotating starspots on M-dwarfs) from high-frequency 4-to-5-hour transit dips.
* **BLS Period Finding:** High-resolution period grids search across tens of thousands of orbital combinations to pinpoint the transit period and epoch.
* **Robust Scaling & One-Sided Clipping:** Applying Median Absolute Deviation (MAD) prevents massive stellar flares from artificially inflating the standard deviation and squashing transit depths. Positive anomalies are hard-clipped at `+3.0` MAD, while deep negative dips remain unclipped to preserve true physical transit geometry.

---

## 4. From Binary Prototype (V1) to Calibrated Ternary Triage Engine (V2)

### The V1 Prototype: Morphological Feature Extraction
In Version 1, a lightweight **1D Convolutional Neural Network (CNN)** (16 ➝ 32 ➝ 64 filters with Dropout) was trained to recognize the sequential morphology of a transit: steep ingress, flat bottom, and steep egress. On pristine binary datasets, it achieved **90.37% Accuracy** with an AUC of 0.924.

![CNN Performance Metrics](/portfolio/images/exoplanets/exoplanet-ml-metrics.jpg)

### The V2 Architecture: Overcoming the Eclipsing Binary Trap
In real astrophysics, binary classifiers fail when deployed on multi-sector data. The primary eclipse of an **Eclipsing Binary (EB)** mimics a planetary transit almost perfectly.

To resolve this, the network was expanded into a **Ternary Classifier** (Planet vs. Eclipsing Binary vs. Noise) trained on augmented data injected with confirmed EBs from the Villanova Catalog. The network learns secondary eclipses and the continuous V-shaped slopes characteristic of stellar pairs.

![Ternary CNN & Monte Carlo Dropout Inference Flow](/portfolio/images/exoplanets/CNN_MCD.jpg)

### Quantifying Trust: Monte Carlo Dropout & Temperature Calibration
Real-world scientific tools cannot output overconfident, blind predictions:
1. **Monte Carlo Dropout (Epistemic Uncertainty):** Dropout remains active during inference across 50 forward passes. The variance provides an explicit standard deviation ($ \pm \sigma $), exposing whether the model is guessing or fundamentally certain.
2. **Temperature Scaling (ECE Calibration):** Deep neural networks suffer from overconfidence. By calibrating raw logits with an optimal temperature parameter ($T = 1.0853$), the model achieved an **Expected Calibration Error (ECE) of just 2.35%**, ensuring predicted probabilities mirror empirical likelihoods.

---

## 5. Explainable AI (XAI) & The AI Veto Engine

### 1D Grad-CAM, SHAP & Counterfactual Ablation
Because CNNs can learn dataset artifacts rather than physics, I deployed an **Explainable AI consensus** combining 1D Grad-CAM, SHAP, and Integrated Gradients.

During counterfactual ablation on **TIC 185259483** (a confirmed Eclipsing Binary), masking out the primary dip caused the AI's confidence that it was a binary to **increase**. Removing the "planet-like" dip left behind purely binary astrophysics: out-of-eclipse ellipsoidal tidal variations (continuous gravity waves). This provided empirical proof that the CNN had learned physical gravitational dynamics rather than simple dips.

### Empirical Case Studies
* **Resolving Multi-Sector Blind Spots (TOI-700):** By stitching 5 sectors and evaluating 100,000 period combinations, the engine extracted the exact **16.0512-day** orbit of exoplanet **TOI-700 c**.
* **Vetoing Classical BLS Gap Artifacts (TOI-1231):** On multi-month sector gaps, mathematical aliasing deceived classical BLS algorithms into flagging a false peak at **40.8093 days**. The CNN analyzed the folded signal, recognized it as a mathematical artifact rather than a physical transit, and successfully **VETOED** the candidate.

---

## 6. The Interactive Web Platform & Dashboard

The entire inference and telemetry pipeline is packaged into a dark-mode Flask application featuring glassmorphism UI and interactive **Plotly.js visualizers**:

* **Live Light Curve Inspection:** Upload or stream any TIC (TESS Input Catalog) ID directly from NASA MAST.
* **Layer-by-Layer Grad-CAM MRI:** Toggle between convolutional layers to see where the network focuses its attention (broad transit profile vs. sharp ingress/egress edges).
* **Batch Discovery Engine:** Asynchronous background processing allowing bulk triage across dozens of stellar targets simultaneously.

![XAI Dashboard Interface](/portfolio/images/exoplanets/exoplanet-ml-dashboard.jpg)

---

## 7. Deep-Dive Research Papers

For complete mathematical derivations, experimental benchmarks, and ablation curves, consult the research papers:

* **[An XAI-Driven, Uncertainty-Aware Ternary Triage Engine for Exoplanet Detection](/portfolio/blog/exoplanet-research)**
* **[When Robust Scaling Becomes a Representation Shift (Z-Score vs. MAD Normalization)](/portfolio/blog/mad)**
