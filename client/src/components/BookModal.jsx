import React from 'react';

const coverUrl = (cover_i, size = 'L') =>
  cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg` : null;

export default function BookModal({ book, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg max-w-3xl w-full p-6 relative border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          Close
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-48 h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {book.cover_i ? (
              <img src={coverUrl(book.cover_i)} alt={book.title} className="object-contain h-full" />
            ) : (
              <div className="text-gray-400">No image</div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{book.author_name?.join(', ')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              First published: {book.first_publish_year || '—'}
            </p>

            <div className="mt-4 space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                onClick={() => onSave(book)}
              >
                Save to Favorites
              </button>
              <a
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Open Library
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
