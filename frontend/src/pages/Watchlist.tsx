import { useState } from 'react'
import MovieGrid from '../components/MovieGrid'
import { movies } from '../data/mockData'

// In a real app, this would come from user data
const initialWatchlist = movies.slice(0, 3)

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId))
  }

  return (
    <div className="page">
      <h1 className="page-title">Watchlist</h1>
      
      {watchlist.length > 0 ? (
        <MovieGrid 
          movies={watchlist} 
          title="Your Watchlist" 
          description={`${watchlist.length} movies you want to watch`}
        />
      ) : (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3>Your watchlist is empty</h3>
          <p>Movies you add to your watchlist will appear here</p>
        </div>
      )}
    </div>
  )
}

export default Watchlist