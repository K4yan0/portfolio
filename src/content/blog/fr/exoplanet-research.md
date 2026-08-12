---
title: "Un moteur de triage ternaire basé sur l'incertitude et la XAI pour la détection d'exoplanètes"
description: "Surmonter les échecs de l'algorithme BLS et les faux positifs sur les données TESS à l'aide d'un CNN ternaire calibré propulsé par l'IA explicable et le Monte Carlo Dropout."
pubDate: 2026-08-11
tags: ["IA Explicable", "Astrophysique", "Machine Learning", "TESS", "Calibration de Modèle"]
coverImage: "/portfolio/images/TESS.jpg"
coverCredit: "Artist impression of the TESS spacecraft. NASA"
---

*🔗 Code source : [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

## 1. Résumé
Les pipelines traditionnels de détection d'exoplanètes s'appuient fortement sur les algorithmes de Box-Least Squares (BLS) pour identifier les transits planétaires périodiques. Cependant, à mesure que les lignes de base d'observation s'étendent sur plusieurs années, ces modèles mathématiques deviennent de plus en plus vulnérables aux lacunes de données multi-secteurs et aux faux positifs astrophysiques—notamment les Binaires à Éclipses (EBs) imitant les transits planétaires.

Cet article présente un moteur de triage IA automatisé utilisant un Réseau de Neurones Convolutif (CNN) 1D mis à niveau vers une architecture Ternaire (Planète vs Binaire à Éclipses vs Bruit). En intégrant le Monte Carlo Dropout pour l'incertitude épistémique et le Temperature Scaling pour la calibration statistique, le modèle fournit des probabilités rigoureuses et fiables. De plus, nous tirons parti du consensus d'IA Explicable (XAI) et de l'ablation contrefactuelle pour fournir des preuves solides que le réseau apprend de manière indépendante des caractéristiques astrophysiques profondes (telles que les variations gravitationnelles ellipsoïdales), lui permettant de rejeter avec succès les artefacts mathématiques qui trompent traditionnellement les algorithmes BLS classiques.

## 2. Méthodologie d'acquisition et de prétraitement des données
Le pipeline se connecte directement à l'API MAST de la NASA via `lightkurve` pour traiter les données vierges et non dé-tendancées du Simple Prerelease Object Catalog (SPOC) du satellite TESS (Transiting Exoplanet Survey Satellite). Pour étendre la ligne de base de détection au-delà d'un seul secteur de 27 jours, le pipeline raccorde dynamiquement jusqu'à cinq secteurs.

**Les contraintes de prétraitement incluent :**
1. **Filtrage des secteurs corrompus :** Les secteurs individuels présentant un flux de fond médian négatif sont systématiquement supprimés avant le raccordement afin d'éviter l'inversion du transit lors de la normalisation.
2. **Dé-tendanciation Spline Passe-Haut :** La variabilité stellaire basse fréquence (par exemple, les taches stellaires en rotation sur les naines rouges) est découplée des signaux de transit haute fréquence à l'aide d'un filtre de Savitzky-Golay à fenêtre large (`window_length=401`). Cela garantit que les transits de 4 à 5 heures sont largement préservés tandis que les grandes ondes stellaires sinusoïdales sont aplaties.
3. **Normalisation Robuste :** Le pipeline applique une mise à l'échelle robuste en utilisant l'Écart Absolu Médian (MAD) plutôt que l'Écart-Type, empêchant les éruptions stellaires massives d'écraser les profondeurs de transit. Les anomalies positives sont rigoureusement écrêtées à `+3.0` MAD, tandis que les transits profonds négatifs restent non écrêtés pour préserver la géométrie physique.

![Courbe de lumière brute vs dé-tendancée](/portfolio/images/raw_vs_detrended.png)
*Figure 1 : La dé-tendanciation Spline Passe-Haut découple la variabilité stellaire basse fréquence des signaux de transit haute fréquence.*

## 3. La mise à niveau vers le CNN Ternaire (Résoudre le problème des EBs)
Un défaut persistant des classificateurs binaires (Planète vs Bruit) est que l'éclipse primaire d'une Binaire à Éclipses est mathématiquement presque identique à un transit planétaire profond, inondant le pipeline de faux positifs.

Pour résoudre ce problème, l'architecture du réseau a été étendue à un **Classificateur Ternaire** utilisant `sparse_categorical_crossentropy` et une couche de sortie `softmax`. Le modèle a été entraîné sur un jeu de données augmenté, spécifiquement injecté avec des Binaires à Éclipses confirmées du catalogue de Villanova. Plutôt que de simplement chercher une baisse en forme de U, le réseau apprend à détecter les éclipses secondaires et les pentes continues en forme de V caractéristiques des systèmes d'étoiles binaires.

## 4. Incertitude Épistémique et Calibration du Modèle
Dans des pipelines scientifiques rigoureux, une probabilité statique de 99 % est insuffisante ; les chercheurs ont besoin d'une marge d'erreur mesurable et d'une fiabilité statistique.

### Monte Carlo Dropout
Pour empêcher le modèle de deviner à l'aveugle sur des signaux ambigus, nous avons implémenté le **Monte Carlo Dropout**. En gardant les couches de dropout actives pendant l'inférence, le pipeline exécute 50 passes probabilistes distinctes. La variance à travers ces passes génère **l'Écart-Type (Incertitude Épistémique)**. Une forte variance (ex. `± 20%`) indique que le réseau hésite, tandis qu'un regroupement serré (ex. `± 1,2%`) indique une grande confiance structurelle.

### Erreur de Calibration Attendue (ECE) & Temperature Scaling
Les réseaux de neurones sont connus pour être trop confiants. Pour garantir la rigueur mathématique, nous avons calculé **l'Erreur de Calibration Attendue (ECE)** du modèle. Notre modèle Ternaire a atteint nativement un ECE non calibré très précis de seulement **2,35 %**.

Pour optimiser encore cela, nous avons appliqué le **Temperature Scaling** via un optimiseur SciPy, produisant une constante de calibration optimale de $T=1,0853$. En divisant les logits bruts du CNN par $T$ avant l'activation softmax, nous alignons le modèle de sorte que lorsque le pipeline revendique "90 % de confiance", il est statistiquement très probable qu'il ait raison environ 9 fois sur 10.

![Diagramme de fiabilité et courbe de calibration](/portfolio/images/reliability_diagram_ternary.png)
*Figure 2 : Erreur de calibration attendue (ECE) et Temperature Scaling alignant les logits bruts sur la probabilité statistique réelle.*

## 5. IA Explicable & Ablation Contrefactuelle
Pour évaluer si le CNN s'appuie sur l'astrophysique physique plutôt que sur des artefacts du jeu de données, nous avons établi un **Consensus XAI** utilisant Grad-CAM, SHAP (Théorie des Jeux) et Integrated Gradients.

![XAI Heatmaps pour Eclipsing Binary](/portfolio/images/xai_grid_tic185259483.png)
*Figure 3: XAI Heatmaps pour une Binaire à Éclipses.*

Nous avons ensuite effectué une **Analyse d'Ablation**, en masquant systématiquement les régions physiques de la courbe de lumière repliée en phase pour observer la baisse (ou l'augmentation) de la confiance du modèle.

