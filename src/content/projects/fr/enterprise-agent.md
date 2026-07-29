---
title: "Agent Data Entreprise & Architecture Proxy SSO"
description: "Un agent IA sécurisé respectant la confidentialité des données, intégré dans un Web Add-in Excel et connecté à un cube MOLAP legacy via un proxy d'impersonnalisation SSO sur mesure."
launchDate: 2026-07-29
techStack: ["Agents IA", "Architecture", "SSO/Proxy", "SQL Server", "MDX/MOLAP"]
coverImage: "/images/enterprise-agent-cover.jpg"
---
## Connecter les Systèmes Legacy à l'Intelligence Moderne

Lors de mon stage, j'ai été confronté à un défi architectural : comment permettre à des utilisateurs non techniques de construire des tableaux croisés dynamiques complexes grâce à l'IA, sans compromettre la confidentialité des données de l'entreprise, tout en se connectant à un cube MOLAP legacy imposant une authentification manuelle ?

La solution a nécessité une réflexion architecturale approfondie à plusieurs niveaux : d'un proxy Single Sign-On (SSO) sur mesure jusqu'à une implémentation IA hautement contrainte et optimisée en tokens.

### L'Architecture : Proxy d'Impersonnalisation SSO

Le problème central était que la base de données SQL Server de l'entreprise se connectait à un cube MOLAP nécessitant des connexions legacy. Cela obligeait les utilisateurs à taper leurs mots de passe de manière répétée, ce qui nuisait considérablement à l'expérience de travail en équipe.

Pour résoudre ce problème, j'ai conçu un **proxy d'impersonnalisation sur le serveur de l'entreprise**. Ce proxy agit comme un pont sécurisé, établissant un environnement Single Sign-On (SSO). En contournant les contraintes de connexion manuelle de manière sécurisée, j'ai permis un accès fluide et sans mot de passe pour les utilisateurs finaux, tout en maintenant des contrôles d'accès stricts.

![Schéma d'Architecture Proxy SSO](/images/enterprise-agent-architecture.jpg)

### L'Implémentation IA : La Confidentialité Avant Tout

Une fois la connexion aux données rendue fluide, j'ai construit l'interface utilisateur : un Agent IA intégré directement dans Excel sous forme de Web Add-in.

Cependant, envoyer les données de l'entreprise à une API IA tierce était hors de question pour des raisons de confidentialité. Ma solution a été d'inverser le flux de données :
1. Un compte de service lit de manière sécurisée les **dimensions et mesures** du cube MOLAP.
2. L'Agent IA reçoit *uniquement* le schéma (les métadonnées), et non les données réelles.
3. L'utilisateur interagit avec l'agent (y compris via des instructions vocales textuelles).
4. L'IA traduit le langage naturel en une **requête MDX** hautement optimisée.
5. La requête est exécutée localement sur le serveur sécurisé, générant les tableaux croisés dynamiques et les graphiques directement dans Excel.

![Interface IA Web Add-in Excel](/images/enterprise-agent-excel.jpg)

### Pourquoi C'est Important

Bien que l'industrie passe de MOLAP à Tabular, la réalité est que les grandes entreprises fonctionnent encore avec des systèmes legacy. Ce projet prouve qu'avec le bon middleware et la bonne architecture de proxy, on peut apporter des interactions IA de pointe (comme des TCD générés par la voix) à une architecture vieillissante sans sacrifier la sécurité des données ni exploser les budgets de consommation de tokens.
