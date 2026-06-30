const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const {
      animal,
      productionType,
      quantity,
      notes
    } = req.body;

    const animalResult = await db.query(
      "SELECT id FROM animals WHERE TRIM(tag_number) = TRIM($1)",
      [animal]
    );

    if (animalResult.rows.length === 0) {
      return res.status(404).json({
        error: "Animal not found"
      });
    }

    const animalId = animalResult.rows[0].id;

    const result = await db.query(
      `
      INSERT INTO production_records
      (
        animal_id,
        production_type,
        quantity,
        record_date,
        notes
      )
      VALUES ($1, $2, $3, CURRENT_DATE, $4)
      RETURNING id
      `,
      [
        animalId,
        productionType,
        quantity,
        notes || null
      ]
    );

    res.json({
      success: true,
      id: result.rows[0].id
    });
  } catch (err) {
    console.error("PRODUCTION INSERT ERROR:", err);

    res.status(500).json({
      error: "Failed to save production record"
    });
  }
});

router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM production_records WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Production record not found"
      });
    }

    res.json({
      success: true
    });
  } catch (err) {
    console.error("PRODUCTION DELETE ERROR:", err);

    res.status(500).json({
      error: "Failed to delete production record"
    });
  }
});

module.exports = router;