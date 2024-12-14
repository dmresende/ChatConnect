import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes";
import connectDB from "./config/connectionDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use(usersRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/`);
});
