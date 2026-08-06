---
title: "Un moteur de triage IA basé sur la XAI pour la détection d'exoplanètes multi-secteurs"
description: "Surmonter les échecs de l'algorithme BLS liés aux lacunes de données TESS multi-secteurs à l'aide d'un moteur de triage IA CNN 1D propulsé par la XAI."
pubDate: 2026-08-06
tags: ["IA Explicable", "Astrophysique", "Machine Learning", "TESS"]
coverImage: "/portfolio/images/hero.jpg"
---

*🔗 Code source & Tableau de bord interactif : [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

## 1. Résumé
Les pipelines traditionnels de détection d'exoplanètes s'appuient fortement sur les algorithmes de Box-Least Squares (BLS) pour identifier les transits planétaires périodiques. Cependant, à mesure que les lignes de base d'observation s'étendent sur plusieurs années, ces modèles mathématiques deviennent de plus en plus vulnérables aux lacunes de données multi-secteurs et à la variabilité stellaire, générant fréquemment des faux positifs (alias) ou masquant les véritables signaux. Cet article présente un moteur de triage IA automatisé utilisant un Réseau de Neurones Convolutifs (CNN) 1D conçu pour fonctionner en tandem avec les algorithmes d'astronomie classiques. En s'appuyant sur un consensus d'IA Explicable (XAI) via Grad-CAM, SHAP et Integrated Gradients, nous prouvons que le modèle apprend physiquement la morphologie d'un transit. De plus, nous démontrons la capacité du moteur à rejeter avec succès des artefacts mathématiquement parfaits induits par des lacunes qui trompent les algorithmes BLS classiques.

## 2. Méthodologie d'acquisition et de prétraitement des données
Le pipeline se connecte directement à l'API MAST de la NASA via `lightkurve` pour traiter les données vierges et non dé-tendancées du Simple Prerelease Object Catalog (SPOC) du satellite TESS (Transiting Exoplanet Survey Satellite).

Pour étendre la ligne de base de détection au-delà d'un seul secteur de 27 jours et permettre la découverte d'exoplanètes à longue période, le pipeline télécharge et raccorde dynamiquement jusqu'à cinq secteurs.

**Les contraintes de prétraitement incluent :**
1. **Filtrage des secteurs corrompus :** Les secteurs individuels présentant un flux de fond médian négatif sont systématiquement supprimés avant le raccordement afin d'éviter l'inversion du transit lors de la normalisation.
2. **Dé-tendanciation Spline Passe-Haut (Critique 3) :** La variabilité stellaire basse fréquence (par exemple, les taches stellaires en rotation sur les naines rouges) est découplée des signaux de transit haute fréquence à l'aide d'un filtre de Savitzky-Golay à fenêtre large (`window_length=401`). Cela garantit que les transits de 4 à 5 heures sont parfaitement préservés tandis que les grandes ondes stellaires sinusoïdales sont aplaties.
3. **Normalisation Robuste :** Le pipeline applique une mise à l'échelle robuste en utilisant l'Écart Absolu Médian (MAD) plutôt que l'Écart-Type, empêchant les éruptions stellaires massives d'écraser les profondeurs de transit. Les anomalies positives sont écrêtées à `+3.0` MAD pour éliminer les rayons cosmiques, tandis que les transits profonds négatifs restent non écrêtés pour préserver leur profondeur physique.

## 3. Architecture du Modèle et Évaluation Quantitative
Le moteur de triage IA repose sur un Réseau de Neurones Convolutifs (CNN) 1D léger. Au lieu d'exécuter une extraction aveugle de caractéristiques, le réseau est entraîné pour identifier la morphologie physique exacte d'un transit (entrée abrupte, fond plat, sortie).

**Métrique d'évaluation :**
Le modèle a subi une évaluation rigoureuse contre un jeu de données de validation de transits TESS confirmés, en priorisant un score de Précision élevé pour minimiser strictement les faux positifs.

| Métrique | Score |
| :--- | :--- |
| **Précision (Accuracy)** | 90,37% |
| **AUC** | 0,924 |
| **Précision (Precision)** | **0,94** |
| **Rappel (Recall)** | **0,86** |
| **Score F1** | **0,89** |

La précision de 0,94 confirme la fiabilité du modèle comme un mécanisme de filtrage strict (Moteur de Veto) contre les anomalies non planétaires.

## 4. Analyse d'Attribution par IA Explicable (XAI)
Pour prouver que le CNN ne souffre pas de l'effet Hans le Malin (s'appuyant sur le bruit de fond ou des artefacts systématiques), nous avons établi un **Consensus XAI**. Nous avons employé Grad-CAM, SHAP (Théorie des Jeux) et Integrated Gradients (Attribution de Pixels) pour mettre en évidence les régions exactes des séries temporelles qui motivent la confiance du modèle.

