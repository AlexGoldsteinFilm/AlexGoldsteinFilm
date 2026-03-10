/**
 * build.js — runs on every Netlify deploy.
 *
 * 1. Reads every .json file in _data/albums/
 * 2. Builds an albums-index.json with summary info (title, slug, date, description, cover)
 * 3. Writes it to _data/albums-index.json so portfolio.html can fetch one file
 *
 * Netlify build command:  node build.js
 */

const fs = require('fs');
const path = require('path');

const albumsDir = path.join(__dirname, '_data', 'albums');
const indexPath = path.join(__dirname, '_data', 'albums-index.json');

// If the albums folder doesn't exist yet, write an empty index and exit
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

  // Find the cover image: the photo marked is_cover, or fall back to the first photo
  let cover = null;
  if (data.photos && data.photos.length > 0) {
    const marked = data.photos.find(p => p.is_cover === true);
    cover = marked ? marked.image : data.photos[0].image;
  }

  return {
    slug: slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    cover: cover
  };
});

// Sort newest first
albums.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

fs.writeFileSync(indexPath, JSON.stringify(albums, null, 2));
console.log(`Built albums index: ${albums.length} album(s)`);