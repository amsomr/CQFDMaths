# Spécialiste GEO : Données Structurées & Balisage d'Entités

## Synthèse de la Catégorie (Score : 92 / 100 — Poids : 10%)

Le balisage Schema.org en JSON-LD est le moyen direct de renseigner les modèles d'IA sur l'arbre d'entités du site.

---

## Inventaire des Balisages Implémentés

1. **`WebSite` (Toutes les pages) :**
   - Renseigne le nom, le slogan, la description officielle, les langues (`fr-MA`, `ar-MA`) et l'action de recherche interne `SearchAction`.
2. **`Person` (Page `/a-propos`) :**
   - Déclare le **Professeur Jamaa Aknari** avec son titre, sa biographie, son lien YouTube et ses domaines d'expertise clés (`knowsAbout`).
3. **`EducationalOrganization` (Page d'accueil) :**
   - Déclare l'organisation éducative CQFDMaths avec son fondateur, son slogan et ses canaux de contact.
4. **`Course` et `LearningResource` (Pages de leçons `/cours/...`) :**
   - Structure chaque cours avec son niveau éducatif (`educationalLevel`), sa durée estimée et son composant multimédia `VideoObject` (vignette, url d'intégration YouTube).
5. **`FAQPage` (Page d'accueil) :**
   - Contient 5 questions/réponses claires pour les résultats enrichis et l'extraction par les moteurs de questions-réponses.
6. **`BreadcrumbList` (Toutes les sous-pages) :**
   - Établit la filiation hiérarchique : Accueil -> Cours -> Niveau -> Filière -> Chapitre -> Leçon.
