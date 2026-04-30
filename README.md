# 🎬 StreamFlix - Free Movie & TV Streaming Site

A Netflix-inspired streaming frontend built with vanilla HTML/CSS/JS.
Uses TMDB API for metadata and Vidking Player for video streaming.

---

## 📁 Project Structure

```
streamflix/
├── index.html          ← Homepage with hero + trending rows
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── config.js       ← API keys & player URLs
│   ├── api.js          ← TMDB API helpers & card builder
│   └── home.js         ← Homepage logic
└── pages/
    ├── movies.html     ← Browse movies
    ├── tv.html         ← Browse TV shows
    ├── search.html     ← Search page
    ├── detail.html     ← Movie/TV detail page
    └── watch.html      ← Video player page (Vidking)
```

---

## 🚀 How to Run

### Option 1 — VS Code Live Server (Recommended)
1. Open the `streamflix` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Site opens at `http://localhost:5500`

### Option 2 — Python Local Server
```bash
cd streamflix
python -m http.server 8080
# Open http://localhost:8080
```

### Option 3 — Deploy to Web
- **Netlify**: Drag & drop the `streamflix` folder at netlify.com
- **Vercel**: `vercel deploy` from the folder
- **GitHub Pages**: Push to GitHub and enable Pages

---

## ⚙️ Configuration

Edit `js/config.js` to change API keys or player:

```js
const CONFIG = {
  TMDB_API_KEY: "your_tmdb_key_here",
  PLAYER_MOVIE_URL: "https://vidking.net/embed/movie/",
  PLAYER_TV_URL: "https://vidking.net/embed/tv/",
};
```

---

## 🎥 Player URLs

The Vidking player is embedded via iframe:

- **Movie**: `https://vidking.net/embed/movie/{tmdb_id}`
- **TV Episode**: `https://vidking.net/embed/tv/{tmdb_id}/{season}/{episode}`

---

## ✨ Features

- 🎬 Hero banner with auto-rotating featured content
- 🔥 Trending, Popular, Top Rated, New Releases rows
- 🔍 Live search with multi-result display
- 🎞️ Movie detail pages with cast, genres, similar titles
- 📺 TV show pages with season/episode selector
- ▶️ Embedded Vidking video player
- 📱 Fully responsive for mobile

---

## 📌 Notes

- This project uses the TMDB API for movie metadata only
- Video playback is handled by Vidking Player (third-party)
- No backend required — pure static files
