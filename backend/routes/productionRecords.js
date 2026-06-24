const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    animalTag,
    productionType,
    quantity,
    recordDate,
    notes
  } = req.body;

  const sql = `
    INSERT INTO production_records
    (
      animal_tag,
      production_type,
      quantity,
      record_date,
      notes
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      animalTag,
      productionType,
      quantity,
      recordDate,
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