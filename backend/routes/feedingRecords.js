const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  try {
    console.log("FEEDING ROUTE HIT");
    console.log("BODY RECEIVED:", req.body);

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

    const animalTag =
      typeof animal === "string"
        ? animal.trim()
        : "";

    const findAnimalSql =
      "SELECT id FROM animals WHERE tag_number = ?";

    db.query(
      findAnimalSql,
      [animalTag],
      (err, animalResult) => {
        if (err) {
          console.error(
            "ANIMAL LOOKUP ERROR:",
            err
          );

          return res.status(500).json({
            error:
              "Database error during animal lookup",
          });
        }

        if (
          !animalResult ||
          animalResult.length === 0
        ) {
          return res.status(404).json({
            error: "Animal not found",
          });
        }

        const animalId = animalResult[0].id;

        console.log(
          "Animal Found:",
          animalId
        );

        const insertSql = `
          INSERT INTO feeding_records
          (
            animal_id,
            feed_type,
            quantity,
            feeding_date,
            notes
          )
          VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
          insertSql,
          [
            animalId,
            feedType || null,
            quantity || null,
            feedingDate || null,
            notes || null,
          ],
          (err, result) => {
            if (err) {
              console.error(
                "FEEDING INSERT ERROR:",
                err
              );

              return res.status(500).json({
                error:
                  "Failed to save feeding record",
              });
            }

            console.log(
              "FEEDING RECORD SAVED:",
              result.insertId
            );

            return res.status(201).json({
              success: true,
              id: result.insertId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(
      "UNEXPECTED ROUTE CRASH:",
      error
    );

    return res.status(500).json({
      error: "Server crashed unexpectedly",
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM feeding_records WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete feeding record" });
      }

      res.json({ success: true, message: "Feeding record deleted" });
    }
  );
});

module.exports = router;