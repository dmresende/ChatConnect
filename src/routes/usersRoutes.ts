import express from "express";
import userController from "../controllers/usuarioController";

const router = express.Router();

router.get("/usuarios/:id", userController.getUsuarioID);
router.get("/usuarios", userController.getUsuarios);
router.post("/usuario", userController.postUsuario);
router.put("/usuario/:id", userController.putUsuario);
router.delete("/usuario/:id", userController.deleteUsuario);


export default router;
