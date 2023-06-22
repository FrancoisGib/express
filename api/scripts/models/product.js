const mongoose = require("mongoose");

const product = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  proteines: {
    type: Number,
    required: true
  },
  glucides: {
    type: Number,
    required: true
  },
  lipides: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  userid: {
    type: String,
    required: false
  }
});

// Compile model from schema
module.exports = mongoose.model("product", product);