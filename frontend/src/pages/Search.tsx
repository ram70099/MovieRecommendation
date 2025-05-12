import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import { movies } from '../data/mockData'

const Search = () => {
  const [searchResults, setSearchResults] = useState(movies)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (query: string) => {
    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
    )
    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <div className="page">
      <h1 className="page-title">Search</h1>
      
      <div className="search-container">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search by title, genre, or actor..."
        />
      </div>
      
      {hasSearched && (
        <MovieGrid 
          movies={searchResults} 
          title="Search Results" 
          description={`Found ${searchResults.length} movies`}
        />
      )}
      
      {!hasSearched && (
        <div className="search-placeholder">
          <div className="search-illustration">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3>Search for your favorite movies</h3>
          <p>Use the search bar above to find movies by title, genre, or actor</p>
        </div>
      )}
    </div>
  )
}

export default Search