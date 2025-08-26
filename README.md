# Возможноая дальнейшая работа с проектом. !не в порядке приоритетов

1. Добавить хедер, футер.
2. Добавить страницу квартиры.
3. Доработать версию для ширины менее 960px и мобильный устройств.
4. Refactor. Для кнопки написать атомарный компонент с вариантами.
5. Цвета убрать в css переменные.
6. Отдельные переиспользуемые классы для типографики.
7. Добавить лейзи лоад и пагинацию.
8. Обсудить интернационализацию - нужная ли. 
9. Сделать работу с SEO: meta, web manifest, robots, og разметка.
10. Добавить человекочитаемые урлы для страницы отедельной квартиры.
11. Добавить 404 страницу.
12. Добавить обработку ошибок для запросов.
13. Добавить обработку серверных ошибок.
14. Написать атомарный компонент для работы с иконками.
15. Разбить pinia apartments.ts на отдельный композаблы. Сейчас вся логика в одном стор файле.
16. Добавить тесты.
17. Добавить ci/cd.

* Проект собран на Nuxt4.
Со стандартной командой установки Nuxt сейчас встает 4ая версия и так как в Nuxt4 нет breaking changes от Nuxt3 решил попробовать собрать проект на новой структуре.

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
