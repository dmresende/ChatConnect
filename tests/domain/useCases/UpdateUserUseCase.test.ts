import UpdateUserUseCase from "../../../src/domain/useCases/UpdateUserUseCase";
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

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    updateUserUseCase = new UpdateUserUseCase(mockUserRepository);
  });

  it("deve atualizar um usuário com sucesso quando todos os campos são fornecidos", async () => {
    const existingUser = createMockUser();
    const updateData = {
      email: "test@example.com",
      name: "Updated Name",
      password: "newpassword123",
      photo: "newphoto.jpg",
    };
    const updatedUser = createMockUser({
      ...updateData,
      _id: existingUser._id,
    });

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    mockUserRepository.update.mockResolvedValue(updatedUser);

    const result = await updateUserUseCase.execute(updateData);

    expect(result).toEqual(updatedUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      updateData.email
    );
    expect(mockUserRepository.update).toHaveBeenCalledWith(updateData.email, {
      name: updateData.name,
      password: updateData.password,
      photo: updateData.photo,
    });
  });

  it("deve atualizar um usuário com sucesso quando apenas alguns campos são fornecidos", async () => {
    const existingUser = createMockUser();
    const updateData = {
      email: "test@example.com",
      name: "Updated Name",
    };
    const updatedUser = createMockUser({
      ...existingUser,
      name: updateData.name,
    });

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    mockUserRepository.update.mockResolvedValue(updatedUser);

    const result = await updateUserUseCase.execute(updateData);

    expect(result).toEqual(updatedUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      updateData.email
    );
    expect(mockUserRepository.update).toHaveBeenCalledWith(updateData.email, {
      name: updateData.name,
      password: undefined,
      photo: undefined,
    });
  });

  it("deve lançar erro quando o usuário não for encontrado", async () => {
    const updateData = {
      email: "nonexistent@example.com",
      name: "Updated Name",
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(updateUserUseCase.execute(updateData)).rejects.toThrow(
      "Erro ao atualizar usuário: Error: Usuário não encontrado"
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      updateData.email
    );
    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });

  it("deve lançar erro quando o repositório falhar na atualização", async () => {
    const existingUser = createMockUser();
    const updateData = {
      email: "test@example.com",
      name: "Updated Name",
    };
    const errorMessage = "Erro no banco de dados";

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    mockUserRepository.update.mockRejectedValue(new Error(errorMessage));

    await expect(updateUserUseCase.execute(updateData)).rejects.toThrow(
      `Erro ao atualizar usuário: Error: ${errorMessage}`
    );
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      updateData.email
    );
    expect(mockUserRepository.update).toHaveBeenCalledWith(updateData.email, {
      name: updateData.name,
      password: undefined,
      photo: undefined,
    });
  });

  it("deve verificar se o usuário atualizado tem as propriedades corretas", async () => {
    const existingUser = createMockUser();
    const updateData = {
      email: "test@example.com",
      name: "Updated Name",
      password: "newpassword123",
      photo: "newphoto.jpg",
    };
    const updatedUser = createMockUser(updateData);

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);
    mockUserRepository.update.mockResolvedValue(updatedUser);

    const result = await updateUserUseCase.execute(updateData);

    expect(result).toHaveProperty("_id");
    expect(result).toHaveProperty("name", updateData.name);
    expect(result).toHaveProperty("email", updateData.email);
    expect(result).toHaveProperty("password", updateData.password);
    expect(result).toHaveProperty("photo", updateData.photo);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(mockUserRepository.update).toHaveBeenCalledTimes(1);
  });
});
