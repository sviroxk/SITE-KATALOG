import Image from "next/image"
import { Heart, Share, Edit, Trash } from "lucide-react"
import { useState } from "react"

interface CollectionCardProps {
  collection: any
  onAddItem?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onShare?: () => void
}

export const CollectionCard = ({ collection, onAddItem, onEdit, onDelete, onShare }: CollectionCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(collection.name)
  const [editDescription, setEditDescription] = useState(collection.description)

  const imageUrl = collection.coverImage || '/placeholder-collection.jpg'
  const isPublicColor = collection.isPublic ? 'bg-green-500' : 'bg-gray-600'

  const handleSaveEdit = () => {
    // Сохранить изменения через API
    setIsEditing(false)
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <Image
        src={imageUrl}
        alt={collection.name}
        width={300}
        height={200}
        className="w-full aspect-video object-cover"
      />
      <div className="absolute top-2 right-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isPublicColor} text-white">
          {collection.isPublic ? 'Публичная' : 'Личная'}
        </span>
      </div>
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 min-h-[60px]"
            />
            <div className="flex gap-2">
              <button onClick={handleSaveEdit} className="px-4 py-2 rounded bg-blue-600 text-white">Сохранить</button>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded bg-gray-600 text-white">Отмена</button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
              {collection.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">
              {collection.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={onAddItem}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                + Добавить
              </button>
              <button
                onClick={onShare}
                className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Share className="w-4 h-4" />
              </button>
              <button
                onClick={onEdit}
                className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}