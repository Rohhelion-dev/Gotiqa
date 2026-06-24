const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    animalTag,
    feedType,
    quantity,
    feedingTime,
    notes
  } = req.body;

  const sql = `
    INSERT INTO feeding_records
    (
      animal_tag,
      feed_type,
      quantity,
      feeding_time,
      notes
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      animalTag,
      feedType,
      quantity,
      feedingTime,
      notes
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