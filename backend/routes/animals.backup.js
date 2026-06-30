const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

/* ================= GET ALL ANIMALS ================= */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const search = (req.query.search || "").trim();

    let sql = `
      SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
      FROM animals
    `;

    const params = [];

    if (search) {
      sql += `
        WHERE tag_number ILIKE $1
        OR name ILIKE $1
        OR species ILIKE $1
        OR breed ILIKE $1
        OR gender ILIKE $1
      `;

      const like = `%${search}%`;
      params.push(like);
    }

    sql += " ORDER BY created_at DESC, id DESC";

    const result = await db.query(sql, params);

    return res.json({
      success: true,
      data: result.rows,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch animals" });
  }
});


/* ================= GET SINGLE ANIMAL ================= */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
      FROM animals
      WHERE id = $1
      LIMIT 1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Animal not found" });
    }

    return res.json({
      success: true,
      data: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch animal" });
  }
});


/* ================= FULL ANIMAL DETAILS ================= */
router.get("/:id/details", authenticateToken, async (req, res) => {
  try {
    const animalId = req.params.id;

    const animalRes = await db.query(
      `SELECT * FROM animals WHERE id = $1 LIMIT 1`,
      [animalId]
    );

    if (animalRes.rows.length === 0) {
      return res.status(404).json({ error: "Animal not found" });
    }

    const animal = animalRes.rows[0];

    const healthRecords = await db.query(
      `SELECT * FROM health_records WHERE animal_id = $1 ORDER BY record_date DESC, id DESC`,
      [animalId]
    );

    const feedingRecords = await db.query(
      `SELECT * FROM feeding_records WHERE animal_id = $1 ORDER BY feeding_date DESC, id DESC`,
      [animalId]
    );

    const breedingRecords = await db.query(
      `SELECT * FROM breeding_records WHERE animal_id = $1 ORDER BY id DESC`,
      [animalId]
    );

    const activityLogs = await db.query(
      `SELECT * FROM activity_logs WHERE animal_id = $1 ORDER BY activity_date DESC, id DESC`,
      [animalId]
    );

    const productionRecords = await db.query(
      `SELECT * FROM production_records WHERE animal_id = $1 ORDER BY id DESC`,
      [animalId]
    );

    return res.json({
      success: true,
      data: {
        animal,
        healthRecords: healthRecords.rows,
        feedingRecords: feedingRecords.rows,
        breedingRecords: breedingRecords.rows,
        activityLogs: activityLogs.rows,
        productionRecords: productionRecords.rows,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch animal details" });
  }
});


/* ================= CREATE ANIMAL ================= */
router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const {
      tagNumber,
      name,
      species,
      breed,
      age,
      gender,
      weight,
      notes,
    } = req.body;

    const result = await db.query(
      `
      INSERT INTO animals (
        tag_number,
        name,
        species,
        breed,
        age,
        gender,
        weight,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
      `,
      [
        tagNumber,
        name,
        species,
        breed,
        age,
        gender,
        weight,
        notes,
      ]
    );

    return res.json({
      success: true,
      id: result.rows[0].id,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create animal" });
  }
});


/* ================= DELETE ANIMAL ================= */
router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM animals WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Animal not found" });
    }

    return res.json({
      success: true,
      message: "Animal deleted",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete animal" });
  }
});

module.exports = router;