### README do Backend da Aplicação de Gerenciamento de Tarefas

---

## Introdução

Este é o backend da Aplicação de Gerenciamento de Tarefas, uma aplicação web projetada para ajudar os usuários a gerenciar suas tarefas de forma eficiente. O backend é responsável pela lógica do servidor, gerenciamento de banco de dados, autenticação de usuários e fornecimento de APIs para o frontend.

---

## Funcionalidades

- **Autenticação de Usuário**: Cadastro, login e gerenciamento de senhas.
- **Gerenciamento de Tarefas**: Criar, atualizar, deletar e visualizar tarefas.
- **Gerenciamento de Perfil**: Editar perfil do usuário e alterar senha.
- **Envio de Emails**: Função de recuperação de senha.

---

## Stack Tecnológico

- **Node.js** com **Express.js**: Framework de aplicação do lado do servidor.
- **Prisma**: ORM para gerenciamento de banco de dados.
- **SQLite**: Banco de dados para desenvolvimento.
- **JWT**: JSON Web Tokens para autenticação.
- **Nodemailer**: Envio de e-mails para redefinição de senhas.

---

## Instalação e Configuração

### Pré-requisitos

- Node.js
- npm (Node Package Manager)

### Configuração do Backend

1. **Navegue até o diretório do backend**:
    ```bash
    cd backend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente**:
    - Copie `.env.example` para `.env` e configure as variáveis de ambiente necessárias.

4. **Migre o banco de dados**:
    ```bash
    npx prisma migrate dev
    ```

5. **Inicie o servidor backend**:
    ```bash
    npm start
    ```

---

## Uso

- **Cadastro de Usuário**: APIs para criar uma conta.
- **Gerenciamento de Tarefas**: APIs para criar, atualizar, deletar e visualizar tarefas.
- **Gerenciamento de Perfil**: APIs para editar perfil do usuário e alterar senha.
- **Envio de Emails**: APIs para recuperação de senha.

---

## Conclusão

Este projeto foi uma experiência extremamente enriquecedora. Através do desenvolvimento deste backend, eu aprendi bastante sobre a construção de uma aplicação web full stack. Trabalhei na lógica do servidor, gerenciamento de banco de dados, autenticação de usuários e integração com o frontend. 

Fui capaz de implementar diversas funcionalidades importantes, como autenticação de usuários, gerenciamento de tarefas e perfil, além de recuperação de senha via e-mail. Cada etapa do projeto me ajudou a desenvolver habilidades técnicas e a melhorar minha capacidade de resolver problemas de maneira eficiente.

Estou orgulhoso do que consegui alcançar e animado para aplicar esses conhecimentos em futuros projetos. Este projeto não apenas ampliou meu conhecimento técnico, mas também aumentou minha confiança em desenvolver aplicações web robustas e funcionais.

---
