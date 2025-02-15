// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Define a schema and model for your Star
const starSchema = new mongoose.Schema({
  position: {
    type: [Number], // e.g., [x, y, z]
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Star = mongoose.model('Star', starSchema);

// Define routes

// Route to create a new star
app.post('/api/stars', async (req, res) => {
  try {
    const message = req.body.message;
    const position = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
    const newStar = new Star({ position, message });
    // TODO: save to MongoDB
    // await newStar.save();
    res.status(201).json(newStar);
  } catch (error) {
    console.error('Error creating star:', error);
    res.status(500).json({ error: 'Failed to create star' });
  }
});

// Route to get all stars
app.get('/api/stars', async (req, res) => {
  try {
    const stars = await Star.find();
    res.status(200).json(stars);
  } catch (error) {
    console.error('Error fetching stars:', error);
    res.status(500).json({ error: 'Failed to fetch stars' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
