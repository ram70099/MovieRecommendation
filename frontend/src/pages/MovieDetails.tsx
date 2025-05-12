import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { movies } from '../data/mockData'
import { Movie } from '../types/movie'
import '../styles/MovieDetails.css'

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  
  // Similar movies based on genres
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])

  useEffect(() => {
    if (id) {
      const foundMovie = movies.find(m => m.id === parseInt(id))
      setMovie(foundMovie || null)
      
      if (foundMovie) {
        // Find movies with similar genres
        const similar = movies
          .filter(m => m.id !== foundMovie.id && m.genres.some(g => foundMovie.genres.includes(g)))
          .slice(0, 4)
        setSimilarMovies(similar)
      }
    }
  }, [id])

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist)
  }

  if (!movie) {
    return (
      <div className="page">
        <h1>Movie not found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="movie-details-page">
      <div className="movie-backdrop" style={{ backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})` }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="movie-header">
          <Link to="/" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back
          </Link>
        </div>
        
        <div className="movie-main-info">
          <div className="movie-poster-large">
            <img src={movie.posterUrl} alt={`${movie.title} poster`} />
          </div>
          
          <div className="movie-info-large">
            <h1>{movie.title} <span className="year">({movie.year})</span></h1>
            
            <div className="movie-meta">
              <div className="movie-rating-large">
                <span className="star">★</span>
                <span>{movie.rating.toFixed(1)}</span>
              </div>
              
              <div className="runtime">{movie.runtime || '120 min'}</div>
            </div>
            
            <div className="movie-genres-large">
              {movie.genres.map((genre, index) => (
                <span key={index} className="genre-badge">{genre}</span>
              ))}
            </div>
            
            <div className="movie-actions">
              <button className="btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Watch Trailer
              </button>
              
              <button 
                className={`btn-secondary ${isInWatchlist ? 'active' : ''}`}
                onClick={toggleWatchlist}
              >
                {isInWatchlist ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available for this movie.'}</p>
            </div>
            
            <div className="movie-credits">
              <div className="credit-group">
                <h4>Director</h4>
                <p>{movie.director || 'Unknown'}</p>
              </div>
              
              <div className="credit-group">
                <h4>Cast</h4>
                <p>{movie.cast?.join(', ') || 'Cast information not available'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {similarMovies.length > 0 && (
          <div className="similar-movies">
            <h3>Similar Movies</h3>
            <div className="similar-movies-grid">
              {similarMovies.map(similar => (
                <Link to={`/movie/${similar.id}`} key={similar.id} className="similar-movie-card">
                  <img src={similar.posterUrl} alt={`${similar.title} poster`} />
                  <div className="similar-movie-info">
                    <h4>{similar.title}</h4>
                    <div className="similar-movie-meta">
                      <span>{similar.year}</span>
                      <span className="similar-rating">
                        <span className="star">★</span>
                        {similar.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails