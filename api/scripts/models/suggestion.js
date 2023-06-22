const mongoose = require("mongoose");

const suggestion = mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Compile model from schema
module.exports = mongoose.model("suggestion", suggestion);