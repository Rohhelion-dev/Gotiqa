const express = require("express");
const router = express.Router();
const db = require("../db");

/* ================= DASHBOARD STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const queries = [
      "animals",
      "health_records",
      "breeding_records",
      "feeding_records",
      "production_records",
      "users",
    ];

    const results = await Promise.all(
      queries.map((table) =>
        db.query(`SELECT COUNT(*) FROM ${table}`)
      )
    );

    const stats = {
      animals: parseInt(results[0].rows[0].count),
      healthRecords: parseInt(results[1].rows[0].count),
      breedingRecords: parseInt(results[2].rows[0].count),
      feedingRecords: parseInt(results[3].rows[0].count),
      productionRecords: parseInt(results[4].rows[0].count),
      users: parseInt(results[5].rows[0].count),
    };

    res.json(stats);
  } catch (err) {
    console.error("DASHBOARD STATS ERROR:", err);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

/* ================= RECENT ANIMALS ================= */
router.get("/recent-animals", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM animals
      ORDER BY created_at DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("RECENT ANIMALS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= RECENT HEALTH ================= */
router.get("/recent-health", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM health_records
      ORDER BY record_date DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("RECENT HEALTH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= RECENT ACTIVITY ================= */
router.get("/recent-activity", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("RECENT ACTIVITY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= HEALTH ALERTS ================= */
router.get("/health-alerts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        h.id,
        a.tag_number AS animal,
        h.condition,
        h.treatment,
        h.record_date
      FROM health_records h
      JOIN animals a ON h.animal_id = a.id
      WHERE LOWER(h.condition) = 'vaccinated'
      ORDER BY h.record_date DESC
    `);

    const formatted = result.rows.map((record) => ({
      animal: record.animal,
      task: "Vaccination",
      status: record.condition,
      date: record.record_date,
      condition: record.condition,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("HEALTH ALERT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;