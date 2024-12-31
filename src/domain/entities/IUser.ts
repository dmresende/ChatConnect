import { Document } from "mongoose";

export interface IUser extends Document {
  nome: string;
  usuario: string;
  senha: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  foto?: string;
}
