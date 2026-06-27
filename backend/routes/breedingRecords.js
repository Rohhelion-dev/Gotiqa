const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  console.log("BREEDING ROUTE HIT");
  console.log("BODY RECEIVED:", req.body);

  const {
    animalTag,
    breedingDate,
    matingType,
    sireTag,
    expectedKiddingDate,
    offspringCount,
    offspringHealth,
    notes,
  } = req.body;

  if (!animalTag) {
    return res.status(400).json({
      error: "Animal tag is required",
    });
  }

  const findAnimalSql =
    "SELECT id FROM animals WHERE tag_number = ?";

  db.query(findAnimalSql, [animalTag.trim()], (err, animalResult) => {
    if (err) {
      console.error("ANIMAL LOOKUP ERROR:", err);
      return res.status(500).json({
        error: "Database error during animal lookup",
      });
    }

    if (animalResult.length === 0) {
      return res.status(404).json({
        error: "Animal not found",
      });
    }

    const animalId = animalResult[0].id;

    const insertSql = `
      INSERT INTO breeding_records (
        animal_id,
        partner_tag,
        breeding_date,
        expected_delivery,
        offspring_count,
        offspring_health,
        notes,
        mating_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        animalId,
        sireTag || null,
        breedingDate || null,
        expectedKiddingDate || null,
        offspringCount || null,
        offspringHealth || null,
        notes || null,
        matingType || null,
      ],
      (err, result) => {
        if (err) {
          console.error("BREEDING INSERT ERROR:", err);
          return res.status(500).json({
            error: "Failed to save breeding record",
          });
        }

        console.log(
          "BREEDING RECORD SAVED:",
          result.insertId
        );

        res.status(201).json({
          success: true,
          id: result.insertId,
        });
      }
    );
  });
});


router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM breeding_records WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete breeding record" });
      }

      res.json({ success: true });
    }
  );
});
module.exports = router;