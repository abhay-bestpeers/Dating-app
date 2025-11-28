const express = require("express");
const verifyToken = require("../Middleware/authmiddleware");
const {getUser,updateProfile} = require("../Controller/profileController")

const profileRouter = express.Router();

profileRouter.get("/getUser", verifyToken, getUser);
profileRouter.put("/updateUser", verifyToken, updateProfile);



module.exports = profileRouter;
