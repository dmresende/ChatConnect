import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

//INF: caso de erro, verifica bloqueio no atlas do IP use 0.0.0.0/0 para autorizar todos os IPs
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🚀 Connected to Mongo 🎉");
  } catch (error) {
    console.log("⚠️ Mongo connection error: ", error);
  }
};

export default connectDB;
