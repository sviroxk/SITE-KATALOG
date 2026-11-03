import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CollectionController } from "@/lib/api"
import { CollectionCard } from "@/components/collection-card"
import { MovieCard } from "@/components/movie-card"
import { GameCard } from "@/components/game-card"
import { BookCard } from "@/components/book-card"

export default function CollectionsPage() {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [collections, setCollections] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [collectionItems, setCollectionItems] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { collectionId } = router.query

  useEffect(() => {
    if (!userId) return
    fetchCollections()
    if (collectionId) fetchCollectionItems()
  }, [userId, collectionId])

  const fetchCollections = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/collections/${userId}`)
      const data = await response.json()
      setCollections(data)
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCollectionItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/collections/${collectionId}/items`)
      const data = await response.json()
      setCollectionItems(data)
      const collection = collections.find(c => c.id === parseInt(collectionId))
      setSelectedCollection(collection)
    } catch (error) {
      console.error('Error fetching collection items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCollection = async () => {
    const name = prompt('Название коллекции:')
    if (!name) return
    try {
      const response = await fetch(`/api/collections/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const collection = await response.json()
      setCollections([...collections, collection])
    } catch (error) {
      console.error('Error creating collection:', error)
    }
  }

  const handleAddItemToCollection = async (item) => {
    if (!selectedCollection) {
      const collectionName = prompt('Создать новую коллекцию или выбрать существующую?')
      if (!collectionName) return
      // Создать новую коллекцию
      const response = await fetch(`/api/collections/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: collectionName })
      })
      const newCollection = await response.json()
      setSelectedCollection(newCollection)
      setCollections([...collections, newCollection])
    }

    try {
      await fetch(`/api/collections/${selectedCollection.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [item.type + 'Id']: item.id })
      })
      setCollectionItems([...collectionItems, { ...item, id: Date.now() }])
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await fetch(`/api/collection-items/${itemId}`, {
        method: 'DELETE'
      })
      setCollectionItems(collectionItems.filter(i => i.id !== itemId))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Коллекции</h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleCreateCollection}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Новая коллекция
            </button>
            <div className="flex gap-2">
              {collections.map(collection => (
                <button
                  key={collection.id}
                  onClick={() => router.push({ query: { collectionId: collection.id } })}
                  className={`px-3 py-1 rounded-lg transition-colors ${selectedCollection?.id === collection.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}"}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedCollection && (
          <>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{selectedCollection.name}</h2>
              <p className="text-gray-400">{selectedCollection.description}</p>
              <div className="flex gap-2 mt-3">
                <span className={`px-2 py-1 rounded-full text-xs ${selectedCollection.isPublic ? 'bg-green-500' : 'bg-gray-600'} text-white">
                  {selectedCollection.isPublic ? 'Публичная' : 'Личная'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collectionItems.map(item => {
                const CardComponent = item.movieId ? MovieCard : item.gameId ? GameCard : BookCard
                return (
                  <div key={item.id} className="relative group">
                    <CardComponent
                      item={item}
                      onAddToLibrary={handleAddItemToCollection}
                    />
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {!selectedCollection && collections.length > 0 && (
          <div className="text-center py-8 text-gray-400">
            Выберите коллекцию для просмотра
          </div>
        )}
      </div>
    </div>
  )
}