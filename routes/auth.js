const express = require("express");
const authRoutes = express.Router();
const { gitHubAuth, gitHubCallback, handleCallBack, logout, getProfile } = require("../controllers/auth");

authRoutes.get('/github', gitHubAuth);
authRoutes.get('/github/callback', gitHubCallback, handleCallBack);

authRoutes.get('/profile', getProfile);
authRoutes.get('/logout', logout);

module.exports = authRoutes;