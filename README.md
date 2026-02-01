# Bilal Hassan — Portfolio

A minimal, fast portfolio built with Next.js and TypeScript.

Quick overview: a small Next.js app using the App Router located in `src/app` with modern tooling and PostCSS.

## Requirements

- **Node:** Version 18 or newer
- **Preferred package manager:** Bun (preferred), but you can use `npm`, `yarn`, or `pnpm` if you prefer.

## Getting started

1. Install dependencies (preferred - Bun):

```bash
bun install
```

Alternative (npm / yarn / pnpm):

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server (preferred - Bun):

```bash
bun run dev
```

Alternative:

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

3. Build for production and start (preferred - Bun):

```bash
bun run build
bun run start
```

Alternative:

```bash
npm run build
npm run start
```

## Scripts

- `dev`: Start the Next.js dev server (`bun run dev` or `npm run dev`).
- `build`: Compile the app for production (`bun run build` or `npm run build`).
- `start`: Run the production server (`bun run start` or `npm run start`).

## Project structure (important files)

- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript config
- `postcss.config.mjs`: PostCSS configuration
- `src/app/`: App Router entry (layout, pages, global styles)

## Deployment

- Recommended: Vercel for zero-config Next.js deployments. Any Node-capable host that supports Next.js is fine.

## License

- Add a license file or replace this section with your chosen license.
