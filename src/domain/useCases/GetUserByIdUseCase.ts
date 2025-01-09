import { IUserRepository } from "../interfaces/IUserRepository";

//TODO -  DEFINIR SE VAMOS USAR ID DO MONGO OU EMAIL
export default class GetUserByIdUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
