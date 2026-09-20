const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const { registerUser, loginUser, logoutUser,getUserProfile ,forgotPassword, verifyPassword , updateLogin} = require("../controllers/authController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/logout",auth, logoutUser);
userRouter.get("/profile",auth, getUserProfile);

// forgot user
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/verifyPassword", verifyPassword);
userRouter.post("/updateLogin",updateLogin);

module.exports = userRouter;