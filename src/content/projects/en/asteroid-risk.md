---
title: "Asteroid Collision Risk Prediction"
description: "A Random Forest architecture designed to predict asteroid collision risks using live telemetry from NASA APIs."
launchDate: 2025-01-01
techStack: ["Python", "Random Forest", "API Integration", "Data Science"]
githubUrl: "https://github.com/K4yan0/asteroid-risk-prediction"
---
## Near-Earth Object Surveillance

Developed in 2025, this project implements a Random Forest (RF) machine learning model to evaluate and predict the risk of collision with Near-Earth Objects (NEOs). 

### Data Engineering & NASA APIs

The system bypasses static datasets by interfacing directly with the **NASA JPL NeoWs (Near Earth Object Web Service) APIs**. It pulls live orbital data, structuring a robust telemetry pipeline. Features engineered for the model include:
- Absolute magnitude (luminosity-based size estimation).
- Relative velocity (km/s).
- Miss distance (astronomical units and lunar distances).
- Orbit uncertainty parameters.

### Modeling Approach

I chose a **Random Forest** architecture for its inherent ability to handle non-linear planetary data and its robustness against overfitting. By analyzing hundreds of thousands of historical NEO trajectories, the model establishes classification boundaries between hazardous and non-hazardous objects.

The project demonstrates end-to-end data science capabilities: from live API data ingestion and cleaning to feature engineering, model training, and inference.
