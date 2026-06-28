const mysql = require("mysql2");

// ================= DATABASE CONNECTION POOL =================
const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,

waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
});

// ================= TEST CONNECTION =================
pool.getConnection((err, connection) => {
if (err) {
console.error("❌ MySQL Connection Failed:", err.message);
return;
}

console.log("✅ MySQL Connected Successfully");
connection.release();
});

// ================= EXPORT =================
module.exports = pool;
