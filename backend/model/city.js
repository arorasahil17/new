const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
  name: { type: String },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "States",
    required: true,
  },
});

const Cities = new mongoose.model("Cities", citiesSchema);

module.exports = Cities;
