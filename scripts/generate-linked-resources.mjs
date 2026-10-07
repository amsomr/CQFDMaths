import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('alloschool-metadata.json', 'utf-8'));

// Slug mapping helper from AlloSchool section title to our chapter slug
function mapSectionToChapterSlug(sectionTitle, branchId) {
  const t = sectionTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (t.includes('devoir') || t.includes('examen') || t.includes('simili') || t.includes('preparation')) {
    return null; // Devoirs or exams section
  }

  // 2 Bac SM
  if (branchId === 'sciences-maths') {
    if (t.includes('limite') || t.includes('continuite')) return 'limites-et-continuite';
    if (t.includes('derivation') || t.includes('taf') || t.includes('accroissement')) return 'derivabilite-et-etude-de-fonctions';
    if (t.includes('suite')) return 'suites-numeriques';
    if (t.includes('logarithm')) return 'fonctions-logarithmes';
    if (t.includes('exponentiel')) return 'fonctions-exponentielles';
    if (t.includes('complexe') && (t.includes('partie 1') || t.includes('1'))) return 'nombres-complexes-partie-1';
    if (t.includes('complexe') && (t.includes('partie 2') || t.includes('2'))) return 'nombres-complexes-partie-2';
    if (t.includes('complexe')) return 'nombres-complexes-partie-1';
    if (t.includes('integral') || t.includes('primitive')) return 'calcul-integral';
    if (t.includes('differentiel')) return 'equations-differentielles';
    if (t.includes('arithmetique')) return 'arithmetique-dans-z';
    if (t.includes('structure')) return 'structures-algebriques';
    if (t.includes('espace vectoriel')) return 'structures-algebriques';
    if (t.includes('probabilite')) return 'calcul-des-probabilites';
    if (t.includes('espace')) return 'geometrie-dans-l-espace';
  }

  // 2 Bac PC & SVT
  if (branchId === 'sciences-physiques' || branchId === 'svt') {
    if (t.includes('limite') || t.includes('continuite')) return 'limites-et-continuite';
    if (t.includes('derivation')) return 'derivation-et-etude-de-fonctions';
    if (t.includes('suite')) return 'suites-numeriques';
    if (t.includes('primitive') || t.includes('integral')) return 'calcul-integral';
    if (t.includes('logarithm')) return 'fonctions-logarithmes';
    if (t.includes('exponentiel')) return branchId === 'sciences-physiques' ? 'fonction-exponentielle-et-ln' : 'fonctions-exponentielles';
    if (t.includes('complexe')) return 'nombres-complexes';
    if (t.includes('differentiel')) return 'equations-differentielles';
    if (t.includes('espace')) return 'geometrie-dans-l-espace';
    if (t.includes('probabilite') || t.includes('denombrement')) return 'calcul-des-probabilites';
  }

  // 1 Bac SM
  if (branchId === '1ere-sciences-maths') {
    if (t.includes('logique')) return 'notions-de-logique';
    if (t.includes('ensemble') || t.includes('application')) return 'ensembles-et-applications';
    if (t.includes('generalite') || (t.includes('fonction') && !t.includes('limite') && !t.includes('derivation'))) return 'generalites-sur-les-fonctions';
    if (t.includes('barycentre')) return 'barycentre-dans-le-plan';
    if (t.includes('produit scalaire') && t.includes('espace')) return 'vecteurs-de-l-espace';
    if (t.includes('produit scalaire')) return 'produit-scalaire-dans-le-plan';
    if (t.includes('trigonometrique')) return 'calcul-trigonometrique';
    if (t.includes('suite')) return 'suites-numeriques';
    if (t.includes('limite')) return 'limites-d-une-fonction';
    if (t.includes('rotation')) return 'rotation-dans-le-plan';
    if (t.includes('derivation') || t.includes('etude des fonctions')) return 'derivabilite';
    if (t.includes('vecteur')) return 'vecteurs-de-l-espace';
    if (t.includes('geometrie dans l\'espace') || t.includes('produit vectoriel')) return 'geometrie-analytique-de-l-espace';
    if (t.includes('denombrement')) return 'denombrement';
    if (t.includes('arithmetique')) return 'notions-de-logique';
  }

  // 1 Bac Sc.Exp
  if (branchId === 'sciences-exp') {
    if (t.includes('logique')) return 'notions-de-logique';
    if (t.includes('generalite') || (t.includes('fonctions') && !t.includes('limite') && !t.includes('derivation'))) return 'generalites-sur-les-fonctions';
    if (t.includes('barycentre')) return 'barycentre-dans-le-plan';
    if (t.includes('produit scalaire')) return 'produit-scalaire-dans-le-plan';
    if (t.includes('trigonometrique')) return 'calcul-trigonometrique';
    if (t.includes('suite')) return 'suites-numeriques';
    if (t.includes('rotation')) return 'rotation-dans-le-plan';
    if (t.includes('limite')) return 'limites-d-une-fonction';
    if (t.includes('derivation') || t.includes('etude')) return 'derivation-et-etude-de-fonctions';
    if (t.includes('espace')) return 'geometrie-dans-l-espace';
  }

  // Tronc Commun
  if (branchId === 'tc-sciences' || branchId === 'tc-technologique') {
    if (t.includes('arithmetique')) return 'arithmetique-dans-n';
    if (t.includes('calcul vectoriel') || t.includes('vecteur')) return 'calcul-vectoriel-dans-le-plan';
    if (t.includes('projection')) return 'la-projection-dans-le-plan';
    if (t.includes('ensemble') || t.includes('ordre')) return 'ensembles-des-nombres-et-ordre-dans-r';
    if (t.includes('droite')) return 'la-droite-dans-le-plan';
    if (t.includes('polynome')) return 'polynomes';
    if (t.includes('equation') || t.includes('systeme')) return 'equations-inequations-et-systemes';
    if (t.includes('trigonometrie')) return 'calcul-trigonometrique';
    if (t.includes('generalite') || t.includes('fonctions')) return 'generalites-sur-les-fonctions';
    if (t.includes('transformation')) return 'transformations-du-plan';
    if (t.includes('produit scalaire')) return 'produit-scalaire-dans-le-plan';
    if (t.includes('espace')) return 'geometrie-dans-lespace';
    if (t.includes('statistique')) return 'statistiques';
  }

  return null;
}

