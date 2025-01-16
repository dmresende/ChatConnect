import GetAllUsersUseCase from "../../../src/domain/useCases/GetAllUsersUseCase";
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

describe("GetAllUsersUseCase", () => {
  let getAllUsersUseCase: GetAllUsersUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository);
  });

  it("deve retornar uma lista de usuários quando existirem usuários", async () => {
    // Arrange
    const mockUsers = [
      createMockUser({ _id: "1", name: "User 1", email: "user1@example.com" }),
      createMockUser({ _id: "2", name: "User 2", email: "user2@example.com" }),
      createMockUser({ _id: "3", name: "User 3", email: "user3@example.com" }),
    ];

    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsersUseCase.execute();

    expect(result).toEqual(mockUsers);
    expect(result.length).toBe(3);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar um array vazio quando não existirem usuários", async () => {
    mockUserRepository.findAll.mockResolvedValue([]);

    const result = await getAllUsersUseCase.execute();

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar um array vazio quando o repositório retornar null", async () => {
    mockUserRepository.findAll.mockResolvedValue(null as any);

    const result = await getAllUsersUseCase.execute();

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve lançar um erro quando o repositório falhar", async () => {
    const errorMessage = "Erro no banco de dados";
    mockUserRepository.findAll.mockRejectedValue(new Error(errorMessage));

    await expect(getAllUsersUseCase.execute()).rejects.toThrow(
      `Erro ao buscar usuários: Error: ${errorMessage}`
    );
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve verificar se os usuários retornados têm as propriedades corretas", async () => {
    const mockUsers = [
      createMockUser({
        _id: "1",
        name: "User 1",
        email: "user1@example.com",
        password: "password1",
        photo: "photo1.jpg",
      }),
    ];

    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsersUseCase.execute();

    expect(result[0]).toHaveProperty("_id");
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("email");
    expect(result[0]).toHaveProperty("password");
    expect(result[0]).toHaveProperty("photo");
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
