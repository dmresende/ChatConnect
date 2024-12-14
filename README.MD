### **Semana 1 (9 de nov a 15 de nov): Revisão dos Fundamentos**

#### **Objetivo:** Fortalecer conhecimentos em Node.js, MongoDB, React e Next.js.

- **9-10 nov (qui-sex):** Node.js e Express
   - **Exercício:** Crie um servidor simples com Express que responda com "Hello World" em uma rota inicial.
   - **Exercício:** Adicione rotas para listar,{
  "compilerOptions": {
    "target": "ES2020",                       // Define o alvo da compilação JavaScript
    "module": "CommonJS",                    // Usa o sistema de módulos CommonJS (padrão do Node.js)
    "rootDir": "src",                        // Define o diretório raiz dos arquivos TypeScript
    "outDir": "dist",                        // Define o diretório de saída para os arquivos JavaScript compilados
    "strict": true,                            // Habilita todas as verificações de tipo estritas
    "esModuleInterop": true,                  // Habilita a interoperabilidade com módulos ES
    "forceConsistentCasingInFileNames": true, // Garante que o case dos nomes dos arquivos seja consistente
    "skipLibCheck": true,                     // Ignora a verificação de tipos em arquivos de declaração de terceiros
    "resolveJsonModule": true,                // Permite a importação de arquivos JSON
    "moduleResolution": "node",             // Resolve módulos de forma compatível com o Node.js
    "allowSyntheticDefaultImports": true      // Permite importações padrão sintéticas
  },
  "include": ["src/**/*"],                   // Inclui todos os arquivos TypeScript dentro do diretório "src"
  "exclude": ["node_modules", "dist"]       // Exclui os diretórios "node_modules" e "dist" da compilação
}
 adicionar, atualizar e excluir usuários. Cada usuário deve ter nome e email.

- **13-14 nov (seg-ter):** MongoDB
   - **Exercício:** Conecte o CRUD de usuários criado anteriormente a um banco MongoDB.
   - **Exercício:** Teste inserção, atualização, busca e exclusão de dados no MongoDB com usuários fictícios.

- **15 nov (qua - feriado):** Revisão e pausa opcional.

- **16-17 nov (qui-sex):** React e Next.js
   - **Exercício:** Crie uma página com formulário de cadastro de usuário (nome e email) em Next.js.
   - **Exercício:** Implemente uma lista para exibir dados dos usuários cadastrados com o backend Express.

---

### **Semana 2 (20 de nov a 25 de nov): Implementação do Cadastro e Login (Backend e Frontend)**

#### **Objetivo:** Desenvolver funcionalidades de cadastro e login seguras.

- **20-21 nov (seg-ter):** Backend – Cadastro de Usuários
   - **Exercício:** Adicione validações para o cadastro, como verificação de email duplicado.
   - **Exercício:** Implemente feedback para sucesso ou falha na criação de conta.

- **22-23 nov (qua-qui):** Backend – Autenticação com Passport.js
   - **Exercício:** Implemente autenticação com Passport e crie uma rota para exibir "Acesso Permitido" apenas para usuários autenticados.
   - **Exercício:** Teste login com diferentes usuários para validar o funcionamento.

- **24 nov (sex):** Frontend – Tela de Login
   - **Exercício:** Crie formulário de login em Next.js que envie username e senha ao backend.
   - **Exercício:** Após login, redirecione o usuário para a área do chat. Mostre mensagem de erro se o login falhar.

- **25 nov (sab):** Revisão semanal.

---

### **Semana 3 (27 de nov a 2 de dez): Implementação do Chat em Tempo Real**

#### **Objetivo:** Desenvolver sistema de chat com mensagens em tempo real.

- **27-28 nov (seg-ter):** Backend – Socket.io
   - **Exercício:** Configure Socket.io no servidor Express para gerenciar envio e recebimento de mensagens.
   - **Exercício:** Crie uma rota de teste para enviar uma mensagem em tempo real.

- **29-30 nov (qua-qui):** Frontend – Interface do Chat
   - **Exercício:** Desenvolva uma interface com campo de texto e botão "Enviar" para envio de mensagens.
   - **Exercício:** Adicione uma área onde mensagens recebidas são exibidas instantaneamente.

