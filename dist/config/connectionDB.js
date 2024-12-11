import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🚀 Connected to Mongo 🎉");
    }
    catch (error) {
        console.log("⚠️ Mongo connection error: ", error);
    }
};
export default connectDB;
