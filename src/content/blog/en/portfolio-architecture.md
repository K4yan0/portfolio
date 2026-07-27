---
title: "Building My New Portfolio Architecture"
description: "A deep dive into how I built this portfolio using Astro, Tailwind CSS, and a premium design system."
pubDate: 2026-07-20
tags: ["Astro", "Architecture", "DevOps"]
---
Welcome to my new blog. 

In this first post, I want to explore the architectural decisions behind this portfolio, focusing on extreme minimalism, typography-first design, and performance.

### SSG over SSR

For a portfolio, sending gigabytes of React JavaScript bundles to render static text is an anti-pattern. I chose **Astro (v5)** because it allows me to author complex UI components using React, but strips the JavaScript entirely at build time, resulting in pure, static HTML.

### Design Constraints

I adhere heavily to structural minimalism. By utilizing strict CSS grids, a restrained color palette (canvas white, near-black, and a single coral accent), and removing all generic drop-shadows, the portfolio feels engineered rather than just "designed". 

Everything is driven by the content and the typography.
