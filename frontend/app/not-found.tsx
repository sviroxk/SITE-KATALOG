import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <p>VEYRA · 404</p>
      <h1>Страница не найдена</h1>
      <p>Запрошенная страница отсутствует.</p>
      <Link href="/">На главную</Link>
    </main>
  )
}
