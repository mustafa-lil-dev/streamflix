// =============================================
// HOME PAGE LOGIC
// =============================================

async function loadHome() {
  try {
    // Load all sections in parallel
    const [trending, movies, tv, newMovies] = await Promise.all([
      tmdb("/trending/all/day"),
      tmdb("/movie/popular"),
      tmdb("/tv/top_rated"),
      tmdb("/movie/now_playing"),
    ]);

    // Hero - pick from trending
    const heroItem = trending.results[Math.floor(Math.random() * 5)];
    setHero(heroItem);

    renderRow("trendingRow", trending.results.slice(0, 15));
    renderRow("moviesRow", movies.results.slice(0, 15), "movie");
    renderRow("tvRow", tv.results.slice(0, 15), "tv");
    renderRow("newRow", newMovies.results.slice(0, 15), "movie");

  } catch (e) {
    console.error(e);
  }
}

function setHero(item) {
  if (!item) return;
  const bg = document.getElementById("heroBg");
  const title = document.getElementById("heroTitle");
  const desc = document.getElementById("heroDesc");
  const meta = document.getElementById("heroMeta");
  const badges = document.getElementById("heroBadges");
  const playBtn = document.getElementById("heroPlayBtn");
  const infoBtn = document.getElementById("heroInfoBtn");

  const type = item.media_type || "movie";
  const name = item.title || item.name;
  const backdrop = backdropUrl(item.backdrop_path);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "?";
  const year = formatDate(item.release_date || item.first_air_date);

  bg.style.backgroundImage = `url('${backdrop}')`;
  title.textContent = name;
  desc.textContent = truncate(item.overview, 200);
  meta.innerHTML = `
    <span style="color:${getRatingColor(parseFloat(rating))}">★ ${rating}</span>
    <span>${year}</span>
    <span class="hero-type-badge">${type === "tv" ? "TV Show" : "Movie"}</span>
  `;
  badges.innerHTML = `<span class="hd-badge">HD</span>`;

  playBtn.onclick = () => goWatch(type, item.id);
  infoBtn.onclick = () => goDetail(type, item.id);
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});

loadHome();
