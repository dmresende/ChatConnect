import { Request, Response } from "express";
import UserController from "../../src/controllers/UsuarioController";
import GetUserByIdUseCase from "../../src/domain/useCases/GetUserByIdUseCase";
import GetAllUsersUseCase from "../../src/domain/useCases/GetAllUsersUseCase";
import UpdateUserUseCase from "../../src/domain/useCases/UpdateUserUseCase";
import CreateUserUseCase from "../../src/domain/useCases/CreateUserUseCase";
import DeleteUserByEmailUseCase from "../../src/domain/useCases/DeleteUserByEmailUseCase";

// Mock dos use cases
jest.mock("../../src/domain/useCases/GetUserByIdUseCase");
jest.mock("../../src/domain/useCases/GetAllUsersUseCase");
jest.mock("../../src/domain/useCases/UpdateUserUseCase");
jest.mock("../../src/domain/useCases/CreateUserUseCase");
jest.mock("../../src/domain/useCases/DeleteUserByEmailUseCase");
jest.mock("../../src/infrastructure/repositories/UserRepository");

describe("UserController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockResponse = responseObject;
    mockRequest = {
      params: {},
      body: {},
    };
  });

  describe("getUserID", () => {
    it("deve retornar um usuário quando encontrado", async () => {
      const mockUser = {
        _id: "1",
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        photo: "photo.jpg",
      };

      mockRequest.params = { email: "test@example.com" };
      (GetUserByIdUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        mockUser
      );

      await UserController.getUserID(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockUser);
    });

    it("deve retornar 404 quando usuário não for encontrado", async () => {
      mockRequest.params = { email: "nonexistent@example.com" };
      (GetUserByIdUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        null
      );

      await UserController.getUserID(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Usuário não encontrado",
      });
    });
  });

  describe("getUsers", () => {
    it("deve retornar lista de usuários quando existirem", async () => {
      const mockUsers = [
        { _id: "1", name: "User 1", email: "user1@example.com" },
        { _id: "2", name: "User 2", email: "user2@example.com" },
      ];

      (GetAllUsersUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        mockUsers
      );

      await UserController.getUsers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(mockUsers);
    });

    it("deve retornar 404 quando não houver usuários", async () => {
      (GetAllUsersUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        []
      );

      await UserController.getUsers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Nenhum usuário encontrado",
      });
    });
  });

  describe("postUser", () => {
    it("deve criar um novo usuário com sucesso", async () => {
      const newUser = {
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
        photo: "photo.jpg",
      };

      mockRequest.body = newUser;
      (CreateUserUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        newUser
      );

      await UserController.postUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(201);
      expect(responseObject.json).toHaveBeenCalledWith(newUser);
    });

    it("deve retornar erro 400 quando falhar ao criar usuário", async () => {
      mockRequest.body = {};
      (CreateUserUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        null
      );

      await UserController.postUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(400);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Erro ao criar usuário",
      });
    });
  });

  describe("putUser", () => {
    it("deve atualizar um usuário com sucesso", async () => {
      const updatedUser = {
        name: "Updated User",
        email: "test@example.com",
        password: "newpassword123",
        photo: "newphoto.jpg",
      };

      mockRequest.params = { email: "test@example.com" };
      mockRequest.body = updatedUser;
      (UpdateUserUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        updatedUser
      );

      await UserController.putUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith(updatedUser);
    });

    it("deve retornar 404 quando usuário não for encontrado para atualização", async () => {
      mockRequest.params = { email: "nonexistent@example.com" };
      mockRequest.body = { name: "Test" };
      (UpdateUserUseCase.prototype.execute as jest.Mock).mockResolvedValueOnce(
        null
      );

      await UserController.putUser(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Usuário não encontrado",
      });
    });
  });

  describe("deleteUserID", () => {
    it("deve deletar um usuário com sucesso", async () => {
      mockRequest.params = { email: "test@example.com" };
      (
        DeleteUserByEmailUseCase.prototype.execute as jest.Mock
      ).mockResolvedValueOnce(true);

      await UserController.deleteUserID(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(200);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Usuário deletado com sucesso",
      });
    });

    it("deve retornar 404 quando usuário não for encontrado para deleção", async () => {
      mockRequest.params = { email: "nonexistent@example.com" };
      (
        DeleteUserByEmailUseCase.prototype.execute as jest.Mock
      ).mockResolvedValueOnce(false);

      await UserController.deleteUserID(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseObject.status).toHaveBeenCalledWith(404);
      expect(responseObject.json).toHaveBeenCalledWith({
        message: "Usuário não encontrado",
      });
    });
  });
});
