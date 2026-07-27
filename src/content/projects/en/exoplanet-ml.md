---
title: "Exoplanet Detection XAI"
description: "An Explainable AI model leveraging NASA TESS APIs to automate exoplanet transit detection."
launchDate: 2026-07-26
techStack: ["Python", "Machine Learning", "XAI", "Data Analysis"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
---
## Automating Planetary Discovery

Inspired by the [2025 NASA Space Apps Challenge ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), I embarked on an independent mission to train a custom machine learning model capable of detecting exoplanetary transits, eliminating the need for manual observation on Zooniverse.

### Architecture & Evolution

The project began as an architectural exploration: determining the optimal solution (Random Forest vs. CNN) for transit detection. Initial data analysis using Kaggle datasets revealed critical data cleanliness issues, forcing a strategic pivot. 

Instead of relying on static, flawed datasets, I integrated directly with the **NASA TESS APIs** to feed live, robust data into the pipeline.

### Explainable AI (XAI)

The defining feature of this project is the integration of Explainable AI (XAI). The model doesn't just output a binary classification; it interprets the signal (TIC) and actively explains the underlying features that led it to classify a light curve as an exoplanet.

> **Next Phase:** Version 2 is currently in preparation. It will introduce cross-validation using HARP/ESO radial velocity data to further solidify detection confidence.
