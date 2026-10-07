import fs from 'fs';

const COURSES = [
  {
    levelId: '2eme-bac',
    branchId: 'sciences-maths',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-mathematiques-a-biof',
  },
  {
    levelId: '2eme-bac',
    branchId: 'sciences-physiques',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques-biof',
  },
  {
    levelId: '2eme-bac',
    branchId: 'svt',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-de-la-vie-et-de-la-terre-biof',
  },
  {
    levelId: '1ere-bac',
    branchId: '1ere-sciences-maths',
    url: 'https://www.alloschool.com/course/mathematiques-1er-bac-sciences-mathematiques-biof',
  },
  {
    levelId: '1ere-bac',
    branchId: 'sciences-exp',
    url: 'https://www.alloschool.com/course/mathematiques-1er-bac-sciences-experimentales-biof',
  },
  {
    levelId: 'tronc-commun',
    branchId: 'tc-sciences',
    url: 'https://www.alloschool.com/course/mathematiques-tronc-commun-sciences-biof',
  },
  {
    levelId: 'tronc-commun',
    branchId: 'tc-technologique',
    url: 'https://www.alloschool.com/course/mathematiques-tronc-commun-technologique-biof',
  },
];

async function fetchCourseData(course) {
  console.log(`Fetching ${course.branchId} from ${course.url}...`);
  const res = await fetch(course.url);
  const html = await res.text();

  // Find all sections: id="section-XXXX" with <h2>...</h2>
  const sectionRegex = /id=\"section-(\d+)\"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=(?:id=\"section-\d+\")|$)/gi;
  const sections = [];
  let match;

  while ((match = sectionRegex.exec(html)) !== null) {
    const sectionId = match[1];
    const rawTitle = match[2].replace(/<[^>]+>/g, '').trim();
    const sectionBody = match[3];

    // Filter out premium or navigation sections
    if (rawTitle.toLowerCase().includes('programme') || rawTitle.toLowerCase().includes('premium')) {
      continue;
    }

    // Extract elements in this section
    const elementRegex = /<li[^>]*class=\"[^\"]*element[^\"]*\"[^>]*>([\s\S]*?)<\/li>/gi;
    const elements = [];
    let elMatch;

    while ((elMatch = elementRegex.exec(sectionBody)) !== null) {
      const elHtml = elMatch[1];
      const linkMatch = elHtml.match(/href=\"([^\"]+)\"/);
      const title = elHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const href = linkMatch ? linkMatch[1] : null;

      if (!href || href === '#!') continue;

      // Extract element ID from URL
      const idMatch = href.match(/\/element\/(\d+)/);
      const elementId = idMatch ? idMatch[1] : null;

      elements.push({
        elementId,
        url: href,
        title,
      });
    }

    sections.push({
      sectionId,
      title: rawTitle,
      elementsCount: elements.length,
      elements,
    });
  }

  console.log(`  -> Found ${sections.length} sections, total elements: ${sections.reduce((a, s) => a + s.elementsCount, 0)}`);
  return {
    ...course,
    sections,
  };
}

async function run() {
  const allData = [];
  for (const c of COURSES) {
    try {
      const data = await fetchCourseData(c);
      allData.push(data);
    } catch (err) {
      console.error(`Error fetching ${c.branchId}:`, err);
    }
  }

  fs.writeFileSync('alloschool-metadata.json', JSON.stringify(allData, null, 2), 'utf-8');
  console.log('\nSaved all course metadata to alloschool-metadata.json!');
}

run();