- **1 dez (sex):** Armazenamento de Mensagens
   - **Exercício:** Armazene cada mensagem enviada no MongoDB com remetente, destinatário e horário.
   - **Exercício:** Implemente funcionalidade para carregar mensagens antigas ao abrir o chat.

- **2 dez (sab):** Revisão e ajustes.

---

### **Semanas 4 e 5 (4 de dez a 16 de dez): Funcionalidades Extras e Docker**

#### **Objetivo:** Desenvolver funcionalidades adicionais e configurar ambiente com Docker.

- **4-5 dez (seg-ter):** Lista de Usuários Online/Offline
   - **Exercício:** Exiba uma lista de usuários conectados ao chat.
   - **Exercício:** Atualize status da lista ao conectar/desconectar usuários.

- **6-7 dez (qua-qui):** Docker
   - **Exercício:** Crie um `Dockerfile` para o backend Node.js e `docker-compose.yml` para MongoDB e Node.js.
   - **Exercício:** Execute a aplicação com Docker e teste funcionalidades.

- **8 dez (sex):** Cluster com Node.js
   - **Exercício:** Configure uso de múltiplos processos com a biblioteca `cluster` e teste desempenho do backend.

- **11-15 dez (seg-sex):** Testes Automatizados e Notificações
   - **Exercício:** Implemente testes para rotas de cadastro, login e envio de mensagens, usando Jest ou Mocha.
   - **Exercício:** Configure alertas (som/pop-up) para novas mensagens.

- **16 dez (sab):** Revisão e ajustes finais.

---

### **Semanas 6 e 7 (18 de dez a 30 de dez): Funcionalidades Avançadas e Estudo de Asterisk/Kafka**

#### **Objetivo:** Aprender sobre Asterisk e Kafka, e garantir usabilidade do projeto completo.

- **18-19 dez (seg-ter):** Asterisk e Kafka
   - **Exercício:** Estude tutoriais básicos para troca de mensagens com Kafka e funcionamento de Asterisk.

- **20-21 dez (qua-qui):** Ajustes Finais no Backend
   - **Exercício:** Melhore código do backend e otimize consultas no MongoDB.
   - **Exercício:** Adicione controle de erros detalhado nas rotas.

- **22 dez (sex):** Ajustes Finais no Frontend
   - **Exercício:** Revise e melhore a interface do chat para torná-la mais intuitiva.

- **26 dez (ter):** Teste do Sistema Completo com Docker e Cluster
   - **Exercício:** Execute o sistema completo com Docker e verifique o funcionamento.

- **27-28 dez (qua-qui):** Documentação Inicial
   - **Exercício:** Comece a documentar o código e as funcionalidades principais.

- **29 dez (sex):** Revisão do sistema.

- **30 dez (sab):** Revisão final do backend.

---

### **Semana 8 (2 de jan a 6 de jan): Documentação e Melhorias**

#### **Objetivo:** Organizar código e documentar aplicação.

- **2-3 jan (ter-qua):** Organização do Código e Documentação
   - **Exercício:** Estruture o código e comente partes principais. Atualize README.md com instruções de uso.

- **4-5 jan (qui-sex):** Revisão Geral
   - **Exercício:** Teste o fluxo completo da aplicação e faça melhorias finais no código e na documentação.

- **6 jan (sab):** Revisão geral do frontend.

---

### **Semana 9 (8 de jan a 19 de jan): Preparação para Apresentação e Refinamento**

#### **Objetivo:** Preparar apresentação e garantir qualidade da aplicação.

- **8-12 jan (seg-sex):** Preparação para Apresentação
   - **Exercício:** Crie um roteiro de apresentação. Destaque funcionalidades e decisões técnicas.

- **15-17 jan (seg-qua):** Testes Finais e Ajustes
   - **Exercício:** Realize testes finais de funcionalidade, segurança e desempenho.

- **18-19 jan (qui-sex):** Finalização
   - **Exercício:** Prepare uma apresentação final da aplicação, incluindo slides e resumo das funcionalidades.

