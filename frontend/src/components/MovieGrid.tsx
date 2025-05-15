import { useState } from 'react'
import MovieCard from './MovieCard'
import { Movie } from '../types/movie'
import '../styles/MovieGrid.css'

interface MovieGridProps {
  movies: Movie[]
  title: string
  description?: string
  genres?: string[]
  selectedGenre?: string
  onGenreChange?: (genre: string) => void
  // Optional enhancements:
  // loading?: boolean
  // maxDisplay?: number
}

const MovieGrid = ({
  movies,
  title,
  description,
  genres,
  selectedGenre,
  onGenreChange,
  // loading = false,
  // maxDisplay
}: MovieGridProps) => {
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating'>('title')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'title' | 'year' | 'rating')
  }

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'year':
        return b.year - a.year
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Optionally limit displayed movies
  // const visibleMovies = maxDisplay ? sortedMovies.slice(0, maxDisplay) : sortedMovies
  const visibleMovies = sortedMovies

  return (
    <div className="movie-grid-container">
      <div className="movie-grid-header">
        <div className="header-info">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>

        <div className="header-controls horizontal-row">
          {genres && selectedGenre !== undefined && onGenreChange && (
            <div className="genre-control">
              <label htmlFor="genre-select">Genre:</label>
              <select
                id="genre-select"
                value={selectedGenre}
                onChange={e => onGenreChange(e.target.value)}
              >
                <option value="All">All</option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="sort-control">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={handleSortChange}>
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* {loading ? (
        <p className="loading">Loading movies...</p>
      ) : ( */}
        <div className="movie-grid">
          {visibleMovies.length > 0 ? (
            visibleMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="no-movies">No movies found.</p>
          )}
        </div>
      {/* )} */}
    </div>
  )
}

export default MovieGrid
