import { config } from "dotenv"
import cors from"cors"
import  express from "express"
import product from "./Routes/product.js";
import  invitation from "./Routes/Invitation.js";
 import user from "./Routes/user.js";
import  {connectToDB}  from "./db/connectDB.js";
import {errorHandling} from "./middlwares/errorHandling.js"


const printDate = (req, res, next) => {
    console.log("a new request in", Date.now())
    next()
}
const app =express();
const addData = (req, res, next) => {
    req.xxx = { name: "diza" };
    next();

}

app.use(cors())
app.use(express.json());
app.use(errorHandling)

connectToDB();
config();
// coonctDB();
app.use("/api/product",product);
app.use(express.static("img"));
app.use("/api/invitation",invitation);
app.use("/api/user",user);
let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
// import { config } from "dotenv"; // מייבא את הפונקציה config מהמודול dotenv שיש בו תצורת הגדרות שקופצות מקובץ .env
// import cors from "cors"; // מייבא את המידול cors שיש בו קוד שמאפשר גישה קרוס-אוריגין לשרת שלך
// import express from "express"; // מייבא את הספריה express שמאפשרת לך לבנות שרת HTTP בקלות רבה
// import product from "./Routes/product.js"; // מייבא את קובץ המסלולים של המוצרים
// import invitation from "./Routes/Invitation.js"; // מייבא את קובץ המסלולים של ההזמנות
// import user from "./Routes/user.js"; // מייבא את קובץ המסלולים של המשתמשים
// import { connectToDB } from "./db/connectDB.js"; // מייבא את פונקציית החיבור לבסיס הנתונים
// import { errorHandling } from "./middlwares/errorHandling.js"; // מייבא את מידלוואר הטיפול בשגיאות

// const printDate = (req, res, next) => { // מגדיר פונקציה שמדפיסה את תאריך הבקשה
//     console.log("a new request in", Date.now());
//     next();
// };

// const app = express(); // יוצר את אפליקציית ה-Express

// const addData = (req, res, next) => { // מגדיר פונקציה שמוסיפה נתונים לבקשה
//     req.xxx = { name: "diza" };
//     next();
// };

// app.use(cors()); // משתמש במידלוואר cors שהבאת כדי לאפשר גישה קרוס-אוריגין
// app.use(express.json()); // מפעיל מידלוואר שמאפשר קריאה של גוף בבקשות בפורמט JSON
// app.use(errorHandling); // משתמש במידלוואר שלך לטיפול בשגיאות

// connectToDB(); // מתחבר לבסיס הנתונים
// config(); // מגדיר את הגדרות המוקשות בקובץ .env
// app.use("/api/product", product); // מיישם מסלולים עבור מוצרים
// app.use(express.static("img")); // מפעיל ספריה סטטית לתמונות בנתיב /img
// app.use("/api/invitation", invitation); // מיישם מסלולים עבור הזמנות
// app.use("/api/user", user); // מיישם מסלולים עבור משתמשים

// let port = process.env.PORT || 5000; // מגדיר את הפורט שבו השרת ירוץ
// app.listen(port, () => { // מאזין לפורט ומדפיס הודעה כאשר השרת מתחיל לרוץ
//     console.log(`app is listening on port ${port}`);
// });

