const express = require("express");
const authRoutes = express.Router();
const {auth} = require("../controllers/auth");

authRoutes.get("/", auth);

module.exports = authRoutes;