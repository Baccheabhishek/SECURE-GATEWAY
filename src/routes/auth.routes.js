const express = require("express");
const Router = express.Router();
const {registerUser} = require("../controllers/auth.controller")


Router.post("/register", registerUser);

module.exports= Router;