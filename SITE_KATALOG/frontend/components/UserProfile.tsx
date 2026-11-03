import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { UserController } from "@/lib/api"

export const UserProfile = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({ movies: 0, games: 0, books: 0, collections: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')

  useEffect(() => {
    if (userId) {
      fetchUser()
      fetchStats()
    }
  }, [userId])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`)
      const data = await response.json()
      setUser(data)
      setEditName(data.name || '')
      setEditEmail(data.email || '')
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/stats`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName, email: editEmail })
      })
      const updated = await response.json()
      setUser(updated)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      const response = await fetch(`/api/user/${userId}/avatar`, {
        method: 'POST',
        body: formData
      })
      const updated = await response.json()
      setUser(updated)
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={user?.image || '/placeholder-avatar.jpg'}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full border-4 border-blue-600"
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name || 'Пользователь'}</h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="ml-auto px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Выйти
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Имя"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Сохранить
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded bg-gray-600 text-white"
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
            >
              Редактировать профиль
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.movies}</div>
            <div className="text-sm text-gray-400">Фильмов</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.games}</div>
            <div className="text-sm text-gray-400">Игр</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{stats.books}</div>
            <div className="text-sm text-gray-400">Книг</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.collections}</div>
            <div className="text-sm text-gray-400">Коллекций</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Изменить аватар</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="block w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 cursor-pointer"
            />
          </div>
        </div>
      </main>
    </div>
  )
}