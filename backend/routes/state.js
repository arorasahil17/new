const express = require("express");
const route = express.Router();
const { saveState, getStates } = require("../controller/state");

route.post("/addState", saveState).get("/:countryId", getStates);

module.exports = route;
