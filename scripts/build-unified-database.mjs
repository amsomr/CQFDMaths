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
    if (t.includes('generalite') || t.includes('fonction') && !t.includes('limite') && !t.includes('derivation')) return 'generalites-sur-les-fonctions';
    if (t.includes('barycentre')) return 'barycentre-dans-le-plan';
    if (t.includes('produit scalaire') && t.includes('espace')) return 'vecteurs-de-l-espace';
    if (t.includes('produit scalaire')) return 'produit-scalaire-dans-le-plan';
    if (t.includes('trigonometrique')) return 'calcul-trigonometrique';
    if (t.includes('suite')) return 'suites-numeriques';
    if (t.includes('limite')) return 'limites-d-une-fonction';
    if (t.includes('rotation')) return 'rotation-dans-le-plan';
    if (t.includes('derivation') || t.includes('etude des fonctions')) return 'derivabilite';
    if (t.includes('vecteur') || (t.includes('espace') && !t.includes('analytique'))) return 'vecteurs-de-l-espace';
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

// Categorize item
function categorizeItem(title) {
  const t = title.toLowerCase();
  if (t.includes('corrige') || t.includes('correction')) return 'corrige';
  if (t.includes('resume') || t.includes('fiche')) return 'resume';
  if (t.includes('serie') || t.includes('exercices')) return 'serie';
  if (t.includes('devoir') || t.includes('controle')) return 'devoir';
  if (t.includes('examen') || t.includes('national')) return 'examen';
  return 'cours';
}

console.log('Testing section to chapter mapping...');
let mappedSections = 0;
let unmappedSections = 0;
let totalMappedElements = 0;

for (const b of rawData) {
  for (const s of b.sections) {
    const slug = mapSectionToChapterSlug(s.title, b.branchId);
    if (slug) {
      mappedSections++;
      totalMappedElements += s.elementsCount;
    } else {
      unmappedSections++;
      console.log(`Unmapped or special section: [${b.branchId}] "${s.title}" (${s.elementsCount} els)`);
    }
  }
}

console.log(`\nResult: ${mappedSections} sections mapped to official chapters (${totalMappedElements} elements).`);
console.log(`${unmappedSections} sections were Devoirs / Examens / National preparations.`);
