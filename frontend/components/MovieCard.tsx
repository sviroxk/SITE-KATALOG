import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { Movie } from "@/types"
import { useState } from "react"

interface MovieCardProps {
  movie: Movie
  onAddToLibrary?: (movieId: number) => void
}

export const MovieCard = ({ movie, onAddToLibrary }: MovieCardProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.posterPath}`
  const ratingColor = movie.rating >= 7.5 ? "text-green-400" : movie.rating >= 6 ? "text-yellow-400" : "text-red-400"

  const handleAddToLibrary = () => {
    onAddToLibrary?.(movie.id)
    setIsAdded(true)
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={movie.title}
        width={300}
        height={450}
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
          {movie.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
          <span>{movie.releaseDate?.split('T')[0]}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span className={`${ratingColor} font-semibold`}>{movie.rating?.toFixed(1)}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {movie.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}