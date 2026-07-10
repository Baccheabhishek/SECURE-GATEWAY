const express = require("express");
const Router = express.Router();
const {registerUser, userLogin ,userLogOut, me} = require("../controllers/auth.controller")
const authMiddleware = require ("../middlewares/auth.middleware")


Router.post("/register", registerUser);

Router.post("/login" ,userLogin);

Router.post("/logout" ,userLogOut);

Router.get("/me" , authMiddleware.authUser,me);

module.exports= Router;