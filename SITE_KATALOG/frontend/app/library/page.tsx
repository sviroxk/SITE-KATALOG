import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { LibraryController } from "@/lib/api"
import { MovieCard } from "@/components/movie-card"
import { GameCard } from "@/components/game-card"
import { BookCard } from "@/components/book-card"

export default function LibraryPage() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    if (!userId) return
    fetchLibrary()
  }, [userId, status, activeTab])

  const fetchLibrary = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/user/${userId}/library?type=${activeTab}${status ? `&status=${status}` : ''}`)
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching library:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (newStatus: string) => {
    router.push({ query: { status: newStatus } }, undefined, { shallow: true })
  }

  const handleAddToLibrary = async (item: any) => {
    try {
      await fetch(`/api/user/${userId}/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [item.type + 'Id']: item.id, status: 'want_to_watch' })
      })
      setItems(prev => [...prev, { ...item, id: Date.now(), status: 'want_to_watch' }])
    } catch (error) {
      console.error('Error adding to library:', error)
    }
  }

  const tabs = [
    { key: 'all', label: 'Все' },
    { key: 'movie', label: 'Фильмы' },
    { key: 'game', label: 'Игры' },
    { key: 'book', label: 'Книги' }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Моя библиотека</h1>
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          {['want_to_watch', 'watching', 'watched', 'favorite', 'postponed', 'abandoned'].map(statusOption => (
            <button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${status === statusOption ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"}
            >
              {statusOption === 'want_to_watch' ? 'Хочу посмотреть' : statusOption === 'watching' ? 'Смотрю' : statusOption === 'watched' ? 'Просмотрено' : statusOption === 'favorite' ? 'Любимое' : statusOption === 'postponed' ? 'Отложено' : 'Заброшено'}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Библиотека пуста</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => {
              const CardComponent = item.movieId ? MovieCard : item.gameId ? GameCard : BookCard
              return (
                <div key={item.id} className="relative">
                  <CardComponent
                    item={item}
                    onAddToLibrary={handleAddToLibrary}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs">
                      {item.status === 'want_to_watch' ? 'Хочу' : item.status === 'watching' ? 'Смотрю' : item.status === 'watched' ? 'Просмотрено' : item.status === 'favorite' ? 'Любимое' : item.status === 'postponed' ? 'Отложено' : 'Заброшено'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}