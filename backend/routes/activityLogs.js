const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, requireRole("admin"), (req, res) => {
  const {
    action,
    type,
    details
  } = req.body;

  const insertSql = `
    INSERT INTO activity_logs
    (
      activity_type,
      description,
      activity_date
    )
    VALUES (?, ?, NOW())
  `;

  db.query(
    insertSql,
    [
      type,
      `${action} - ${details}`
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        id: result.insertId
      });
    }
  );
});

module.exports = router;