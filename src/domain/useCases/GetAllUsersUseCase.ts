import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../entities/IUser";

class GetAllUsersUseCase {
  private iuserRepository: IUserRepository;

  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }

  async execute(): Promise<IUser[]> {
    try {
      const users = await this.iuserRepository.findAll();
      return users || [];
    } catch (error) {
      throw new Error(`Erro ao buscar usuários: ${error}`);
    }
  }
}

export default GetAllUsersUseCase;
