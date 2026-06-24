const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    action,
    type,
    entity,
    details
  } = req.body;

  const sql = `
    INSERT INTO activity_logs
    (
      action,
      type,
      entity,
      details
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      action,
      type,
      entity,
      details
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