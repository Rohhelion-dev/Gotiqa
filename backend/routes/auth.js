const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

/*
REGISTER
*/
router.post("/register", (req, res) => {

const {
name,
email,
password,
role
} = req.body;

const hashedPassword =
bcrypt.hashSync(password, 10);

const sql = `     INSERT INTO users
    (
      name,
      email,
      password_hash,
      role
    )
    VALUES (?, ?, ?, ?)
  `;

db.query(
sql,
[
name,
email,
hashedPassword,
role || "investor"
],
(err, result) => {


  if (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json(err);
  }

  res.json({
    success: true,
    id: result.insertId
  });

}


);
});

/*
LOGIN
*/
router.post("/login", (req, res) => {

const {
email,
password
} = req.body;

const sql =
"SELECT * FROM users WHERE email = ?";

db.query(
sql,
[email],
(err, result) => {


  if (err) {
    console.error("LOGIN DB ERROR:", err);
    return res.status(500).json(err);
  }

  if (result.length === 0) {
    return res.status(401).json({
      error: "User not found"
    });
  }

  const user = result[0];

  console.log("================================");
  console.log("EMAIL ENTERED:", email);
  console.log("PASSWORD ENTERED:", password);
  console.log("USER FOUND:", user.email);
  console.log("HASH IN DB:", user.password_hash);

  const validPassword =
    bcrypt.compareSync(
      password,
      user.password_hash
    );

  console.log("PASSWORD MATCH:", validPassword);
  console.log("================================");

  if (!validPassword) {
    return res.status(401).json({
      error: "Invalid password"
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });

}

);
});

module.exports = router;
