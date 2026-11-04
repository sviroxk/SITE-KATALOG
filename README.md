# VEYRA

Бренд продукта — VEYRA. GitHub-репозиторий и URL GitHub Pages сохранены без переименования.

**Открыть VEYRA:** [sviroxk.github.io/SITE-KATALOG](https://sviroxk.github.io/SITE-KATALOG/) · [GitHub-репозиторий](https://github.com/sviroxk/SITE-KATALOG)

VEYRA — личная медиа-вселенная фильмов, сериалов, игр и книг. Статический frontend публикуется на GitHub Pages; API и пользовательские функции подключаются поэтапно.

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
- `npm run build` — production static export frontend в `frontend/out/`.
- `npm run build:all` — проверка backend и production build frontend.
- `npm run lint` — ESLint для рабочих пакетов.
- `npm run typecheck` — проверка TypeScript frontend и синтаксиса backend.
- `npm test` — тесты пакетов.
- `npm run db:migrate` и `npm run db:seed` — команды базы данных будут реализованы вместе со схемой данных.

## Структура

```text
frontend/      Next.js App Router
backend/       Express API и Sequelize
docs/          требования и проектная документация
.github/       GitHub Actions
docker-compose.yml
```

Frontend публикуется на GitHub Pages как статический экспорт через GitHub Actions; Supabase используется как публичный backend с обязательными RLS policies. GitHub Pages не запускает Express API или PostgreSQL. Инструкция, Pages settings и Supabase variables описаны в [docs/DEPLOY.md](docs/DEPLOY.md).
