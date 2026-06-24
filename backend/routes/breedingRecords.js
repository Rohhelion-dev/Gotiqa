const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {

  const {
    animalTag,
    breedingDate,
    matingType,
    sireTag,
    expectedKiddingDate,
    offspringCount,
    offspringHealth,
    notes
  } = req.body;

  const sql = `
    INSERT INTO breeding_records
    (
      animal_tag,
      breeding_date,
      mating_type,
      sire_tag,
      expected_kidding_date,
      offspring_count,
      offspring_health,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      animalTag,
      breedingDate,
      matingType,
      sireTag,
      expectedKiddingDate,
      offspringCount,
      offspringHealth,
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