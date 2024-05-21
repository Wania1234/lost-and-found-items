const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timeLost: {
    type: String,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId, // Reference to the User model
    required: true,
    ref: 'User'
  }
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
