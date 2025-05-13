import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Movie } from "../types/movie";
import "../styles/MovieDetails.css";

// localStorage keys
const WATCHLIST_KEY = "movie-app-watchlist";
const FAVORITES_KEY = "movie-app-favorites";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in watchlist and favorites when component mounts
  useEffect(() => {
    const checkMovieStatus = () => {
      try {
        const watchlistData = localStorage.getItem(WATCHLIST_KEY);
        const watchlist = watchlistData ? JSON.parse(watchlistData) : [];
        setIsInWatchlist(watchlist.some((item: Movie) => item.id === Number(id)));

        const favoritesData = localStorage.getItem(FAVORITES_KEY);
        const favorites = favoritesData ? JSON.parse(favoritesData) : [];
        setIsFavorite(favorites.some((item: Movie) => item.id === Number(id)));
      } catch (error) {
        console.error("Error checking movie status:", error);
      }
    };

    checkMovieStatus();
  }, [id]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movie/${id}`);
        const data = await response.json();

        const transformedMovie: Movie = {
          id: data.MovieID,
          title: data.Title,
          overview: data.Overview,
          releaseDate: data["Release Date"],
          posterUrl: data["Poster URL"],
          rating: data.Rating,
          genres: data.Genres.split(",").map((g: string) => g.trim()),
          year: new Date(data["Release Date"]).getFullYear(),
        };

        setMovie(transformedMovie);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setMovie(null);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const toggleWatchlist = () => {
    if (!movie) return;

    try {
      const watchlistData = localStorage.getItem(WATCHLIST_KEY);
      const watchlist = watchlistData ? JSON.parse(watchlistData) : [];

      if (isInWatchlist) {
        const updatedWatchlist = watchlist.filter((item: Movie) => item.id !== movie.id);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
      } else {
        watchlist.push(movie);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      }

      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  const toggleFavorite = () => {
    if (!movie) return;

    try {
      const favoritesData = localStorage.getItem(FAVORITES_KEY);
      const favorites = favoritesData ? JSON.parse(favoritesData) : [];

      if (isFavorite) {
        const updatedFavorites = favorites.filter((item: Movie) => item.id !== movie.id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      } else {
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (!movie) {
    return (
      <div className="page">
        <h1>Movie not found</h1>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <div
        className="movie-backdrop"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="movie-details-content">
        <div className="movie-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </button>
        </div>

        <div className="movie-main-info">
          <div className="movie-poster-large">
            <img src={movie.posterUrl} alt={`${movie.title} poster`} />
          </div>

          <div className="movie-info-large">
            <h1>
              {movie.title} <span className="year">({movie.year})</span>
            </h1>

            <div className="movie-meta">
              <div className="movie-rating-large">
                <span className="star">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              <div className="runtime">{"120 min"}</div>
            </div>

            <div className="movie-genres-large">
              {movie.genres.map((genre, index) => (
                <span key={index} className="genre-badge">
                  {genre}
                </span>
              ))}
            </div>

            <div className="movie-actions">
              <button className="btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Watch Trailer
              </button>

              <button
                className={`btn-secondary ${isInWatchlist ? "active" : ""}`}
                onClick={toggleWatchlist}
              >
                {isInWatchlist ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>

              <button
                className={`btn-secondary ${isFavorite ? "active" : ""}`}
                onClick={toggleFavorite}
                style={{ padding: "0 15px" }}
              >
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#ff6b6b"
                    stroke="none"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || "No overview available for this movie."}</p>
            </div>

            <div className="movie-credits">
              <div className="credit-group">
                <h4>Release Date</h4>
                <p>
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Release date not available"}
                </p>
              </div>

              <div className="credit-group">
                <h4>Cast</h4>
                <p>Cast information not available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
