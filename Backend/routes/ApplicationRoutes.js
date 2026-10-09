const express = require("express");
const mongoose = require("mongoose");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET APPLICATIONS FOR THE LOGGED-IN USER
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const loggedInUserId = req.user.userId;

    // Prevent access to another user's applications
    if (requestedUserId !== loggedInUserId) {
      return res.status(403).json({
        message: "You cannot access another user's applications."
      });
    }

    const applications = await Application.find({
      userId: loggedInUserId
    }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error.message);

    res.status(500).json({
      message: "Failed to fetch applications."
    });
  }
});


// ADD APPLICATION
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { company, role, location, appliedDate, status, notes } = req.body;

    if (!company || !company.trim()) {
      return res.status(400).json({
        message: "Company name is required."
      });
    }

    const application = await Application.create({
      userId: req.user.userId,
      company: company.trim(),
      role,
      location,
      appliedDate,
      status,
      notes
    });

    res.status(201).json({
      message: "Application added successfully.",
      application
    });
  } catch (error) {
    console.error("Add application error:", error.message);

    res.status(500).json({
      message: "Failed to add application."
    });
  }
});


// UPDATE ONLY THE LOGGED-IN USER'S APPLICATION
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid application ID."
      });
    }

    // Never allow changing the owner through the request body
    const updates = { ...req.body };
    delete updates.userId;
    delete updates._id;

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found."
      });
    }

    res.json({
      message: "Application updated successfully.",
      application
    });
  } catch (error) {
    console.error("Update application error:", error.message);

    res.status(500).json({
      message: "Failed to update application."
    });
  }
});


// DELETE ONLY THE LOGGED-IN USER'S APPLICATION
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid application ID."
      });
    }

    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found."
      });
    }

    res.json({
      message: "Application deleted successfully."
    });
  } catch (error) {
    console.error("Delete application error:", error.message);

    res.status(500).json({
      message: "Failed to delete application."
    });
  }
});

module.exports = router;