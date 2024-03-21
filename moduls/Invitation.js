
import mongoose from "mongoose";

const Product= mongoose.Schema({
    name: String,
    price:Number
});


const invitationSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    address: String,
    product: [Product], // מערך של מוצרים 
    started: Boolean
});

export const Invitation = mongoose.model("Invitation", invitationSchema);
