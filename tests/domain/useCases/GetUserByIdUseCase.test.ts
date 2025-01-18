import GetUserByIdUseCase from "../../../src/domain/useCases/GetUserByIdUseCase";
import { IUserRepository } from "../../../src/domain/interfaces/IUserRepository";
import { IUser } from "../../../src/domain/entities/IUser";

const createMockUser = (data: Partial<IUser> = {}): IUser =>
  ({
    _id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    photo: "photo.jpg",
    $isDefault: () => false,
    $isDeleted: false,
    $isEmpty: false,
    $__: {},
    $init: () => {},
    $markModified: () => {},
    $ignore: () => {},
    $isValid: () => true,
    $set: () => {},
    save: () => Promise.resolve(createMockUser()),
    ...data,
  } as unknown as IUser);

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  deleteByEmail: jest.fn(),
  findAll: jest.fn(),
};

describe("GetUserByIdUseCase", () => {
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getUserByIdUseCase = new GetUserByIdUseCase(mockUserRepository);
  });

  it("deve retornar um usuário quando o email existir", async () => {
    const mockUser = createMockUser({
      _id: "1",
      name: "Test User",
      email: "test@example.com",
    });
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await getUserByIdUseCase.execute("test@example.com");

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "test@example.com"
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve retornar null quando o email não existir", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const result = await getUserByIdUseCase.execute("nonexistent@example.com");

    expect(result).toBeNull();
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com"
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve verificar se o usuário retornado tem as propriedades corretas", async () => {
    const mockUser = createMockUser({
      _id: "1",
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      photo: "photo.jpg",
    });
    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await getUserByIdUseCase.execute("test@example.com");

    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("password");
    expect(result).toHaveProperty("photo");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve lançar um erro quando o repositório falhar", async () => {
    const errorMessage = "Erro no banco de dados";
    mockUserRepository.findByEmail.mockRejectedValue(new Error(errorMessage));

    await expect(
      getUserByIdUseCase.execute("test@example.com")
    ).rejects.toThrow(errorMessage);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
  });
});
