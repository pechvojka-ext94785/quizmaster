# Quizmaster

A quiz taking app that serves as a case study during
[Applying Professional Scrum for Software Development](https://scrumdojo.cz/aps-sd)
training with [ScrumDojo.cz](https://scrumdojo.cz).

## Tech Stack

Prior to the class ge yourself familiar with the tech stack:

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Gradle](https://gradle.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)
- [Solid.js](https://solidjs.com/)
- [Vite](https://vitejs.dev/)
- [Cucumber.js](https://cucumber.io/docs/guides/)
- [Playwright](https://playwright.dev/)

# 🖥️ Development Environment
You have multiple options to prepare your development environment:

1. [GitHub Codespaces](docs/github-codespaces.md) (recommended)\
Prepared and self-contained dev environment in a GitHub Codespaces instance.

    - The most convenient, works out-of-box. All you need is a browser or VS Code.
    - To connect from Cursor or IntelliJ IDEA requires setting up SSH access.

2. [Docker/Podman container](https://github.com/scrumdojo/quizmaster-devcontainer) \
Prepared and self-contained dev environment in a local Docker/Podman container.

    - Requires local Docker/Podman installation (plus WSL2 on Windows).
    - Requires auth to GitHub from within the container.
    - People with macOS reported issues when working in IntelliJ.

3. [Local environment](docs/dev-environment.md) \
Run everything locally, like in the good ol' days. You need only Java 21 JDK and PostgreSQL 16,
the rest (Gradle, pnpm, Node.js and Playwright) gets downloaded automatically.

    - Requires local admin / sudo to install JDK 21 and PostgreSQL 16.
    - You have to figure out all the quirks on your own. The local dev environment is as self-contained as possible, but your local configuration can still diverge in multitude of ways.

# 🚀 Running the Application

## Build the frontend

To build the front end, run either of the following commands (they do the same thing, the former runs the latter):

- `./gradlew assembleFrontend` in the `backend` directory
- `pnpm run build` in the `frontend` directory

The front end is built to the `backend/src/main/resources/static` directory
and becomes part of the JAR assembly.

## Run the backend

To run the application, in the `backend` directory execute:

```
./gradlew bootRun`
```

This command does not build the front end, so you need to run `assembleFrontend` or `pnpm run build` first.

# <img src="https://vitejs.dev/logo.svg" height="24"> Running Vite Development Server

To avoid rebuilding frontend and backend every time you make a change, you can run the [Vite](https://vitejs.dev/guide/)
development server in the `frontend` directory:

```
pnpm vite --host
```

Vite starts a development server on `http://localhost:5173` and proxies requests to the backend server
on `http://localhost:8080`. "--host" is required so that it's accessible outside of container.

It watches for changes in the `frontend` directory and reloads the browser automatically with HMR.

# 🧪 Running end-to-end tests

You can run the end-to-end [Cucumber](https://cucumber.io/docs/guides/) + [Playwright](https://playwright.dev/) tests

- `pnpm run test:e2e` against the running app on `http://localhost:8080` (requires building the frontend first)
- `pnpm run test:e2e:vite` against the Vite development server on `http://localhost:5173`

# 🚩 Feature Flag

You can hide an unfinished feature behind a feature flag.

- on the frontend, the feature flag is a constant `FEATURE_FLAG_ENABLED`
- on the backend, the feature flag is a static method `FeatureFlag.isEnabled()`

To enable the feature flag, set the `FEATURE_FLAG` environment variable to `true` and rebuild both the frontend and
the backend:

| OS      | Command                    |
|---------|----------------------------|
| Windows | `$env:FEATURE_FLAG="true"` |
| Linux   | `export FEATURE_FLAG=true` |


# Push access

* `sudo apt-get install gh`
* `gh auth login`
* generate personal access token in github (your profile, developer settings) and paste it to gh login

