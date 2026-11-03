import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"
import { MovieCatalog } from "@/components/movie-catalog"
import { GameCatalog } from "@/components/game-catalog"
import { BookCatalog } from "@/components/book-catalog"
import { SearchBar } from "@/components/search-bar"
import { Navbar } from "@/components/navbar"

export default async function HomePage() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <SearchBar />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MovieCatalog />
            <GameCatalog />
            <BookCatalog />
          </div>
        </main>
      </div>
    </SessionProvider>
  )
}