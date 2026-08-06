---
title: "Détection d'exoplanètes : De l'ingénierie des données à l'XAI"
description: "Une plongée approfondie dans la construction d'un pipeline d'IA explicable pour la découverte d'exoplanètes à l'aide des données MAST de la NASA."
pubDate: 2026-08-06
tags: ["IA Explicable", "Astrophysique", "Machine Learning"]
coverImage: "/portfolio/images/hero.jpg"
---

*🔗 Code source & Tableau de bord interactif : [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

Lorsque j'ai commencé mon projet sur la détection automatisée d'exoplanètes, mon hypothèse initiale était simple : un transit planétaire crée une signature morphologique identifiable (une baisse en forme de U) qu'un modèle de machine learning peut apprendre à reconnaître. Ce qui a commencé comme une simple comparaison a évolué en une enquête rigoureuse sur les pipelines de données et l'IA explicable (XAI).

### L'échec sur Kaggle et la transition vers l'API NASA

J'ai commencé avec un jeu de données Kaggle fortement déséquilibré, en abordant le problème comme une classification binaire avec des Random Forests et des CNN 1D. Le résultat fut un échec total. Une analyse utilisant l'algorithme Box-Least Squares (BLS) standard de la NASA a prouvé que les courbes de lumière étiquetées comme "Planètes" étaient statistiquement indiscernables du bruit de fond.

Pour résoudre ce problème, j'ai reconstruit le pipeline en me connectant directement à l'API MAST de la NASA avec `lightkurve` pour télécharger des données TESS brutes.

![Comparaison des données brutes Kaggle vs NASA](/portfolio/images/exoplanet-ml-metrics.jpg)
*Figure 1 : Comparaison des performances du modèle utilisant les données brutes TESS de la NASA.*

**Le Pipeline de Données Avancé :**
* **Traitement Astrophysique :** Aplatissement de la courbe à l'aide d'une médiane glissante sur 1001 points et application du BLS avec des grilles haute résolution.
* **Normalisation Robuste (MAD) :** Mise à l'échelle robuste à l'aide de la déviation absolue médiane pour empêcher les éruptions stellaires de fausser les transits.

$$ MAD = \text{médiane}(|X_i - \text{médiane}(X)|) $$
*(Note : L'utilisation du MAD garantit que nos calculs d'écart type ne sont pas corrompus par des anomalies stellaires)*

* **Écrêtage Unilatéral :** Écrêtage des valeurs aberrantes positives à `+3.0` pour supprimer les rayons cosmiques, tout en laissant les transits intacts pour préserver leur profondeur.

### Le Cœur Deep Learning & Le Consensus XAI

J'ai entraîné un réseau neuronal convolutif (CNN) 1D. Le réseau a appris de manière inhérente la forme physique d'un transit (l'entrée abrupte, le fond plat, la sortie), atteignant une **Précision de 90,37%** avec un **AUC de 0,924**.

Mais comment savoir si le modèle ne s'appuie pas sur le bruit de fond ou des artefacts mathématiques ? J'ai utilisé **l'Analyse d'Ablation** et établi un "Consensus XAI" via trois méthodes d'attribution distinctes.

![Masque d'ablation Grad-CAM sur TIC 261136679](/portfolio/images/exoplanet-ml-dashboard.jpg)
*Figure 2 : Masque XAI Grad-CAM mettant en évidence le transit physique de TIC 261136679.*

* **Grad-CAM :** Masquer la région Grad-CAM a provoqué une chute de confiance de **-63,88%**, prouvant que le modèle capture la forme globale du transit. Masquer le bruit de fond n'a provoqué qu'un changement de +0,05%, prouvant que le modèle est immunisé contre l'effet Hans le Malin.
* **SHAP & Integrated Gradients :** Les algorithmes correspondent presque parfaitement au masque manuel des transits physiques. Ce consensus prouve que le modèle s'appuie véritablement sur la forme astrophysique du transit.

### Construire un moteur de triage IA

Élever le pipeline au niveau de publication nécessite de résoudre les cas où les algorithmes traditionnels échouent.

Pour trouver des planètes à longue période, j'ai raccordé (stitching) plusieurs secteurs TESS et rendu le BLS dynamique pour élargir considérablement la plage de détection. Testé sur **TOI-700**, l'algorithme a extrait une période orbitale de 16,05 jours, que le CNN a classée avec 79% de confiance.

Cependant, les énormes lacunes dans les séries temporelles créent un chaos mathématique. Les algorithmes traditionnels supposent une observation continue et trouvent inévitablement des pics d'artefacts "parfaits" à l'intérieur de la lacune.

En analysant **TOI-1231** sur 5 secteurs non consécutifs, l'algorithme BLS a été trompé par une lacune de données et a produit un artefact de 40,8 jours. Le CNN, cependant, a inspecté le signal, reconnu l'anomalie plutôt qu'un transit en U, et a mis un **VETO** avec succès.

Cela prouve la nécessité absolue d'utiliser l'IA comme **Moteur de Triage** pour outrepasser les algorithmes classiques mathématiquement défaillants. La prochaine étape consiste à passer à un classificateur ternaire pour filtrer explicitement les binaires à éclipses.
