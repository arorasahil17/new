const express = require("express");
const route = express.Router();
const { saveCity, getCities } = require("../controller/city");

route.post("/addCity", saveCity).get("/city/:stateID", getCities);
module.exports = route;
