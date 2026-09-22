const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

// for password reset
const crypto= require('crypto');
const nodemailer= require('nodemailer');

// SETTING TRANSPORTER for sending password verification code
const transporter =nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Generate a JWT token
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "none",
            maxAge: 60 * 60 * 1000   // 1 hour
        });

        res.json({ message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 60 * 60 * 1000   // 1 hour
        });
        res.json({ message: "User logged in successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error logging out"
        });
    }
};

// forgot password
const forgotPassword =async(req,res)=>{
    try{
        const {email} =req.body;

        if(!email){
            return res.status(400).json({message:"Email is required"});

        }

        const normalizedEmail= email.toLowerCase().trim();

        const user =await User.findOne({email:normalizedEmail});
        
        // don't reveal the user email
        if(!user){
            return res.status(200).json({
                message:"If email is registerd, a verification code has been send"
            })
        }

        // generate 6 digit verification code
        const verificationCode= crypto.randomInt(100000,1000000).toString();

        const codeHash=crypto.createHash("sha256").update(verificationCode).digest("hex");

        user.resetCodeHash=codeHash;
        // code expires in 10 minutes

        user.resetCodeExpiresAt= new Date(Date.now()+10*60*1000);

        await user.save();

        // send verification code
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:"Field Visit Management - Password Reset Code",
            text: `Your password reset verification code is ${verificationCode}. This code will expire in 10 minutes.`

        });
        res.status(200).json({message:"If the email is registered, a verification code has been send"});


    }catch(error){
         console.error("Forgot password error:", error);

        res.status(500).json({
            message: "Unable to process password reset request"
        });
    }
}

// verify Password
const verifyPassword =async(req,res)=>{
    try{
        const {email, code}= req.body;

        if(!email || !code){
            return res.status(400).json({
                message:"Email and verification code are required"
            });
        }

        const normalizedEmail =email.toLowerCase().trim();
        const user =await User.findOne({email:normalizedEmail});
        if(!user){
            return res.status(400).json({message:"Invalid verification"});
        }

        if(!user.resetCodeHash || !user.resetCodeExpiresAt){
            return res.status(400).json({message:"Verification code is invalid or expired"});
        }

        // check expiry
        if(new Date() > user.resetCodeExpiresAt){
            return res.status(400).json({message:"Verification code has expired"});
        }

        // Hash submitted code
        const codeHash= crypto.createHash("sha256").update(code).digest("hex");

        // compare hashes
        if(codeHash !==user.resetCodeHash){
            return res.status(400).json({message:"Invalid verification code"});
        }

        const resetToken= jwt.sign({id:user._id, purpose:"PASSWORD_RESET"},process.env.JWT_SECRET,{expiresIn:"10m"});

        // code can no longer be reused
        user.resetCodeHash=undefined;
        user.resetCodeExpiresAt=undefined;
        await user.save();

        // store reset token in http-only cookie
        res.cookie("passwordResetToken", resetToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"none",
            maxAge: 10 *60 *1000
        });

        res.status(200).json({message:"Verification is successful", email:user.email});

    }catch(error){
        console.error("Verify password error:", error);

        res.status(500).json({
            message: "Unable to verify code"
        }); 
    }
}

// updatelogin
const updateLogin = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const resetToken = req.cookies.passwordResetToken;

        if (!resetToken) {
            return res.status(401).json({
                message: "Password reset session expired"
            });
        }

        const decoded = jwt.verify(
            resetToken,
            process.env.JWT_SECRET
        );

        if (decoded.purpose !== "PASSWORD_RESET") {
            return res.status(401).json({
                message: "Invalid password reset token"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        await user.save();

        // Remove reset token after successful password change
        res.clearCookie("passwordResetToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error("Update password error:", error);

        res.status(401).json({
            message: "Password reset session is invalid or expired"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    forgotPassword,
    verifyPassword,
    updateLogin

};
