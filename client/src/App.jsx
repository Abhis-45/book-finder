import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import Favorites from './components/Favorites';
import ThemeToggle from './components/DarkModeToggle';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('https://book-finder-api.vercel.app/api/favorites');
      const data = await res.json();
      setFavorites(data);
    } catch (e) {
      console.error('fetch favorites failed', e);
    }
  };
const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  

  const doSearch = useCallback(async (q, pg = 1) => {
    if (!q) {
      setResults([]);
      setNumFound(0);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`https://book-finder-api.vercel.app/api/search?q=${encodeURIComponent(q)}&page=${pg}`);
      const data = await res.json();
      setResults(data.docs || []);
      setNumFound(data.numFound || 0);
      setPage(pg);
    } catch (e) {
      console.error('search failed', e);
    }
    setLoading(false);
  }, []);

  // debounce query
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) doSearch(query.trim(), 1);
      else {
        setResults([]);
        setNumFound(0);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  const changePage = (newPage) => {
    if (newPage < 1) return;
    doSearch(query, newPage);
  };

  const addFavorite = async (book) => {
    try {
      const res = await fetch('https://book-finder-api.vercel.app/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
      if (res.ok) {
        await fetchFavorites();
        alert('Added to favorites');
      } else {
        const e = await res.json();
        alert(e.error || 'Could not add');
      }
    } catch (e) {
      console.error('add favorite error', e);
      alert('Error adding favorite');
    }
  };

  const removeFavorite = async (key) => {
    if (!confirm('Remove from favorites?')) return;
    try {
      const res = await fetch(`https://book-finder-api.vercel.app/api/favorites/${encodeURIComponent(key)}`, { method: 'DELETE' });
      if (res.ok) await fetchFavorites();
      else alert('Failed to remove');
    } catch (e) {
      console.error('remove favorite error', e);
      alert('Error removing favorite');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Book Finder 📚</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Search books using Open Library. Save favorites to your local backend.
            </p>
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />  {/* 👈 toggle */}
        </header>

        <SearchBar value={query} onChange={setQuery} />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <main className="md:col-span-2">
            {loading ? (
              <div className="p-4">Loading…</div>
            ) : (
              <>
                {results.length === 0 ? (
                  <div className="p-4 text-gray-500">No results — try searching a title.</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {results.map(r => <BookCard key={r.key} book={r} onSelect={() => setSelected(r)} />)}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">Showing {results.length} of {numFound} results</div>
                      <div className="space-x-2">
                        <button disabled={page <= 1} onClick={() => changePage(page - 1)} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
                        <button disabled={results.length === 0} onClick={() => changePage(page + 1)} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </main>

          <aside>
            <Favorites favorites={favorites} onSelect={b => setSelected(b)} onRemove={k => removeFavorite(k)} />
          </aside>
        </div>

        {selected && <BookModal book={selected} onClose={() => setSelected(null)} onSave={addFavorite} />}
      </div>
    </div>
  );
}
