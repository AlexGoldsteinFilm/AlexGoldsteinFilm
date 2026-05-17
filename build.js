const fs = require('fs');
const path = require('path');

function buildIndex(dir, indexPath, label) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(indexPath, JSON.stringify([], null, 2));
    console.log(label + ': 0 album(s) (directory created)');
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  const albums = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const data = JSON.parse(raw);
    const slug = path.basename(file, '.json');
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      cover: data.cover || null
    };
  });

  albums.sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(indexPath, JSON.stringify(albums, null, 2));
  console.log(label + ': ' + albums.length + ' album(s)');
}

buildIndex(
  path.join(__dirname, '_data', 'albums'),
  path.join(__dirname, '_data', 'albums-index.json'),
  'Sessions'
);

buildIndex(
  path.join(__dirname, '_data', 'gallery-personal'),
  path.join(__dirname, '_data', 'gallery-personal-index.json'),
  'Gallery — Personal & Fine Art'
);

buildIndex(
  path.join(__dirname, '_data', 'gallery-cyanotypes'),
  path.join(__dirname, '_data', 'gallery-cyanotypes-index.json'),
  'Gallery — Cyanotypes'
);
