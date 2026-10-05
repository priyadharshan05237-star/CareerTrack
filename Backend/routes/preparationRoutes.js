const express = require("express");
const Preparation = require("../models/Preparation");
const PreparationProgress = require("../models/PreparationProgress");

const router = express.Router();


// =====================================================
// DETAILED PREPARATION PROGRESS
// =====================================================

// GET DETAILED PREPARATION PROGRESS

router.get("/progress/:userId", async (req, res) => {
  try {
    let progress = await PreparationProgress.findOne({
      userId: req.params.userId
    });

    if (!progress) {
      progress = await PreparationProgress.create({
        userId: req.params.userId
      });
    }

    res.json(progress);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch detailed preparation progress",
      error: error.message
    });
  }
});


// UPDATE DETAILED PREPARATION PROGRESS

router.put("/progress/:userId", async (req, res) => {
  try {
    const progress =
      await PreparationProgress.findOneAndUpdate(
        {
          userId: req.params.userId
        },
        {
          userId: req.params.userId,
          progress: req.body.progress
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

    res.json({
      message: "Detailed preparation progress updated",
      progress
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update detailed preparation progress",
      error: error.message
    });
  }
});


// =====================================================
// OLD PREPARATION ROUTES
// =====================================================


// GET BASIC PREPARATION PROGRESS

router.get("/:studentId", async (req, res) => {
  try {
    const preparation = await Preparation.findOne({
      studentId: req.params.studentId
    });

    res.json(preparation);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch preparation data",
      error: error.message
    });
  }
});


// CREATE BASIC PREPARATION PROGRESS

router.post("/", async (req, res) => {
  try {
    const preparation =
      await Preparation.create(req.body);

    res.status(201).json({
      message: "Preparation data created successfully",
      preparation
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create preparation data",
      error: error.message
    });
  }
});


// UPDATE BASIC PREPARATION PROGRESS

router.put("/:studentId", async (req, res) => {
  try {
    const preparation =
      await Preparation.findOneAndUpdate(
        {
          studentId: req.params.studentId
        },
        req.body,
        {
          new: true,
          upsert: true
        }
      );

    res.json({
      message: "Preparation progress updated",
      preparation
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update preparation",
      error: error.message
    });
  }
});


module.exports = router;