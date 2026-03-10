const fs = require('fs');
const path = require('path');

const albumsDir = path.join(__dirname, '_data', 'albums');
const indexPath = path.join(__dirname, '_data', 'albums-index.json');

if (!fs.existsSync(albumsDir)) {
  fs.mkdirSync(albumsDir, { recursive: true });
  fs.writeFileSync(indexPath, JSON.stringify([], null, 2));
  console.log('No albums found. Empty index created.');
  process.exit(0);
}

const files = fs.readdirSync(albumsDir).filter(f => f.endsWith('.json'));

const albums = files.map(file => {
  const raw = fs.readFileSync(path.join(albumsDir, file), 'utf-8');
  const data = JSON.parse(raw);
  const slug = path.basename(file, '.json');

  return {
    slug: slug,
    title: data.title || slug,
    description: data.description || '',
    cover: data.cover || null
  };
});

// Sort alphabetically by title
albums.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(indexPath, JSON.stringify(albums, null, 2));
console.log('Built albums index: ' + albums.length + ' album(s)');