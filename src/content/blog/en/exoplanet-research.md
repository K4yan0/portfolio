---
title: "Exoplanet Detection: From Data Engineering to XAI"
description: "A deep dive into building an Explainable AI pipeline for discovering exoplanets using NASA MAST data."
pubDate: 2026-08-06
tags: ["Explainable AI", "Astrophysics", "Machine Learning"]
coverImage: "/portfolio/images/hero.jpg"
---

*🔗 Source Code & Interactive Dashboard: [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

When I began my journey into automated exoplanet detection, my initial hypothesis was straightforward: a planetary transit creates an identifiable morphological signature (a U-shaped dip in a light curve) that a machine learning model can learn to recognize. What began as a simple baseline comparison evolved into a rigorous investigation of data pipelines and Explainable AI.

### The Kaggle Failure and NASA API Pivot

I started with a heavily imbalanced Kaggle dataset, framing the problem as a simple binary classification task using Random Forests and 1D CNNs. The result was a total failure. A statistical analysis using NASA's standard Box-Least Squares (BLS) algorithm proved conclusively that the light curves labeled as "Planets" in the dataset were statistically indistinguishable from background noise. The dataset was inherently flawed.

To solve this, I rebuilt the pipeline from scratch, connecting directly to the NASA MAST API using `lightkurve` to download pristine, raw TESS (Transiting Exoplanet Survey Satellite) data.

![Kaggle vs NASA Raw Data Comparison](/portfolio/images/exoplanet-ml-metrics.jpg)
*Figure 1: Comparison of model performance using raw NASA TESS data.*

**The Advanced Data Pipeline:**
* **Astrophysics Processing:** Flattening the light curve using a 1001-point rolling median and applying BLS with high-resolution period grids (100,000 points).
* **Robust Normalization:** Implementing Robust Scaling using Median Absolute Deviation (MAD) to prevent massive stellar flares from squashing transit depths.

$$ MAD = \text{median}(|X_i - \text{median}(X)|) $$
*(Note: Using MAD ensures our standard deviation calculations remain uncorrupted by stellar anomalies)*

* **One-Sided Clipping:** Clipping positive outliers at `+3.0` to crush cosmic rays, while leaving deep negative transits unclipped to preserve physical depth.

### The Deep Learning Core & XAI Consensus

I trained a 1D Convolutional Neural Network (CNN) with a lightweight architecture. The network inherently learned the physical shape of a transit (steep ingress, flat bottom, egress), achieving **90.37% Accuracy** with an **AUC of 0.924**.

But how do we know the model isn't relying on background noise or mathematical artifacts? I employed **Ablation (Perturbation) Analysis** and established an "XAI Consensus" using three distinct mathematical attribution methods.

![Grad-CAM Ablation Mask on TIC 261136679](/portfolio/images/exoplanet-ml-dashboard.jpg)
*Figure 2: Grad-CAM XAI mask highlighting the physical transit of TIC 261136679.*

* **Grad-CAM:** Masking the Grad-CAM region for the first convolutional layer caused a massive **-63.88%** confidence drop, proving it successfully captures the broad, global shape of the transit. Masking random background noise resulted in a +0.05% change, mathematically proving the model is immune to the Clever Hans effect.
* **SHAP & Integrated Gradients:** Both Game Theory and Pixel Attribution algorithms almost perfectly matched the manual masking of physical transits. This robust consensus proves beyond a doubt that the model genuinely relies on the exact astrophysical shape of the transit.

### Building an AI Triage Engine

Pushing an engine to publication-grade requires solving edge cases where traditional astronomy algorithms break down.

To find long-period planets, algorithms require long observational baselines. By stitching together multiple TESS sectors and making the BLS algorithm dynamically search up to half the baseline length, I dramatically expanded the detection range. Tested on **TOI-700**, the dynamic BLS algorithm extracted an exact 16.05-day orbital period, which the CNN classified with 79% confidence.

However, massive empty gaps in multi-year time-series create severe mathematical chaos. Traditional BLS algorithms assume continuous observation and inevitably find "perfect" artifact peaks that neatly fit inside the gap. 

When testing **TOI-1231** across 5 non-consecutive sectors, the traditional BLS algorithm was tricked by a massive data gap into outputting a false 40.8-day period artifact. The CNN, however, inspected the signal, recognized the gap-induced anomaly rather than a U-shaped transit, and successfully **VETOED** the signal. 

This proves the absolute necessity of using AI as a **Triage Engine** to overrule mathematically flawed classical algorithms. The next step is upgrading the architecture to a Ternary Classifier to explicitly filter out Eclipsing Binaries.
