# DevCamper API

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

**Developed:** 2019–2020 (original API coursework)

Backend REST API for a bootcamp directory application (Traversy Media DevCamper course). This is a **backend-only** project — it is not a user-facing website.

## Archive note

This folder preserves the full git history from the former standalone repo [zeddrix/devcamper-api](https://github.com/zeddrix/devcamper-api). The playground shows this README instead of an iframe because the API cannot run on GitHub Pages.

**Do not** deploy this folder to GitHub Pages as a live app. Disable GH Pages on the old standalone repo once this archive is verified.

## Local setup

1. Copy environment config:

```bash
cd projects/devcamper-api
cp config/config.env.env config/config.env
# Edit config/config.env with your MongoDB URI and secrets
```

2. Install and run:

```bash
npm install
npm run dev    # development with nodemon
# or
npm start      # production
```

3. Seed the database:

```bash
node seeder -d    # destroy all data
node seeder -i    # import users, bootcamps, courses, reviews from _data/
```

## API overview

| Resource | Base route | Notes |
|----------|------------|-------|
| Auth | `/api/v1/auth` | Register, login, logout, password reset |
| Bootcamps | `/api/v1/bootcamps` | CRUD, geocoding, photo upload |
| Courses | `/api/v1/courses` | Nested under bootcamps |
| Reviews | `/api/v1/reviews` | Nested under bootcamps |
| Users | `/api/v1/users` | Admin user management |

Extended API documentation with request examples: [Postman collection](https://documenter.getpostman.com/view/8923145/SVtVVTzd?version=latest)

## What changed in the monorepo

- Full Express + MongoDB source and commit history live at `projects/devcamper-api/`.
- Playground catalog entry uses **README display mode** (no iframe).
- Standalone repo GH Pages (README-only) should be disabled after this archive is live.

**Live docs preview:** [Open in playground](https://zeddrix.github.io/pet-projects/project/devcamper-api)
