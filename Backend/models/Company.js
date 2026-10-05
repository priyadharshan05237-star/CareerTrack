const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },

  jobRole: {
    type: String,
    required: true
  },

  package: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  minimumCGPA: {
    type: Number,
    required: true
  },

  requiredSkills: {
    type: [String],
    default: []
  },

  deadline: {
    type: Date
  },

  driveDate: {
    type: Date
  }
});

module.exports = mongoose.model("Company", companySchema);