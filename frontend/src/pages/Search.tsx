import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/movie"; // Assuming you have a Movie type defined

const API_URL = "https://movierecommendation-4336.onrender.com"; // Change this to your actual API URL

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search to prevent too many API calls
  useEffect(() => {
    // Skip search if query is too short
    if (searchQuery.trim().length < 2) {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        setHasSearched(false);
      }
      return;
    }

    // Set loading state immediately for better UX
    setIsLoading(true);

    // Create a debounce timer
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms delay while typing

    // Cleanup function to clear timer if component unmounts or searchQuery changes
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/movies/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();

      // Map the backend data format to your frontend Movie format
      const movies: Movie[] = data.map((item: any) => ({
        id: item.MovieID,
        title: item.Title,
        year:
          item.Year ||
          (item["Release Date"]
            ? new Date(item["Release Date"]).getFullYear()
            : undefined),
        genres: item.Genres
          ? item.Genres.split("|").map((g: string) => g.trim())
          : [],
        rating: item.Rating,
        posterUrl: item["Poster URL"],
        overview: item.Overview,
        releaseDate: item["Release Date"],
      }));

      setSearchResults(movies);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // This function handles input changes in the SearchBar
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // The actual search is triggered by the useEffect hook
  };

  return (
    <div className="page">
      <h1 className="page-title">Search</h1>

      <div className="search-container">
        <SearchBar
          onSearch={handleSearchChange}
          placeholder="Search by title, genre, or actor..."
          initialValue={searchQuery}
          liveSearch={true}
        />
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <p>Searching movies...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {hasSearched && !isLoading && searchResults.length > 0 && (
        <MovieGrid
          movies={searchResults}
          title="Search Results"
          description={`Found ${searchResults.length} movies`}
        />
      )}

      {hasSearched &&
        !isLoading &&
        searchResults.length === 0 &&
        searchQuery.trim().length >= 2 && (
          <div className="no-results">
            <p>No movies found for "{searchQuery}"</p>
          </div>
        )}

      {!hasSearched && !isLoading && (
        <div className="search-placeholder">
          <div className="search-illustration">
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3>Search for your favorite movies</h3>
          <p>Start typing to see results</p>
        </div>
      )}
    </div>
  );
};

export default Search;
