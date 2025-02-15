const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  starId: {
    type: String, // uuid
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Star = mongoose.model('Star', starSchema, 'Star');

module.exports = Star;