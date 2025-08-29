# Emotional Helper App

React-приложение для отслеживания эмоционального состояния пользователей с интерактивными опросами и статистикой.

## Функции

- **Отслеживание эмоций** - интерактивные опросы по настроению, энергии, стрессу
- **Аутентификация** - регистрация и вход через Firebase
- **Хранение данных** - ответы сохраняются с привязкой к email и дате
- **Статистика** - просмотр истории эмоциональных состояний
- **Адаптивный дизайн** - градиентные фоны и стеклянный эффект

## Технологии

- React 19 + Vite
- Firebase (Auth + Firestore)
- React Router v7
- CSS Modules
- TailwindCSS v4

## Установка

```bash
npm install
```

## Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com)
2. Включите Authentication → Email/Password
3. Включите Firestore Database
4. Обновите конфигурацию в `src/firebase/config.js`

## Запуск

```bash
npm run dev
```

## Структура

- `/pages` - страницы приложения (Home, Auth, SignUp, Track)
- `/components` - переиспользуемые компоненты с CSS модулями
- `/context` - глобальное состояние аутентификации
- `/services` - интеграция с Firebase
- `/utils` - вспомогательные функции