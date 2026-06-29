const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, requireRole("admin"), (req, res) => {
  const {
    animal,
    healthStatus,
    temperature,
    weight,
    diagnosis,
    treatment,
    vetNotes
  } = req.body;

  const findAnimalSql = "SELECT id FROM animals WHERE tag_number = ?";

  db.query(findAnimalSql, [animal], (err, animalResult) => {
    if (err) {
      console.error("FIND ANIMAL ERROR:", err);
      return res.status(500).json({ error: "Failed to find animal" });
    }

    if (animalResult.length === 0) {
      return res.status(404).json({
        error: "Animal not found"
      });
    }

    const animalId = animalResult[0].id;

    const insertSql = `
      INSERT INTO health_records
      (
        animal_id,
        diagnosis,
        treatment,
        veterinarian,
        record_date,
        notes,
        health_status,
        temperature,
        weight,
        vet_notes
      )
      VALUES (?, ?, ?, ?, CURDATE(), ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        animalId,
        diagnosis,
        treatment,
        "Gotiqa Vet",
        vetNotes,
        healthStatus,
        temperature || null,
        weight || null,
        vetNotes
      ],
      (err, result) => {
        if (err) {
          console.error("INSERT ERROR:", err);
          return res.status(500).json({ error: "Failed to create health record" });
        }

        res.json({
          success: true,
          id: result.insertId
        });
      }
    );
  });
});

router.delete("/:id", authenticateToken, requireRole("admin"), (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM health_records WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete health record" });
    }

    res.json({
      success: true,
      message: "Health record deleted"
    });
  });
});

module.exports = router;