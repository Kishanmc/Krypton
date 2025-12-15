const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const simulationsRoutes = require("./routes/simulationRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
require("./config/db")();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/simulations", simulationsRoutes);

// Root endpoint
app.get("/", (req, res) => res.send("Auth API Running..."));

// Start server
app.listen(port, () => {
  console.log(`✅ Auth server running at http://localhost:${port}`);
});
