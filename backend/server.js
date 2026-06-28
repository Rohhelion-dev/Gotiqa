const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================
const animalRoutes = require("./routes/animals");
const healthRecordsRoute = require("./routes/healthRecords");
const activityLogsRoute = require("./routes/activityLogs");
const breedingRecordsRoute = require("./routes/breedingRecords");
const productionRecordsRoute = require("./routes/productionRecords");
const feedingRecordsRoute = require("./routes/feedingRecords");
const authRoutes = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

// ================= API ROUTES =================
app.use("/animals", animalRoutes);
app.use("/health-records", healthRecordsRoute);
app.use("/activity-logs", activityLogsRoute);
app.use("/breeding-records", breedingRecordsRoute);
app.use("/production-records", productionRecordsRoute);
app.use("/feeding-records", feedingRecordsRoute);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoute);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
res.status(200).json({
status: "OK",
message: "Gotiqa backend is running"
});
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
console.error(err);

res.status(500).json({
success: false,
error: "Internal server error"
});
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
