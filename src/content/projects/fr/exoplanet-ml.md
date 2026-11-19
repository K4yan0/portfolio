---
title: "Détection d'Exoplanètes XAI & Moteur de Triage"
description: "Plateforme scientifique complète et moteur de triage IA ternaire calibré pour la télémétrie NASA TESS. Intègre Monte Carlo Dropout pour l'incertitude épistémique, Temperature Scaling (ECE 2,35%), ablation XAI contre-factuelle et tableau de bord Flask interactif."
launchDate: 2026-07-26
techStack: ["Python", "CNN 1D", "API NASA MAST", "Flask", "Plotly", "Grad-CAM & SHAP", "Monte Carlo Dropout", "Calibration de Modèles"]
githubUrl: "https://github.com/K4yan0/exoplanet-detection-ml"
researchPaperUrl: "/portfolio/fr/blog/exoplanet-research"
coverImage: "/portfolio/images/exoplanet-ml-cover.jpg"
---

> ### La Suite de Recherche Scientifique
> Ce projet associe le développement logiciel à une recherche astrophysique formelle. Pour les analyses mathématiques et expérimentales détaillées, consultez les deux publications scientifiques associées :
> * **[Article 1 : Moteur de Triage Ternaire Calibré & Incertitude Épistémique](/portfolio/fr/blog/exoplanet-research)** — Résolution des faux positifs de binaires à éclipses avec le catalogue Villanova, Monte Carlo Dropout (incertitude épistémique), Temperature Scaling (ECE 2,35%) et veto IA empirique sur TOI-700 & TOI-1231.
> * **[Article 2 : Dérive de Représentation sous Normalisation Robuste (Z-Score vs MAD)](/portfolio/fr/blog/mad)** — Étude empirique démontrant pourquoi un prétraitement mathématiquement supérieur peut induire une diffusion d'attention sur un réseau CNN figé.

---

## 1. Automatisation de la Découverte Planétaire

Inspiré par le [2025 NASA Space Apps Challenge ("A World Away: Hunting for Exoplanets with AI")](https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/), je me suis lancé dans une mission indépendante visant à concevoir un pipeline IA fiable et automatisé, capable de détecter les transits d'exoplanètes à partir des données brutes des télescopes spatiaux—éliminant le besoin de classification manuelle sur Zooniverse.

Ce travail initial s'est transformé en un véritable système d'ingénierie scientifique de bout en bout : identification d'un jeu de données de référence corrompu, flux direct avec les API satellites de la NASA, et mise au point d'un **Moteur de Triage IA Ternaire Calibré** doté d'explicabilité (XAI) et de quantification d'incertitude.

<!-- ESPACE RÉSERVÉ SCHÉMA D'ARCHITECTURE -->
<div class="my-10 p-8 border-2 border-dashed border-cohere-hairline rounded-xl bg-cohere-stone/30 text-center space-y-2 not-prose">
  <div class="font-mono text-xs uppercase tracking-wider text-cohere-muted font-medium">Schéma d'Architecture</div>
  <div class="font-display text-xl text-cohere-nearblack">Pipeline Système de Bout en Bout & Moteur de Triage</div>
  <p class="font-body text-sm text-cohere-slate max-w-md mx-auto">Ingestion NASA MAST → Filtre SG Passe-Haut → Grille Périodique BLS → CNN Ternaire 1D → Calibration Monte Carlo & XAI Grad-CAM</p>
  <span class="inline-block mt-2 font-mono text-xs text-cohere-softcoral bg-cohere-softcoral/10 px-3 py-1 rounded-full border border-cohere-softcoral/20">Schéma en cours d'intégration (direction artistique Cohere)</span>
</div>

---

## 2. L'Échec Kaggle et le Pivot Stratégique

L'hypothèse initiale postulait qu'un transit planétaire crée une signature morphologique identifiable (une baisse caractéristique en "U" dans la courbe de lumière). Cependant, mes premières tentatives—incluant CNN 1D, Random Forests et phase-folding Lomb-Scargle—ont totalement échoué sur les datasets Kaggle classiques.

