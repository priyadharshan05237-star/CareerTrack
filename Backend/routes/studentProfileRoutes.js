const express = require("express");
const StudentProfile = require("../models/StudentProfile");

const router = express.Router();

/* GET PROFILE */

router.get("/:userId", async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      userId: req.params.userId
    });

    if (!profile) {
      return res.json(null);
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message
    });
  }
});


/* CREATE / UPDATE PROFILE */

router.put("/:userId", async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      {
        userId: req.params.userId
      },
      {
        userId: req.params.userId,
        ...req.body
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.json({
      message: "Profile updated successfully",
      profile
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
});


/* DELETE PROFILE */

router.delete("/:userId", async (req, res) => {
  try {
    await StudentProfile.findOneAndDelete({
      userId: req.params.userId
    });

    res.json({
      message: "Profile deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete profile",
      error: error.message
    });
  }
});


module.exports = router;