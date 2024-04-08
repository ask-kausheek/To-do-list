// controllers/taskController.js

// Import sqlite3
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('test.db');

// Create task
exports.createTask = (req, res) => {
  const { description } = req.body;
  
  // Insert task into tasks table
  db.run('INSERT INTO tasks (description, done) VALUES (?, ?)', [description, false], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json({ id: this.lastID, description, done: false });
  });
};

// Update task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  // Update task in tasks table
  db.run('UPDATE tasks SET done = ? WHERE id = ?', [done, id], function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json({ id, done });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  // Delete task from tasks table
  db.run('DELETE FROM tasks WHERE id = ?', id, function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json({ id });
  });
};

// Get all tasks
exports.getAllTasks = (req, res) => {
  // Retrieve all tasks from tasks table
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
};
