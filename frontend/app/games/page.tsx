import { GameController } from "@/lib/api"
import { GameCard } from "@/components/game-card"
import { SearchBar } from "@/components/search-bar"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function GamesPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { search, genre, platform } = router.query

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search as string)
        if (genre) params.append('genre', genre as string)
        if (platform) params.append('platform', platform as string)

        const response = await fetch(`/api/games?${params.toString()}`)
        const data = await response.json()
        setGames(data)
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [search, genre, platform])

  const handleAddToLibrary = async (gameId: number) => {
    try {
      await fetch('/api/user/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId })
      })
      setGames(prev => prev.map(g => g.id === gameId ? { ...g, isInLibrary: true } : g))
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
            <option value="RPG">RPG</option>
            <option value="Экшен">Экшен</option>
            <option value="Стратегия">Стратегия</option>
            <option value="Гонки">Гонки</option>
            <option value="Приключения">Приключения</option>
          </select>
          <select
            value={platform || ''}
            onChange={(e) => router.push({ query: { ...router.query, platform: e.target.value || undefined } })}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Все платформы</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo">Nintendo</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Игры не найдены</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onAddToLibrary={handleAddToLibrary}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}