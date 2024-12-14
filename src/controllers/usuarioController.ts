import { Request, Response } from "express";
import User, { IUser } from "../models/User";
interface CustomRequest extends Request {
  user?: IUser;
}

class UserController {
  async getUsuarioID(req: CustomRequest, res: Response): Promise<void> {
    try {
      if (req.user) {
        const user = await User.findById(req.user._id);

        if (!user) {
          res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json(user);
      } else {
        res.status(401).json({ error: "Usuário não autenticadoo" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async getUsuarios(req: CustomRequest, res: Response): Promise<void> {
    try {
      console.log("Entrou");
      const users = await User.find();
      console.log("🚀  users", users);
      res.json(users);
    } catch (error) {
      console.log("❌ Erro ao buscar usuário", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }
}

// const postUsuario = (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   res.json({ mesage: `Formulário enviado por ${name} com o email ${email}` });
// };

// const putUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
//   res.json({
//     message: `Usuário ${id} atualizado para ${name} com o email ${email}`,
//   });
// };

// const deleteUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;

//   res.json({ message: `Usuário ${id} deletado com sucesso` });
// };

export default new UserController();
