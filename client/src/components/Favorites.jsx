import React from 'react';

export default function Favorites({ favorites = [], onSelect, onRemove }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-3 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold dark:text-gray-100">Favorites</h3>
      {favorites.length === 0 ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">No favorites yet.</div>
      ) : (
        <ul className="mt-2 space-y-2 max-h-64 overflow-auto">
          {favorites.map(f => (
            <li key={f.key} className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  onClick={() => onSelect(f)}
                  className="text-left hover:underline dark:text-gray-100"
                >
                  <div>{f.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {f.author_name?.join(', ')}
                  </div>
                </button>
              </div>
              <div>
                <button
                  onClick={() => onRemove(f.key)}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
