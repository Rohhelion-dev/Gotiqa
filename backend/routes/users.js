const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.get("/", authenticateToken, requireRole("admin"), (req, res) => {
  db.query(
    "SELECT id, name, email, role FROM users ORDER BY id DESC",
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch users" });
      }

      res.json({
        success: true,
        data: rows,
      });
    }
  );
});

router.get("/:id", authenticateToken, requireRole("admin"), (req, res) => {
  db.query(
    "SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1",
    [req.params.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch user" });
      }

      if (!rows.length) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        data: rows[0],
      });
    }
  );
});

module.exports = router;