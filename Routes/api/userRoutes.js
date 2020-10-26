const express = require("express");
const route = express.Router();
const  auth = require("../../controller/auth");

route.post("/login",auth.post_login);
route.post("/register",auth.post_reg);
route.get("/logout",auth.logout);
module.exports = route;