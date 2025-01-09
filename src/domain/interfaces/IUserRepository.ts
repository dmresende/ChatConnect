import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../entities/IUser";
("../entities/user");

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<IUser>;

  update(email: string, updateData: Partial<IUser>): Promise<IUser | null>;

  deleteByEmail(
    email: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null>;

  findByEmail(email: string): Promise<IUser | null>;

  findAll(): Promise<IUser[]>;
}
