const express = require('express');
const Star = require('../models/Star');

const router = express.Router();
const starLimit = 5;


// Route to get all stars (limit to 5 stars)
router.get('/api/stars', async (req, res) => {
  try {
    const stars = await Star.find().limit(starLimit);
    res.status(200).json(stars);
  } catch (error) {
    console.error('Error fetching stars:', error);
    res.status(500).json({ error: 'Failed to fetch stars' });
  }
});

module.exports = router;