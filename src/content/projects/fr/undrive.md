---
title: "Undrive (Architecture GCP)"
description: "Application mobile récompensant l'usage des transports en commun, déployée via un pipeline DevOps strict (Docker, K8s, Terraform)."
launchDate: 2025-02-01
techStack: ["GCP", "Kubernetes", "Terraform", "Docker", "Flutter", "Django"]
githubUrl: "https://github.com/CapProjet-Undrive/undrive"
---
## Incitation Comportementale via la Tech

Undrive est un projet académique ESIEA ayant abouti à une application mobile complète conçue pour récompenser les utilisateurs lors de leurs trajets quotidiens en transports en commun. Le projet a remporté le **Prix "Impact & Communication"**.

### Focus Ingénierie : L'Infrastructure

Bien que le produit (frontend Flutter, backend Django) soit pertinent, la véritable valeur d'ingénierie d'Undrive réside dans son architecture de déploiement.

L'ensemble de la stack est conteneurisé avec **Docker** et orchestré via **Kubernetes**. L'infrastructure est gérée comme du code (IaC) et provisionnée intégralement via **Terraform** sur la Google Cloud Platform (GCP). Ce pipeline DevOps rigoureux garantit une haute disponibilité, une scalabilité fluide et des déploiements déterministes.
