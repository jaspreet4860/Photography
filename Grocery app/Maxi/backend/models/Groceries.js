const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  quantity: {
    type: String,
    required:true
  },
  rate: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model('Grocery', GrocerySchema);
