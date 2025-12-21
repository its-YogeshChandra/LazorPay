// TEMP: hardcoded keys since you’re testing
const API_KEY = "e6d1af99aa737ecf906a1a46a1d6f9f1"; // v3 key
const READ_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmQxYWY5OWFhNzM3ZWNmOTA2YTFhNDZhMWQ2ZjlmMSIsIm5iZiI6MTc2MzMwMjcwOS4xNDMwMDAxLCJzdWIiOiI2OTE5ZGQzNTg4MGI0NWNmMmI0MGYyZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gYYhvG1HMjSxgVaGLphDL2DusfDj5me3JdviBJMFF_s";

// Base config
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: API_KEY,
  READ_TOKEN: READ_TOKEN,
};

// Fetch movies (search or discover)
export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_TOKEN}`, // v4 token
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

// Fetch movie details
export const fetchMovieDetails = async (movieId: string) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${READ_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  return await response.json();
};




// TESTING
// (async () => {
//   try {
//     console.log("Fetching movies...");
//     const movies = await fetchMovies({ query: "avengers" });
//     console.log("Movies:", movies);

//     if (movies.length > 0) {
//       console.log("\nFetching details for:", movies[0].id);
//       const details = await fetchMovieDetails(String(movies[0].id));
//       console.log("Movie Details:", details);
//     }
//   } catch (err) {
//     console.error("❌ ERROR:", err);
//   }
// })();
