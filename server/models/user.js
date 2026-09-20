const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["FIELD_OFFICER", "HQ_APPROVER", "ADMIN"],
        default: "FIELD_OFFICER",
        required: true
    },
    // for reset password
    resetCodeHash: {
        type: String
    },

    resetCodeExpiresAt: {
        type: Date
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;