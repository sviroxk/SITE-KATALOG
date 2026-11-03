import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { Book } from "@/types"
import { useState } from "react"

interface BookCardProps {
  book: Book
  onAddToLibrary?: (bookId: number) => void
}

export const BookCard = ({ book, onAddToLibrary }: BookCardProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const imageUrl = book.coverUrl ? book.coverUrl.replace('http://', 'https://') : '/placeholder-book.jpg'
  const ratingColor = book.rating >= 4.5 ? "text-green-400" : book.rating >= 4 ? "text-yellow-400" : "text-red-400"

  const handleAddToLibrary = () => {
    onAddToLibrary?.(book.id)
    setIsAdded(true)
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={book.title}
        width={200}
        height={300}
        className="w-full aspect-[2/3] object-cover"
      />
      <div className="absolute top-2 right-2">
        <button
          onClick={handleAddToLibrary}
          className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all ${isAdded ? 'bg-green-500' : 'hover:bg-white/20'}"}
        >
          <Heart className={`w-5 h-5 ${isAdded ? 'text-white' : 'text-gray-300'}" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">
          {book.authors?.join(', ')}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
          <span>{book.publicationDate?.split('T')[0]}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span className={`${ratingColor} font-semibold`}>{book.rating?.toFixed(1)}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {book.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 rounded-full bg-orange-900/50 text-orange-300 text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}