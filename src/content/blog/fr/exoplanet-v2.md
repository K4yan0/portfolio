---
title: "Lancement du Projet Exoplanet Multimodal AI (V2)"
description: "Début du développement de la nouvelle génération de détection d'exoplanètes via des architectures multimodales et validation HARP/ESO."
pubDate: 2026-07-27
tags: ["IA Explicable", "Astrophysique", "Open Source"]
coverImage: "/portfolio/images/hero.jpg"
---
Aujourd'hui, je lance officiellement le développement de **Exoplanet Multimodal AI (V2)**.

S'appuyant sur le succès de mon premier modèle d'IA Explicable (XAI) pour la détection de transits, cette nouvelle itération est conçue pour repousser les limites de la découverte automatisée d'exoplanètes en abandonnant l'approche basée sur une source unique.

### Le Problème

Bien que l'intégration de l'API TESS nous ait fourni des courbes de lumière de transit propres, se fier uniquement à la photométrie laisse une marge d'erreur concernant les faux positifs (par exemple, les systèmes binaires à éclipses).

### La Solution : Inférence Multimodale

La V2 introduira une approche de validation croisée utilisant **les données de vitesse radiale HARP/ESO**. En fournissant à une architecture d'IA multimodale à la fois les données photométriques de transit et les données spectroscopiques de vitesse radiale, le modèle pourra confirmer de manière déterministe la masse et la nature du corps en orbite.

![Architecture Exoplanet V2](/portfolio/images/hero.jpg)
*(Note : Je mettrai à jour ce graphique avec les templates Canva finaux prochainement)*

Vous pouvez suivre le développement en cours, consulter les diagrammes d'architecture et contribuer au code source directement sur GitHub :

[🔗 Repository exoplanet-multimodal-ai](https://github.com/K4yan0/exoplanet-multimodal-ai)
