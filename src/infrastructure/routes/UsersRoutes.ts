import express from "express";
import userController from "../../controllers/UsuarioController";

const router = express.Router();

router.get("/usuarios/:id", userController.getUserID);
router.get("/usuarios", userController.getUsers);
router.post("/usuario", userController.postUser);
router.put("/usuario/:id", userController.putUser);
router.delete("/usuario/:id", userController.deleteUserID);

export default router;
