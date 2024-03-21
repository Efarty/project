import express from "express";
import { auth, authAdmin } from "../middlwares/auth.js";
import { getAllInvitaton, getInvitationById, deleteInvitation, addInvitation } from"../culection/Invitation.js"

const router = express.Router(); // בניית ראוטר

router.get("/",getAllInvitaton);
router.get("/:id", auth, getInvitationById);
router.post("/", addInvitation);
// router.delete("/:id", auth, authAdmin, deleteInvitation);
// router.post("/:id", authAdmin, authAdmin);

export default router;
