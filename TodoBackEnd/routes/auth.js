const express = require("express");
const routes= express.Router();
const authController= require("../controller/auth");
routes
    .post('/signup',authController.signup)
    .post('/login',authController.login);

exports.authRouter= routes;