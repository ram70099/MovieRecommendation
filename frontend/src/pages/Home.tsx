import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../types/movie";
import "../styles/Pages.css";

const API_URL = "https://movierecommendation-4336.onrender.com/";

const Home = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [allGenres, setAllGenres] = useState<string[]>([]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/movies`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      processMovieData(data);
    } catch (err: any) {
      console.error("Error fetching movies:", err);
      setError(t("errorFetchMovies") || "Failed to load movies.");
      setLoading(false);
    }
  };

  const fetchMoviesByGenre = async (genre: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/movies/genre/${genre}`);
      if (!response.ok) throw new Error(`Failed to fetch ${genre} movies`);
      const data = await response.json();
      processMovieData(data);
    } catch (err: any) {
      console.error(`Error fetching ${genre} movies:`, err);
      setError(t("errorFetchGenre", { genre }) || "Failed to load genre movies.");
      setLoading(false);
    }
  };

  const processMovieData = (data: any[]) => {
    const processedData: Movie[] = data
      .filter((movie: any) => !movie.Adult) // Filter out adult movies
      .map((movie: any) => ({
        id: movie.MovieID,
        title: movie.Title,
        overview: movie.Overview,
        releaseDate: movie["Release Date"],
        posterUrl: movie["Poster URL"],
        rating: parseFloat(movie.Rating),
        genres: movie.Genres ? movie.Genres.split(",").map((g: string) => g.trim()) : [],
        year: new Date(movie["Release Date"]).getFullYear(),
      }));

    setMovies(processedData);

    const genres = Array.from(
      new Set(processedData.flatMap((movie) => movie.genres))
    ).sort();

    setAllGenres(genres);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre);
  };

  const currentYear = new Date().getFullYear();
  const recentMovies = movies
    .filter((movie) => movie.year >= currentYear - 5)
    .sort((a, b) => b.year - a.year);

  if (loading) return <div>{t("loading") || "Loading movies..."}</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page">
      <h1 className="page-title">{t("home")}</h1>

      <section className="hero-section">
        <div className="hero-content">
          <h2>{t("welcome") || "Welcome to MovieLens"}</h2>
          <p>{t("homeTagline") || "Discover, track, and enjoy your favorite movies in one place."}</p>
        </div>
      </section>

      <section>
        <MovieGrid
          movies={recentMovies}
          title={`${t("recentReleases") || "Recent Releases"}${
            selectedGenre !== "All" ? ` - ${selectedGenre}` : ""
          }`}
          description={t("recentDescription") || "Movies from the last 5 years"}
          genres={allGenres}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
        />
      </section>
    </div>
  );
};

export default Home;
