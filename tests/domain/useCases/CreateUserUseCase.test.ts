import CreateUserUseCase from "../../../src/domain/useCases/CreateUserUseCase";
import { IUserRepository } from "../../../src/domain/interfaces/IUserRepository";
import { IUser } from "../../../src/domain/entities/IUser";
import { ICreateUserDTO } from "../../../src/domain/dtos/ICreateUserDTO";
import { UserAlreadyExistsError } from "../../../src/errors/UserAlreadyExistsError";

const mockUserRepository: IUserRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  deleteByEmail: jest.fn(),
  findAll: jest.fn(),
};

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um novo usuário", async () => {
    const createUserUseCase = new CreateUserUseCase(mockUserRepository);

    const userData: ICreateUserDTO = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      photo: "",
    };

    const mockUser: IUser = {
      _id: "1",
      ...userData,
      $isDefault: () => false,
      $isDeleted: false,
      $isEmpty: false,
      $__: {},
      $init: () => {},
      $markModified: () => {},
      $ignore: () => {},
      $isValid: () => true,
      $set: () => {},
      save: () => Promise.resolve(mockUser),
    } as unknown as IUser;

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (mockUserRepository.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUserUseCase.execute(userData);

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
  });

  it("não deve criar um usuário se o email já existir", async () => {
    const createUserUseCase = new CreateUserUseCase(mockUserRepository);

    const userData: ICreateUserDTO = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
      photo: "",
    };

    const existingUser: IUser = {
      _id: "1",
      ...userData,
      $isDefault: () => false,
      $isDeleted: false,
      $isEmpty: false,
      $__: {},
      $init: () => {},
      $markModified: () => {},
      $ignore: () => {},
      $isValid: () => true,
      $set: () => {},
      save: () => Promise.resolve(existingUser),
    } as unknown as IUser;

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(
      existingUser
    );

    await expect(async () => {
      await createUserUseCase.execute(userData);
    }).rejects.toThrowError(
      new UserAlreadyExistsError("Usuário com este email já existe")
    );

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });
});
