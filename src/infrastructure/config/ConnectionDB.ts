import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || "";
  try {
    await mongoose.connect(mongoURI);
    console.log("🚀 Connected to Mongo 🎉");
  } catch (error) {
    console.log("⚠️ Mongo connection error: ", error);
  }
};

export default connectDB;
