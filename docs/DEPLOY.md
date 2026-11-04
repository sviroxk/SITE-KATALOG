# Деплой VEYRA на GitHub Pages

Пользовательское название сайта — VEYRA. GitHub-репозиторий остаётся `sviroxk/SITE-KATALOG`; сайт публикуется как статический экспорт Next.js по адресу `https://<owner>.github.io/SITE-KATALOG/`. GitHub Pages размещает только frontend-файлы. Express/PostgreSQL на Pages не запускаются; frontend должен обращаться к публичному backend/API или Supabase.

## Supabase client и Auth Redirect URLs

Установлены `@supabase/supabase-js` и `@supabase/ssr`; frontend использует браузерный `createBrowserClient` helper. URL и публичный publishable key берутся из `frontend/.env.local` в разработке или из GitHub Actions Variables при deploy. В Supabase Authentication → URL Configuration задайте Site URL `https://<owner>.github.io/SITE-KATALOG/` и Redirect URL `http://localhost:3000/**`.

Регистрация, пользовательские таблицы и приватная библиотека пока не подключены к UI; сначала примените Supabase SQL и RLS policies, затем auth/library-функции следующими фазами.

## 1. Создать Supabase-проект и применить схему

1. Создайте проект в Supabase и сохраните Project URL.
2. Примените SQL-схему и политики Row Level Security (RLS) к таблицам, доступным из браузера.
3. Включите RLS и задайте минимальные политики для каждой таблицы до публикации данных.
4. Для дальнейших миграций используйте локально `supabase db push` после проверки diff и подключения к нужному проекту.
5. Не помещайте `service_role` key в frontend, GitHub Pages workflow, Git или публичные переменные. В клиент разрешено передавать только публичный anon/publishable key; защита данных обеспечивается RLS.

## 2. Задать GitHub Actions variables/secrets

Откройте репозиторий **Settings → Secrets and variables → Actions** и добавьте:

| Имя | Тип | Значение |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Variable | Project URL Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Variable | Публичный publishable key (или anon key), никогда не `service_role` |
| `NEXT_PUBLIC_TMDB_KEY` | Variable | Ключ TMDB; он будет доступен браузеру, если задан |
| `NEXT_PUBLIC_IGDB_PROXY_URL` | Variable | URL публичного proxy/API для IGDB; секрет Twitch client secret здесь не задавать |

Все `NEXT_PUBLIC_*` значения встраиваются в статические ресурсы и доступны посетителям сайта. Pull request CI builds use non-secret placeholder Supabase settings; actual project values are required only in the deployment workflow. Для Supabase задавайте только publishable/anon key и защищайте данные RLS-политиками. Не задавайте пароли, service-role/API секреты или иные закрытые credentials. Для отсутствующих необязательных интеграций оставьте variable незаданной.

`frontend/src/utils/supabase/client.ts` создаёт browser helper через `createBrowserClient` из `@supabase/ssr`; SDK управляет auth-сессией на клиенте. Серверный cookie helper и middleware не используются: они требуют server runtime и несовместимы с GitHub Pages static export.

## 3. Включить GitHub Pages через Actions

В репозитории откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**. Не выбирайте **Deploy from a branch**.

## 4. Запустить деплой

Слейте проверенный PR в `main` либо запустите workflow вручную во вкладке **Actions → Deploy GitHub Pages → Run workflow**. Workflow устанавливает Node.js из `.nvmrc`, запускает lint/typecheck/tests/build, загружает `frontend/out/` и публикует Pages artifact. Откройте вкладку **Actions**, дождитесь успешных `build` и `deploy`, затем перейдите по ссылке GitHub Pages.

Static export использует `output: 'export'`, `basePath` и `assetPrefix` `/SITE-KATALOG`, `trailingSlash: true`, а Next Image Optimization выключена. Серверные маршруты Next.js, middleware, runtime API и Express backend в Pages не работают.

## Миграции базы данных отдельно от деплоя

Автоматический Pages workflow не запускает миграции. Используйте локальный Supabase CLI (`supabase db push`) или отдельный защищённый ручной workflow с `workflow_dispatch` и `SUPABASE_ACCESS_TOKEN`, если это будет добавлено отдельно. Никогда не добавляйте этот токен в workflow статического frontend deploy.

## Если деплой упал

- **Build не находит env:** проверьте имена variables/secrets и что требуемые значения заданы для Actions.
- **Неправильные JS/CSS или 404 на ресурсах:** проверьте, что `basePath` и `assetPrefix` равны `/SITE-KATALOG`, а Pages настроен на Actions.
- **404 на вложенной странице:** статический export использует trailing slash; проверьте URL со слешем и наличие сгенерированного маршрута в `out/`.
- **Workflow не запускается:** убедитесь, что commit попал в `main`, либо запустите `workflow_dispatch`; проверьте вкладку Actions и разрешения репозитория Pages.
- **Supabase отвечает 401/403:** проверьте публичный anon key, project URL и RLS policies. Не заменяйте anon key на `service_role`.
- **TMDB/IGDB запросы не работают:** убедитесь, что браузерный API доступен из интернета и разрешает CORS. IGDB OAuth/client secret должен оставаться на серверном proxy.
- **Нужно изменить схему БД:** проверьте миграционный diff и примените его отдельно через Supabase CLI; frontend deploy БД не меняет.
