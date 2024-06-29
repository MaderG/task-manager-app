### Aplicação de Gerenciamento de Tarefas

---

## Introdução

Nize é uma aplicação web full-stack projetada para ajudar os usuários a gerenciar suas tarefas de forma eficiente. A aplicação é construída com um servidor backend e uma interface de usuário frontend, proporcionando uma experiência integrada para gerenciamento de tarefas, autenticação de usuários e visualização de dados.

---

## Funcionalidades

- **Autenticação de Usuário**: Cadastro, login e gerenciamento de senhas.
- **Gerenciamento de Tarefas**: Criar, atualizar, deletar e visualizar tarefas.
- **Gerenciamento de Perfil**: Editar perfil do usuário e alterar senha.
- **Estatísticas**: Visualizar estatísticas das tarefas.
- **Design Responsivo**: Interface totalmente responsiva para vários tamanhos de dispositivos.

---

## Stack Tecnológico

### Backend

- **Node.js** com **Express.js**: Framework de aplicação do lado do servidor.
- **Prisma**: ORM para gerenciamento de banco de dados.
- **SQLite**: Banco de dados para desenvolvimento.
- **JWT**: JSON Web Tokens para autenticação.
- **Nodemailer**: Envio de e-mails para redefinição de senhas.

### Frontend

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de front-end de próxima geração para compilações mais rápidas.
- **CSS Modules**: CSS com escopo para estilização a nível de componente.

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

### Configuração do Frontend

1. **Navegue até o diretório do frontend**:
    ```bash
    cd frontend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente**:
    - Crie um arquivo `.env` e configure as variáveis de ambiente necessárias.

4. **Inicie o servidor frontend**:
    ```bash
    npm run dev
    ```

---

## Uso

- **Cadastro de Usuário**: Crie uma conta usando a página de cadastro.
- **Gerenciamento de Tarefas**: Após fazer login, use o painel para gerenciar tarefas.
- **Gerenciamento de Perfil**: Acesse a seção de perfil para editar os detalhes do usuário e alterar a senha.

---


### Conclusão

Este projeto foi uma experiência extremamente enriquecedora. Através do desenvolvimento deste projeto , eu aprendi bastante sobre a construção de uma aplicação web full stack. Trabalhei tanto no frontend quanto no backend, o que me proporcionou uma compreensão completa do ciclo de desenvolvimento de software. 

Fui capaz de implementar diversas funcionalidades importantes, como autenticação de usuários, gerenciamento de tarefas e perfil, além de visualização de estatísticas e design responsivo. Cada etapa do projeto me ajudou a desenvolver habilidades técnicas e a melhorar minha capacidade de resolver problemas de maneira eficiente.

Estou orgulhoso do que consegui alcançar e animado para aplicar esses conhecimentos em futuros projetos. Este projeto não apenas ampliou meu conhecimento técnico, mas também aumentou minha confiança em desenvolver aplicações web robustas e funcionais.

