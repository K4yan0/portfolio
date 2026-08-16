---
title: "Quand la mise à l'échelle robuste devient un décalage de représentation : Une étude empirique de la normalisation Z-Score et MAD pour la classification des transits TESS"
description: "Pourquoi des techniques de prétraitement mathématiquement supérieures peuvent dégrader fatalement un pipeline astrophysique si elles modifient la distribution statistique apprise par le réseau de neurones."
pubDate: 2026-08-16
tags: ["Astrophysique", "Machine Learning", "TESS", "Normalisation des données", "Décalage de représentation"]
coverImage: "/portfolio/images/TESS.jpg"
---

*🔗 Code Source : [github.com/K4yan0/exoplanet-detection-ml](https://github.com/K4yan0/exoplanet-detection-ml)*

## 1. Résumé
En apprentissage automatique, la mise à l'échelle robuste est universellement prescrite comme l'antidote aux jeux de données parasités par des valeurs aberrantes extrêmes. Dans le domaine de la détection des transits d'exoplanètes, où des éruptions stellaires massives faussent fréquemment les courbes de lumière immaculées des étoiles lointaines, remplacer la **normalisation Z-Score** standard par l'**Écart Absolu Médian (MAD)** robuste semble être une amélioration évidente.

Cependant, dans cette étude de cas empirique, nous démontrons que l'échange aveugle des normalisations statistiques sur un Réseau de Neurones Convolutifs (CNN) 1D pré-entraîné produit un décalage de représentation (representation shift) immédiat. À l'aide de l'IA Explicable (XAI) et du Monte Carlo Dropout pour la cartographie des incertitudes, nous illustrons comment la mise à l'échelle MAD redistribue par inadvertance le plancher de bruit stochastique du jeu de données TESS, déclenchant une dégradation subtile mais mathématiquement mesurable des performances et de la calibration.

## 2. Pourquoi la normalisation est importante pour la classification des transits
Le satellite TESS (Transiting Exoplanet Survey Satellite) fournit des courbes de lumière continues couvrant de vastes étendues du ciel. Pour préparer ces comptages de photons bruts pour l'apprentissage profond, ils doivent être normalisés.

### La référence Z-Score
Notre architecture de référence V1 utilisait la standardisation Z-score classique :
$$ z = \frac{x - \mu}{\sigma} $$
Où $\mu$ est le flux moyen et $\sigma$ l'écart-type. Parce que l'écart-type est très sensible aux valeurs aberrantes, une seule éruption stellaire massive gonfle artificiellement $\sigma$, comprimant structurellement la chute microscopique d'un transit planétaire en un simple bruit statistique.

### L'hypothèse MAD
Pour isoler le pipeline des éruptions stellaires, nous avons émis l'hypothèse qu'une **Mise à l'échelle robuste** préserverait le signal. Nous avons implémenté une mise à l'échelle basée sur l'Écart Absolu Médian (MAD) :
$$ \text{MAD} = \text{median}(|x_i - \text{median}(X)|) $$
$$ x_{\text{robust}} = \frac{x - \text{median}(X)}{\text{MAD} \times 1.4826} $$
Étant donné que le MAD ignore l'ampleur numérique des valeurs aberrantes, la profondeur du transit resterait mathématiquement non écrasée, augmentant théoriquement le rappel (recall) des petites planètes de type terrestre orbitant autour des naines rouges actives.

## 3. Plan expérimental et contrôles
Pour tester cela, nous avons fait passer des cohortes de cibles TESS identiques à travers les deux pipelines de prétraitement distincts et les avons transmises à un **CNN 1D gelé et strictement contrôlé**.

```mermaid
flowchart LR
    A[Courbe de Lumière TESS Brute] --> B(Filtre SG101)
    B --> C(Pliage de Phase)
    C --> D(2000 Bacs)
    
    D -->|Contrat d'entraînement| E[Norm. Z-Score]
    E --> G{CNN Gelé}
    
    D -->|Intervention Expérimentale| F[Mise à l'échelle MAD]
    F --> G
    
    G --> H[Prédiction]
    H --> I[MC-Dropout + XAI]
```

Pour garantir une comparaison rigoureuse, chaque aspect du pipeline a été maintenu strictement constant, isolant l'algorithme de normalisation comme seule variable indépendante.

| Composant | Référence V1 | Intervention Exp 2 |
| :--- | :--- | :--- |
| **Cohorte de données** | Identique | Identique |
| **Séparation train/test** | Identique | Identique |
| **Filtre SG** | 101 | 101 |
| **Secteurs** | 1 | 1 |
| **Écrêtage (Clipping)** | Aucun | Aucun |
| **Poids du modèle** | Gelés | Gelés |
| **Normalisation** | Z-score | MAD |
| **Variable indépendante** | - | **Méthode d'échelle** |

## 4. Résultats : Z-Score vs MAD
Le résultat expérimental a contredit notre hypothèse initiale. Plutôt que de stimuler le rappel planétaire, les données mises à l'échelle avec le MAD ont systématiquement dégradé les performances du modèle gelé dans les trois catégories de classification.

| Métrique | Z-Score | Échelle MAD | Δ |
| :--- | :--- | :--- | :--- |
| **Précision (Accuracy)** | 0.7771 | 0.7429 | -0.0342 |
| **ROC-AUC** | 0.9089 | 0.8902 | -0.0187 |
| **F1 Planète** | 0.7899 | 0.7731 | -0.0168 |
| **F1 Binaire (EB)** | 0.8519 | 0.8077 | -0.0442 |
| **F1 Bruit** | 0.6992 | 0.6614 | -0.0378 |

## 5. Calibration et Incertitude
Au-delà des métriques de performance standard, nous avons audité la calibration statistique et l'incertitude épistémique du modèle.

| Métrique de calibration | Z-Score | Échelle MAD | Impact |
| :--- | :--- | :--- | :--- |
| **Erreur de calibration attendue (ECE)** | 0.0509 | 0.0681 | Pire |
| **Score Brier multiclasse** | 0.1063 | 0.1211 | Pire |
| **Incertitude MC-Dropout** | 0.0679 | 0.0885 | +0.0206 |

La dégradation n'est pas catastrophique (le modèle ne s'est pas effondré entièrement), mais la baisse mesurable de la précision couplée à un pic de variance prédictive du MC-Dropout raconte une histoire scientifique fascinante : le modèle était nettement moins sûr de ce qu'il voyait.

