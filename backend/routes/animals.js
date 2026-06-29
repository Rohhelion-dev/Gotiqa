const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

router.get("/", authenticateToken, (req, res) => {
  const search = (req.query.search || "").trim();

  let sql = `
    SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
    FROM animals
  `;

  const params = [];

  if (search) {
    sql += `
      WHERE tag_number LIKE ?
      OR name LIKE ?
      OR species LIKE ?
      OR breed LIKE ?
      OR gender LIKE ?
    `;

    const like = `%${search}%`;
    params.push(like, like, like, like, like);
  }

  sql += " ORDER BY created_at DESC, id DESC";

  db.query(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch animals" });
    }

    res.json({
      success: true,
      data: rows,
    });
  });
});

router.get("/:id", authenticateToken, (req, res) => {
  db.query(
    `
      SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
      FROM animals
      WHERE id = ?
      LIMIT 1
    `,
    [req.params.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch animal" });
      }

      if (!rows.length) {
        return res.status(404).json({ error: "Animal not found" });
      }

      res.json({
        success: true,
        data: rows[0],
      });
    }
  );
});

router.get("/:id/details", authenticateToken, (req, res) => {
  const animalId = req.params.id;

  db.query(
    `
      SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
      FROM animals
      WHERE id = ?
      LIMIT 1
    `,
    [animalId],
    (err, animalRows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch animal" });
      }

      if (!animalRows.length) {
        return res.status(404).json({ error: "Animal not found" });
      }

      const animal = animalRows[0];

      db.query(
        "SELECT * FROM health_records WHERE animal_id = ? ORDER BY record_date DESC, id DESC",
        [animalId],
        (err, healthRecords) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch health records" });
          }

          db.query(
            "SELECT * FROM feeding_records WHERE animal_id = ? ORDER BY feeding_date DESC, id DESC",
            [animalId],
            (err, feedingRecords) => {
              if (err) {
                return res.status(500).json({ error: "Failed to fetch feeding records" });
              }

              db.query(
                "SELECT * FROM breeding_records WHERE animal_id = ? ORDER BY breeding_date DESC, id DESC",
                [animalId],
                (err, breedingRecords) => {
                  if (err) {
                    return res.status(500).json({ error: "Failed to fetch breeding records" });
                  }

                  db.query(
                    "SELECT * FROM activity_logs WHERE animal_id = ? ORDER BY activity_date DESC, id DESC",
                    [animalId],
                    (err, activityLogs) => {
                      if (err) {
                        return res.status(500).json({ error: "Failed to fetch activity logs" });
                      }

                      db.query(
                        "SELECT * FROM production_records WHERE animal_id = ? ORDER BY id DESC",
                        [animalId],
                        (err, productionRecords) => {
                          if (err) {
                            return res.status(500).json({
                              error: "Failed to fetch production records",
                            });
                          }

                          res.json({
                            success: true,
                            data: {
                              animal,
                              healthRecords,
                              feedingRecords,
                              breedingRecords,
                              activityLogs,
                              productionRecords,
                            },
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

router.post("/", authenticateToken, requireRole("admin"), (req, res) => {
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

  const sql = `
    INSERT INTO animals
    (
      tag_number,
      name,
      species,
      breed,
      age,
      gender,
      weight,
      notes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      tagNumber,
      name,
      species,
      breed,
      age,
      gender,
      weight,
      notes,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        id: result.insertId,
      });
    }
  );
});

router.delete("/:id", authenticateToken, requireRole("admin"), (req, res) => {
  db.query(
    "DELETE FROM animals WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete animal" });
      }

      res.json({
        success: true,
        message: "Animal deleted",
      });
    }
  );
});

module.exports = router;