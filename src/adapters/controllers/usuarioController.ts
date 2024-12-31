import { Request, Response } from "express";
import {User}  from "../../infrastructure/database/User";

interface CustomRequest extends Request {
  user?: typeof User;
}

class UserController {
  async getUsuarioID(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        const user = await User.findById(req.params.id);

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
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log("❌ Erro ao buscar usuário", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async postUsuario (req: Request, res: Response): Promise<void> {
    try{
      const {nome, usuario, senha} = req.body;
      const usuarioExistente = await User.findOne({usuario});

      if(usuarioExistente){
        res.status(400).json({error: "Este email já está cadastrado"});
        return;
      }
      const novoUsuario = await User.create({nome, usuario, senha});
      res.status(201).json({message: "Usuário cadastrado com sucesso", usuario: novoUsuario});

    }catch(error){
      console.log("❌ Erro ao cadastrar usuário", error);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  }

  async putUsuario (req: Request, res: Response): Promise<void> {
    try{
      const {id} = req.params;
      const {nome, usuario, senha} = req.body;

      const usuarioAtualizado = await User.findByIdAndUpdate(
        id,
        {nome, usuario, senha},
        {new: true}
      );

      if(!usuarioAtualizado) {
        res.status(404).json({error: "Usuário não encontrado"});
        return;
      }

      res.json({message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado});

    }catch(error){
      console.log("❌ Erro ao atualizar usuário", error);
      res.status(500).json({error: "Erro ao atualizar usuário"});
    }
  }

  async deleteUsuario (req: Request, res: Response): Promise<void> {
    try{
      const {id} = req.params;
      await User.findByIdAndDelete(id);
      res.json({message: `Usuário ${id} deletado com sucesso`});

    }catch(error){
      console.log("❌ Erro ao deletar usuário", error);
      res.status(500).json({error: "Erro ao deletar usuário"});
    }
  }
}


export default new UserController();
