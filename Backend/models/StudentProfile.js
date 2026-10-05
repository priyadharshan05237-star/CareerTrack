const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      default: ""
    },

    phone: {
      type: String,
      default: ""
    },

    location: {
      type: String,
      default: ""
    },

    department: {
      type: String,
      default: ""
    },

    year: {
      type: String,
      default: ""
    },

    college: {
      type: String,
      default: ""
    },

    skills: {
      type: [String],
      default: []
    },

    github: {
      type: String,
      default: ""
    },

    linkedin: {
      type: String,
      default: ""
    },

    projects: {
      type: String,
      default: ""
    },

    certifications: {
      type: String,
      default: ""
    },

    resume: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "StudentProfile",
  studentProfileSchema
);