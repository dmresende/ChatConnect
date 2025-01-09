import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../entities/IUser";

class UpdateUserUseCase {
  private iuserRepository: IUserRepository;

  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }

  async execute({
    email,
    name,
    password,
    photo,
  }: {
    email: string;
    name?: string;
    password?: string;
    photo?: string;
  }): Promise<IUser | null> {
    try {
      const existingUser = await this.iuserRepository.findByEmail(email);
      if (!existingUser) {
        throw new Error("Usuário não encontrado");
      }

      const updatedUser: IUser | null = await this.iuserRepository.update(
        email,
        {
          name,
          password,
          photo,
        }
      );

      return updatedUser;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error}`);
    }
  }
}

export default UpdateUserUseCase;
