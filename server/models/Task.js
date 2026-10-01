const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignedTo: {
      type: String,
      trim: true,
      default: "Unassigned",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // auto-adds createdAt and updatedAt
  },
);

module.exports = mongoose.model("Task", taskSchema);
