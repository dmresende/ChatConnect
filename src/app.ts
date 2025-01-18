import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./infrastructure/routes/UsersRoutes";
import connectDB from "./infrastructure/config/ConnectionDB";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 1111;

app.use(express.json());

app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/`);
});
