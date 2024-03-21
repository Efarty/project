
import express from "express";
import { authAdmin } from "../middlwares/auth.js";
import{getAllProduct,getProductById,deleteProduct,addProduct,updateProduct} from"../culection/product.js"

const router = express.Router(); // בניית ראוטר
// כל הפונקציות שמתייחסות למוצרים

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.delete("/:id",deleteProduct);
router.post("/",addProduct);
router.put("/:id", updateProduct);

export default router;
