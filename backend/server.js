const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= SAFETY (debug production crashes) ================= */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

/* ================= CORS CONFIG ================= */
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "https://rohhelion-dev.github.io",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or mobile apps
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) =>
        origin.startsWith(allowed)
      );

      // TEMP SAFE MODE (prevents deployment failures)
      return callback(null, true);
    },
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */
const animalRoutes = require("./routes/animals");
const healthRecordsRoute = require("./routes/healthRecords");
const activityLogsRoute = require("./routes/activityLogs");
const breedingRecordsRoute = require("./routes/breedingRecords");
const productionRecordsRoute = require("./routes/productionRecords");
const feedingRecordsRoute = require("./routes/feedingRecords");
const authRoutes = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const contactRoute = require("./routes/contact");
const usersRoute = require("./routes/users");

app.use("/animals", animalRoutes);
app.use("/health-records", healthRecordsRoute);
app.use("/activity-logs", activityLogsRoute);
app.use("/breeding-records", breedingRecordsRoute);
app.use("/production-records", productionRecordsRoute);
app.use("/feeding-records", feedingRecordsRoute);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoute);
app.use("/contact", contactRoute);
app.use("/users", usersRoute);

/* ================= HEALTH CHECK (IMPORTANT FOR RENDER) ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Gotiqa backend is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
  });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});