const jwt = require("jsonwebtoken");
const db = require("../db");

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
      "SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1",
      [decoded.id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: "Authentication failed",
          });
        }

        if (result.length === 0) {
          return res.status(401).json({
            success: false,
            error: "User not found",
          });
        }

        req.user = result[0];
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Session expired. Please log in again.",
    });
  }
}

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

module.exports = {
  authenticateToken,
  requireRole,
};
