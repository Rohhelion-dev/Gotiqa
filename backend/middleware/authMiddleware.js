const jwt = require("jsonwebtoken");
const db = require("../db");

/* ================= AUTHENTICATE USER ================= */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    db.query(
      "SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1",
      [decoded.id]
    )
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(401).json({
            success: false,
            error: "User not found",
          });
        }

        req.user = result.rows[0];
        next();
      })
      .catch((error) => {
        console.error("DB ERROR IN AUTH:", error);
        return res.status(500).json({
          success: false,
          error: "Authentication database error",
        });
      });

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      error: "Session expired. Please log in again.",
    });
  }
}

/* ================= ROLE CHECK ================= */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "You do not have permission to access this resource",
      });
    }

    next();
  };
}

/* ================= EXPORTS ================= */
module.exports = {
  authenticateToken,
  requireRole,
};