const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("debug", true);

const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    default: 1,
  },
  registerProvider: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
