const express = require("express");
const route = express.Router();
const { saveCountry, getCountries } = require("../controller/country");

route.post("/addCountry", saveCountry).get("/getCountry", getCountries);

module.exports = route;
