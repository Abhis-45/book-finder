Got it ✅ — here’s a polished **README.md** for your **Book Finder** project.
I included sections for overview, features, tech stack, setup, usage, and screenshots. You can copy this into your `README.md` file.

---

# 📚 Book Finder

A full-stack web application that lets users **search books from the Open Library API**, view details, and save favorites.
Built with **React + Tailwind (frontend)** and **Node.js + Express (backend)**.

---

## ✨ Features

* 🔍 **Search** books by title using the Open Library API
* 📑 **Pagination** support for search results
* 📖 **Book details modal** with cover, author, and first publish year
* ⭐ **Save favorites** to backend storage (`db.json`)
* 🗑️ **Remove favorites** anytime
* 🌙 **Light/Dark theme toggle** with persistent preference
* ⚡ **Responsive UI** with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/) for styling
* Dark mode toggle using Tailwind `dark` class

### Backend

* [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
* [Axios](https://axios-http.com/) for API requests
* Local JSON file (`db.json`) as lightweight database

### External API

* [Open Library Search API](https://openlibrary.org/developers/api)

---

## 📂 Project Structure

```
book-finder/
├── client/          # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── App.jsx       # Main app
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── server/          # Backend (Node + Express)
│   ├── index.js     # Express server
│   ├── db.json      # Favorites storage
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/book-finder.git
cd book-finder
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Run backend server

```bash
npm run dev   # starts on http://localhost:4000
```

### 4. Install frontend dependencies

```bash
cd ../client
npm install
```

### 5. Run frontend

```bash
npm run dev   # starts on http://localhost:3000
```

---

## 🌙 Light / Dark Mode

* Default is **light theme**
* Toggle between 🌞 and 🌙 using the button in the header
* Preference is saved in `localStorage`

---

## 📦 API Endpoints (Backend)

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/api/search?q=...`  | Search books by title         |
| GET    | `/api/favorites`     | Fetch favorites list          |
| POST   | `/api/favorites`     | Save a new favorite           |
| DELETE | `/api/favorites/:id` | Remove a favorite by book key |

---

## 📜 License

This project is licensed under the MIT License — feel free to use and modify.

---

Do you want me to also **add this README.md into the `setup.sh` script**, so when you generate the project it comes with this prefilled README?
