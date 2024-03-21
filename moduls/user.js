

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    
    email: { type: String, unique: true },
    userName: String,
    password: String, // שדה הסיסמה צריך להיות מחרוזת
    role: { type: String, default: "USER" },
    date: { type: Date, default: Date.now }
});

export const userModel = mongoose.model("userModel", userSchema);

export const generateToken = (_id, role, userName) => {
    let token = jwt.sign({ _id, userName, role }, process.env.SECRET_JWT, {
        expiresIn: "1h"
    });
    return token;
};
