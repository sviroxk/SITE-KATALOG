# SITE KATALOG

Сайт-каталог для фильмов, игр и книг с персональной медиатекой и коллекциями.

## Функциональность

- **Каталоги:**
  - Фильмы и сериалы (TMDB API)
  - Игры (Steam/IGDB API)
  - Книги (Google Books API)

- **Личная библиотека:**
  - Хочу посмотреть / Смотрю / Просмотрено
  - Любимое / Отложено / Заброшено

- **Коллекции:**
  - Пользовательские плейлисты
  - Смешивание разных типов контента

- **Поиск и фильтрация:**
  - Полнотекстовый поиск по названию, жанрам, авторам
  - Фильтры по году, платформе, жанру

- **Профиль:**
  - Настройки
  - Статистика
  - Загрузка аватара

## Технологии

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Zustand, React Query
- **Backend:** Node.js, Express, PostgreSQL, Sequelize ORM
- **API:** TMDB, IGDB, Google Books
- **Auth:** JWT, NextAuth
- **CI/CD:** GitHub Actions

## Быстрый старт

```bash
# Клонировать репозиторий
git clone https://github.com/sviroxk/SITE-KATALOG.git

cd SITE_KATALOG

# Установить зависимости
npm install

# Переменная переменная окружения
# Редактировать .env.local в frontend/
# Завести TOML или .env в backend/

# Запустить проект
npm run dev
```

## Развертывание на GitHub Pages

Проект автоматически развертывается на GitHub Pages через GitHub Actions при каждом пуше в ветку `main`.

## Участие в разработке

[Вклад в GitHub](https://github.com/sviroxk/SITE-KATALOG)