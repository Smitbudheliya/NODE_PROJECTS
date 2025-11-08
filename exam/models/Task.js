const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    // Which user created it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Category reference
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
