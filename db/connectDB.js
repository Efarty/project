import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.PORT || "mongodb+srv://e0548535701:PEhc6_76w-aH3L$@cluster0.h9ac2te.mongodb.net/")
        console.log("mongo db connected")
    }                                                                       
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}

