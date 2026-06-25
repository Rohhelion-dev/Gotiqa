const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    animal,
    productionType,
    quantity,
    notes
  } = req.body;

  const findAnimalSql =
    "SELECT id FROM animals WHERE TRIM(tag_number) = TRIM(?)";

  db.query(findAnimalSql, [animal], (err, animalResult) => {

    if (err) {
      return res.status(500).json(err);
    }

    if (animalResult.length === 0) {
      return res.status(404).json({
        error: "Animal not found"
      });
    }

    const animalId = animalResult[0].id;

    const insertSql = `
      INSERT INTO production_records
      (
        animal_id,
        production_type,
        quantity,
        production_date,
        notes
      )
      VALUES (?, ?, ?, CURDATE(), ?)
    `;

    db.query(
      insertSql,
      [
        animalId,
        productionType,
        quantity,
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
});

module.exports = router;