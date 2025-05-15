export interface Movie {
  id: number
  title: string
  overview: string
  releaseDate: string
  posterUrl: string
  rating: number
  genres: string[]
  year: number
  backdropUrl?: string // 👈 Add this line
}
