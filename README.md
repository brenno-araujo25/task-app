# 📝 Task App API

## Descrição

O **Task App API** é uma API RESTful desenvolvida com Node.js, Express, PostgreSQL e Sequelize. Ela permite que os usuários se registrem, façam login e gerenciem suas tarefas através de operações CRUD (Criar, Ler, Atualizar e Deletar). A autenticação é realizada usando JWT (JSON Web Tokens) e as senhas são protegidas com bcrypt. A aplicação está containerizada com Docker para facilitar a implantação e a escalabilidade.

### [🔗 Acesse a API em Produção](https://task-app-xy4m.onrender.com)

## 🚀 Funcionalidades

- **Registro de Usuário**: Permite que novos usuários se cadastrem fornecendo nome de usuário, email e senha.
- **Login de Usuário**: Autenticação de usuários existentes para gerar tokens JWT.
- **CRUD de Tarefas**: Usuários autenticados podem criar, ler, atualizar e deletar suas tarefas.
- **Autenticação Segura**: Utilização de JWT para proteger as rotas e garantir que apenas usuários autenticados possam acessar suas tarefas.
- **Containerização com Docker**: Facilita a implantação e o gerenciamento da aplicação e do banco de dados.

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: JavaScript (ES Modules)
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Autenticação**: JWT (jsonwebtoken)
- **Criptografia de Senhas**: bcrypt
- **Containerização**: Docker e Docker Compose
- **Deploy**: Render

## 📋 Pré-requisitos

- **Node.js**
- **Docker**
- **Docker Compose**

## ⚙️ Instalação

### 1. Clone o Repositório
```bash
git clone https://github.com/brenno-araujo25/task-app.git
cd task-app
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
JWT_SECRET=seu_segredo_jwt
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_app_db
DB_HOST=db
```

### 3. Rodando com Docker

#### a. Construir e Iniciar os Containers

A aplicação está configurada para rodar com Docker. Para construir e iniciar os containers, execute o comando:

```bash
docker-compose up --build
```

#### b. Acessar a Aplicação

A API estará disponível em `http://localhost:3000`.