En appliquant l'algorithme BLS (Box-Least Squares) de la NASA comme test de cohérence, j'ai démontré que les 37 courbes étiquetées comme "Planètes" dans ce jeu de données étaient statistiquement indiscernables du bruit de fond. Le dataset était fondamentalement biaisé et corrompu.

Plutôt que d'entraîner des modèles sur des données défectueuses, j'ai reconstruit l'intégralité du pipeline d'ingénierie des données. Je me suis connecté directement à **l'API NASA MAST** via la librairie `lightkurve` afin de récupérer les données SPOC brutes et non-filtrées du satellite TESS (Transiting Exoplanet Survey Satellite).

---

## 3. Pipeline Avancé d'Ingénierie des Données & Traitement du Signal

Le traitement des séries temporelles astrophysiques a nécessité la mise en place d'un conditionnement rigoureux du signal :

* **Filtrage des Secteurs Corrompus :** Les secteurs présentant un flux de fond médian négatif sont systématiquement écartés avant assemblage pour éviter toute inversion de transit lors de la normalisation.
* **Dérive Spline Passe-Haut :** Un filtre Savitzky-Golay à large fenêtre (`window_length=401` à `1001`) découple les variations stellaires lentes (rotation, taches stellaires) des transits rapides de 4 à 5 heures.
* **Recherche de Période BLS :** Des grilles haute résolution évaluent des dizaines de milliers de combinaisons pour identifier avec précision la période orbitale et l'époque.
* **Normalisation Robuste (MAD) & Clipping Unilatéral :** L'Écart Absolu Médian (MAD) empêche les éruptions stellaires positives d'écraser la profondeur des transits. Les valeurs positives sont écrêtées à `+3.0` MAD, tandis que les creux négatifs restent intacts pour préserver la géométrie physique réelle du transit.

---

## 4. Du Prototype Binaire (V1) au Moteur de Triage Ternaire Calibré (V2)

### Le Prototype V1 : Extraction Morphologique
Dans sa première version, un **Réseau Convolutif 1D (CNN)** léger (16 ➝ 32 ➝ 64 filtres avec Dropout) a été entraîné pour identifier la signature séquentielle d'un transit : entrée abrupte, plateau de fond plat et sortie symétrique. Sur données binaires non contaminées, le modèle a atteint **90,37% de précision** avec un AUC de 0,924.

![Performances du Modèle CNN](/portfolio/images/exoplanet-ml-metrics.jpg)

### L'Architecture V2 : Résolution du Biais des Binaires à Éclipses
En conditions astrophysiques réelles, un classifieur binaire échoue fréquemment face à des **Binaires à Éclipses (EB)**, dont l'éclipse primaire imite presque parfaitement un transit planétaire.

Pour surmonter cette limite, le modèle a été transformé en un **Classifieur Ternaire** (Planète vs Binaire à Éclipse vs Bruit) entraîné sur un jeu de données enrichi avec le catalogue officiel d'étoiles binaires de Villanova. Le réseau apprend ainsi à détecter les éclipses secondaires et les pentes continues en "V" propres aux systèmes stellaires doubles.

<!-- ESPACE RÉSERVÉ SCHÉMA MODÈLE & INCERTITUDE -->
<div class="my-10 p-8 border-2 border-dashed border-cohere-hairline rounded-xl bg-cohere-stone/30 text-center space-y-2 not-prose">
  <div class="font-mono text-xs uppercase tracking-wider text-cohere-muted font-medium">Schéma Modèle & Incertitude</div>
  <div class="font-display text-xl text-cohere-nearblack">Pipeline Ternaire & Flux d'Inférence Monte Carlo</div>
  <p class="font-body text-sm text-cohere-slate max-w-md mx-auto">Couches Convolutives 1D (16/32/64) → 50 Passes Stochastiques (σ Épistémique) → Calibration en Température (ECE 2,35%)</p>
  <span class="inline-block mt-2 font-mono text-xs text-cohere-softcoral bg-cohere-softcoral/10 px-3 py-1 rounded-full border border-cohere-softcoral/20">Schéma en cours d'intégration (direction artistique Cohere)</span>
