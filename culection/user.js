import mongoose from "mongoose";
import { generateToken, userModel} from "../moduls/user.js";
import  bcrypt  from "bcryptjs";

export const getAllUsers = async (req,res) => {
    let text = req.query.text || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage||5;
    try {
        let allUsers = await userModel.find({}, "-password").skip((page - 1) * perPage).limit(perPage);
        res.json(allUsers);
    } catch (err) {
        res.status(400).json({ type: "invalid operation", massage: "sorry cannot get users" });
    }
}

// פונקציה לקבלת מוצר על פי קוד
export const getUserById = async (req, res) => {
    let { id } = req.params;
    try {
        // בדיקה אם הקוד תקין
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני ');
        }
        // חיפוש יוזר לפי הקוד
        let userModel = await userModel.findById(id);
        // בדיקה אם המוצר נמצא
        if (!userModel)
            return res.status(404).json({ type: "not found", massage: "user not found" });
        // שליחת user כתשובה
        res.json(userModel);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה במקרה של בעיה
        res.status(400).json({ type: "invalid operation", massage: "sorry cannot get user" });
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ type: "invalid operation", massage: "please send email, userName, and password" });
    try {
        let user = await userModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "no user", massage: "no user or more details are invalid" });
            if (!await bcrypt.compare(password, user.password))
            return res.status(404).json({ type: "no user", massage: "user password is invalid" });
        
        if (!await bcrypt.compare(password, user.password))
            return res.status(404).json({ type: "no user", massage: "user password is invalid" });
        let token = generateToken(user._id, user.role, user.userName);
        console.log(token)
        return res.json({ _id:user._id,userName: user.userName, token, email: user.email ,role:user.role});
    } catch (err) {
        console.log(err);
         return  res.status(400).json({ type: "invalid operation", massage: "sorry cannot add user" });
    }
}

export const addUser = async (req, res) => {
    let { email, password, userName, role } = req.body;
    if (!email || !password || !userName)
        return res.status(400).json({ type: "invalid operation", massage: "please send email, userName, and password" });
    try {
        let sameUser = await userModel.findOne({ email: email });
        if (sameUser)
            return res.status(409).json({ type: "same user", massage: "user with such email already exists" });
        let hashedPassword = await bcrypt.hash(password, 15);
        let newuser = new userModel({ email, password:hashedPassword, userName, role });
        await newuser.save();
        let token = generateToken(newuser._id, newuser.role, newuser.userName);
        return res.status(201).json({ _id:newuser._id ,userName, token, email, role:newuser.role });
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", massage: "sorry cannot add user" });
    }
}
