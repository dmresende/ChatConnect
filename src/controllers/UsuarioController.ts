import { Request, Response } from "express";
import { User } from "../infrastructure/schemas/User";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import GetUserByIdUseCase from "../domain/useCases/GetUserByIdUseCase";
import GetAllUsersUseCase from "../domain/useCases/GetAllUsersUseCase";
import UpdateUserUseCase from "../domain/useCases/UpdateUserUseCase";
import CreateUserUseCase from "../domain/useCases/CreateUserUseCase";
import DeleteUserByEmailUseCase from "../domain/useCases/DeleteUserByEmailUseCase";

const userRepository = new UserRepository();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const udateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserByEmailUseCase = new DeleteUserByEmailUseCase(userRepository);

interface CustomRequest extends Request {
  user?: typeof User;
}

class UserController {
  //TODO -  DEFINIR SE VAMOS USAR ID DO MONGO OU EMAIL
  async getUserID(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const user = await getUserByIdUseCase.execute(email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário", error });
    }
  }

  async getUsers(req: CustomRequest, res: Response): Promise<void> {
    try {
      const users = await getAllUsersUseCase.execute();
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários", error });
    }
  }

  async postUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, photo } = req.body;

      const newUser = await createUserUseCase.execute({
        name,
        email,
        password,
        photo,
      });

      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ message: "Erro ao criar usuário" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  async putUser(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const { name, password, photo } = req.body;

      const updatedUser = await udateUserUseCase.execute({
        email,
        name,
        password,
        photo,
      });

      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar usuário", error });
    }
  }

  async deleteUserID(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params.email;
      const result = await deleteUserByEmailUseCase.execute(email);

      if (result) {
        res.status(200).json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar usuário", error });
    }
  }
}

export default new UserController();
