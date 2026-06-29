const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

function signToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      });
    }

    const checkSql = "SELECT id FROM users WHERE email = ? LIMIT 1";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        console.error("REGISTER CHECK ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "Database error during user check",
        });
      }

      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          error: "An account with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const sql = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [name, email, hashedPassword, "farmer"], (err, result) => {
        if (err) {
          console.error("REGISTER INSERT ERROR:", err);
          return res.status(500).json({
            success: false,
            error: "Failed to create user",
          });
        }

        const user = {
          id: result.insertId,
          name,
          email,
          role: "farmer",
        };

        const token = signToken(user);

        return res.status(201).json({
          success: true,
          message: "Account created successfully",
          token,
          user,
        });
      });
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});

/* ================= LOGIN ================= */
router.post("/login", (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({
          success: false,
          error: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: "Invalid email or password",
        });
      }

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = signToken(safeUser);

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: safeUser,
      });
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

/* ================= CURRENT USER ================= */
router.get("/me", authenticateToken, (req, res) => {
  const sql = "SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1";

  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("ME ERROR:", err);
      return res.status(500).json({
        success: false,
        error: "Database error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      user: result[0],
    });
  });
});

/* ================= LOGOUT ================= */
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;