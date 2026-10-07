import assert from 'node:assert';
import fs from 'node:fs';

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.TEST_URL || `http://localhost:${PORT}`;

async function testFetch(path, expectedStatus = 200) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url);
  assert.strictEqual(
    res.status, 
    expectedStatus, 
    `Expected status ${expectedStatus} for ${path}, got ${res.status}`
  );
  const text = await res.text();
  return { status: res.status, text };
}

async function runAllTests() {
  console.log('🚀 Running CQFDMaths Platform Verification Tests...\n');

  // Test 1: Homepage and Core Sections
  console.log('1. Checking Homepage (Hero, Level Selector, Popular Chapters, FAQs)...');
  const home = await testFetch('/');
  assert.ok(home.text.includes('CQFDMaths'), 'Homepage should contain site name');
  assert.ok(home.text.includes('Prof. Jamaa Aknari'), 'Homepage should contain professor name');
  assert.ok(home.text.includes('Choisis ton niveau') || home.text.includes('Quel est votre niveau') || home.text.includes('Quel est ton niveau'), 'Homepage should contain quick level selector');
  assert.ok(home.text.includes('100%') || home.text.includes('Gratuit'), 'Homepage should highlight 100% free value');
  assert.ok(home.text.includes('youtube.com'), 'Homepage should link to YouTube channel');
  console.log('   ✅ Homepage passed');

  // Test 2: Course Discovery and Hierarchy
  console.log('2. Checking Course Hierarchy (/cours, /cours/2eme-bac, /cours/2eme-bac/sciences-maths)...');
  const cours = await testFetch('/cours');
  assert.ok(cours.text.includes('Programme et Cours Structurés'), 'Course page heading check');

  const lvl2Bac = await testFetch('/cours/2eme-bac');
  assert.ok(lvl2Bac.text.includes('2ème Année Baccalauréat'), 'Level page check');

  const branchSM = await testFetch('/cours/2eme-bac/sciences-maths');
  assert.ok(branchSM.text.includes('Sciences Mathématiques'), 'Branch page check');

  const chapterLimits = await testFetch('/cours/2eme-bac/sciences-maths/limites-et-continuite');
  assert.ok(chapterLimits.text.includes('Limites et Continuité'), 'Chapter page check');
  console.log('   ✅ Course Hierarchy passed');

  // Test 3: Critical User Journey A (Lesson Page with Math, Video Facade, Exercises, Prev/Next)
  console.log('3. Checking Critical Student Journey A (/cours/.../continuite-et-tvi)...');
  const lesson = await testFetch('/cours/2eme-bac/sciences-maths/limites-et-continuite/continuite-et-tvi');
  assert.ok(lesson.text.includes('Théorème des Valeurs Intermédiaires'), 'Lesson title check');
  assert.ok(lesson.text.includes('katex'), 'KaTeX formulas must be rendered');
  assert.ok(lesson.text.includes('youtube-nocookie.com'), 'Video facade or embed URL present');
  assert.ok(lesson.text.includes('Objectifs Pédagogiques'), 'Objectives present');
  assert.ok(lesson.text.includes('Pièges') || lesson.text.includes('Points de Vigilance'), 'Common mistakes section present');
  assert.ok(lesson.text.includes('نصيحة الأستاذ'), 'Darija / Arabic pro tip present');
  assert.ok(lesson.text.includes('Exercices d\'Application'), 'Interactive exercises present');
  assert.ok(lesson.text.includes('Leçon suivante'), 'Next lesson navigation link present');
  console.log('   ✅ Student Journey A passed');

  // Test 4: Critical User Journey D (Bac Revision Hub)
  console.log('4. Checking Critical Student Journey D (/bac)...');
  const bac = await testFetch('/bac');
  assert.ok(bac.text.includes('Espace Révision Baccalauréat') || bac.text.includes('Annales Officielles'), 'Bac Hub title check');
  assert.ok(bac.text.includes('Examens Nationaux Corrigés'), 'National exam list present');
  assert.ok(bac.text.includes('Formules Essentielles') || bac.text.includes('Formulaire'), 'Essential formulas section present');
  assert.ok(bac.text.includes('2025'), '2025 national exam present');
  assert.ok(bac.text.includes('2024'), '2024 national exam present');
  assert.ok(bac.text.includes('Sujet'), 'Subject action present');
  assert.ok(bac.text.includes('Corrigé'), 'Correction action present');
  console.log('   ✅ Student Journey D passed');

  // Test 5: Exercises Hub
  console.log('5. Checking Exercises Hub (/exercices)...');
  const exo = await testFetch('/exercices');
  assert.ok(exo.text.includes('Exercices') && (exo.text.includes('Séries') || exo.text.includes('Problèmes')), 'Exercises hub title check');
  assert.ok(exo.text.includes('Niveau') || exo.text.includes('Difficulté'), 'Filters present');
  console.log('   ✅ Exercises Hub passed');

  // Test 6: YouTube Videos Hub
  console.log('6. Checking Videos Hub (/videos)...');
  const vid = await testFetch('/videos');
  assert.ok(vid.text.includes('Vidéothèque') || vid.text.includes('Vidéos'), 'Videos hub title check');
  assert.ok(vid.text.includes('YouTube') && vid.text.includes('abonner'), 'Subscribe button present');
  console.log('   ✅ Videos Hub passed');

  // Test 7: Professor & About Page
  console.log('7. Checking About Page (/a-propos)...');
  const about = await testFetch('/a-propos');
  assert.ok(about.text.includes('Enseignant de Mathématiques') || about.text.includes('Aknari'), 'Professor title check');
  assert.ok(about.text.includes('100% gratuite') && about.text.includes('plateforme'), 'Free manifesto check');
  assert.ok(about.text.includes('Pédagogique') && about.text.includes('Étapes'), 'Methodology check');
  console.log('   ✅ About Page passed');

  // Test 8: SEO, Sitemap, and Robots
  console.log('8. Checking SEO assets (sitemap.xml, robots.txt, 404)...');
  const sitemap = await testFetch('/sitemap.xml');
  assert.ok(sitemap.text.includes('<loc>https://cqfdmaths.ma/cours'), 'Sitemap should contain course URLs');
  assert.ok(sitemap.text.includes('<loc>https://cqfdmaths.ma/bac'), 'Sitemap should contain Bac hub');

  const robots = await testFetch('/robots.txt');
  assert.ok(robots.text.includes('Sitemap: https://cqfdmaths.ma/sitemap.xml'), 'Robots should point to sitemap');

  const notFound = await testFetch('/this-page-does-not-exist', 404);
  assert.ok(notFound.text.includes('Page introuvable') || notFound.text.includes('404'), '404 page check');

  // Test 9: Integrated Architecture & Clean PDF Streaming Proxy
  console.log('9. Checking Integrated PDF Architecture & Clean PDF Streaming Proxy...');
  // Check /ressources redirects or lands on /cours
  const resRedirect = await testFetch('/ressources');
  assert.ok(resRedirect.text.includes('Programme') || resRedirect.text.includes('Tronc Commun'), 'Ressources redirects to /cours');
  
  // Verify clean PDF proxy returns 200 and application/pdf
  const pdfRes = await fetch(`${BASE_URL}/api/pdf?id=57916`);
  assert.strictEqual(pdfRes.status, 200, 'PDF streaming proxy must return 200 OK');
  assert.strictEqual(pdfRes.headers.get('content-type'), 'application/pdf', 'Must return application/pdf');
  console.log('   ✅ Integrated PDF Architecture & Clean PDF Streaming Proxy passed');

  // Test 10: Semesters S1 & S2 Branch Structure
  console.log('10. Checking Branch Semesters Structure (/cours/2eme-bac/sciences-maths)...');
  const smBranch = await testFetch('/cours/2eme-bac/sciences-maths');
  assert.ok(smBranch.text.includes('Semestre 1') && smBranch.text.includes('الدورة الأولى'), 'Semestre 1 heading check');
  assert.ok(smBranch.text.includes('Semestre 2') && smBranch.text.includes('الدورة الثانية'), 'Semestre 2 heading check');
  assert.ok(smBranch.text.includes('Limites et Continuité'), 'Limites chapter present');
  assert.ok(smBranch.text.includes('Nombres Complexes'), 'Complexes chapter present');
  console.log('   ✅ Branch Semesters Structure passed');

  // Test 11: Chapter Content Hub Tabs
  console.log('11. Checking Chapter Content Hub Tabs (/cours/2eme-bac/sciences-maths/limites-et-continuite)...');
  const chHub = await testFetch('/cours/2eme-bac/sciences-maths/limites-et-continuite');
  assert.ok(chHub.text.includes('Leçons & Vidéos') || chHub.text.includes('Leçons &amp; Vidéos'), 'Tab 1 check');
  assert.ok(chHub.text.includes('Fiches & Résumés') || chHub.text.includes('Fiches &amp; Résumés'), 'Tab 2 check');
  assert.ok(chHub.text.includes('Séries'), 'Tab 3 check');
  assert.ok(chHub.text.includes('Devoirs Surveillés'), 'Tab 4 check');
  console.log('   ✅ Chapter Content Hub Tabs passed');

  // Test 12: Independent Teacher Identity & Slogan
  console.log('12. Checking Independent Teacher Identity & Slogan...');
  const siteConfigContent = fs.readFileSync('src/data/site-config.ts', 'utf-8');
  assert.ok(home.text.includes("fallait") || home.text.includes("démontrer"), 'Slogan Fr check');
  assert.ok(siteConfigContent.includes("وهو المطلوب إثباته"), 'Slogan Ar configured in site config');
  assert.ok(home.text.includes("Prof. Jamaa Aknari"), 'Teacher name check');
  assert.ok(home.text.includes("Enseignant Indépendant") || home.text.includes("أستاذ مستقل"), 'Independent teacher title check');
  assert.ok(!home.text.includes("Lycée BIOF Maroc"), 'Must not mention Lycée BIOF Maroc as school');
  console.log('   ✅ Independent Teacher Identity & Slogan passed');

  // Test 13: Scope Constraint: Zero Collège
  console.log('13. Checking Scope (Zero Collège)...');
  assert.ok(!home.text.includes("1AC") && !home.text.includes("2AC") && !home.text.includes("3AC"), 'No college levels on home');
  assert.ok(!cours.text.includes("1ère Année Collège") && !cours.text.includes("3ème Année Collège"), 'No college levels on courses');
  console.log('   ✅ Zero Collège check passed');

  console.log('\n🎉 ALL 13 VERIFICATION TESTS PASSED SUCCESSFULLY! The platform structure is 100% complete.');
}

runAllTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
