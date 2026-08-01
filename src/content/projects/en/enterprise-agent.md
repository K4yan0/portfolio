---
title: "Enterprise Data Agent & SSO Proxy Architecture"
description: "A secure, privacy-first AI agent built within an Excel Web Add-in, connected to a legacy MOLAP cube via a custom Single Sign-On impersonation proxy."
launchDate: 2026-07-29
techStack: ["AI Agents", "Architecture", "SSO/Proxy", "SQL Server", "MDX/MOLAP"]
coverImage: "/portfolio/images/enterprise-agent-cover.jpg"
---
## Bridging Legacy Systems with Modern Intelligence

During my internship, I was tasked with an architectural challenge: How do you empower non-technical users to build complex pivot tables using AI, without compromising enterprise data privacy, and while connecting to a legacy MOLAP cube that forces manual legacy authentication?

The solution required deep architectural thinking across multiple layers—from a custom Single Sign-On (SSO) proxy down to a highly constrained, token-efficient AI implementation.

### The Architecture: SSO Impersonation Proxy

The core issue was that the company's SQL Server database connected to a MOLAP cube, requiring legacy connections that forced users to repeatedly type passwords, ruining the team-collaboration experience. 

To solve this, I engineered an **impersonation proxy on the company server**. This proxy acts as a secure bridge, establishing a Single Sign-On (SSO) environment. By bypassing the legacy manual connection constraints securely, I enabled seamless, password-less access for the end users while maintaining strict enterprise access controls.

![SSO Proxy Architecture Diagram](/portfolio/images/enterprise-agent-architecture.jpg)

### The AI Implementation: Privacy First

Once the data connection was seamless, I built the user interface: an AI Agent embedded directly into Excel as a Web Add-in. 

However, sending enterprise data to a third-party AI API was out of the question due to privacy constraints. My solution was to invert the flow of data:
1. A service account securely reads the **dimensions and measures** of the MOLAP cube.
2. The AI Agent is fed *only* the schema (the metadata), not the actual data.
3. The user interacts with the agent (even via voice-to-text instructions).
4. The AI translates the natural language into a highly optimized **MDX query**.
5. The query is executed locally on the secure server, generating the pivot tables and graphs directly in Excel.

![Excel Web Add-in AI Interface](/portfolio/images/enterprise-agent-excel.jpg)

### Why This Matters

While the industry is shifting from MOLAP to Tabular, the reality is that major enterprises still run on legacy systems. This project proves that with the right middleware and proxy architecture, you can bring state-of-the-art AI interactions (like voice-prompted pivot tables) to legacy architecture without sacrificing an ounce of data security or blowing up token consumption budgets.
