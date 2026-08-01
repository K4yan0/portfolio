---
title: "Exoplanet Detection XAI"
description: "An Explainable AI model leveraging NASA TESS APIs to automate exoplanet transit detection. Achieved 90% accuracy using a custom CNN architecture."
launchDate: 2026-07-26
techStack: ["Python", "CNN", "Flask", "NASA MAST API", "Plotly", "Grad-CAM"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
coverImage: "/portfolio/images/exoplanet-ml-cover.jpg"
---
## Automating Planetary Discovery

Inspired by the [2025 NASA Space Apps Challenge ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), I embarked on an independent mission to train a custom machine learning model capable of detecting exoplanetary transits, eliminating the need for manual observation on Zooniverse.

This project evolved into a two-part investigation: overcoming a corrupted Kaggle dataset, and building a live NASA API pipeline to train a highly accurate Convolutional Neural Network (CNN).

### The Kaggle Failure & The Strategic Pivot

The initial hypothesis was that a planetary transit creates an identifiable morphological signature (a U-shaped dip in a light curve). However, my initial attempts—including 1D CNNs, Random Forests, and Lomb-Scargle phase-folding—failed entirely. 

By applying NASA's Box-Least Squares (BLS) algorithm as a sanity check, I proved that the 37 light curves labeled as "Planets" in the Kaggle dataset were statistically indistinguishable from background noise. The dataset was inherently flawed.

Instead of relying on static CSVs, I rebuilt the pipeline from scratch. I integrated directly with the **NASA MAST API** using the `lightkurve` library to fetch pristine, raw TESS (Transiting Exoplanet Survey Satellite) data.

### The Advanced Data Pipeline

To process the raw astrophysical data, I engineered a robust pipeline:
* **Flattening:** A 1001-point rolling median removes stellar rotation without creating filtering artifacts.
* **BLS Period Finding:** High-resolution period grids accurately find the orbital period and epoch.
* **Robust Normalization (MAD):** Median Absolute Deviation prevents massive positive stellar flares from squashing the transit depths.
* **One-Sided Clipping:** Clipping positive outliers at `+3.0` while leaving deep negative transits unclipped preserves true physical depth.

### The Deep Learning Core

While traditional models like Random Forests struggle to inherently understand sequential time-series shapes, a **1D Convolutional Neural Network (CNN)** proved perfect for the task. 

I trained a lightweight architecture (16 ➝ 32 ➝ 64 filters with Dropout) to prevent overfitting. The network inherently learned the morphological signature of a transit (the steep ingress, flat bottom, and egress), shattering previous ceilings to achieve **90.37% Accuracy** with an AUC of 0.924.

![CNN Performance Metrics](/portfolio/images/exoplanet-ml-metrics.jpg)

To protect the model against the "Clever Hans" effect (where artificial data ceilings mimic transits), I implemented a **Heuristic Veto**—an engineering guardrail that automatically intercepts and rejects mathematical artifacts with 0% confidence before they reach the neural network.

### The Web Application & XAI Dashboard

The entire inference pipeline is wrapped in a modern, dark-mode Flask Web Application featuring glassmorphism UI and **interactive Plotly.js visualizations**. 

Because the CNN physically learns the shape of the transit, I deployed **Explainable AI (XAI)** via a custom 1D Gradient-weighted Class Activation Mapping (Grad-CAM) algorithm. This acts as an "AI MRI", mapping exactly what the CNN is paying attention to onto the plotted light curve. Users can toggle between layers to see how the network identifies the broad transit shape versus the sharp ingress/egress edges.

![XAI Dashboard Interface](/portfolio/images/exoplanet-ml-dashboard.jpg)

For large-scale astrophysics work, the platform includes a **Batch Discovery Engine** allowing asynchronous bulk processing of dozens of stars simultaneously.

> **Next Phase:** Version 2 is currently in preparation. It will introduce cross-validation using HARP/ESO radial velocity data to further solidify detection confidence.
