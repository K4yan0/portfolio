---
title: "Prédiction de Risque Météoritique"
description: "Architecture Random Forest conçue pour prédire les risques de collision d'astéroïdes via les APIs de la NASA."
launchDate: 2025-01-01
techStack: ["Python", "Random Forest", "API Integration", "Data Science"]
githubUrl: "https://github.com/K4yan0/asteroid-risk-prediction"
---
## Surveillance des Objets Géocroiseurs

Développé en 2025, ce projet implémente un modèle de Machine Learning basé sur une Random Forest (RF) pour évaluer et prédire les risques de collision avec les objets géocroiseurs (NEOs).

### Ingénierie des Données & APIs NASA

Le système s'affranchit des datasets statiques en s'interfaçant directement avec l'API **NASA JPL NeoWs (Near Earth Object Web Service)**. Il extrait des données orbitales en temps réel, structurant ainsi un pipeline de télémétrie robuste. Les *features* analysées par le modèle incluent :
- La magnitude absolue (estimation de la taille via la luminosité).
- La vitesse relative (km/s).
- La distance de croisement (en unités astronomiques et distances lunaires).
- Les paramètres d'incertitude orbitale.

### Approche de Modélisation

J'ai choisi l'architecture **Random Forest** pour sa capacité à gérer des données planétaires non linéaires et sa robustesse face au surapprentissage (overfitting). En analysant des centaines de milliers de trajectoires historiques, le modèle trace des frontières de classification précises entre les objets dangereux et non dangereux.

Ce projet démontre des compétences complètes en Data Science : de l'ingénierie des données via API en direct, jusqu'à la sélection des *features*, l'entraînement du modèle et l'inférence.
