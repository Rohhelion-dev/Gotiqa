const mysql = require("mysql2");

// ================= POOL (IMPORTANT FOR REAL APPS) =================
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "gotiqa123..",
  database: process.env.DB_NAME || "gotiqa",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ================= TEST CONNECTION =================
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
  connection.release();
});

// ================= EXPORT POOL =================
module.exports = pool;