**Le Paradoxe de la Binaire à Éclipses :**
Lors des tests d'ablation sur **TIC 185259483** (une Binaire à Éclipses confirmée), nous avons découvert un comportement fascinant. Lorsque nous avons mathématiquement mis à zéro le transit principal (le plongeon profond au centre), la confiance de l'IA quant au fait que l'étoile était une EB a en réalité *augmenté*.

Pourquoi ? Parce que l'éclipse primaire est la seule caractéristique qu'une EB partage avec une exoplanète standard. En masquant l'éclipse primaire, nous avons supprimé l'ambiguïté "de type planète", ne laissant derrière que l'astrophysique purement binaire : les éclipses secondaires et les variations gravitationnelles ellipsoïdales (ondes de gravité continues). L'IA a correctement interprété la forme d'onde restante hors éclipse comme étant de nature binaire. Cela fournit une preuve empirique solide que les couches convolutives du CNN ont appris avec succès la physique gravitationnelle macroscopique des systèmes d'étoiles doubles, plutôt que de simplement chasser des trous profonds dans les données.

## 6. Études de Cas Empiriques (Le Moteur Veto IA)

### Surmonter l'Angle Mort Multi-Secteurs (TOI-700)
Les pipelines standards à un seul secteur sont aveugles aux orbites supérieures à ~13 jours. En raccordant dynamiquement 5 secteurs et en étendant explicitement la grille de calcul BLS pour évaluer 100 000 combinaisons continues de périodes, notre pipeline a traité avec succès **TOI-700 (TIC 150428135)**. Le moteur a extrait la période orbitale exacte de **16,0512 jours** correspondant à l'exoplanète sous-Neptune **TOI-700 c**.

### Rejet des Artefacts de Lacune BLS (TOI-1231)
Lors du raccordement de données séparées par des lacunes d'observation de plusieurs mois (ex. Secteur 11 à Secteur 27), les algorithmes BLS traditionnels souffrent d'aliasing mathématique.

En évaluant **TOI-1231 (TIC 447061717)** sur 5 secteurs non consécutifs, l'énorme lacune d'observation a trompé l'algorithme BLS classique, lui faisant identifier un pic d'artefact à **40,8093 jours**. Cependant, lorsque ce signal de 40,8 jours replié en phase a été transmis au moteur de triage IA, le CNN a analysé la morphologie physique, l'a reconnue comme une anomalie mathématique induite par la lacune plutôt qu'un transit en U, et a **VETOÉ** avec succès le signal. Cela démontre l'utilité critique de l'IA comme Moteur de Triage pour vérifier de manière croisée les résultats classiques dérivés mathématiquement sur des données multi-secteurs.

## 7. Travaux Futurs
Bien que le classificateur Ternaire et le moteur de Calibration aient considérablement réduit les faux positifs, un cas particulier astrophysique majeur demeure : les **Variations du Temps de Transit (TTV)**.

Le pipeline actuel suppose une orbite parfaitement périodique. Dans les systèmes multi-planétaires avec de fortes interactions gravitationnelles, les planètes transitent légèrement en avance ou en retard. Un repliement en phase strict étale ces transits décalés en un bruit indétectable. Les futures itérations de ce pipeline étudieront l'acheminement de la série temporelle continue *non repliée* via une architecture ResNet 1D ou un mécanisme d'Auto-Attention (Transformer) pour repérer nativement les événements de transit individuels apériodiques.
