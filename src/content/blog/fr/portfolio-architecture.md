---
title: "Architecture de Mon Nouveau Portfolio"
description: "Une plongée technique dans la conception de ce portfolio avec Astro, Tailwind CSS, et un design system premium."
pubDate: 2026-07-20
tags: ["Astro", "Architecture", "DevOps"]
---
Bienvenue sur mon nouveau blog.

Pour ce premier article, je souhaite explorer les décisions architecturales derrière ce portfolio, avec un accent particulier sur le minimalisme extrême, la typographie et la performance brute.

### SSG plutôt que SSR

Pour un portfolio, envoyer des mégaoctets de JavaScript React pour rendre du texte statique est un anti-pattern. J'ai choisi **Astro (v5)** car il me permet de développer des composants UI complexes en React, mais retire entièrement le JavaScript à la compilation, générant un HTML statique pur.

### Contraintes de Design

J'adhère fortement au minimalisme structurel. En utilisant des grilles CSS strictes, une palette de couleurs restreinte (fond canvas, noir profond, et un seul accent corail), et en supprimant toutes les ombres portées génériques, le portfolio semble avoir été "ingénierisé" plutôt que simplement "designé".

Tout est guidé par le contenu et la typographie.
