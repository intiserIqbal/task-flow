require("dotenv").config();
require("./db/database");
const taskRoutes = require("./routes/taskRoutes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Task-Flow API running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
