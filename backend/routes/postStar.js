const express = require('express');
const Star = require('../models/Star');

const router = express.Router();

// Route to create a new star
router.post('/api/stars', async (req, res) => {
  try {
    const { starId, position, message } = req.body;
    const newStar = new Star({ starId, position, message });
    // Save to MongoDB
    await newStar.save();
    res.status(201).json(newStar);
    console.log('Star created:', newStar);
  } catch (error) {
    console.error('Error creating star:', error);
    res.status(500).json({ error: 'Failed to create star' });
  }
});

module.exports = router;