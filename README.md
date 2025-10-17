# Cinema Web (Nuxt 4)

Веб-приложение для бронирования билетов в кино.

## Требования
- Node.js 20+
- PNPM 9+ (или npm/yarn)

## Установка
```bash
pnpm install
# или npm install
# или yarn install

Создайте .env с API URI:
API_URI=https://api.example.com

Скрипты
pnpm dev          # запуск dev-сервера
pnpm build        # сборка продакшн
pnpm preview      # предпросмотр сборки
pnpm test         # запуск всех тестов
pnpm test:watch   # тесты в режиме наблюдения
pnpm test:ui      # UI Vitest

Структура
pages/ — маршруты
components/ — UI-компоненты
composables/ — переиспользуемая логика
api/ — функции для работы с backend
store/ — стор-модули
assets/scss/ — стили
tests/ — unit-тесты

Запуск
pnpm dev
