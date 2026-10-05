const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch companies",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      message: "Company added successfully",
      company
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add company",
      error: error.message
    });
  }
});

module.exports = router;