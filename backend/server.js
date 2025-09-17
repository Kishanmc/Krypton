const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));

// DB Connection
require("./config/db")();

// Routes
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => res.send("Auth API Running..."));

// Start server
app.listen(port, () => {
  console.log(`✅ Auth server running at http://localhost:${port}`);
});
