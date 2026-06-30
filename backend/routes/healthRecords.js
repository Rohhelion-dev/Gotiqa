const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

/* ================= CREATE HEALTH RECORD ================= */
router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const {
      animal,
      healthStatus,
      temperature,
      weight,
      diagnosis,
      treatment,
      vetNotes
    } = req.body;

    if (!animal) {
      return res.status(400).json({
        error: "Animal tag is required"
      });
    }

    // Find animal
    const animalResult = await db.query(
      "SELECT id FROM animals WHERE tag_number = $1",
      [animal]
    );

    if (animalResult.rows.length === 0) {
      return res.status(404).json({
        error: "Animal not found"
      });
    }

    const animalId = animalResult.rows[0].id;

    // Insert health record
    const insertResult = await db.query(
      `
      INSERT INTO health_records (
        animal_id,
        diagnosis,
        treatment,
        veterinarian,
        record_date,
        notes,
        condition,
        temperature,
        weight,
        vet_notes
      )
      VALUES (
        $1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9
      )
      RETURNING id
      `,
      [
        animalId,
        diagnosis || null,
        treatment || null,
        "Gotiqa Vet",
        vetNotes || null,
        healthStatus || null,
        temperature || null,
        weight || null,
        vetNotes || null
      ]
    );

    return res.json({
      success: true,
      id: insertResult.rows[0].id
    });

  } catch (err) {
    console.error("HEALTH INSERT ERROR:", err);
    return res.status(500).json({
      error: "Failed to create health record"
    });
  }
});

/* ================= DELETE HEALTH RECORD ================= */
router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM health_records WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Health record not found"
      });
    }

    return res.json({
      success: true,
      message: "Health record deleted"
    });

  } catch (err) {
    console.error("HEALTH DELETE ERROR:", err);

    return res.status(500).json({
      error: "Failed to delete health record"
    });
  }
});

module.exports = router;