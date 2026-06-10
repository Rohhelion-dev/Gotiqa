# Gotiqa Setup Guide

Gotiqa now has a real Flask backend and a local database for livestock records.

## What It Stores

- Animals: tag number, species, breed, age, gender, weight, and notes
- Health records: status, temperature, diagnosis, treatment, and vet notes
- Production records: milk, eggs, meat, wool, quantity, unit, grade, and notes
- Breeding records: breeding date, partner tag, delivery dates, offspring count, and offspring health
- Feeding records: feed type, quantity, unit, cost, and notes
- User logs: automatic audit logs plus manual notes entered from the dashboard

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Start The Backend

```bash
python app.py
```

The backend runs at:

```text
http://localhost:5000
```

The database file is created automatically at:

```text
backend/gotiqa.db
```

### 3. Open The Dashboard

Open `dashboard.html` in your browser while the backend is running.

The dashboard talks to:

```js
http://localhost:5000/api
```

## Optional PostgreSQL Setup

SQLite is the default and is enough for local use. If you later want PostgreSQL, create `backend/.env` and set:

```env
DATABASE_URL=postgresql://gotiqa_user:your_password@localhost:5432/gotiqa
FLASK_ENV=development
```

## API Endpoints

- `GET /api/animals`
- `POST /api/animals`
- `PUT /api/animals/<id>`
- `DELETE /api/animals/<id>`
- `GET /api/animals/<id>/health`
- `POST /api/health`
- `GET /api/animals/<id>/production`
- `POST /api/production`
- `GET /api/animals/<id>/breeding`
- `POST /api/breeding`
- `GET /api/animals/<id>/feeding`
- `POST /api/feeding`
- `GET /api/logs`
- `POST /api/logs`
- `GET /api/stats`

## Troubleshooting

If the dashboard says it cannot connect, make sure `python app.py` is still running in the `backend` folder.

If port `5000` is already in use, change the port at the bottom of `backend/app.py` and update `API_URL` in `dashboard.html` to match.

To reset local data, stop the backend and delete `backend/gotiqa.db`; the backend will recreate an empty database on the next start.
