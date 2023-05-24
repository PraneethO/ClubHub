const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
