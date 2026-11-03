import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  initialValue?: string
}

export const SearchBar = ({ onSearch, initialValue }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue || '')
  const router = useRouter()

  useEffect(() => {
    setQuery((router.query.search as string) || '')
  }, [router.query.search])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
      router.push({ query: { search: query.trim() } }, undefined, { shallow: true })
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
    router.push({ query: { ...router.query, search: undefined } }, undefined, { shallow: true })
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-2xl mx-auto mb-6"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов, игр, книг..."
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}