import { useState } from 'react'
import MovieGrid from '../components/MovieGrid'
import { movies } from '../data/mockData'

const Discover = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All')
  
  // Get unique genres from all movies
  const allGenres = Array.from(
    new Set(movies.flatMap(movie => movie.genres))
  ).sort()

  // Filter movies by selected genre
  const filteredMovies = selectedGenre === 'All' 
    ? movies 
    : movies.filter(movie => movie.genres.includes(selectedGenre))

  return (
    <div className="page">
      <h1 className="page-title">Discover</h1>
      
      <div className="genre-filter">
        <button 
          className={`genre-button ${selectedGenre === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedGenre('All')}
        >
          All
        </button>
        {allGenres.map(genre => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      
      <MovieGrid 
        movies={filteredMovies} 
        title={selectedGenre === 'All' ? 'All Movies' : `${selectedGenre} Movies`} 
        description={`Showing ${filteredMovies.length} movies`}
      />
    </div>
  )
}

export default Discover