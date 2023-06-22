const mongoose = require("mongoose");

const client = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
});

// Compile model from schema
module.exports = mongoose.model("client", client);