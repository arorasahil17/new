const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Countries = new mongoose.model("Countries", countrySchema);

module.exports = Countries;