</div>

### Mesurer la Fiabilité : Monte Carlo Dropout & Calibration en Température
Pour un usage scientifique réel, une probabilité aveugle est inacceptable :
1. **Monte Carlo Dropout (Incertitude Épistémique) :** Les couches de dropout restent actives à l'inférence sur 50 passes stochastiques. La variance fournit un écart-type explicite ($ \pm \sigma $), indiquant précisément si le modèle hésite ou dispose d'une certitude structurelle.
2. **Temperature Scaling (Calibration ECE) :** Pour corriger la surconfiance naturelle des réseaux profonds, les logits bruts sont ajustés via une constante optimale ($T = 1,0853$). Le modèle atteint une **Erreur de Calibration Attendue (ECE) de seulement 2,35%**, alignant les pourcentages prédits sur les probabilités réelles.

---

## 5. IA Explicable (XAI) & Moteur de Veto IA

### Consensus 1D Grad-CAM, SHAP & Ablation Contrefactuelle
Pour vérifier que le CNN apprend les lois physiques et non des artéfacts, j'ai combiné un **consensus XAI** (Grad-CAM 1D, SHAP et Integrated Gradients).

Lors d'un test d'ablation sur **TIC 185259483** (binaire à éclipses confirmée), le masquage artificiel de l'éclipse primaire a provoqué une **augmentation** de la confiance de l'IA quant à la nature binaire du système. Pourquoi ? En masquant le creux ressemblant à une planète, il ne restait que la physique binaire : les variations tidales ellipsoïdales (ondes gravitationnelles continues). Ceci prouve empiriquement que le modèle interprète les dynamiques gravitationnelles globales et pas seulement des chutes de flux isolées.

### Cas d'Étude Empiriques
* **Résolution de l'Angle Mort Multi-Secteurs (TOI-700) :** En combinant 5 secteurs et en analysant 100 000 combinaisons de périodes, le pipeline a extrait l'orbite exacte de **16,0512 jours** de l'exoplanète **TOI-700 c**.
* **Veto sur Artéfact d'Échantillonnage BLS (TOI-1231) :** Sur des données séparées par plusieurs mois d'interruption, le repliement BLS classique a créé un faux pic à **40,8093 jours**. Le CNN a immédiatement identifié la morphologie comme un artéfact mathématique et a émis un **VETO** automatique avec 0% de confiance.

---

## 6. Plateforme Web Interactive & Tableau de Bord

L'ensemble de la chaîne d'inférence et de télémétrie est encapsulé dans une application Flask moderne dotée d'une interface en glassmorphism et de **visualisations dynamiques Plotly.js** :

* **Inspection de Courbes en Direct :** Chargement direct de n'importe quel identifiant TIC (TESS Input Catalog) depuis NASA MAST.
* **IRM Couche par Couche (Grad-CAM) :** Visualisation interactive des régions d'attention du réseau (profil global vs bords d'immersion/émersion).
* **Moteur de Découverte par Lots :** Traitement asynchrone en arrière-plan permettant le triage simultané de dizaines d'étoiles.

![Interface du Tableau de Bord XAI](/portfolio/images/exoplanet-ml-dashboard.jpg)

---

## 7. Publications et Études Scientifiques Associées

Pour les dérivations mathématiques, les benchmarks et les courbes d'ablation complètes, consultez les articles scientifiques dédiés :

* **[Moteur de Triage Ternaire, XAI et Incertitude pour la Détection d'Exoplanètes](/portfolio/fr/blog/exoplanet-research)**
* **[Dérive de Représentation sous Normalisation Robuste (Étude Z-Score vs MAD)](/portfolio/fr/blog/mad)**
