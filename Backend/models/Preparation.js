const mongoose = require("mongoose");

const preparationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  aptitudeProgress: {
    type: Number,
    default: 0
  },

  codingProgress: {
    type: Number,
    default: 0
  },

  communicationProgress: {
    type: Number,
    default: 0
  },

  interviewProgress: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Preparation", preparationSchema);