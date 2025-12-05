const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/db");

const userRouter = require("./Route/userRoute");
const protectedRoute = require("./Route/DashboardRoute");
const profileRoute = require("./Route/profileRoute");
const connectionRoute = require("./Route/connectionRoute");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1", userRouter);
app.use("/api/v1/protected", protectedRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/connection", connectionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
