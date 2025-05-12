import { Link } from 'react-router-dom'
import { Movie } from '../types/movie'
import '../styles/MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="movie-poster">
          <img src={movie.posterUrl} alt={`${movie.title} poster`} />
          <div className="movie-rating">
            <span className="star">★</span>
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-year">{movie.year}</div>
          <div className="movie-genres">
            {movie.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard