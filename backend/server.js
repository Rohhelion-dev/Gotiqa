const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const animalRoutes = require("./routes/animals");
const healthRecordsRoute = require("./routes/healthRecords");
const activityLogsRoute = require("./routes/activityLogs");
const breedingRecordsRoute = require("./routes/breedingRecords");
const productionRecordsRoute = require("./routes/productionRecords");
const feedingRecordsRoute = require("./routes/feedingRecords");

// API Endpoints
app.use("/animals", animalRoutes);
app.use("/health-records", healthRecordsRoute);
app.use("/activity-logs", activityLogsRoute);
app.use("/breeding-records", breedingRecordsRoute);
app.use("/production-records", productionRecordsRoute);
app.use("/feeding-records", feedingRecordsRoute);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});