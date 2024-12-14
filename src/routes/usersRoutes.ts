import express from "express";
import userController from "../controllers/usuarioController";

const router = express.Router();

router.get("/", userController.getUsuarioID);
router.get("/usuarios", userController.getUsuarios);

// router.post("/usuario", usuarioController.postUsuario);
// router.put("/usuario/:id", usuarioController.putUsuario);
// router.delete("/usuario/:id", usuarioController.deleteUsuario);

export default router;
