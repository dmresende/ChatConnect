import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/usuarios", (req, res) => {
  const usuarios = [
    { id: 1, name: "João Silva", email: "joao@example.com" },
    { id: 2, name: "Maria Oliveira", email: "maria@example.com" },
  ];
  res.json(usuarios);
});

app.post("/usuario", express.json(), (req, res) => {
  const { name, email } = req.body;
  res.json({ mesage: `Formulário enviado por ${name} com o email ${email}` });
});

app.put("/usuario/:id", express.json(), (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  res.json({
    message: `Usuário ${id} atualizado para ${name} com o email ${email}`,
  });
});

app.delete("/usuario/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Usuário ${id} deletado com sucesso` });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
