const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    console.log("BREEDING ROUTE HIT");
    console.log("BODY RECEIVED:", req.body);

    const {
      animalTag,
      breedingDate,
      sireTag,
      outcome,
      notes
    } = req.body;

    if (!animalTag) {
      return res.status(400).json({
        error: "Animal tag is required",
      });
    }

    // Find animal
    const animalResult = await db.query(
      "SELECT id FROM animals WHERE tag_number = $1",
      [animalTag.trim()]
    );

    if (animalResult.rows.length === 0) {
      return res.status(404).json({
        error: "Animal not found",
      });
    }

    const animalId = animalResult.rows[0].id;

    // Insert breeding record (MATCHING YOUR TABLE)
    const insertResult = await db.query(
      `
      INSERT INTO breeding_records (
        animal_id,
        partner_id,
        breeding_date,
        outcome,
        notes
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [
        animalId,
        sireTag || null,
        breedingDate || null,
        outcome || null,
        notes || null
      ]
    );

    res.status(201).json({
      success: true,
      id: insertResult.rows[0].id
    });

  } catch (err) {
    console.error("BREEDING INSERT ERROR:", err);

    res.status(500).json({
      error: "Failed to save breeding record",
    });
  }
});

/* DELETE */
router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM breeding_records WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Breeding record not found",
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("BREEDING DELETE ERROR:", err);

    res.status(500).json({
      error: "Failed to delete breeding record",
    });
  }
});

module.exports = router;