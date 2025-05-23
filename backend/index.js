const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const port = 4000;
const JWT_SECRET = "secret_ecom";

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));

// MongoDB Connection
mongoose
  .connect("mongodb+srv://kishanchannesh19:Pikupiku@cluster0.od9qk.mongodb.net/Krypton")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

// JWT Middleware
function fetchUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.send("Auth API Running...");
});

// MongoDB User Schema
const User = mongoose.model("users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  date: { type: Date, default: Date.now },
});

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ success: false, errors: "Email already registered" });

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password)
      return res.status(400).json({ success: false, errors: "Invalid credentials" });

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// Protected test route (optional)
app.get("/profile", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Auth server running at http://localhost:${port}`);
});
