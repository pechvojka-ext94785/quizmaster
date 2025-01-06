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

# How to develop Quizmaster

[How to develop Quizmaster](docs/how-to-develop.md)
