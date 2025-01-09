import { IUserRepository } from "../interfaces/IUserRepository";

class DeleteUserByEmailUseCase {
  private iuserRepository: IUserRepository;
  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }
  async execute(email: string): Promise<boolean> {
    try {
      const result = await this.iuserRepository.deleteByEmail(email, {});
      return !!result;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error}`);
    }
  }
}

export default DeleteUserByEmailUseCase;
