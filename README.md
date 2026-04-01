# Linear Clone

A full-stack Linear issue tracker clone built with React, TypeScript, Express, and PostgreSQL.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend   │────▶│   Backend   │────▶│  PostgreSQL  │
│  React/Vite  │     │   Express   │     │   Database   │
│  Port 3000   │     │  Port 4000  │     │  Port 5432   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Frontend (`/frontend`)
- **React 18** with TypeScript
- **Vite** dev server with proxy to backend (`/api` routes)
- Component-based architecture: `Sidebar`, `IssueList`, `IssueDetail`, `CreateIssueModal`
- Custom SVG icons for status and priority indicators
- CSS modules following Linear's design language (Inter font, gray palette, purple accent)

### Backend (`/backend`)
- **Express** with TypeScript
- RESTful API at `/api/issues`
- PostgreSQL connection via `pg` library
- CRUD endpoints: `GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`

### Database (`/db`)
- **PostgreSQL 16** with auto-generated issue identifiers (`MC-1`, `MC-2`, etc.)
- Enum types for `issue_status` and `issue_priority`
- Triggers for auto-generating identifiers and updating timestamps
- Seed data with 4 starter issues

## API Endpoints

| Method   | Path             | Description          |
|----------|------------------|----------------------|
| `GET`    | `/api/issues`    | List all issues      |
| `GET`    | `/api/issues/:id`| Get single issue     |
| `POST`   | `/api/issues`    | Create new issue     |
| `PATCH`  | `/api/issues/:id`| Update issue fields  |
| `DELETE` | `/api/issues/:id`| Delete issue         |
| `GET`    | `/health`        | Health check         |

## Quick Start

### Prerequisites
- Docker and Docker Compose

### Run the dev server

```bash
docker compose up --build -d
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database**: localhost:5432

### Stop

```bash
docker compose down
```

### Reset database (clear all data)

```bash
docker compose down -v
docker compose up --build -d
```

## Running Multiple Instances

To run multiple dev containers simultaneously without port conflicts, use environment variables to override the exposed ports:

### Instance 1 (default ports)
```bash
docker compose up --build -d
# Frontend: http://localhost:3000
# Backend:  http://localhost:4000
# DB:       localhost:5432
```

### Instance 2 (custom ports)
```bash
DB_PORT=5433 BACKEND_PORT=4001 FRONTEND_PORT=3001 docker compose up --build -d
# Frontend: http://localhost:3001
# Backend:  http://localhost:4001
# DB:       localhost:5433
```

### Instance 3 (different ports)
```bash
DB_PORT=5434 BACKEND_PORT=4002 FRONTEND_PORT=3003 docker compose up --build -d
# Frontend: http://localhost:3003
# Backend:  http://localhost:4002
# DB:       localhost:5434
```

Each instance uses its own Docker volume for PostgreSQL data, so they are fully isolated.

You can also create a `.env` file (see `.env.example`) to persist your port configuration:

```bash
cp .env.example .env
# Edit .env with your preferred ports
docker compose up --build -d
```

### Configurable Environment Variables

| Variable           | Default   | Description                    |
|--------------------|-----------|--------------------------------|
| `POSTGRES_USER`    | `linear`  | PostgreSQL username            |
| `POSTGRES_PASSWORD`| `linear`  | PostgreSQL password            |
| `POSTGRES_DB`      | `linear`  | PostgreSQL database name       |
| `DB_PORT`          | `5432`    | Host port for PostgreSQL       |
| `BACKEND_PORT`     | `4000`    | Host port for Express backend  |
| `FRONTEND_PORT`    | `3000`    | Host port for Vite dev server  |

## Features

- **Issue List View**: Issues grouped by status (Todo, In Progress, Backlog, Done, Cancelled) with tab filtering (All Issues, Active, Backlog)
- **Issue Detail View**: Edit title and description inline, change status and priority via dropdown menus, view labels and project
- **Create Issue Modal**: Create new issues with title, description, status, and priority selection
- **Delete Issues**: Confirmation-protected issue deletion
- **Responsive Layout**: Sidebar navigation with team hierarchy, matching Linear's design
