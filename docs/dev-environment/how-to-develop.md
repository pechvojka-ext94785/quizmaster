# How to develop Quizmaster

- [Running Quizmaster](#🚀-running-quizmaster)
- [Running Vite dev server](#running-vite-development-server)
- [Running end-to-end tests](#🧪-running-end-to-end-tests)
- [Feature flag](#🚩-feature-flag)

## 🚀 Running Quizmaster

### Build the frontend

To build the front end, run either of the following commands (they do the same thing, the former runs the latter):

- `./gradlew assembleFrontend` in the `backend` directory
- `pnpm run build` in the `frontend` directory

The front end is built to the `backend/src/main/resources/static` directory
and becomes part of the JAR assembly.

### Run the backend

To run the application, in the `backend` directory execute:

```
./gradlew bootRun
```

This command does not build the front end, so you need to run `assembleFrontend` or `pnpm run build` first.

## <img src="https://vitejs.dev/logo.svg" height="20"> Running Vite Development Server

To avoid rebuilding frontend and backend every time you make a change, you can run the [Vite](https://vitejs.dev/guide/)
development server in the `frontend` directory:

```
pnpm vite
```

Vite starts a development server on `http://localhost:5173` and proxies requests to the backend server
on `http://localhost:8080`.

It watches for changes in the `frontend` directory and reloads the browser automatically with HMR.

## 🧪 Running end-to-end tests

You can run the end-to-end [Cucumber](https://cucumber.io/docs/guides/) + [Playwright](https://playwright.dev/) tests

- `pnpm run test:e2e` against the running app on `http://localhost:8080` (requires building the frontend first)
- `pnpm run test:e2e:vite` against the running app on `http://localhost:5173`
- `pnpm run test:e2e:ui` with Playwright UI (at `http://localhost:3333`) against the Vite development server on `http://localhost:5173`

## 🚩 Feature Flag

You can hide an unfinished feature behind a feature flag.

- on the frontend, the feature flag is a constant `FEATURE_FLAG_ENABLED`
- on the backend, the feature flag is a static method `FeatureFlag.isEnabled()`

To enable the feature flag, set the `FEATURE_FLAG` environment variable to `true` and rebuild both the frontend and
the backend:

| OS      | Command                    |
|---------|----------------------------|
| Windows | `$env:FEATURE_FLAG="true"` |
| Linux   | `export FEATURE_FLAG=true` |
