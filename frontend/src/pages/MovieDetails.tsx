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
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

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
        
        // Fetch trailer data after getting movie details
        // Try with both the ID from the URL and the MovieID from data
        fetchTrailer(Number(id));
        if (data.MovieID !== Number(id)) {
          fetchTrailer(data.MovieID);
        }
        
        // Also try searching by movie title if needed
        if (data.Title) {
          fetchTrailerByTitle(data.Title, data.year || new Date(data["Release Date"]).getFullYear());
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setMovie(null);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const fetchTrailer = async (movieId: number) => {
    if (!movieId) return;
    
    setIsLoadingTrailer(true);
    try {
      console.log(`Fetching trailer for movie ID: ${movieId}`);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=fb7bb23f03b6994dafc674c074d01761`
      );
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        console.log(`No videos found for movie ID: ${movieId}`);
        return;
      }
      
      // First try to find an official trailer
      const officialTrailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube" && video.official === true
      );
      
      // If no official trailer, find any trailer
      const anyTrailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );
      
      // If no trailer at all, find any teaser
      const teaser = data.results.find(
        (video: any) => video.type === "Teaser" && video.site === "YouTube"
      );
      
      // Find any YouTube video if nothing else works
      const anyVideo = data.results.find(
        (video: any) => video.site === "YouTube"
      );
      
      const bestVideo = officialTrailer || anyTrailer || teaser || anyVideo;
      
      if (bestVideo) {
        console.log(`Found video: ${bestVideo.name} (${bestVideo.type}) - Key: ${bestVideo.key}`);
        setTrailerKey(bestVideo.key);
      } else {
        console.log(`No suitable videos found for movie ID: ${movieId}`);
      }
    } catch (error) {
      console.error(`Failed to fetch trailer for movie ID ${movieId}:`, error);
    } finally {
      setIsLoadingTrailer(false);
    }
  };
  
  const fetchTrailerByTitle = async (title: string, year?: number) => {
    // Only try this as a fallback if we don't already have a trailer key
    if (trailerKey) return;
    
    setIsLoadingTrailer(true);
    try {
      console.log(`Searching for movie by title: "${title}" (${year})`);
      // First search for the movie by title
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=fb7bb23f03b6994dafc674c074d01761&query=${encodeURIComponent(title)}${year ? `&year=${year}` : ''}`
      );
      
      if (!searchResponse.ok) {
        throw new Error(`Search API returned status: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      
      if (!searchData.results || searchData.results.length === 0) {
        console.log(`No movies found with title "${title}"`);
        return;
      }
      
      // Get the first result that matches the title closely
      const movieMatch = searchData.results.find((movie: any) => 
        movie.title.toLowerCase() === title.toLowerCase() || 
        movie.original_title?.toLowerCase() === title.toLowerCase()
      ) || searchData.results[0];
      
      console.log(`Found movie match: ${movieMatch.title} (ID: ${movieMatch.id})`);
      
      // Now fetch the videos for this movie
      await fetchTrailer(movieMatch.id);
      
    } catch (error) {
      console.error(`Failed to search for movie "${title}":`, error);
    } finally {
      setIsLoadingTrailer(false);
    }
  };

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

  const openTrailer = () => {
    if (trailerKey) {
      setShowTrailerModal(true);
    } else if (isLoadingTrailer) {
      alert("Still searching for trailer. Please wait a moment...");
    } else {
      // If no trailer key is available yet, try to fetch again with the movie title
      if (movie) {
        fetchTrailerByTitle(movie.title, movie.year);
        
        // Show a temporary loading message
        alert("Searching for trailer. Please try the button again in a moment.");
      } else {
        alert("No trailer available for this movie");
      }
    }
  };

  const closeTrailer = () => {
    setShowTrailerModal(false);
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
              <button 
                className={`btn-primary ${isLoadingTrailer ? "loading" : ""}`} 
                onClick={openTrailer}
                disabled={isLoadingTrailer}
              >
                {isLoadingTrailer ? (
                  "Loading..."
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
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    {trailerKey ? "Watch Trailer" : "Find Trailer"}
                  </>
                )}
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

      {/* Trailer Modal */}
      {showTrailerModal && trailerKey && (
        <div className="trailer-modal">
          <div className="trailer-modal-content">
            <button className="close-trailer" onClick={closeTrailer}>
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="trailer-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;