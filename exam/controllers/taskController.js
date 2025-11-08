const Task = require("../models/Task");

// Add Task
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      user: req.user.id
    });

    await task.save();
    res.json({ message: "Task added successfully" });
  } catch (error) {
    console.log("ADD TASK ERROR =>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get My Tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log("GET TASK ERROR =>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Task (user can delete only own)
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("DELETE TASK ERROR =>", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
