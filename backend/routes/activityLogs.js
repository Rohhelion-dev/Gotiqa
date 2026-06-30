const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const { action, type, details } = req.body;

    const result = await db.query(
      `
      INSERT INTO activity_logs
      (
        action,
        details,
        activity_date
      )
      VALUES ($1, $2, NOW())
      RETURNING id
      `,
      [
        type,
        `${action} - ${details}`
      ]
    );

    res.json({
      success: true,
      id: result.rows[0].id
    });
  } catch (err) {
    console.error("ACTIVITY LOG ERROR:", err);

    res.status(500).json({
      error: "Failed to create activity log"
    });
  }
});

module.exports = router;