import express from "express";
import userController from "../../controllers/UsuarioController";

const router = express.Router();

router.get("/user/:id", userController.getUserID);
router.get("/users", userController.getUsers);
router.post("/user", userController.postUser);
router.put("/user/:id", userController.putUser);
router.delete("/user/:id", userController.deleteUserID);

export default router;
