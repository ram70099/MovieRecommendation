import { useState, useEffect } from 'react'
import MovieGrid from '../components/MovieGrid'
import { Movie } from '../types/movie'
import '../styles/Pages.css'

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/movies/random')
        if (!response.ok) throw new Error('Failed to fetch movies')
        const data = await response.json()
        const processedData: Movie[] = data.map((movie: any) => ({
          id: movie.MovieID,
          title: movie.Title,
          overview: movie.Overview,
          releaseDate: movie['Release Date'],
          posterUrl: movie['Poster URL'],
          rating: parseFloat(movie.Rating),
          genres: movie.Genres ? movie.Genres.split(',').map((g: string) => g.trim()) : [],
          year: new Date(movie['Release Date']).getFullYear(),
        }))
        setMovies(processedData)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  // Classify recent movies
  const currentYear = new Date().getFullYear()
  const recentMovies = movies
    .filter(movie => movie.year >= currentYear - 3)
    .sort((a, b) => b.year - a.year)

  if (loading) return <div>Loading movies...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="page">
      <h1 className="page-title">Home</h1>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to MovieLens</h2>
          <p>Discover, track, and enjoy your favorite movies in one place.</p>
        </div>
      </section>

      <section>
        <MovieGrid
          movies={recentMovies}
          title="Recent Releases"
          description="Movies from the last 3 years"
        />
      </section>
    </div>
  )
}

export default Home
