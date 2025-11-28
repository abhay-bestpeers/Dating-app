const express = require("express")
const verifyToken = require("../Middleware/authmiddleware")

const { acceptRequest,rejectUser} = require("../Controller/connectionController");

const connectionRouter = express.Router();


connectionRouter.post("/accept/:id",verifyToken,acceptRequest);
connectionRouter.post("/reject/:id",verifyToken,rejectUser);


module.exports =connectionRouter;
