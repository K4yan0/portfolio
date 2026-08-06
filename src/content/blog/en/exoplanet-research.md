---
title: "An XAI-Driven Triage Engine for Multi-Sector Exoplanet Detection"
description: "Overcoming BLS algorithmic failures on multi-sector TESS gaps using a 1D-CNN AI Triage engine powered by XAI."
pubDate: 2026-08-06
tags: ["Explainable AI", "Astrophysics", "Machine Learning", "TESS"]
coverImage: "/portfolio/images/hero.jpg"
---

*🔗 Source Code & Interactive Dashboard: [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

## 1. Abstract
Traditional exoplanet detection pipelines rely heavily on Box-Least Squares (BLS) algorithms to identify periodic planetary transits. However, as observation baselines extend across multiple years, these mathematical models become increasingly vulnerable to multi-sector data gaps and stellar variability, frequently generating false positives (aliases) or burying true signals. This paper presents an automated AI Triage Engine utilizing a 1D Convolutional Neural Network (CNN) designed to operate in tandem with classical astronomy algorithms. By leveraging Explainable AI (XAI) consensus via Grad-CAM, SHAP, and Integrated Gradients, we prove the model physically learns the morphology of a transit. Furthermore, we demonstrate the engine's capability to successfully veto mathematically perfect gap-induced artifacts that deceive classical BLS algorithms.

## 2. Data Acquisition & Preprocessing Methodology
The pipeline connects directly to the NASA MAST API via `lightkurve` to process pristine, un-detrended TESS (Transiting Exoplanet Survey Satellite) Simple Prerelease Object Catalog (SPOC) data. 

To expand the detection baseline beyond a single 27-day sector and enable the discovery of long-period exoplanets, the pipeline dynamically downloads and stitches up to five sectors. 

**Preprocessing constraints include:**
1. **Corrupted Sector Filtering:** Individual sectors exhibiting a negative median background flux are systematically dropped prior to stitching to prevent transit-inversion during normalization.
2. **High-Pass Spline Detrending (Critique 3):** Low-frequency stellar variability (e.g., rotating starspots on M-dwarfs) is decoupled from high-frequency transit signals using a wide-window Savitzky-Golay filter (`window_length=401`). This ensures 4-to-5-hour transits are perfectly preserved while large sinusoidal stellar waves are flattened.
3. **Robust Normalization:** The pipeline applies Robust Scaling using Median Absolute Deviation (MAD) rather than Standard Deviation, preventing massive stellar flares from squashing transit depths. Positive anomalies are clipped at `+3.0` MAD to eliminate cosmic rays, while deep negative transits remain unclipped to preserve physical depth.

## 3. Model Architecture & Quantitative Evaluation
The AI Triage Engine is built on a lightweight 1D Convolutional Neural Network (CNN). Rather than executing blind feature extraction, the network is trained to identify the exact physical morphology of a transit (steep ingress, flat bottom, egress).

**Evaluation Metrics:**
The model underwent rigorous evaluation against a validation dataset of confirmed TESS transits, prioritizing a high Precision score to strictly minimize false positives.

| Metric | Score |
| :--- | :--- |
| **Accuracy** | 90.37% |
| **AUC** | 0.924 |
| **Precision** | **0.94** |
| **Recall** | **0.86** |
| **F1-Score** | **0.89** |

The 0.94 Precision confirms the model's reliability as a strict gating mechanism (Veto Engine) against non-planetary anomalies.

## 4. Explainable AI (XAI) Attribution Analysis
To prove the CNN does not suffer from the Clever Hans effect (relying on background noise or systematic artifacts), we established an **XAI Consensus**. We employed Grad-CAM, SHAP (Game Theory), and Integrated Gradients (Pixel Attribution) to highlight the exact time-series regions driving the model's confidence.

We then performed an **Ablation (Perturbation) Analysis**, systematically masking out physical regions of the phase-folded light curve and recalculating the model's confidence.

| Masked Region | Model Confidence Change | Conclusion |
| :--- | :--- | :--- |
| **Transit Region (Physics)** | -46.22% | The model heavily relies on the physical transit dip. |
| **XAI Highlighted Region** | **-57.13%** | The XAI heatmaps successfully isolated the model's absolute core decision criteria. |
| **Pre-Transit Baseline** | +2.45% | Masking pre-transit data slightly improves confidence (less noise). |
| **Random Background** | +2.48% | The model mathematically ignores background noise. |

This multi-algorithm consensus provides undeniable proof that the AI is detecting astrophysical phenomena rather than mathematical noise.

## 5. Empirical Case Studies (The AI VETO Engine)

### Case Study A: TOI-700 (Overcoming the Multi-Sector Blind Spot)
Standard single-sector pipelines are blind to orbits longer than ~13 days. By dynamically stitching 5 sectors and explicitly expanding the BLS calculation grid to evaluate 100,000 continuous period combinations, our pipeline successfully pierced the noise on **TOI-700 (TIC 150428135)**. The engine extracted the exact **16.0512-day** orbital period corresponding to the sub-Neptune exoplanet **TOI-700 c**, with the CNN confirming the detection at **79.03% confidence**.

### Case Study B: TOI-1231 (Vetoing BLS Gap Artifacts)
When stitching data separated by multi-month observation gaps (e.g., Sector 11 to Sector 27), traditional BLS algorithms suffer mathematical chaos. 

When testing **TOI-1231 (TIC 447061717)** across 5 non-consecutive sectors, the massive empty gap tricked the classical BLS algorithm into finding a mathematically "perfect" artifact peak at **40.8093 Days**. The BLS algorithm natively output this as the highest probability period. 

However, when the 40.8-day phase-folded signal was passed to the AI Triage Engine, the CNN analyzed the physical morphology, recognized it as a gap-induced mathematical anomaly rather than a U-shaped transit, and successfully **VETOED** the signal. This empirically proves the necessity of an AI Triage Engine to overrule mathematically flawed classical algorithms on multi-sector data.

## 6. Future Work and Limitations
While the current pipeline acts as an exceptionally robust binary classifier, two major astrophysical edge cases remain for future architectural upgrades:

1. **Eclipsing Binaries:** The universe is flooded with binary star systems that create sharp, V-shaped transits mimicking massive exoplanets. The architecture must be upgraded from a Binary to a **Ternary Classifier** (Planet vs. Eclipsing Binary vs. Noise) to properly triage secondary eclipses.
2. **Transit Timing Variations (TTVs):** The pipeline currently assumes a perfectly periodic orbit. In multi-planet systems with strong gravitational interactions, planets transit off-schedule, causing strict phase-folding to smear the signal into noise. Future iterations will route the *unfolded* time-series through a 1D ResNet or Transformer architecture to spot a-periodic individual transit events.
