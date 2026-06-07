# MyZEN

SaaS-конструктор страниц: Symfony 7 + React (Vite) + PostgreSQL.

## Быстрый старт

**Нужно:** Docker, Docker Compose.

```bash
# 1. Клонировать и перейти в проект
git clone <repo-url> myzen && cd myzen

# 2. Окружение
cp .env.example .env
# Заполните GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET (для входа)

# 3. Поднять контейнеры
docker compose up -d

# 4. PHP-зависимости и миграции
docker compose exec php composer install
docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction

# 5. Frontend
docker compose --profile tools run --rm node npm install
docker compose --profile tools run --rm node npm run build
```

Открыть: **http://localhost:8080**

## Полезные команды

```bash
# Логи
docker compose logs -f

# Пересборка фронта после изменений
docker compose --profile tools run --rm node npm run build

# Dev-сервер Vite (опционально)
docker compose --profile tools run --rm -p 5173:5173 node npm run dev

# Остановить
docker compose down
```

## OAuth (Google)

Redirect URI в Google Cloud Console:

```
http://localhost:8080/connect/google/check
```

Аналогично для Facebook/Apple — см. `.env.example`.

## AI-конструктор

В `.env` добавьте `OPENAI_API_KEY` — без ключа работает демо-режим.

## Структура

| URL | Описание |
|-----|----------|
| `/` | Лендинг |
| `/login` | Вход |
| `/admin` | Админка |
| `/admin/designer` | AI-конструктор |

Стек: PHP 8.3, Nginx, PostgreSQL 16, React 19, Vite.
