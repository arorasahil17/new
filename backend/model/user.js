const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "First Name accepts alphabets only"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "Last Name accepts alphabets only"],
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        const age = today.getFullYear() - value.getFullYear();
        return age >= 14; // Check if the age is older than 14 years
      },
      message: "Age must be older than 14 years",
    },
  },
});

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;
