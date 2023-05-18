const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  applied: [
    {
      type: String,
    },
  ],
  recent: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
