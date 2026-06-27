const express = require("express");
const router = express.Router();

const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
router.post("/register", (req, res) => {

  let { name, email, password, role } = req.body;

  // normalize
  name = name?.trim();
  email = email?.trim().toLowerCase();

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 6 characters"
    });
  }

  const checkSql = "SELECT id FROM users WHERE email = ? LIMIT 1";

  db.query(checkSql, [email], (err, result) => {

    if (err) {
      console.error("REGISTER CHECK ERROR:", err);
      return res.status(500).json({
        success: false,
        error: "Database error during user check"
      });
    }

    if (result.length > 0) {
      return res.status(409).json({
        success: false,
        error: "Email already exists"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword, role || "farmer"], (err, result) => {

      if (err) {
        console.error("REGISTER INSERT ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "Failed to create user"
        });
      }

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: result.insertId,
          name,
          email,
          role: role || "farmer"
        }
      });

    });

  });
});


/* ================= LOGIN ================= */
router.post("/login", (req, res) => {

  let { email, password } = req.body;

  email = email?.trim().toLowerCase();

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password required"
    });
  }

  const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

  db.query(sql, [email], (err, result) => {

    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({
        success: false,
        error: "Database error"
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "gotiqa_secret",
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
});

module.exports = router;