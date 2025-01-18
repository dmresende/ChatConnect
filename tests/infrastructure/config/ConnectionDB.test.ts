import mongoose from "mongoose";
import connectDB from "../../../src/infrastructure/config/ConnectionDB";

global.console.log = jest.fn();

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("ConnectionDB", () => {
  let mongoConnectMock: jest.Mock;
  const originalEnv = global.process.env;

  beforeEach(() => {
    global.process.env = { ...originalEnv };

    jest.clearAllMocks();

    mongoConnectMock = mongoose.connect as jest.Mock;
  });

  afterEach(() => {
    global.process.env = originalEnv;
  });

  it("deve conectar ao MongoDB com sucesso usando a URI fornecida", async () => {
    const testUri = "mongodb://test-uri";
    global.process.env.MONGO_URI = testUri;
    mongoConnectMock.mockResolvedValueOnce(undefined);

    await connectDB();

    expect(mongoConnectMock).toHaveBeenCalledWith(testUri);
    expect(mongoConnectMock).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("🚀 Connected to Mongo 🎉");
  });

  it("deve usar string vazia quando MONGO_URI não está definida", async () => {
    global.process.env.MONGO_URI = undefined;
    mongoConnectMock.mockResolvedValueOnce(undefined);

    await connectDB();

    expect(mongoConnectMock).toHaveBeenCalledWith("");
    expect(mongoConnectMock).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("🚀 Connected to Mongo 🎉");
  });

  it("deve lidar com erro de conexão", async () => {
    const testUri = "mongodb://test-uri";
    global.process.env.MONGO_URI = testUri;
    const mockError = new Error("Connection failed");
    mongoConnectMock.mockRejectedValueOnce(mockError);

    await connectDB();

    expect(mongoConnectMock).toHaveBeenCalledWith(testUri);
    expect(mongoConnectMock).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "⚠️ Mongo connection error: ",
      mockError
    );
  });

  it("deve manter a mesma URI em múltiplas chamadas", async () => {
    const testUri = "mongodb://test-uri";
    global.process.env.MONGO_URI = testUri;
    mongoConnectMock.mockResolvedValue(undefined);

    await connectDB();
    await connectDB();
    await connectDB();

    expect(mongoConnectMock).toHaveBeenCalledWith(testUri);
    expect(mongoConnectMock).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith("🚀 Connected to Mongo 🎉");
  });
});
