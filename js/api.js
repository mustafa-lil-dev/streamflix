// =============================================
// API - TMDB Fetcher
// =============================================

async function tmdb(endpoint, params = {}) {
  const url = new URL(CONFIG.TMDB_BASE_URL + endpoint);
  url.searchParams.set("api_key", CONFIG.TMDB_API_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("TMDB fetch failed: " + res.status);
  return res.json();
}

function posterUrl(path, size = "w500") {
  if (!path) return "https://via.placeholder.com/300x450/111/444?text=No+Image";
  return `${CONFIG.TMDB_IMAGE_BASE}/${size}${path}`;
}

function backdropUrl(path) {
  if (!path) return "";
  return `${CONFIG.TMDB_IMAGE_BASE}/${CONFIG.TMDB_BACKDROP_SIZE}${path}`;
}

function moviePlayerUrl(id) {
  return CONFIG.PLAYER_MOVIE_URL + id;
}

function tvPlayerUrl(id, season = 1, episode = 1) {
  return `${CONFIG.PLAYER_TV_URL}${id}/${season}/${episode}`;
}

function getRatingColor(rating) {
  if (rating >= 7.5) return "#22c55e";
  if (rating >= 6) return "#eab308";
  return "#ef4444";
}

function formatDate(dateStr) {
  if (!dateStr) return "Unknown";
  return new Date(dateStr).getFullYear();
}

function truncate(str, len = 160) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "..." : str;
}

// Build a card element
function buildCard(item, type) {
  const id = item.id;
  const title = item.title || item.name || "Untitled";
  const poster = posterUrl(item.poster_path);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const year = formatDate(item.release_date || item.first_air_date);
  const mediaType = type || item.media_type || "movie";

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-poster-wrap">
      <img class="card-poster" src="${poster}" alt="${title}" loading="lazy" />
      <div class="card-overlay">
        <button class="card-play-btn" onclick="goWatch('${mediaType}', ${id})">▶ Play</button>
        <button class="card-info-btn" onclick="goDetail('${mediaType}', ${id})">Info</button>
      </div>
      <div class="card-rating" style="color:${getRatingColor(parseFloat(rating))}">
        ★ ${rating}
      </div>
    </div>
    <div class="card-info">
      <p class="card-title">${title}</p>
      <p class="card-year">${year}</p>
    </div>
  `;
  return card;
}

function renderRow(rowId, items, type) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = "";
  items.forEach(item => row.appendChild(buildCard(item, type)));
}

function goWatch(type, id) {
  window.location.href = `pages/watch.html?type=${type}&id=${id}`;
}

function goDetail(type, id) {
  window.location.href = `pages/detail.html?type=${type}&id=${id}`;
}
