import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full border dark:border-gray-600 dark:hover:bg-gray-800 hover:bg-gray-200 transition"
      title="Toggle theme"
    >
      {theme === 'dark' ? (
        <span role="img" aria-label="Light">🌞</span>
      ) : (
        <span role="img" aria-label="Dark">🌙</span>
      )}
    </button>
  );
}
