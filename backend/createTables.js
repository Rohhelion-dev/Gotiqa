require("dotenv").config();
const db = require("./db");

async function createTables() {
  try {

    await db.query(`
      CREATE TABLE IF NOT EXISTS animals (
        id SERIAL PRIMARY KEY,
        tag_number VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100),
        species VARCHAR(50),
        breed VARCHAR(100),
        age INTEGER,
        gender VARCHAR(20),
        weight DECIMAL(8,2),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS feeding_records (
        id SERIAL PRIMARY KEY,
        animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
        feed_type VARCHAR(100),
        quantity DECIMAL(10,2),
        feeding_date TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS health_records (
        id SERIAL PRIMARY KEY,
        animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
        condition VARCHAR(255),
        treatment TEXT,
        veterinarian VARCHAR(255),
        record_date TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS breeding_records (
        id SERIAL PRIMARY KEY,
        animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
        partner_id INTEGER,
        breeding_date TIMESTAMP,
        outcome VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS production_records (
        id SERIAL PRIMARY KEY,
        animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
        production_type VARCHAR(100),
        quantity DECIMAL(10,2),
        record_date TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        action VARCHAR(255),
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password_hash VARCHAR(255),
        role VARCHAR(20) CHECK (role IN ('admin', 'investor', 'farmer'))
      );
    `);

      await db.query(`
CREATE TABLE IF NOT EXISTS health_records (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  diagnosis TEXT,
  treatment TEXT,
  veterinarian VARCHAR(255),
  record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  health_status VARCHAR(100),
  temperature DECIMAL(5,2),
  weight DECIMAL(10,2),
  vet_notes TEXT
);
`);

await db.query(`
CREATE TABLE IF NOT EXISTS breeding_records (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  partner_tag VARCHAR(100),
  breeding_date DATE,
  expected_delivery DATE,
  offspring_count INTEGER,
  offspring_health VARCHAR(255),
  notes TEXT,
  mating_type VARCHAR(100)
);
`);

await db.query(`
CREATE TABLE IF NOT EXISTS production_records (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  production_type VARCHAR(100),
  quantity DECIMAL(10,2),
  production_date DATE,
  notes TEXT
);
`);

await db.query(`
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER,
  activity_type VARCHAR(100),
  description TEXT,
  activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

    console.log("✅ ALL TABLES CREATED");

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createTables();