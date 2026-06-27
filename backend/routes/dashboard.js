const express = require("express");
const router = express.Router();
const db = require("../db");

/* ================= DASHBOARD STATS ================= */
router.get("/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS total FROM animals", (err, animals) => {
    if (err) return res.status(500).json({ error: err.message });

    stats.animals = animals[0].total;

    db.query("SELECT COUNT(*) AS total FROM health_records", (err, health) => {
      if (err) return res.status(500).json({ error: err.message });

      stats.healthRecords = health[0].total;

      db.query("SELECT COUNT(*) AS total FROM breeding_records", (err, breeding) => {
        if (err) return res.status(500).json({ error: err.message });

        stats.breedingRecords = breeding[0].total;

        db.query("SELECT COUNT(*) AS total FROM feeding_records", (err, feeding) => {
          if (err) return res.status(500).json({ error: err.message });

          stats.feedingRecords = feeding[0].total;

          db.query("SELECT COUNT(*) AS total FROM production_records", (err, production) => {
            if (err) return res.status(500).json({ error: err.message });

            stats.productionRecords = production[0].total;

            db.query("SELECT COUNT(*) AS total FROM users", (err, users) => {
              if (err) return res.status(500).json({ error: err.message });

              stats.users = users[0].total;

              res.json(stats);
            });
          });
        });
      });
    });
  });
});

/* ================= RECENT ANIMALS ================= */
router.get("/recent-animals", (req, res) => {
  const sql = `
    SELECT *
    FROM animals
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("RECENT ANIMALS ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

/* ================= RECENT HEALTH ================= */
router.get("/recent-health", (req, res) => {
  const sql = `
    SELECT *
    FROM health_records
    ORDER BY record_date DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("RECENT HEALTH ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

/* ================= RECENT ACTIVITY ================= */
router.get("/recent-activity", (req, res) => {
  const sql = `
    SELECT *
    FROM activity_logs
    ORDER BY activity_date DESC
    LIMIT 10
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("RECENT ACTIVITY ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

/* ================= HEALTH ALERTS ================= */
router.get("/health-alerts", (req, res) => {
  const sql = `
    SELECT
      h.id,
      a.tag_number AS animal,
      h.diagnosis,
      h.health_status,
      h.record_date
    FROM health_records h
    JOIN animals a ON h.animal_id = a.id
    WHERE LOWER(h.health_status) = 'vaccinated'
    ORDER BY h.record_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("HEALTH ALERT ERROR:", err);
      return res.status(500).json({ error: err.message });
    }

    const formatted = results.map((record) => ({
      animal: record.animal,
      task: "Vaccination",
      status: record.health_status,
      date: record.record_date,
      diagnosis: record.diagnosis,
    }));

    res.json(formatted);
  });
});

/* ================= EXPORT ROUTER ================= */
module.exports = router;