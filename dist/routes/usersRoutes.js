import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";
const router = express.Router();
router.get("/", usuarioController.getUsuarioID);
router.get("/usuarios", usuarioController.getUsuarios);
// router.post("/usuario", usuarioController.postUsuario);
// router.put("/usuario/:id", usuarioController.putUsuario);
// router.delete("/usuario/:id", usuarioController.deleteUsuario);
export default router;
