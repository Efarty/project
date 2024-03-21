import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    date: { type: Date, default: Date.now }, // הוספת תקינות לשדה התאריך
    price: Number,
    src: String // ניתוב של תמונה 
});




export const Product = mongoose.model("Product", productSchema); // שימוש בשם הסכימה ולא במשתנה שאינו מוגדר

