const express = require("express");
const route = express.Router();
const saveUser = require("../controller/user");

route.post("/saveUser", saveUser);
module.exports = route;
