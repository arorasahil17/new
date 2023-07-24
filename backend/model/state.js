const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counties",
    required: true,
  },
});

const States = new mongoose.model("States", stateSchema);

module.exports = States;
