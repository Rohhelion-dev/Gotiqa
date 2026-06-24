const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    animal,
    healthStatus,
    temperature,
    weight,
    diagnosis,
    treatment,
    vetNotes
  } = req.body;

  const sql = `
    INSERT INTO health_records
    (
      animal_tag,
      health_status,
      temperature,
      weight,
      diagnosis,
      treatment,
      vet_notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      animal,
      healthStatus,
      temperature,
      weight,
      diagnosis,
      treatment,
      vetNotes
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