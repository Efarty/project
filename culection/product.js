// ייבוא המודולים הדרושים
import mongoose from "mongoose";
import { Product } from "../moduls/product.js";

// פונקציה לקבלת כל המוצרים
export const getAllProduct = async (req, res, next) => {
    // קבלת הפרמטרים מהבקשה
    let text = req.query.text || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage||5;
    try {
        // בקשת חיפוש לפי שם או כמות
        let AllProduct = await Product.find({
            $or: [{ name: text }, { Amount: text }]
        }).skip((page - 1) * perPage).limit(perPage);
        // שליחת המוצרים כתשובה
        res.json(AllProduct);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה במקרה של בעיה
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get courses" });
    }
}

// פונקציה לקבלת מוצר על פי קוד
export const getProductById = async (req, res) => {
    let { id } = req.params;
    try {
        // בדיקה אם הקוד תקין
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני ');
        }
        // חיפוש המוצר לפי הקוד
        let product = await Product.findById(id);
        // בדיקה אם המוצר נמצא
        if (!product)
            return res.status(404).json({ type: "not found", massage: "product not found" });
        // שליחת המוצר כתשובה
        res.json(product);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה במקרה של בעיה
        res.status(400).json({ type: "invalid operation", massage: "sorry cannot get product" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // קבלת המזהה מה- params של הבקשה
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני');
        }
        
        // מחיקת המוצר בהתבסס על מזהה ייחודי
        const product = await Product.findOneAndDelete({ _id: id }); // שימוש ב- _id
       
        if (!product)
            return res.status(404).json({ type: "not found", message: "product not found" });

        return res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" });
    }
}



export const addProduct = async (req, res) => {
    let { name, description, price, src } = req.body;
    // בדיקה שכל השדות קיימים
    if (!name || !description || !price || !src)
        return res.status(400).json({ type: "invalid operation", message: "please send name, description, price, src" });
    try {
        // בדיקה אם קיים מוצר עם אותו שם
        let sameProduct = await Product.findOne({ name: name });
        if (sameProduct)
            return res.status(400).json({ type: "invalid operation", message: "product with this name already exists" });
        // יצירת מוצר חדש ושמירתו
        let newProduct = new Product({ name, description, price, src });
        await newProduct.save();
        // שליחת המוצר החדש כתשובה
        return res.json(newProduct);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה במקרה של בעיה
        res.status(400).json({ type: "invalid operation", message: "sorry cannot add product" });
    }
}


// פונקציה לעדכון מוצר
export const updateProduct = async (req, res) => {
    const { id } = req.params; // קבלת המזהה מה- params של הבקשה
    try {
        if (!mongoose.isValidObjectId(id)) {
            res.status(400);
            throw new Error('קוד לא הגיוני');
        }
        
        // קבלת המידע המעודכן מהבקשה
        const updatedData = req.body;
        
        // עדכון המוצר והחזרתו
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        // בדיקה אם המוצר נמצא והחזרתו
        if (!updatedProduct) {
            return res.status(404).json({ type: "not found", message: "product not found" });
        }

        // שליחת המוצר המעודכן בתגובה
        return res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        // שליחת הודעת שגיאה במקרה של בעיה
        res.status(400).json({ type: "invalid operation", message: "sorry cannot update product" });
    }
}
