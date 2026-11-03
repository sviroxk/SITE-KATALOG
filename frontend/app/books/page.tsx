import { EmptyCatalog } from '../../components/site/empty-catalog'

export default function BooksPage() {
  return <EmptyCatalog kind="book" title="Книги" description="Книжный каталог появится после подключения источника данных. Сейчас здесь нет вымышленных карточек и рейтингов." backHref="/" backLabel="К главной" />
}
