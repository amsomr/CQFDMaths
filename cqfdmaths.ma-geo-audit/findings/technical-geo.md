# Spécialiste GEO : Infrastructure Technique & Crawlability IA

## Synthèse de la Catégorie (Score : 96 / 100 — Poids : 15%)

Contrairement aux moteurs traditionnels qui disposent de moteurs d'exécution JavaScript complexes, de nombreux crawlers IA (ou leurs sous-modules de recherche) traitent le HTML brut. Le Server-Side Rendering (SSR) et la conformité aux protocoles de découverte machine (`robots.txt`, `llms.txt`, `sitemap.xml`) sont les fondations non négociables du GEO.

---

## 1. Directives `robots.txt`
Le fichier [`src/app/robots.ts`](file:///home/amsomr/Projects/CQFDMaths/src/app/robots.ts) autorise explicitement l'ensemble des agents IA clés :
- `GPTBot` (OpenAI - ChatGPT Search & entraînement)
- `OAI-SearchBot` (OpenAI - Moteur de recherche web en temps réel)
- `ClaudeBot` (Anthropic - Entraînement et citations)
- `Claude-Web` (Anthropic - Navigation web active)
- `PerplexityBot` (Perplexity AI)
- `Google-Extended` (Google Gemini)
- `Applebot-Extended` (Apple Intelligence)
- `cohere-ai` (Cohere)
- `Amazonbot` (Amazon Rufus & Bedrock)
- `meta-externalagent` (Meta AI)
- `Bytespider` (ByteDance)
- `CCBot` (Common Crawl)

## 2. Standard `llms.txt` et `llms-full.txt`
- Validation complète sans erreur syntaxique (`link_count`: 11, structure de sections claire).
- Présence de la version détaillée [`public/llms-full.txt`](file:///home/amsomr/Projects/CQFDMaths/public/llms-full.txt) répertoriant les programmes des 82 chapitres.

## 3. Rendu & Performance
- Next.js 16 avec rendu statique et serveur (RSC + SSR).
- Pas de blocage lié au JavaScript client.
- En-têtes de sécurité configurés (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
