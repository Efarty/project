
import { Invitation } from "../moduls/Invitation.js";

export const getAllInvitaton = async (req, res, next) => {
    // קבלת הפרמטרים מהבקשה
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 5;
    try {
        // שליחת בקשת קבלת כל ההזמנות עם תמיכה בדפים
        let allInvitations = await Invitation.find({})
            .skip((page - 1) * perPage)
            .limit(perPage);
        // שליחת התוצאה כתשובה
        res.json(allInvitations);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה אם אירעה בעיה
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get allInvitations" });
    }
}

export const getInvitationById = async (req, res) => {
    let { id } = req.params;
    try {
        let invitation = await Invitation.findById(id);
        if (!invitation)
            return res.status(400).json({ type: "invalid operation", message: "sorry cannot get Invitation" });
        res.json(invitation);
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get Invitation" });
    }
}

export const deleteInvitation = async (req, res) => {
    let { id } = req.params;
    try {
        let invitation = await Invitation.findById(id);
        if (!invitation)
            return res.status(400).json({ type: "invalid operation", message: "sorry cannot get Invitation" });
        let deletedInvitation = await Invitation.findByIdAndDelete(id);
        res.json(deletedInvitation);
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot delete Invitation" });
    }
}

export const addInvitation = async (req, res) => {
    let { address, product } = req.body;
    if (!address||!product)
        return res.status(400).json({ type: "invalid operation", message: "please send address and product" });
    try {
        let sameInvitation = await Invitation.findOne({ _id: req.body._id });
        if (sameInvitation)
            return res.status(400).json({ type: "invalid operation", message: "Invitation already exists" });
        let newInvitation = new Invitation({ address,product });
        await newInvitation.save();
        res.json(newInvitation);
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot add Invitation" });
    }
}
