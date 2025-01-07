# 🖥️ Development Environment
You have multiple options to prepare your development environment:

1. [GitHub Codespaces](dev-env-codespaces.md) (recommended)\
Prepared and self-contained dev environment in a GitHub Codespaces instance.

    - The most convenient, works out-of-box. All you need is a browser or VS Code.
    - To connect from Cursor or IntelliJ IDEA requires setting up SSH access.

2. [Docker/Podman container](https://github.com/scrumdojo/quizmaster-devcontainer) \
Prepared and self-contained dev environment in a local Docker/Podman container.

    - Requires local Docker/Podman installation (plus WSL2 on Windows).
    - Requires auth to GitHub from within the container.
    - People with macOS reported issues when working in IntelliJ.

3. [Local environment](dev-env-local.md) \
Run everything locally, like in the good ol' days. You need only Java 21 JDK and PostgreSQL 16,
the rest (Gradle, pnpm, Node.js and Playwright) gets downloaded automatically.

    - Requires local admin / sudo to install JDK 21 and PostgreSQL 16.
    - You have to figure out all the quirks on your own. The local dev environment is as self-contained as possible, but your local configuration can still diverge in multitude of ways.
