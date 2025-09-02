import React from 'react';

const coverUrl = (cover_i, size = 'M') =>
  cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg` : null;

export default function BookCard({ book, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col h-full border border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        <div className="h-48 w-full mb-3 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {book.cover_i ? (
            <img src={coverUrl(book.cover_i, 'M')} alt={book.title} className="object-contain h-full" />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>
        <h3 className="text-lg font-semibold dark:text-gray-100">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{book.author_name?.join(', ')}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          First: {book.first_publish_year || '—'}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
          onClick={onSelect}
        >
          Details
        </button>
        <a
          className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>
    </div>
  );
}
