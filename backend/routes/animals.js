const express = require("express");
const router = express.Router();
const db = require("../db");
const { authenticateToken, requireRole } = require("../middleware/authMiddleware");

/* ================= GET ALL ANIMALS (PAGINATED + SEARCH) ================= */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    let baseSql = `FROM animals`;
    const params = [];

    if (search) {
      baseSql += `
        WHERE tag_number ILIKE $1
        OR name ILIKE $1
        OR species ILIKE $1
        OR breed ILIKE $1
        OR gender ILIKE $1
      `;
      params.push(`%${search}%`);
    }

    const countResult = await db.query(`SELECT COUNT(*) ${baseSql}`, params);
    const total = parseInt(countResult.rows[0].count);

    const dataSql = `
      SELECT id, tag_number, name, species, breed, age, gender, weight, notes, created_at
      ${baseSql}
      ORDER BY created_at DESC, id DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    const dataResult = await db.query(dataSql, [...params, limit, offset]);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (err) {
    console.error(err);
    console.error("ANIMALS GET ERROR:", err); res.status(500).json({ error: err.message });
  }
});

/* ================= GET SINGLE ANIMAL ================= */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM animals WHERE id = $1`,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch animal" });
  }
});

/* ================= CREATE ANIMAL ================= */
router.post("/", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const { tagNumber, name, species, breed, age, gender, weight, notes } = req.body;

    const result = await db.query(
      `INSERT INTO animals (tag_number, name, species, breed, age, gender, weight, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id`,
      [tagNumber, name, species, breed, age, gender, weight, notes]
    );

    res.json({ success: true, id: result.rows[0].id });

  } catch (err) {
    console.error(err);
    console.error("ANIMAL CREATE ERROR:", err); res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE ANIMAL ================= */
router.delete("/:id", authenticateToken, requireRole("admin"), async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM animals WHERE id = $1 RETURNING id",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Animal not found" });
    }

    res.json({ success: true, message: "Animal deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete animal" });
  }
});

module.exports = router;
