const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

/* GET ALL APPLICATIONS FOR USER */

router.get("/:userId", async (req, res) => {
  try {
    const applications = await Application.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message
    });
  }
});


/* ADD APPLICATION */

router.post("/", async (req, res) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      message: "Application added successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add application",
      error: error.message
    });
  }
});


/* UPDATE APPLICATION */

router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application updated successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update application",
      error: error.message
    });
  }
});


/* DELETE APPLICATION */

router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application",
      error: error.message
    });
  }
});


module.exports = router;