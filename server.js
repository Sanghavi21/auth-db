const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const scanRoutes = require("./routes/scan");
const quizRoutes = require("./routes/quiz");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/quiz", quizRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Default route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


