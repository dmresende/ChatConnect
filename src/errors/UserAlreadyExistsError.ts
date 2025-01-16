// Arquivo: src/errors/UserAlreadyExistsError.ts
export class UserAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}
