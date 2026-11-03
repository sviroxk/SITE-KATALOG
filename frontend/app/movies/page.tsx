import { MovieController } from "@/lib/api"
import { MovieCard } from "@/components/movie-card"
import { SearchBar } from "@/components/search-bar"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { search, genre, year } = router.query

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search as string)
        if (genre) params.append('genre', genre as string)
        if (year) params.append('year', year as string)

        const response = await fetch(`/api/movies?${params.toString()}`)
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [search, genre, year])

  const handleAddToLibrary = async (movieId: number) => {
    try {
      await fetch('/api/user/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId })
      })
      // Обновить UI
      setMovies(prev => prev.map(m => m.id === movieId ? { ...m, isInLibrary: true } : m))
    } catch (error) {
      console.error('Error adding to library:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={(q) => router.push({ query: { search: q } })} />
        <div className="flex gap-4 mb-6">
          <select
            value={genre || ''}
            onChange={(e) => router.push({ query: { ...router.query, genre: e.target.value || undefined } })}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Все жанры</option>
            <option value="Фантастика">Фантастика</option>
            <option value="Драма">Драма</option>
            <option value="Комедия">Комедия</option>
            <option value="Триллер">Триллер</option>
            <option value="Ужасы">Ужасы</option>
            <option value="Боевик">Боевик</option>
          </select>
          <select
            value={year || ''}
            onChange={(e) => router.push({ query: { ...router.query, year: e.target.value || undefined } })}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Все годы</option>
            {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Фильмы не найдены</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToLibrary={handleAddToLibrary}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}