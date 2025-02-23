# QuizMaster Code Style Guidelines

## Frontend
- TypeScript strict mode
- Biome with default rules, except:
    - Single quotes in TypeScrips, double quotes in JSX/TSX
    - No semicolons
- File names kebab-case

## Backend
- Java 21 with default industry standard formatting
- Spring Boot REST API controllers
- JPA/Hibernate repositories
- Service layer only where necessary (elaborate business logic)
- Unit tests include running DB (no mocking)

## BDD Specifications
- All features are covered by user-centric Specifications by Example
- Cucumber.js, Playwright automating browser actions
- Always start with an end-to-end specification, approve it with the developer, then proceed to implement it
- File names PascalCase
