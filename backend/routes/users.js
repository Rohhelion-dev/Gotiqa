const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.get("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, name, email, role
      FROM users
      ORDER BY id DESC
      `
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error("FETCH USERS ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch users"
    });
  }
});

router.get("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, name, email, role
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error("FETCH USER ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch user"
    });
  }
});

module.exports = router;