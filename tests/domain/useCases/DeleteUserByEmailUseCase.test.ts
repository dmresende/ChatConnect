import DeleteUserByEmailUseCase from "../../../src/domain/useCases/DeleteUserByEmailUseCase";
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

describe("DeleteUserByEmailUseCase", () => {
  let deleteUserByEmailUseCase: DeleteUserByEmailUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteUserByEmailUseCase = new DeleteUserByEmailUseCase(mockUserRepository);
  });

  it("deve deletar um usuário com sucesso", async () => {
    const email = "test@example.com";
    const deletedUser = createMockUser();
    mockUserRepository.deleteByEmail.mockResolvedValue(deletedUser);

    const result = await deleteUserByEmailUseCase.execute(email);

    expect(result).toBe(true);
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledWith(email, {});
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve retornar false quando o usuário não existe", async () => {
    const email = "nonexistent@example.com";
    mockUserRepository.deleteByEmail.mockResolvedValue(null);

    const result = await deleteUserByEmailUseCase.execute(email);

    expect(result).toBe(false);
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledWith(email, {});
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve lançar um erro quando o repositório falha", async () => {
    const email = "test@example.com";
    const errorMessage = "Erro no banco de dados";
    mockUserRepository.deleteByEmail.mockRejectedValue(new Error(errorMessage));

    await expect(deleteUserByEmailUseCase.execute(email)).rejects.toThrow(
      `Erro ao deletar usuário: Error: ${errorMessage}`
    );
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledWith(email, {});
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve tratar retorno vazio do repositório como false", async () => {
    const email = "test@example.com";
    mockUserRepository.deleteByEmail.mockResolvedValue(null);

    const result = await deleteUserByEmailUseCase.execute(email);

    expect(result).toBe(false);
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledWith(email, {});
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledTimes(1);
  });

  it("deve tratar email vazio", async () => {
    const email = "";
    mockUserRepository.deleteByEmail.mockResolvedValue(null);

    const result = await deleteUserByEmailUseCase.execute(email);

    expect(result).toBe(false);
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledWith(email, {});
    expect(mockUserRepository.deleteByEmail).toHaveBeenCalledTimes(1);
  });
});
