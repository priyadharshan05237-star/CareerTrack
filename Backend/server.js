const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const loginRoutes = require("./routes/loginRoutes");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const preparationRoutes = require("./routes/preparationRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/preparation", preparationRoutes);
app.use("/api/student-profile", studentProfileRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CareerTrack Backend is Running");
});

// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`CareerTrack Backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
  });