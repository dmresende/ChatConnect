# ChatConnect

**ChatConnect** é um projeto em andamento, desenvolvido com o objetivo de reforçar os conhecimentos em diversas tecnologias, como **Node.js**, **Express**, **Passport.js**, **MongoDB**, **Socket.IO**, **Docker**, **Cluster**, **React**, **React Native** e **Testes**. O objetivo é criar um sistema de chat em tempo real, com funcionalidades como cadastro, login, autenticação, comunicação em tempo real e armazenamento de mensagens. O projeto está sendo desenvolvido ao longo do tempo, com várias funcionalidades ainda em implementação.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript/ TS no servidor.
- **Express**: Framework web para Node.js, utilizado para criar o servidor e as rotas do backend.
- **Passport.js**: Middleware de autenticação para Node.js, utilizado para autenticar usuários com login e senha.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar dados de usuários e mensagens.
- **Socket.IO**: Biblioteca para comunicação em tempo real entre servidor e cliente.
- **Docker**: Plataforma de containerização usada para criar, testar e implantar a aplicação em diferentes ambientes.
- **Cluster**: Módulo de Node.js utilizado para otimizar o desempenho do servidor, rodando múltiplos processos.
- **React**: Biblioteca JavaScript para construir a interface de usuário no frontend.
- **React Native (Expo)**: Framework para desenvolver aplicativos móveis nativos, com foco em iOS e Android.
- **Testes (Jest/Mocha)**: Ferramentas de testes para garantir a qualidade e a robustez das funcionalidades do sistema.

## Funcionalidades em Desenvolvimento

Atualmente, o projeto está em desenvolvimento e muitas funcionalidades estão sendo implementadas de forma gradual. Algumas das funcionalidades que estão sendo trabalhadas incluem:

- **Cadastro e Login de Usuários**: Sistema de cadastro e login com validações (em andamento).
- **Autenticação com Passport.js**: Implementação de autenticação segura (em progresso).
- **Chat em Tempo Real**: Sistema de comunicação instantânea entre usuários usando Socket.IO (ainda em desenvolvimento).
- **Armazenamento de Mensagens**: Persistência das mensagens enviadas em um banco de dados MongoDB (em desenvolvimento).
- **Interface Mobile**: Interface de aplicativo mobile com React Native (Expo) (em andamento).
- **Dockerização**: A aplicação está sendo containerizada com Docker (em progresso).
- **Clusterização**: Implementação do módulo Cluster para otimizar o desempenho (ainda em desenvolvimento).
- **Testes Automatizados**: Testes sendo implementados para garantir a confiabilidade das funcionalidades (em progresso).

## Funcionalidades Futuras

Após a implementação das funcionalidades principais, algumas melhorias e novas funcionalidades estão planejadas para o futuro, incluindo:

- **Notificações em Tempo Real** (push notifications).
- **Videoconferência** no sistema de chat.
- Expansão da autenticação com **OAuth** para login com Google, Facebook, etc.
- **Melhorias no Desempenho** do chat, como filas de mensagens e otimizações no banco de dados.

## Estrutura de pastas propostas
src/
├── config/              # General configurations
│   ├── database.js      # MongoDB configuration and connection
│   ├── passport.js      # Passport.js configuration (optional)
│   └── ...              # Other configurations (env, cluster, etc.)
├── domain/              # Business logic layer
│   ├── entities/        # Entity definitions
│   │   └── User.js      # Class or interface representing a User
│   ├── usecases/        # Use cases (application logic)
│   │   └── RegisterUser.js
│   │   └── LoginUser.js
│   └── interfaces/      # Interfaces (e.g., repositories, gateways)
│       └── UserRepository.js
├── infrastructure/      # Infrastructure implementations
│   ├── database/        # Database-specific implementations
│   │   └── MongoUserRepository.js
│   ├── webserver/       # Web server configuration
│   │   └── routes/      # Application routes
│   │       └── UserRoutes.js
│   └── socket/          # Socket.io configuration
│       └── chatSocket.js
├── adapters/            # Adapters (controllers and gateways)
│   ├── controllers/     # API controllers
│   │   └── UserController.js
│   └── gateways/        # External communication adapters
│       └── AuthService.js # Example of external authentication service
└── app.js               # Main server file

Implementar  Clean Architecture

---
