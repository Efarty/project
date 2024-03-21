import express from "express";
import { auth,authAdmin } from "../middlwares/auth.js";
import { getAllUsers, addUser, login ,getUserById,} from "../culection/user.js";

const router = express.Router(); // בניית ראוטר
// כל הפונקציות שמתייחסות ליוזר

router.get("/",authAdmin, getAllUsers);
router.post("/", addUser);
router.get("/:id",getUserById );
router.post("/login" ,login);

// Example route for address validation
router.post("/validateAddress", async (req, res) => {
    const { address } = req.body;
    try {
      const isValidAddress = await validateAddress(address);
      res.json({ isValidAddress });
    } catch (error) {
      console.error("Error validating address:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
