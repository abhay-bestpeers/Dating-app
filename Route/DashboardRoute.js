const express = require("express");
const verifyToken = require("../Middleware/authmiddleware");
const {getAllUser,sendRequest,ignoreUser,friendRequest,friendList} = require("../Controller/dashboardController");

const router = express.Router();


router.get("/profile/getAllUser", verifyToken, getAllUser);
router.post("/profile/interested/:id", verifyToken, sendRequest);
router.post("/profile/ignore/:id", verifyToken, ignoreUser);
router.get("/profile/friendRequet", verifyToken, friendRequest);
router.get("/profile/friendList", verifyToken, friendList);

module.exports = router;
