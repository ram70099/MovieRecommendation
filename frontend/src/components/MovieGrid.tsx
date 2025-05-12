import { useState } from 'react'
import MovieCard from './MovieCard'
import { Movie } from '../types/movie'
import '../styles/MovieGrid.css'

interface MovieGridProps {
  movies: Movie[]
  title: string
  description?: string
}

const MovieGrid = ({ movies, title, description }: MovieGridProps) => {
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating'>('title')
  const [filterValue, setFilterValue] = useState('')

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'title' | 'year' | 'rating')
  }

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(filterValue.toLowerCase()) ||
    movie.genres.some(genre => genre.toLowerCase().includes(filterValue.toLowerCase()))
  )

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'year') return b.year - a.year
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="movie-grid-container">
      <div className="movie-grid-header">
        <div className="header-info">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <div className="header-controls">
          <div className="search-control">
            <div className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Filter movies..." 
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>
          <div className="sort-control">
            <label>Sort by:</label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
      <div className="movie-grid">
        {sortedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid