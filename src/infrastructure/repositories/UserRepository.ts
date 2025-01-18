import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../infrastructure/schemas/User";
import { IUser } from "../../domain/entities/IUser";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<any> {
    try {
      const response = await User.findOne({ email });
      return response;
    } catch (error) {
      console.error("Erro ao buscar usuário pelo email:", error);
      throw new Error("Erro ao buscar usuário pelo email");
    }
  }

  async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  async create(data: IUser): Promise<IUser> {
    return await User.create(data);
  }
  async update(
    email: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate({ email }, updateData, { new: true });
  }

  async deleteByEmail(
    email: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    const deletedUser = await User.findOneAndDelete({ email });
    return deletedUser;
  }
}
