import mongoose, { Schema } from "mongoose";
import { IUser } from "../../domain/entities/IUser";

const useSchema: Schema = new Schema<IUser>(
  {
    nome: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true },
    dataCriacao: { type: mongoose.Schema.Types.Date, default: Date.now },
    dataAtualizacao: { type: mongoose.Schema.Types.Date, default: Date.now },
    foto: { String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("Usuario", useSchema);

