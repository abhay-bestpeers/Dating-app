const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/db");

const userRouter = require("./Route/userRoute");
const protectedRoute = require("./Route/DashboardRoute");
const profileRoute = require("./Route/profileRoute");
const connectionRoute = require("./Route/connectionRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());   

(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
})();

app.use("/api/v1", userRouter);
app.use("/api/v1/protected", protectedRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/connection",connectionRoute);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
