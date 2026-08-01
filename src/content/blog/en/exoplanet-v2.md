---
title: "Announcing Exoplanet Multimodal AI (V2)"
description: "Kicking off the next generation of exoplanet detection using multimodal architectures and HARP/ESO cross-validation."
pubDate: 2026-07-27
tags: ["Explainable AI", "Astrophysics", "Open Source"]
coverImage: "/images/hero.jpg"
---
Today, I am officially starting development on **Exoplanet Multimodal AI (V2)**.

Building upon the success of my initial Explainable AI (XAI) transit detection model, this next iteration is designed to push the boundaries of automated exoplanet discovery by moving away from a single-source light curve approach.

### The Problem

While TESS API integration gave us clean transit light curves, relying solely on photometry leaves a margin of error regarding false positives (e.g., eclipsing binaries). 

### The Solution: Multimodal Inference

V2 will introduce a cross-validation approach utilizing **HARP/ESO radial velocity data**. By feeding a multimodal AI architecture both the photometric transit data and the spectroscopic radial velocity data, the model can deterministically confirm the mass and nature of the orbiting body.

![Exoplanet V2 Architecture](/images/hero.jpg)
*(Note: I will update this graphic with the final Canva templates soon)*

You can track the ongoing development, view the architecture diagrams, and contribute to the source code directly on GitHub:

[🔗 exoplanet-multimodal-ai Repository](https://github.com/K4yan0/exoplanet-multimodal-ai)
