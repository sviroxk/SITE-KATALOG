# SITE KATALOG

Каталог фильмов, сериалов, игр и книг с личной медиатекой и коллекциями. Проект постепенно реализуется по фазам; на текущем этапе настроены структура репозитория, локальный PostgreSQL и базовые страницы/healthcheck.

## Быстрый старт

Требуются Node.js и Docker с Compose.

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
docker compose up --pull always -d
npm install
npm run dev
```

Frontend: http://localhost:3000

Backend healthcheck: http://localhost:4000/health

PostgreSQL: `localhost:5432`

Локальные значения в `.env.example` предназначены только для разработки. Перед публикацией замените пароли/секреты и заполните нужные API-ключи в `backend/.env`. Не добавляйте `.env` файлы или реальные ключи в Git.

Чтобы запустить необязательный pgAdmin, задайте его пароль в `.env` и выполните `docker compose --profile tools up -d`.

## Скрипты

- `npm run dev` — frontend и backend параллельно.
- `npm run build` — production build frontend и проверка запуска backend.
- `npm run lint` — ESLint для рабочих пакетов.
- `npm run typecheck` — проверка TypeScript frontend и синтаксиса backend.
- `npm test` — тесты пакетов.
- `npm run db:migrate` и `npm run db:seed` — команды подготовлены для фазы схемы данных.

## Структура

```text
frontend/      Next.js App Router
backend/       Express API и Sequelize
 docs/         требования и проектная документация
.github/       GitHub Actions
docker-compose.yml
```

GitHub Pages не размещает Express API и PostgreSQL. Деплой полного приложения будет настроен отдельно после реализации API и схемы данных.
