import mongoose, { Schema } from "mongoose";
const useSchema = new Schema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true },
    senha: { type: String, required: true },
    dataCriacao: { type: mongoose.Schema.Types.Date, default: Date.now },
    dataAtualizacao: { type: mongoose.Schema.Types.Date, default: Date.now },
    foto: { String },
}, { timestamps: true });
const User = mongoose.model("Usuario", useSchema);
export default User;
