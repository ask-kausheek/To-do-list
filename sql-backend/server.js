const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // Import sqlite3
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database('./test.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tasks table if not exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, done BOOLEAN)");
});

app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
