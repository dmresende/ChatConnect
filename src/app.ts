import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./infrastructure/routes/UsersRoutes";
import connectDB from "./infrastructure/config/connectionDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1111;

//connectDB();
app.use(express.json());

app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/`);
});
