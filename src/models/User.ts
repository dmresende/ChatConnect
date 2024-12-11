import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  nome: string;
  usuario: string;
  senha: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  foto?: string;
}

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

const User = mongoose.model<IUser>("Usuario", useSchema);

export default User;