// Process chapter resources
const chapterResourcesMap = {}; // key: `${levelId}/${branchId}/${chapterSlug}` -> array of ChapterResource

// Also collect national exams, examens blancs, and devoirs
const nationalExamsMap = {};
const examensBlancsList = [];
const devoirsList = [];

for (const b of rawData) {
  const { levelId, branchId } = b;

  for (const s of b.sections) {
    const slug = mapSectionToChapterSlug(s.title, branchId);

    if (slug) {
      // Process elements for this chapter
      const key = `${levelId}/${branchId}/${slug}`;
      if (!chapterResourcesMap[key]) {
        chapterResourcesMap[key] = [];
      }

      // Group series and corriges to pair them
      const items = s.elements;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.elementId) continue;

        const title = item.title;
        const low = title.toLowerCase();

        // Categorize
        let category = 'cours';
        if (low.includes('corrige') || low.includes('correction')) {
          category = 'corrige';
        } else if (low.includes('resume') || low.includes('fiche')) {
          category = 'resume';
        } else if (low.includes('serie') || low.includes('exercices') || low.includes('exercice')) {
          category = 'serie';
        } else if (low.includes('devoir') || low.includes('controle')) {
          category = 'devoir';
        }

        // Clean title
        const cleanTitle = title
          .replace(/^Limites et continuité - /i, '')
          .replace(/^Suites numériques - /i, '')
          .replace(/^Dérivation et étude des fonctions - /i, '')
          .replace(/^Fonctions logarithmiques - /i, '')
          .replace(/^Fonctions exponentielles - /i, '')
          .replace(/^Calcul intégral - /i, '')
          .replace(/^Nombres complexes - /i, '')
          .replace(/^Arithmétique - /i, '')
          .replace(/^Structures algébriques - /i, '')
          .replace(/^Probabilités - /i, '')
          .trim();

        // Look ahead for solution if this is a series
        let solutionUrl = undefined;
        if (category === 'serie') {
          // Check if next item is its correction
          if (i + 1 < items.length) {
            const next = items[i + 1];
            if (next.title.toLowerCase().includes('corrige') || next.title.toLowerCase().includes('correction')) {
              solutionUrl = `/api/pdf?id=${next.elementId}`;
            }
          }
        }

        chapterResourcesMap[key].push({
          id: `res-${branchId}-${item.elementId}`,
          title: cleanTitle.length > 5 ? cleanTitle : title,
          category,
          fileUrl: `/api/pdf?id=${item.elementId}`,
          ...(solutionUrl ? { solutionUrl } : {}),
          source: 'CQFDMaths — Prof. Jamaa Aknari',
        });
      }
    } else {
      // Devoirs or Exams section
      const titleNorm = s.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (titleNorm.includes('examen national') || titleNorm.includes('examens nationaux')) {
        // Collect national exams and pair them
        for (const item of s.elements) {
          const t = item.title;
          const low = t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const yearMatch = t.match(/20\d\d/);
          const year = yearMatch ? parseInt(yearMatch[0], 10) : null;
          if (!year) continue;

          const session = low.includes('rattrapage') ? 'Rattrapage' : 'Normale';
          const isCorrige = low.includes('corrige') || low.includes('correction');
          const groupKey = `${branchId}-${year}-${session}`;

          let examObj = nationalExamsMap[groupKey];
          if (!examObj) {
            const branchName = branchId === 'sciences-maths'
              ? 'Sciences Mathématiques (A & B)'
              : branchId === 'sciences-physiques'
              ? 'Sciences Physiques (PC)'
              : 'Sciences de la Vie et de la Terre (SVT)';

            const keyTopics = branchId === 'sciences-maths'
              ? ['Structures algébriques (Groupes & Anneaux)', 'Arithmétique dans Z', 'Nombres complexes & Géométrie', 'Suites numériques', 'Fonctions exponentielles & Logarithmes', 'Calcul intégral']
              : branchId === 'sciences-physiques'
              ? ['Nombres complexes', 'Géométrie dans l\'espace', 'Calcul des probabilités', 'Suites numériques récurrentes', 'Fonctions exponentielles et ln']
              : ['Nombres complexes', 'Probabilités & Tirages', 'Suites numériques récurrentes', 'Fonctions exponentielles & Logarithmes'];

            const chapterSlugs = branchId === 'sciences-maths'
              ? ['structures-algebriques', 'arithmetique-dans-z', 'nombres-complexes-partie-1', 'suites-numeriques', 'fonctions-exponentielles', 'calcul-integral']
              : branchId === 'sciences-physiques'
              ? ['nombres-complexes', 'geometrie-dans-l-espace', 'calcul-des-probabilites', 'suites-numeriques', 'fonction-exponentielle-et-ln']
              : ['nombres-complexes', 'calcul-des-probabilites', 'suites-numeriques', 'fonctions-exponentielles'];

            examObj = {
              id: `bac-${branchId}-${year}-${session.toLowerCase()}`,
              year,
              session,
              branchId,
              branchName,
              title: `Examen National Mathématiques ${year} — Session ${session}`,
              durationHours: branchId === 'sciences-maths' ? 4 : 3,
              coefficient: branchId === 'sciences-maths' ? 9 : 7,
              subjectPdfUrl: `/api/pdf?id=${item.elementId}`,
              correctionPdfUrl: undefined,
              keyTopics,
              chapterSlugs,
              difficulty: branchId === 'sciences-maths' ? 'Exigeante' : 'Normale',
            };
            nationalExamsMap[groupKey] = examObj;
          }

          if (isCorrige) {
            examObj.correctionPdfUrl = `/api/pdf?id=${item.elementId}`;
          } else {
            examObj.subjectPdfUrl = `/api/pdf?id=${item.elementId}`;
          }
        }
      } else if (titleNorm.includes('simili') || titleNorm.includes('preparation')) {
        // Collect examens blancs / simili
        for (const item of s.elements) {
          examensBlancsList.push({
            id: `simili-${branchId}-${item.elementId}`,
            title: item.title,
            branchId,
            levelId,
            fileUrl: `/api/pdf?id=${item.elementId}`,
            source: 'CQFDMaths — Prof. Jamaa Aknari',
          });
        }
      } else if (titleNorm.includes('devoir') || titleNorm.includes('controle')) {
        // Collect devoirs
        const sem = titleNorm.includes('2') ? 2 : 1;
        for (const item of s.elements) {
          devoirsList.push({
            id: `devoir-${branchId}-${item.elementId}`,
            title: item.title,
            branchId,
            levelId,
            semester: sem,
            fileUrl: `/api/pdf?id=${item.elementId}`,
            source: 'CQFDMaths — Prof. Jamaa Aknari',
          });
        }
      }
    }
  }
}

const nationalExamsList = Object.values(nationalExamsMap).sort((a, b) => b.year - a.year);

console.log('Chapter resources mapped for keys:', Object.keys(chapterResourcesMap).length);
console.log('Total national exams paired:', nationalExamsList.length);
console.log('Total simili / blancs extracted:', examensBlancsList.length);
console.log('Total devoirs extracted:', devoirsList.length);

// Save mapped resources JSON
fs.writeFileSync('src/data/chapter-resources.json', JSON.stringify(chapterResourcesMap, null, 2), 'utf-8');
fs.writeFileSync('src/data/scraped-exams.json', JSON.stringify({
  exams: nationalExamsList,
  examensBlancs: examensBlancsList,
  devoirs: devoirsList
}, null, 2), 'utf-8');
console.log('Saved chapter-resources.json and scraped-exams.json!');

