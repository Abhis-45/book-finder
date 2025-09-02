import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Search by title, e.g. 'Pride and Prejudice'"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        onClick={() => onChange(value)}
      >
        Search
      </button>
    </div>
  );
}
