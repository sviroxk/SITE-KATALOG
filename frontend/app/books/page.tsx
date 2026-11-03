import { BookController } from "@/lib/api"
import { BookCard } from "@/components/book-card"
import { SearchBar } from "@/components/search-bar"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { search, genre, author } = router.query

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search as string)
        if (genre) params.append('genre', genre as string)
        if (author) params.append('author', author as string)

        const response = await fetch(`/api/books?${params.toString()}`)
        const data = await response.json()
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [search, genre, author])

  const handleAddToLibrary = async (bookId: number) => {
    try {
      await fetch('/api/user/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId })
      })
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, isInLibrary: true } : b))
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
            <option value="Детектив">Детектив</option>
            <option value="Биография">Биография</option>
            <option value="История">История</option>
            <option value="Манга">Манга</option>
          </select>
          <input
            type="text"
            placeholder="Автор..."
            value={author || ''}
            onChange={(e) => router.push({ query: { ...router.query, author: e.target.value || undefined } })}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Книги не найдены</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onAddToLibrary={handleAddToLibrary}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}