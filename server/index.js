const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { favorites: [] };
  }
}
async function writeDB(obj) {
  await fs.writeFile(DB_PATH, JSON.stringify(obj, null, 2), 'utf8');
}

app.get('/api/search', async (req, res) => {
  const q = req.query.q || '';
  const page = req.query.page || 1;
  if (!q) return res.json({ docs: [], numFound: 0 });
  try {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&page=${page}`;
    const r = await axios.get(url, { timeout: 10000 });
    const data = r.data;
    const docs = (data.docs || []).map(doc => ({
      title: doc.title,
      author_name: doc.author_name || [],
      first_publish_year: doc.first_publish_year || null,
      cover_i: doc.cover_i || null,
      key: doc.key,
      edition_key: doc.edition_key ? doc.edition_key[0] : null
    }));
    res.json({ docs, numFound: data.numFound || 0 });
  } catch (err) {
    console.error('OpenLibrary fetch error:', err?.message || err);
    res.status(500).json({ error: 'Failed to fetch from Open Library' });
  }
});

app.get('/api/favorites', async (req, res) => {
  const db = await readDB();
  res.json(db.favorites || []);
});

app.post('/api/favorites', async (req, res) => {
  const book = req.body;
  if (!book || !book.key) return res.status(400).json({ error: 'Book object with key required' });
  const db = await readDB();
  if (db.favorites.find(b => b.key === book.key)) return res.status(409).json({ error: 'Already in favorites' });
  db.favorites.push(book);
  await writeDB(db);
  res.status(201).json(book);
});

app.delete('/api/favorites/:key', async (req, res) => {
  const key = req.params.key;
  const db = await readDB();
  db.favorites = (db.favorites || []).filter(b => b.key !== key);
  await writeDB(db);
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Book Finder backend running on http://localhost:${PORT}`));
