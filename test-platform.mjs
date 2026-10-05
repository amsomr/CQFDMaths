import assert from 'node:assert';

const BASE_URL = 'http://localhost:3333';

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
  console.log('🚀 Running MathsMaroc Platform Verification Tests...\n');

  // Test 1: Homepage and Core Sections
  console.log('1. Checking Homepage (Hero, Level Selector, Popular Chapters, FAQs)...');
  const home = await testFetch('/');
  assert.ok(home.text.includes('MathsMaroc'), 'Homepage should contain site name');
  assert.ok(home.text.includes('Prof. Omar Alami'), 'Homepage should contain professor name');
  assert.ok(home.text.includes('Quel est ton niveau'), 'Homepage should contain quick level selector');
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
  assert.ok(bac.text.includes('Espace Révision Baccalauréat'), 'Bac Hub title check');
  assert.ok(bac.text.includes('Examens Nationaux Corrigés'), 'National exam list present');
  assert.ok(bac.text.includes('Le Formulaire Mathématique Ultime'), 'Essential formulas section present');
  assert.ok(bac.text.includes('2025'), '2025 national exam present');
  assert.ok(bac.text.includes('2024'), '2024 national exam present');
  assert.ok(bac.text.includes('Sujet officiel (PDF)'), 'Subject download button present');
  assert.ok(bac.text.includes('Correction détaillée (PDF)'), 'Correction download button present');
  console.log('   ✅ Student Journey D passed');

  // Test 5: Exercises Hub
  console.log('5. Checking Exercises Hub (/exercices)...');
  const exo = await testFetch('/exercices');
  assert.ok(exo.text.includes('Exercices Corrigés') && exo.text.includes('Banque'), 'Exercises hub title check');
  assert.ok(exo.text.includes('Difficulté'), 'Difficulty filter present');
  console.log('   ✅ Exercises Hub passed');

  // Test 6: YouTube Videos Hub
  console.log('6. Checking Videos Hub (/videos)...');
  const vid = await testFetch('/videos');
  assert.ok(vid.text.includes('Vidéothèque Pédagogique YouTube'), 'Videos hub title check');
  assert.ok(vid.text.includes('YouTube') && vid.text.includes('abonner'), 'Subscribe button present');
  console.log('   ✅ Videos Hub passed');

  // Test 7: Professor & About Page
  console.log('7. Checking About Page (/a-propos)...');
  const about = await testFetch('/a-propos');
  assert.ok(about.text.includes('Professeur agrégé de Mathématiques') || about.text.includes('Alami'), 'Professor title check');
  assert.ok(about.text.includes('100% gratuite') && about.text.includes('plateforme'), 'Free manifesto check');
  assert.ok(about.text.includes('Pédagogique') && about.text.includes('Étapes'), 'Methodology check');
  console.log('   ✅ About Page passed');

  // Test 8: SEO, Sitemap, and Robots
  console.log('8. Checking SEO assets (sitemap.xml, robots.txt, 404)...');
  const sitemap = await testFetch('/sitemap.xml');
  assert.ok(sitemap.text.includes('<loc>https://mathsmaroc.ma/cours'), 'Sitemap should contain course URLs');
  assert.ok(sitemap.text.includes('<loc>https://mathsmaroc.ma/bac'), 'Sitemap should contain Bac hub');

  const robots = await testFetch('/robots.txt');
  assert.ok(robots.text.includes('Sitemap: https://mathsmaroc.ma/sitemap.xml'), 'Robots should point to sitemap');

  const notFound = await testFetch('/this-page-does-not-exist', 404);
  assert.ok(notFound.text.includes('Page introuvable') || notFound.text.includes('404'), '404 page check');
  console.log('   ✅ SEO assets passed');

  console.log('\n🎉 ALL 8 TESTS PASSED SUCCESSFULLY! The platform is production-ready.');
}

runAllTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
