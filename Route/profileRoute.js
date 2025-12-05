const express = require("express");
const verifyToken = require("../Middleware/authmiddleware");
const {getUser,updateProfile ,deleteProfile} = require("../Controller/profileController")

const profileRouter = express.Router();

profileRouter.get("/getUser", verifyToken, getUser);
profileRouter.put("/updateUser", verifyToken, updateProfile);
profileRouter.put("/deleteUser", verifyToken, deleteProfile);



module.exports = profileRouter;
