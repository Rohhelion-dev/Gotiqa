const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    tagNumber,
    name,
    species,
    breed,
    age,
    gender,
    weight,
    notes
  } = req.body;

  const sql = `
    INSERT INTO animals
    (
      tag_number,
      name,
      species,
      breed,
      age,
      gender,
      weight,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      tagNumber,
      name,
      species,
      breed,
      age,
      gender,
      weight,
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