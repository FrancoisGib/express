const mongoose = require("mongoose");

const connection = mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  connid: {
    type: String,
    required: true
  },
  expire: {
    type: Date,
    required: true
  }
});

// Compile model from schema
module.exports = mongoose.model("connection", connection);