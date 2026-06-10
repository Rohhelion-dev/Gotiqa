# Gotiqa Backend

Flask API for livestock management records: animals, health, production, breeding, feeding, and user activity logs.

## Quick Start

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API runs at `http://localhost:5000`.

By default, the backend creates a local SQLite database file at `backend/gotiqa.db`. You do not need to install PostgreSQL to start using the project.

## Optional Environment File

Create `backend/.env` only if you want to override defaults:

```env
FLASK_ENV=development
# DATABASE_URL=sqlite:///gotiqa.db
# DATABASE_URL=postgresql://gotiqa_user:your_password@localhost:5432/gotiqa
```

For PostgreSQL, also install a PostgreSQL Python driver:

```bash
pip install psycopg2-binary
```

## API Endpoints

### Animals

- `GET /api/animals` - list all animals
- `GET /api/animals/<id>` - get one animal
- `POST /api/animals` - create an animal
- `PUT /api/animals/<id>` - update an animal
- `DELETE /api/animals/<id>` - delete an animal

### Health Records

- `GET /api/animals/<id>/health` - list health records for one animal
- `POST /api/health` - create a health record
- `PUT /api/health/<id>` - update a health record

### Production Records

- `GET /api/animals/<id>/production` - list production records for one animal
- `POST /api/production` - create a production record

### Breeding Records

- `GET /api/animals/<id>/breeding` - list breeding records for one animal
- `POST /api/breeding` - create a breeding record

### Feeding Records

- `GET /api/animals/<id>/feeding` - list feeding records for one animal
- `POST /api/feeding` - create a feeding record

### Logs And Stats

- `GET /api/logs` - list activity logs
- `POST /api/logs` - create a manual user log
- `GET /api/stats` - get dashboard totals

## Example: Create An Animal

```json
POST /api/animals
{
  "tag_number": "GOAT-001",
  "name": "Bessie",
  "species": "Goat",
  "breed": "Boer",
  "age": 24,
  "gender": "Female",
  "weight": 50,
  "notes": "Healthy and productive"
}
```

## Example: Add A Manual User Log

```json
POST /api/logs
{
  "action": "Checked morning herd",
  "action_type": "Note",
  "entity_type": "General",
  "details": "Three goats need follow-up health checks tomorrow."
}
```
