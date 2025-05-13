import { useState, useEffect } from 'react'
import '../styles/SearchBar.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
  liveSearch?: boolean
}

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search movies...', 
  initialValue = '',
  liveSearch = false
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  // Update local state if initialValue prop changes
  useEffect(() => {
    setSearchQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchQuery(newValue)
    
    // If liveSearch is enabled, trigger the search immediately
    if (liveSearch) {
      onSearch(newValue)
    }
  }

  const handleClear = () => {
    setSearchQuery('')
    onSearch('')
  }

  return (
    <form 
      className={`search-bar ${liveSearch ? 'live-search' : ''}`} 
      onSubmit={handleSubmit}
    >
      <div className="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
      />
      {searchQuery && (
        <button 
          type="button" 
          className="clear-button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
      {!liveSearch && (
        <button type="submit" className="search-button">Search</button>
      )}
    </form>
  )
}

export default SearchBar