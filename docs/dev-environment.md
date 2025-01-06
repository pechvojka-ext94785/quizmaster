# Development Environment

To prepare your local development environment, follow these steps.

## 📋 Prerequisites

You need to have the following software installed on your machine:

- [Java JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [PostgreSQL 16](https://www.postgresql.org/download/)

## 🔧 Setup

### PostgreSQL Database

After cloning the repository, create a database:

```
psql -U postgres -f backend/create_db.sql
```

### Node.js and pnpm

The following installs Node.js and [pnpm](https://pnpm.io/pnpm-cli) locally to `frontend/node`
(using a [org.siouan.frontend](https://siouan.github.io/frontend-gradle-plugin/) Gradle plugin)
and Node.js dependencies to `frontend/node_modules`, including Playwright browsers:

```
cd backend
./gradlew installFrontend
```

To run `node` or `pnpm` from the terminal, add it to your `PATH`:

| OS      | Command                                      |
|---------|----------------------------------------------|
| Windows | `$env:Path = $pwd\frontend\node + $env:Path` |
| Linux   | `export PATH=$PWD/frontend/node/bin:$PATH`   |
