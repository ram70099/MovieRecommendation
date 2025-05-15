export interface Movie {
  id: number
  title: string
  overview: string
  releaseDate: string
  posterUrl: string
  rating: number
  genres: string[]
  year: number
  backdropUrl?: string
  director?: string
  cast?: string[]
  runtime?: number
}
