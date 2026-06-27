const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const checkSql = "SELECT id FROM users WHERE email = ?";

  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.error("REGISTER CHECK ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword, role || "farmer"], (err, result) => {
      if (err) {
        console.error("REGISTER INSERT ERROR:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }

      res.json({
        success: true,
        message: "User registered successfully",
        userId: result.insertId
      });
    });
  });
};

/* ================= LOGIN ================= */
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};