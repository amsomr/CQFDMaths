# 🇲🇦 CQFDMaths — Plateforme Éducative de Mathématiques (Lycée BIOF)

> **Plateforme libre & gratuite dédiée à l'apprentissage des mathématiques pour tous les élèves marocains.**  
> Conçue pour le **Prof. Jamaa Aknari** afin de structurer son écosystème pédagogique YouTube + Web.

---

## 🌟 Vision & Positionnement

CQFDMaths n'est pas un simple portfolio : c'est un véritable **hub d'apprentissage structuré** pensé pour l'élève marocain du Lycée :
- **YouTube** est le moteur vidéo d'explication intuitive et de direct (lives de révision).
- **Le Site Web** est la tour de contrôle pédagogique : hiérarchie officielle par niveau et filière, fiches mémoires de formules en KaTeX, annales d'examens nationaux corrigés pas à pas, et banques d'exercices progressifs avec indices et solutions cachées.

---

## 📐 Architecture du Programme & Filières Marocaines

La plateforme respecte l'arborescence officielle du **Ministère de l'Éducation Nationale du Maroc** (BIOF & Général) :

```
Niveau (ex: 2ème Bac)
 └── Filière (ex: Sciences Mathématiques A & B, Sciences Physiques, SVT)
      └── Matière (Mathématiques)
           └── Chapitre (ex: Limites & Continuité, Nombres Complexes, Calcul Intégral)
                └── Leçon (ex: Continuité & TVI)
                     ├── Vidéo YouTube intégrée (façade ultra-rapide)
                     ├── Objectifs pédagogiques & Formules KaTeX
                     ├── Exemples d'application types rédigés
                     ├── Pièges classiques d'examen à éviter
                     ├── Conseil de l'enseignant en Darija (نصيحة الأستاذ)
                     ├── Fiche synthèse téléchargeable (PDF)
                     └── Exercices progressifs avec indices et corrigés
```

---

## 🚀 Fonctionnalités Clés

1. **Sélection Rapide du Niveau (« Quel est ton niveau ? »)** :
   - Sélection immédiate : Tronc Commun, 1ère Bac, 2ème Bac.
   - Mémorisation locale automatique sans compte ni mot de passe.
2. **Espace Révision Baccalauréat (`/bac`)** :
   - Annales des Examens Nationaux (2022 à 2025) session Normale et Rattrapage.
   - Sujets et corrections en PDF conformes au barème officiel du Ministère.
   - Formulaire mathématique interactif (limites fondamentales, dérivées, primitives, complexes).
3. **Banque d'Exercices Corrigés (`/exercices`)** :
   - Filtres par niveau, filière, chapitre et difficulté (*Facile*, *Moyen*, *Difficile*, *Type Examen National*).
   - Dévoilement progressif : `💡 Voir un indice` ➔ `🎯 Voir la correction détaillée`.
4. **Vidéothèque YouTube (`/videos`)** :
   - Façade optimisée : aucun lecteur lourd n'est chargé avant le clic (zéro pénalité Core Web Vitals).
   - Filtrage par type de vidéo (*Cours*, *Exercice*, *Astuce*, *National*).
   - Intégration respectueuse de la vie privée (`youtube-nocookie.com`).
5. **Moteur de Recherche Instantané (`/recherche` & modal `⌘K`)** :
   - Recherche instantanée par mot-clé (*TVI*, *dérivées*, *exponentielle*, *complexes*, *intégrales*...).
   - Résultats catégorisés (cours, exercices, examens, vidéos).
6. **Bilingue & Compatible RTL (Français / العربية)** :
   - Français en langue principale (BIOF).
   - Arabe en langue secondaire avec inversion RTL naturelle (`dir="rtl"`).
   - Formules KaTeX protégées en LTR pour garantir la lisibilité et l'exactitude mathématique.
7. **À Propos & Manifeste 100% Gratuit (`/a-propos`)** :
   - Biographie académique du professeur.
   - Manifeste pour l'égalité des chances éducatives au Maroc.
   - Liens directs vers YouTube, Telegram et le groupe WhatsApp d'entraide.
8. **SEO & Données Structurées** :
   - URLs sémantiques et explorables : `/cours/[level]/[branch]/[chapter]/[lesson]`.
   - Schémas JSON-LD officiels : `WebSite`, `Course`, `LearningResource`, `VideoObject`, `BreadcrumbList`, `Person`.
   - Génération dynamique de `sitemap.xml` et `robots.txt`.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Langage** : TypeScript
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Moteur Mathématique** : [KaTeX 0.19](https://katex.org/) (Rendu SSR natif ultra-rapide)
- **Icônes** : [Lucide React](https://lucide.dev/) + Composants SVG vectoriels sur mesure
- **Polices** : Plus Jakarta Sans (Latin) + Noto Sans Arabic (Arabe)

---

## 📦 Installation & Démarrage

```bash
# Cloner le dépôt et se placer dans le projet
git clone https://github.com/amsomr/CQFDMaths.git
cd CQFDMaths

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Compiler pour la production
pnpm build

# Démarrer le serveur de production
pnpm start
```

---

## 🧪 Tests & Vérification Qualité

Pour exécuter la suite de tests automatisés validant les parcours élèves (Journeys A, B, C, D), le rendu KaTeX et le SEO :

```bash
node test-platform.mjs
```

---

## 👨‍🏫 Gestion du Contenu pour le Professeur

Le professeur n'a pas besoin de compétences en développement web pour ajouter ou modifier des cours :
- **Configuration générale & Liens sociaux** : [`src/data/site-config.ts`](src/data/site-config.ts)
- **Programme, Chapitres, Formules & Exercices** : [`src/data/curriculum.ts`](src/data/curriculum.ts)
- **Annales d'examens nationaux** : [`src/data/bac-exams.ts`](src/data/bac-exams.ts)
- **Vidéos & Playlists YouTube** : [`src/data/videos.ts`](src/data/videos.ts)
- **Traductions FR/AR** : [`src/data/translations.ts`](src/data/translations.ts)
