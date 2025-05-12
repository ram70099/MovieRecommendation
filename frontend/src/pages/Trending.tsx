import MovieGrid from '../components/MovieGrid'
import { movies } from '../data/mockData'

const Trending = () => {
  // Sort by a combination of rating and recency to get "trending" movies
  const trendingMovies = [...movies]
    .sort((a, b) => (b.rating * 0.7 + b.year * 0.3) - (a.rating * 0.7 + a.year * 0.3))
    .slice(0, 10)

  return (
    <div className="page">
      <h1 className="page-title">Trending</h1>
      
      <MovieGrid 
        movies={trendingMovies} 
        title="Trending Now" 
        description="Popular movies everyone's watching"
      />
    </div>
  )
}

export default Trending