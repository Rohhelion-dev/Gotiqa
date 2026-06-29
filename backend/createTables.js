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
        notes TEXT
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

    console.log("✅ Tables created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createTables();