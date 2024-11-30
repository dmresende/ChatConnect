import { Request, Response } from "express";

const helloUser = (req: Request, res: Response) => {
  res.send("Hello World Usu[ario!");
};

const getUsuarios = (req: Request, res: Response) => {
  const usuarios = [
    { id: 1, name: "João Silva", email: "joao@example.com" },
    { id: 2, name: "Maria Oliveira", email: "maria@example.com" },
  ];
  res.json(usuarios);
};

const postUsuario = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.json({ mesage: `Formulário enviado por ${name} com o email ${email}` });
};

const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({
    message: `Usuário ${id} atualizado para ${name} com o email ${email}`,
  });
};

const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({ message: `Usuário ${id} deletado com sucesso` });
};

export const usuarioController = {
  helloUser,
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
