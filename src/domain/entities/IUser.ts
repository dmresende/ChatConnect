import { Document } from "mongoose";

//INF:  interface específica para o Mongoose, usada para tipar os documentos do banco de dados
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo?: string;
}
