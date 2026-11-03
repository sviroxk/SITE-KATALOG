import { EmptyCatalog } from '../../components/site/empty-catalog'

export default function LibraryPage() {
  return <EmptyCatalog kind="library" title="Твоя медиатека" description="Личные статусы, избранное и прогресс появятся после подключения аутентификации и базы данных Supabase." backHref="/" backLabel="Вернуться к исследованию" />
}
