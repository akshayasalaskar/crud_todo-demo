const Task = require("../models/TaskModel").Task; // Import the Task model from the TaskModel module

// Defining Express Route Handlers:

// Get all tasks
module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ error: error, msg: "Something went wrong" });
  }
};

// Save a task
module.exports.saveTask = async (req, res) => {
  const { task } = req.body;

  try {
    const data = await Task.create({ task });
    console.log("Saved Successfully");
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error, msg: "Something went wrong" });
  }
};

// Update a task
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    await Task.findByIdAndUpdate(id, { task });
    res.send("Updated successfully");
  } catch (error) {
    res.status(500).json({ error: error, msg: "Something went wrong" });
  }
};

// Delete a task
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.send("Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error, msg: "Something went wrong" });
  }
};
