const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

/* ================= CREATE FEEDING RECORD ================= */
router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const {
      animal,
      feedType,
      quantity,
      feedingDate,
      notes,
    } = req.body;

    if (!animal) {
      return res.status(400).json({
        error: "Animal tag is required",
      });
    }

    if (!quantity) {
      return res.status(400).json({
        error: "Quantity is required",
      });
    }

    const animalTag = String(animal || "").trim();

    const animalResult = await db.query(
      "SELECT id FROM animals WHERE tag_number = $1",
      [animalTag]
    );

    if (animalResult.rows.length === 0) {
      return res.status(404).json({
        error: "Animal not found",
      });
    }

    const animalId = animalResult.rows[0].id;

    const insertResult = await db.query(
      `
      INSERT INTO feeding_records
      (
        animal_id,
        feed_type,
        quantity,
        feeding_date,
        notes
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
      `,
      [
        animalId,
        feedType || null,
        quantity || null,
        feedingDate || null,
        notes || null,
      ]
    );

    return res.status(201).json({
      success: true,
      id: insertResult.rows[0].id,
    });

  } catch (err) {
    console.error("FEEDING ERROR:", err);

    return res.status(500).json({
      error: "Failed to save feeding record",
    });
  }
});


/* ================= DELETE FEEDING RECORD ================= */
router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM feeding_records WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Record not found",
      });
    }

    return res.json({
      success: true,
      message: "Feeding record deleted",
    });

  } catch (err) {
    console.error("DELETE FEEDING ERROR:", err);

    return res.status(500).json({
      error: "Failed to delete feeding record",
    });
  }
});

module.exports = router;