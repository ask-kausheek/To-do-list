const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
.connect(MONGODB_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