![Incertitude prédictive : Z-Score vs MAD](/portfolio/images/mad_uncertainty_plot.png)
*Légende : La variance prédictive moyenne via MC-Dropout augmente notablement lorsque les cibles sont traitées avec la mise à l'échelle MAD, reflétant la difficulté du modèle à cartographier la distribution d'amplitude non familière.*

## 6. Enquête XAI et Décalage de Représentation
Pour comprendre *pourquoi* le CNN échouait, nous avons déployé **Grad-CAM** pour superposer des cartes thermiques d'attention directement sur les courbes de lumière pliées en phase.

![Comparaison Grad-CAM : Z-Score vs MAD](/portfolio/images/mad_gradcam_comparison.png)

Sous l'échelle MAD, l'attribution est devenue moins stable et plus diffuse dans des cas représentatifs, bien que le modèle ait continué à prêter attention globalement aux régions de transit. Le résultat indique un **décalage de représentation** (representation mismatch) plutôt qu'une perte complète de localisation du transit.

En utilisant l'Écart Absolu Médian, nous avons réussi à empêcher les éruptions stellaires d'écraser le transit. Cependant, nous avons également fondamentalement modifié la distribution d'amplitude du **bruit de fond stochastique**. Le CNN avait été calibré pendant l'entraînement pour interpréter les fluctuations de bruit strictement dans une amplitude d'écart-type spécifique.

Lorsqu'il est confronté au bruit mis à l'échelle par le MAD, l'échelle numérique absolue des micro-fluctuations s'est décalée. Les filtres convolutifs inférieurs du modèle — qui agissent comme des extracteurs de caractéristiques à haute fréquence — ont interprété ce plancher de bruit décalé comme un espace de signal non familier, diffusant son attention et augmentant l'incertitude épistémique.

## 7. Ce que l'expérience prouve / Ne prouve pas

> [!IMPORTANT] 
> **Ce que cette expérience NE prouve PAS :**
> Cette expérience ne démontre pas que la normalisation MAD est intrinsèquement inférieure pour la détection d'exoplanètes.
>
> Elle démontre que remplacer la normalisation Z-score par la mise à l'échelle MAD *sans ré-entraîner le CNN* produit un décalage de représentation mesurable et dégrade les performances, la calibration et les caractéristiques d'incertitude.
>
> Un CNN entraîné séparément en utilisant des entrées normalisées par le MAD constituerait une expérience entièrement différente.

## 8. Conclusion
Nous avions initialement émis l'hypothèse que la mise à l'échelle robuste améliorerait directement le pipeline. En gelant l'architecture, en isolant la variable d'échelle, en mesurant les conséquences numériques et en utilisant la XAI et le MC-Dropout pour enquêter sur l'échec, nous avons rejeté l'hypothèse avec succès.

La principale leçon scientifique concerne la discipline de recherche : les algorithmes apprennent des distributions statistiques très spécifiques. Même des techniques de prétraitement mathématiquement supérieures échoueront en tant que remplacements directs si elles modifient par inadvertance la représentation des données de base attendue par le réseau de neurones.

---
*À suivre : Briser la contrainte du pliage de phase 1D pour rechercher des variations de chronométrage de transit (TTV) à l'aide d'une architecture CNN Hiérarchique Globale/Locale.*