Nous avons ensuite effectué une **Analyse d'Ablation (Perturbation)**, en masquant systématiquement les régions physiques de la courbe de lumière repliée en phase et en recalculant la confiance du modèle.

| Région Masquée | Changement de Confiance | Conclusion |
| :--- | :--- | :--- |
| **Région de Transit (Physique)** | -46,22% | Le modèle s'appuie fortement sur la baisse physique du transit. |
| **Région Surlignée par XAI** | **-57,13%** | Les cartes thermiques XAI ont isolé avec succès les critères de décision absolus du modèle. |
| **Ligne de base pré-transit** | +2,45% | Masquer les données pré-transit améliore légèrement la confiance (moins de bruit). |
| **Bruit de Fond Aléatoire** | +2,48% | Le modèle ignore mathématiquement le bruit de fond. |

Ce consensus multi-algorithmes fournit une preuve irréfutable que l'IA détecte des phénomènes astrophysiques plutôt que du bruit mathématique.

## 5. Études de Cas Empiriques (Le Moteur VETO de l'IA)

### Étude de Cas A : TOI-700 (Surmonter l'Angle Mort Multi-Secteurs)
Les pipelines standards à un seul secteur sont aveugles aux orbites supérieures à ~13 jours. En raccordant dynamiquement 5 secteurs et en étendant explicitement la grille de calcul BLS pour évaluer 100 000 combinaisons continues de périodes, notre pipeline a réussi à percer le bruit sur **TOI-700 (TIC 150428135)**. Le moteur a extrait la période orbitale exacte de **16,0512 jours** correspondant à l'exoplanète sous-Neptune **TOI-700 c**, le CNN confirmant la détection avec **79,03% de confiance**.

### Étude de Cas B : TOI-1231 (Rejet des Artefacts de Lacune BLS)
Lors du raccordement de données séparées par des lacunes d'observation de plusieurs mois (ex. Secteur 11 à Secteur 27), les algorithmes BLS traditionnels souffrent d'un chaos mathématique.

En testant **TOI-1231 (TIC 447061717)** sur 5 secteurs non consécutifs, l'énorme lacune a trompé l'algorithme BLS classique, lui faisant trouver un pic d'artefact mathématiquement "parfait" à **40,8093 jours**. L'algorithme BLS a sorti cela nativement comme la période de plus haute probabilité.

Cependant, lorsque le signal de 40,8 jours replié en phase a été transmis au moteur de triage IA, le CNN a analysé la morphologie physique, l'a reconnue comme une anomalie mathématique induite par la lacune plutôt qu'un transit en U, et a **VETOÉ** avec succès le signal. Cela prouve empiriquement la nécessité d'un Moteur de Triage IA pour outrepasser les algorithmes classiques mathématiquement défaillants sur des données multi-secteurs.

## 6. Travaux Futurs et Limites
Bien que le pipeline actuel agisse comme un classificateur binaire exceptionnellement robuste, deux cas particuliers astrophysiques majeurs restent pour de futures améliorations architecturales :

1. **Binaires à Éclipses :** L'univers regorge de systèmes d'étoiles binaires qui créent des transits nets en forme de V imitant des exoplanètes massives. L'architecture doit passer d'un classificateur binaire à un **Classificateur Ternaire** (Planète vs. Binaire à Éclipses vs. Bruit) pour trier correctement les éclipses secondaires.
2. **Variations du Temps de Transit (TTV) :** Le pipeline suppose actuellement une orbite parfaitement périodique. Dans les systèmes multi-planétaires avec de fortes interactions gravitationnelles, les planètes transitent hors calendrier, ce qui entraîne l'étalement du signal dans le bruit lors d'un repliement en phase strict. Les itérations futures dirigeront les séries temporelles *non repliées* via une architecture ResNet 1D ou Transformer pour repérer les événements de transit individuels apériodiques.
