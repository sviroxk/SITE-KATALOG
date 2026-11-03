import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Film, Gamepad2, Book, Star, User } from "lucide-react"

export const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            SITE KATALOG
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/movies" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Film className="w-4 h-4" />
              Фильмы
            </Link>
            <Link href="/games" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Gamepad2 className="w-4 h-4" />
              Игры
            </Link>
            <Link href="/books" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Book className="w-4 h-4" />
              Книги
            </Link>
            <Link href="/library" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Star className="w-4 h-4" />
              Библиотека
            </Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Выйти
              </button>
            ) : (
              <Link href="/api/auth/signin" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}