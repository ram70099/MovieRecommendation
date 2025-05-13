import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/movie";
import "../styles/MovieDetails.css";

// localStorage keys - same as in MovieDetails
const WATCHLIST_KEY = "movie-app-watchlist";
const FAVORITES_KEY = "movie-app-favorites";

// Tabs enum
enum Tab {
  WATCHLIST = "watchlist",
  FAVORITES = "favorites",
  ALL = "all",
}

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ALL);

  // Load watchlist and favorites from localStorage when component mounts
  useEffect(() => {
    const loadMovieData = () => {
      try {
        // Load watchlist
        const watchlistData = localStorage.getItem(WATCHLIST_KEY);
        const loadedWatchlist = watchlistData ? JSON.parse(watchlistData) : [];
        setWatchlist(loadedWatchlist);

        // Load favorites
        const favoritesData = localStorage.getItem(FAVORITES_KEY);
        const loadedFavorites = favoritesData ? JSON.parse(favoritesData) : [];
        setFavorites(loadedFavorites);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };

    loadMovieData();
  }, []);

  const removeFromWatchlist = (movieId: number) => {
    try {
      // Remove from state
      const updatedWatchlist = watchlist.filter(
        (movie) => movie.id !== movieId
      );
      setWatchlist(updatedWatchlist);

      // Update localStorage
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist));
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  const removeFromFavorites = (movieId: number) => {
    try {
      // Remove from state
      const updatedFavorites = favorites.filter(
        (movie) => movie.id !== movieId
      );
      setFavorites(updatedFavorites);

      // Update localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
    }
  };

  // Function to move movie between lists
  const moveMovie = (
    movie: Movie,
    fromList: "watchlist" | "favorites",
    toList: "watchlist" | "favorites"
  ) => {
    try {
      // Remove from source list
      if (fromList === "watchlist") {
        removeFromWatchlist(movie.id);
      } else {
        removeFromFavorites(movie.id);
      }

      // Add to target list
      if (toList === "watchlist") {
        const newWatchlist = [...watchlist, movie];
        setWatchlist(newWatchlist);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
      } else {
        const newFavorites = [...favorites, movie];
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error("Error moving movie between lists:", error);
    }
  };

  const clearAll = () => {
    localStorage.removeItem(WATCHLIST_KEY);
    localStorage.removeItem(FAVORITES_KEY);
    setWatchlist([]);
    setFavorites([]);
  };

  const renderTabs = () => (
    <div
      className="tabs"
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() => setActiveTab(Tab.ALL)}
        className={`tab ${activeTab === Tab.ALL ? "active" : ""}`}
        style={{
          padding: "10px 20px",
          margin: "0 5px",
          backgroundColor: activeTab === Tab.ALL ? "#0f172a" : "#334155",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab(Tab.WATCHLIST)}
        className={`tab ${activeTab === Tab.WATCHLIST ? "active" : ""}`}
        style={{
          padding: "10px 20px",
          margin: "0 5px",
          backgroundColor: activeTab === Tab.WATCHLIST ? "#0f172a" : "#334155",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Watchlist ({watchlist.length})
      </button>
      <button
        onClick={() => setActiveTab(Tab.FAVORITES)}
        className={`tab ${activeTab === Tab.FAVORITES ? "active" : ""}`}
        style={{
          padding: "10px 20px",
          margin: "0 5px",
          backgroundColor: activeTab === Tab.FAVORITES ? "#0f172a" : "#334155",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Favorites ({favorites.length})
      </button>
    </div>
  );

  const renderWatchlistContent = () => {
    if (watchlist.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="72"
              height="72"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>Your watchlist is empty</h3>
          <p>Movies you want to watch will appear here</p>
        </div>
      );
    }

    return (
      <MovieGrid
        movies={watchlist}
        title="Your Watchlist"
        description={`${watchlist.length} movies you want to watch`}
      />
    );
  };

  const renderFavoritesContent = () => {
    if (favorites.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="72"
              height="72"
              fill="#ff6b6b"
              stroke="none"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3>Your favorites list is empty</h3>
          <p>Movies you love will appear here</p>
        </div>
      );
    }

    return (
      <MovieGrid
        movies={favorites}
        title="Your Favorites"
        description={`${favorites.length} movies you love`}
      />
    );
  };

  const renderContent = () => {
    if (watchlist.length === 0 && favorites.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="72"
              height="72"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>No saved movies</h3>
          <p>Movies you add to your watchlist or favorites will appear here</p>
          <Link to="/" className="btn-primary" style={{ marginTop: "20px" }}>
            Browse Movies
          </Link>
        </div>
      );
    }

    switch (activeTab) {
      case Tab.WATCHLIST:
        return renderWatchlistContent();
      case Tab.FAVORITES:
        return renderFavoritesContent();
      case Tab.ALL:
      default:
        return (
          <>
            {watchlist.length > 0 && (
              <div className="section" style={{ marginBottom: "40px" }}>
                {renderWatchlistContent()}
              </div>
            )}

            {favorites.length > 0 && (
              <div className="section">{renderFavoritesContent()}</div>
            )}
          </>
        );
    }
  };

  return (
    <div className="page">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="page-title">My Movies</h1>

        {(watchlist.length > 0 || favorites.length > 0) && (
          <button
            className="btn-secondary"
            onClick={clearAll}
            style={{ padding: "8px 16px" }}
          >
            Clear All
          </button>
        )}
      </div>

      {(watchlist.length > 0 || favorites.length > 0) && renderTabs()}

      {renderContent()}
    </div>
  );
};

export default Watchlist;
