import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../entities/IUser";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

class CreateUserUseCase {
  private iuserRepository: IUserRepository;

  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }

  async execute({
    name,
    email,
    password,
    photo,
  }: ICreateUserDTO): Promise<IUser | null> {
    try {
      const existingUser = await this.iuserRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("Usuário com este email já existe");
      }

      const newUser: IUser = await this.iuserRepository.create({
        name,
        email,
        password,
        photo: photo || "",
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default CreateUserUseCase;
