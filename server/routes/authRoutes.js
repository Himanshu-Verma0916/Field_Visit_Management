const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const { registerUser, loginUser, logoutUser,getUserProfile } = require("../controllers/authController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout",auth, logoutUser);
userRouter.get("/profile",auth, getUserProfile);

module.exports = userRouter;