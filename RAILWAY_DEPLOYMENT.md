# Railway Deployment Guide

## Проблема и решение

**Проблема:** `Cannot find module '/app/backend/dist/main'`

**Причина:** TypeScript код не был скомпилирован в JavaScript перед запуском.

**Решение:** Настроили правильную сборку и конфигурацию для Railway.

## Что было исправлено

### 1. Скрипты сборки
- ✅ Добавлен `postinstall` скрипт для автоматической сборки
- ✅ Исправлен `start:prod` скрипт с правильным путем к файлу
- ✅ Добавлен `prisma:deploy` для production миграций

### 2. Конфигурация Railway
- ✅ Создан `railway.json` с правильными настройками
- ✅ Создан `Procfile` для Railway
- ✅ Настроен `main.ts` для работы с Railway (0.0.0.0)

### 3. Переменные окружения
Railway автоматически предоставляет:
- `DATABASE_URL` - для PostgreSQL
- `PORT` - для сервера
- `NODE_ENV=production`

## Настройка Railway

### 1. Подключение к GitHub
1. Зайдите на [Railway.app](https://railway.app)
2. Подключите ваш GitHub репозиторий
3. Выберите проект `portfolio-site-frontend`

### 2. Настройка переменных окружения
В Railway Dashboard добавьте:
```
FRONTEND_URL=https://your-frontend-domain.railway.app
```

### 3. Настройка базы данных
1. Добавьте PostgreSQL плагин в Railway
2. Railway автоматически создаст `DATABASE_URL`
3. При первом деплое запустятся миграции Prisma

### 4. Деплой
Railway автоматически:
1. Установит зависимости (`npm install`)
2. Соберет проект (`npm run build:backend`)
3. Запустит миграции (`prisma migrate deploy`)
4. Запустит сервер (`npm run start`)

## Проверка деплоя

После успешного деплоя:
- **API**: `https://your-app.railway.app`
- **Документация**: `https://your-app.railway.app/api`
- **Health Check**: `https://your-app.railway.app/`

## Возможные проблемы

### 1. Ошибка сборки
```bash
# Локально проверьте сборку
cd backend
npm run build
```

### 2. Ошибка базы данных
- Проверьте, что PostgreSQL плагин добавлен
- Убедитесь, что `DATABASE_URL` установлен

### 3. Ошибка CORS
- Проверьте `FRONTEND_URL` в переменных окружения
- Убедитесь, что домен фронтенда правильный

## Логи Railway

Для отладки проверьте логи в Railway Dashboard:
1. Откройте ваш проект
2. Перейдите в "Deployments"
3. Выберите последний деплой
4. Посмотрите логи в разделе "Build Logs" и "Deploy Logs"

## Команды для локальной проверки

```bash
# Установить зависимости
npm run install:all

# Собрать проект
npm run build

# Запустить локально
npm run start
```

## Структура для Railway

```
portfolio-site-frontend/
├── package.json          # Корневой с postinstall
├── railway.json          # Конфигурация Railway
├── Procfile             # Команда запуска
├── backend/             # NestJS API
│   ├── src/
│   ├── prisma/
│   └── package.json
└── frontend/            # React приложение
    ├── src/
    └── package.json
```

Теперь ваш проект готов для деплоя на Railway! 🚀

