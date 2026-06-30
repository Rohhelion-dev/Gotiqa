require("dotenv").config();
const db = require("./backend/db");

async function run() {
  try {
    const result = await db.query(`
      UPDATE users
      SET role = 'admin'
      WHERE email = 'roy@gotiqa.com'
      RETURNING id, email, role
    `);

    console.log(result.rows);
  } catch (err) {
    console.error(err);
  }

  process.exit();
}

run();