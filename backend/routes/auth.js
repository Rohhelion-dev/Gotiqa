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

    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [name, email, hashedPassword, "farmer"]
    );

    const user = {
      id: result.rows[0].id,
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
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});
/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  console.log("🔑 LOGIN ATTEMPT RECEIVED");
  console.log("📦 REQUEST BODY:", req.body);

  try {
    // Prevent crash when body is missing
    if (!req.body) {
      console.log("❌ No request body received");

      return res.status(400).json({
        success: false,
        error: "No request body received",
      });
    }

    let { email, password } = req.body;

    email = email?.trim()?.toLowerCase();

    console.log("📧 EMAIL:", email);

    if (!email || !password) {
      console.log("❌ Missing email or password");

      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    console.log("🔍 Searching for user...");

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    console.log("👤 USERS FOUND:", result.rows.length);

    if (result.rows.length === 0) {
      console.log("❌ User not found");

      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    console.log("✅ User found:", {
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Verify required database fields exist
    if (!user.password_hash) {
      console.log("❌ password_hash missing from database record");

      return res.status(500).json({
        success: false,
        error: "User record is invalid",
      });
    }

    console.log("🔐 Comparing passwords...");

    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("🔐 PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");

      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    console.log("🎟️ Generating JWT token...");

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = signToken(safeUser);

    console.log("✅ Login successful");

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("🚨 LOGIN ERROR:");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      error: error.message || "Login failed",
    });
  }
});
/* ================= CURRENT USER ================= */
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, name, email, role, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    console.error("ME ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});
/* ================= LOGOUT ================= */
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;