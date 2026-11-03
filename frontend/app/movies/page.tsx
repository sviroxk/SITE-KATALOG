import { EmptyCatalog } from '../../components/site/empty-catalog'

export default function MoviesPage() {
  return <EmptyCatalog kind="movie" title="Кино и сериалы" description="Раздел для фильмов и сериалов. Источник каталога и карточки произведений ещё не подключены." backHref="/" backLabel="К главной" />
}
