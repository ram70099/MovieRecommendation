import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/movie";
import { useTranslation } from "react-i18next";

// Constants for localStorage keys - same as in Watchlist.tsx
const WATCHLIST_KEY = "movie-app-watchlist";
const FAVORITES_KEY = "movie-app-favorites";

const Discover = () => {
  const { t } = useTranslation();
  const API_URL = "http://127.0.0.1:5000";
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendationsError, setRecommendationsError] = useState<
    string | null
  >(null);

  // Function to fetch movies by multiple genres
  const fetchMoviesByGenres = async (genres: string[]) => {
    setLoading(true);
    try {
      // If no genres are selected, fetch all movies
      if (genres.length === 0) {
        const response = await fetch(`${API_URL}/movies/genre/All`);
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        processMovieData(data);
      } else {
        // Convert array of genres to comma-separated string
        const genresParam = genres.join(",");
        const response = await fetch(
          `${API_URL}/movies/genres?selected=${genresParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        processMovieData(data);
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const processMovieData = (data: any[]) => {
    const processedData: Movie[] = data.map((movie: any) => ({
      id: movie.MovieID,
      title: movie.Title,
      overview: movie.Overview,
      releaseDate: movie["Release Date"],
      posterUrl: movie["Poster URL"],
      rating: parseFloat(movie.Rating),
      genres: movie.Genres
        ? movie.Genres.split(",").map((g: string) => g.trim())
        : [],
      year: new Date(movie["Release Date"]).getFullYear(),
    }));
    setMovies(processedData);
    setLoading(false);
  };

  // Function to get user's preferred genres from localStorage
  const getUserPreferredGenres = (): string[] => {
    try {
      // Load watchlist and favorites from localStorage
      const watchlistData = localStorage.getItem(WATCHLIST_KEY);
      const favoritesData = localStorage.getItem(FAVORITES_KEY);

      const watchlist: Movie[] = watchlistData ? JSON.parse(watchlistData) : [];
      const favorites: Movie[] = favoritesData ? JSON.parse(favoritesData) : [];

      // Combine watchlist and favorites, then extract all genres
      const allUserMovies = [...watchlist, ...favorites];

      if (allUserMovies.length === 0) {
        return [];
      }

      // Extract all genres from user's movies
      const allGenres = allUserMovies.flatMap((movie) => movie.genres || []);

      // Count genre occurrences to find user preferences
      const genreCounts: Record<string, number> = {};
      allGenres.forEach((genre) => {
        if (genre) {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        }
      });

      // Sort genres by frequency (most common first)
      const sortedGenres = Object.keys(genreCounts).sort(
        (a, b) => genreCounts[b] - genreCounts[a]
      );

      // Return top genres (limit to 5 for performance)
      return sortedGenres.slice(0, 5);
    } catch (error) {
      console.error("Error analyzing user preferences:", error);
      return [];
    }
  };

  // Function to fetch recommended movies based on user preferences
  const fetchRecommendedMovies = async () => {
    setRecommendationsLoading(true);
    setRecommendationsError(null);

    try {
      const preferredGenres = getUserPreferredGenres();

      // If no preferences found, don't show recommendations
      if (preferredGenres.length === 0) {
        setRecommendedMovies([]);
        setRecommendationsLoading(false);
        return;
      }

      // Fetch movies for each preferred genre
      const moviesPerGenre: Movie[][] = await Promise.all(
        preferredGenres.map(async (genre) => {
          const response = await fetch(`${API_URL}/movies/genre/${genre}`);
          if (!response.ok)
            throw new Error(
              `Failed to fetch ${genre} movies for recommendations`
            );
          const data = await response.json();
          return data.map((movie: any) => ({
            id: movie.MovieID,
            title: movie.Title,
            overview: movie.Overview,
            releaseDate: movie["Release Date"],
            posterUrl: movie["Poster URL"],
            rating: parseFloat(movie.Rating),
            genres: movie.Genres
              ? movie.Genres.split(",").map((g: string) => g.trim())
              : [],
            year: new Date(movie["Release Date"]).getFullYear(),
          }));
        })
      );

      // Get user's already saved movies to exclude them from recommendations
      const watchlistData = localStorage.getItem(WATCHLIST_KEY);
      const favoritesData = localStorage.getItem(FAVORITES_KEY);
      const watchlist: Movie[] = watchlistData ? JSON.parse(watchlistData) : [];
      const favorites: Movie[] = favoritesData ? JSON.parse(favoritesData) : [];
      const savedMovieIds = new Set(
        [...watchlist, ...favorites].map((m) => m.id)
      );

      // Combine all genre results and remove duplicates and already saved movies
      const allRecommendations = moviesPerGenre.flat();
      const uniqueRecommendations = allRecommendations.filter(
        (movie, index, self) =>
          // Filter out duplicates
          index === self.findIndex((m) => m.id === movie.id) &&
          // Filter out movies user already has in watchlist/favorites
          !savedMovieIds.has(movie.id)
      );

      // Sort by rating (highest first)
      const sortedRecommendations = uniqueRecommendations.sort(
        (a, b) => b.rating - a.rating
      );

      // Limit to 20 recommendations
      setRecommendedMovies(sortedRecommendations.slice(0, 20));
      setRecommendationsLoading(false);
    } catch (err: any) {
      setRecommendationsError(err.message);
      setRecommendationsLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchMoviesByGenres([]);
    fetchRecommendedMovies();
  }, []);

  // Get unique genres from all movies
  const allGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort();

  // Handler for genre selection
  const handleGenreSelect = (genre: string) => {
    setSelectedGenres((prevSelectedGenres) => {
      // Check if genre is already selected
      if (prevSelectedGenres.includes(genre)) {
        // If already selected, remove it
        const newGenres = prevSelectedGenres.filter((g) => g !== genre);
        fetchMoviesByGenres(newGenres);
        return newGenres;
      } else {
        // If not selected, add it
        const newGenres = [...prevSelectedGenres, genre];
        fetchMoviesByGenres(newGenres);
        return newGenres;
      }
    });
  };

  // Get display title based on selected genres
  const getDisplayTitle = () => {
    if (selectedGenres.length === 0) {
      return "All Movies";
    } else if (selectedGenres.length === 1) {
      return `${selectedGenres[0]} Movies`;
    } else {
      return `${selectedGenres.join(" & ")} Movies`;
    }
  };

  // Determine if we should show recommendations
  const shouldShowRecommendations =
    selectedGenres.length === 0 && recommendedMovies.length > 0;

  return (
    <div className="page">
      <h1 className="page-title">{t('discover')}</h1>

      <div className="genre-filter">
        <button
          className={`genre-button ${
            selectedGenres.length === 0 ? "active" : ""
          }`}
          onClick={() => {
            setSelectedGenres([]);
            fetchMoviesByGenres([]);
          }}
        >
          All
        </button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${
              selectedGenres.includes(genre) ? "active" : ""
            }`}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Recommendations Section */}
      {shouldShowRecommendations && (
        <div
          className="recommendations-section"
          style={{ marginBottom: "40px" }}
        >
          {recommendationsLoading ? (
            <div className="loading">Loading recommendations...</div>
          ) : recommendationsError ? (
            <div className="error">
              Error loading recommendations: {recommendationsError}
            </div>
          ) : recommendedMovies.length > 0 ? (
            <MovieGrid
              movies={recommendedMovies}
              title={t('recommendedTitle')}
              description={t('recommendedDescription')}
                />
          ) : null}
        </div>
      )}

      {/* Main Movies Section */}
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <MovieGrid
          movies={movies}
          title={getDisplayTitle()}
          description={`Showing ${movies.length} movies`}
        />
      )}
    </div>
  );
};

export default Discover;
