---
title: "Détection d'Exoplanètes XAI"
description: "Un modèle d'IA Explicable (XAI) utilisant les APIs TESS de la NASA pour automatiser la détection de transits d'exoplanètes."
launchDate: 2026-07-26
techStack: ["Python", "Machine Learning", "XAI", "Data Analysis"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
---
## Automatisation de la Découverte Planétaire

Inspiré par le hackathon [NASA Space Apps Challenge 2025 ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), je me suis lancé dans une mission indépendante pour entraîner mon propre modèle de Machine Learning capable de détecter les transits d'exoplanètes, éliminant ainsi le besoin d'observation manuelle sur Zooniverse.

### Architecture & Évolution

Le projet a débuté par une exploration architecturale : déterminer la solution optimale (Random Forest vs CNN) pour la détection. L'analyse initiale des données (datasets Kaggle) a révélé des problèmes critiques de propreté, forçant un pivot stratégique. 

Au lieu de m'appuyer sur des datasets statiques, je me suis directement interfacé avec les **APIs TESS de la NASA** (2026) pour alimenter le pipeline avec des données fiables.

### Intelligence Artificielle Explicable (XAI)

La fonctionnalité clé de ce projet est l'intégration de l'IA Explicable (XAI). Le modèle ne se contente pas d'une classification binaire ; il interprète le signal (TIC) et explique techniquement pourquoi il a classifié cette courbe de lumière comme étant une exoplanète.

> **Prochaine Étape :** La version 2 est en préparation. Elle introduira une validation croisée utilisant les données de vitesse radiale HARP/ESO pour solidifier la confiance des détections.
