import Image from "next/image"
import { Star, Heart, Gamepad2 } from "lucide-react"
import { Game } from "@/types"
import { useState } from "react"

interface GameCardProps {
  game: Game
  onAddToLibrary?: (gameId: number) => void
}

export const GameCard = ({ game, onAddToLibrary }: GameCardProps) => {
  const [isAdded, setIsAdded] = useState(false)
  const imageUrl = game.coverUrl ? game.coverUrl.replace('thumb', 'cover_big') : '/placeholder-game.jpg'
  const ratingColor = game.rating >= 8 ? "text-green-400" : game.rating >= 7 ? "text-yellow-400" : "text-red-400"

  const handleAddToLibrary = () => {
    onAddToLibrary?.(game.id)
    setIsAdded(true)
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={game.title}
        width={300}
        height={200}
        className="w-full aspect-video object-cover"
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
          {game.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
          <span>{game.releaseDate?.split('T')[0]}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span className={`${ratingColor} font-semibold`}>{game.rating?.toFixed(1)}</span>
          </span>
        </div>
        <div className="flex gap-2">
          {game.genres?.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 rounded-full bg-purple-900/50 text-purple-300 text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}