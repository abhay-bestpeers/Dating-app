const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../Controller/userController");
const verifyToken = require("../Middleware/authmiddleware");

const userRouter = express.Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/logout", logoutUser);

module.exports = userRouter;
    