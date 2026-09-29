# Link Vault

Link Vault is a responsive React + TypeScript bookmark manager for saving and organizing useful links. It lets users keep track of favorite websites, resources, and references in one central place, with quick search and filtering tools to find items by title, description, tags, or URL.

## What the app does

This app provides a simple, user-friendly way to:

- Save new links with a title, URL, description, and optional tags
- View all saved bookmarks in one organized list
- Edit or update existing bookmarks
- Delete links with confirmation
- Search saved links by title, description, URL, or tag
- Filter links by tag to quickly narrow results
- Keep data available across browser sessions using localStorage
- Use a responsive layout that works on desktop, tablet, and mobile screens

The app is designed as an MVP for a bookmark vault, similar to a browser bookmark manager, but accessible from a web app and built for learning and portfolio use.

## Where it is hosted

The project is configured for deployment on Firebase Hosting.

The hosting configuration is set in `firebase.json` and is set to publish the production build from the `dist` folder, with all routes rewritten to `index.html` for a SPA-style deployment.

This means the app is intended to be deployed through Firebase Hosting using the Firebase CLI, for example:

```bash
npm install
npm run build
firebase deploy
```

## Tech stack and dependencies

### Core dependencies

- React 19
- React DOM 19

### Build and tooling

- Vite
- TypeScript
- ESLint
- @vitejs/plugin-react
- @types/react
- @types/react-dom
- @types/node

### Development tools

- TypeScript ESLint integration
- ESLint React hooks rules
- ESLint refresh plugin
- Globals for browser and Node support

## Getting started

```bash
npm install
npm run dev
```

Then open the local Vite server in your browser to use the app.

## Production build

```bash
npm run build
```

This compiles the TypeScript project and builds the optimized static files for deployment.

## Project purpose

Link Vault is a practical example of a React application using state, components, local storage persistence, search/filter logic, and responsive UI design. It is useful for organizing bookmarks in a lightweight, fast, and easy-to-use interface.
