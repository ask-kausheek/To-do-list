const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

// GET all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { done }, { new: true });
    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(deletedTask);
  } catch (err) {
    res.status(500).send(err);
  }
};