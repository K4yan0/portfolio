---
title: "Exoplanet Detection XAI"
description: "Un modèle d'IA Explicable (XAI) utilisant les API de la NASA pour automatiser la détection de transits d'exoplanètes. Précision de 90% via un CNN sur mesure."
launchDate: 2026-07-26
techStack: ["Python", "CNN", "Flask", "NASA MAST API", "Plotly", "Grad-CAM"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
coverImage: "/portfolio/images/exoplanet-ml-cover.jpg"
---
## Automatisation de la Découverte Planétaire

Inspiré par le hackathon [NASA Space Apps Challenge 2025 ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), je me suis lancé dans une mission indépendante visant à entraîner un modèle de Machine Learning capable de détecter les transits d'exoplanètes, éliminant ainsi le besoin d'observation manuelle sur Zooniverse.

Ce projet a évolué en une enquête en deux parties : surmonter un dataset Kaggle corrompu, puis construire un pipeline en direct avec l'API de la NASA pour entraîner un Réseau de Neurones Convolutif (CNN) d'une grande précision.

### L'Échec Kaggle et le Pivot Stratégique

L'hypothèse initiale était qu'un transit planétaire crée une signature morphologique identifiable (une baisse en forme de U dans une courbe de lumière). Cependant, mes premières tentatives—incluant CNN 1D, Random Forests, et phase-folding Lomb-Scargle—ont totalement échoué.

En appliquant l'algorithme BLS (Box-Least Squares) de la NASA comme test de cohérence, j'ai prouvé que les 37 courbes de lumière étiquetées comme "Planètes" dans le dataset Kaggle étaient statistiquement indiscernables du bruit de fond. Le dataset était intrinsèquement défectueux.

Au lieu de dépendre de CSV statiques, j'ai reconstruit le pipeline de zéro. Je me suis intégré directement à **l'API NASA MAST** en utilisant la librairie `lightkurve` pour récupérer des données TESS brutes et rigoureuses.

### Le Pipeline de Données Avancé

Pour traiter les données astrophysiques brutes, j'ai conçu un pipeline robuste :
* **Aplatissement :** Une médiane mobile sur 1001 points supprime la rotation stellaire sans créer d'artéfacts de filtrage.
* **Recherche de Période BLS :** Des grilles de période à haute résolution trouvent avec précision la période orbitale et l'époque.
* **Normalisation Robuste (MAD) :** L'Écart Absolu Médian empêche les éruptions stellaires positives massives d'écraser la profondeur des transits.
* **Clipping Unilatéral :** Le fait de couper les valeurs aberrantes positives à `+3.0` tout en laissant les transits négatifs intacts préserve leur véritable profondeur physique.

### Le Cœur Deep Learning

Alors que les modèles traditionnels comme les Random Forests peinent à comprendre intrinsèquement la forme séquentielle des séries temporelles, un **Réseau de Neurones Convolutif (CNN) 1D** s'est avéré parfait pour la tâche.

J'ai entraîné une architecture légère (16 ➝ 32 ➝ 64 filtres avec Dropout) pour éviter le surapprentissage. Le réseau a appris de lui-même la signature morphologique d'un transit (l'entrée abrupte, le fond plat, et la sortie), pulvérisant les plafonds précédents pour atteindre **90,37% de précision** avec un AUC de 0,924.

![Performances du Modèle CNN](/portfolio/images/exoplanet-ml-metrics.jpg)

Pour protéger le modèle contre l'effet "Hans le Malin" (où des plafonds de données artificiels imitent des transits), j'ai implémenté un **Veto Heuristique**—un garde-fou d'ingénierie qui intercepte et rejette automatiquement les artéfacts mathématiques avec 0% de confiance avant qu'ils n'atteignent le réseau de neurones.

### L'Application Web et le Tableau de Bord XAI

L'ensemble du pipeline d'inférence est encapsulé dans une Application Web Flask moderne en mode sombre, dotée d'une interface en glassmorphism et de **visualisations interactives Plotly.js**.

Parce que le CNN apprend physiquement la forme du transit, j'ai déployé une **IA Explicable (XAI)** via un algorithme personnalisé Grad-CAM 1D. Il agit comme une "IRM IA", cartographiant exactement ce à quoi le CNN prête attention sur la courbe de lumière. Les utilisateurs peuvent alterner entre les couches pour voir comment le réseau identifie la forme large du transit par rapport aux bords nets d'entrée et de sortie.

![Tableau de Bord XAI](/portfolio/images/exoplanet-ml-dashboard.jpg)

Pour les travaux astrophysiques à grande échelle, la plateforme inclut un **Moteur de Découverte en Lot** permettant le traitement asynchrone simultané de dizaines d'étoiles.

> **Prochaine Étape :** La version 2 est actuellement en préparation. Elle introduira une validation croisée utilisant les données de vitesse radiale HARP/ESO pour consolider davantage la confiance des détections.

> **Pour en savoir plus :** Pour une plongée approfondie dans l'astrophysique, l'ingénierie des données et l'analyse d'ablation XAI, [lisez l'article de recherche complet ici](/portfolio/fr/blog/exoplanet-research).
