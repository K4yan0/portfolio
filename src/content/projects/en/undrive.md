---
title: "Undrive (GCP Architecture)"
description: "A mobile application incentivizing public transport use, deployed via a rigorous GCP DevOps pipeline (Docker, Kubernetes, Terraform)."
launchDate: 2025-02-01
techStack: ["GCP", "Kubernetes", "Terraform", "Docker", "Flutter", "Django"]
githubUrl: "https://github.com/CapProjet-Undrive/undrive"
---
## Behavioral Incentivization via Tech

Undrive is an ESIEA school project that resulted in a full-fledged mobile application designed to reward users for their daily public transport commutes. The project successfully secured the **"Impact & Communication" Award**.

### Engineering Focus: The Infrastructure

While the product itself (Flutter frontend, Django backend) is impactful, the true engineering value of Undrive lies in its deployment architecture. 

The entire stack is containerized using **Docker** and orchestrated via **Kubernetes**. The infrastructure is treated as code and provisioned entirely through **Terraform** onto the Google Cloud Platform (GCP). This rigorous DevOps pipeline ensures high availability, scalability, and deterministic deployments.
