# Blueprint para Projetos Full Stack (Laravel + React)

Este é um blueprint para iniciar rapidamente um projeto full stack com Laravel no backend e React no frontend.

## Pré-requisitos

- PHP >= 8.1
- Composer
- Node.js e npm (ou yarn)
- Docker e Docker Compose

## Instruções de Instalação e Execução

### Banco de Dados (Docker)

1.  Navegue até a pasta `db`:
    ```bash
    cd db
    ```
2.  Inicie o container Docker com o banco de dados:
    ```bash
    docker-compose up -d
    ```

### Backend (API - Laravel)

1.  Navegue até a pasta `api`:
    ```bash
    cd api
    ```
2.  Instale as dependências do PHP:
    ```bash
    composer install
    ```
3.  Copie o arquivo de ambiente de exemplo:
    ```bash
    cp .env.example .env
    ```
4.  Gere a chave da aplicação:
    ```bash
    php artisan key:generate
    ```
5.  Execute as migrações do banco de dados:
    ```bash
    php artisan migrate
    ```
6.  (Opcional) Popule o banco de dados com dados de exemplo:
    ```bash
    php artisan db:seed
    ```
7.  Inicie o servidor de desenvolvimento do Laravel:
    ```bash
    php artisan serve
    ```

### Frontend (React)

1.  Navegue até a pasta `front`:
    ```bash
    cd front
    ```
2.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```
3.  Inicie o servidor de desenvolvimento do React:
    ```bash
    npm run dev
    ```
    ou
    ```bash
    yarn dev
    ```

## Stack e Tecnologias

A escolha da stack foi pensada para produtividade, robustez e uma ótima experiência de desenvolvimento.

-   **Backend:**
    -   **Laravel:** Um framework PHP robusto, elegante e maduro, com um ecossistema completo que acelera o desenvolvimento de APIs RESTful. Sua sintaxe expressiva e ferramentas como o Eloquent ORM e o Artisan CLI aumentam a produtividade.
    -   **PHP:** Uma linguagem de script popular e amplamente utilizada para desenvolvimento web, com uma vasta comunidade e grande quantidade de recursos.

-   **Frontend:**
    -   **React:** Uma biblioteca JavaScript para construir interfaces de usuário reativas e componentizadas. Sua popularidade garante uma grande quantidade de recursos e uma comunidade ativa.
    -   **TypeScript:** Adiciona tipagem estática ao JavaScript, o que ajuda a prevenir bugs em tempo de desenvolvimento e melhora a manutenibilidade do código.
    -   **Vite:** Uma ferramenta de build moderna e extremamente rápida que oferece uma experiência de desenvolvimento superior com Hot Module Replacement (HMR) instantâneo.
    -   **Tailwind CSS:** Um framework CSS utility-first que permite a criação de designs customizados de forma rápida e eficiente, sem a necessidade de escrever CSS tradicional.

-   **Banco de Dados:**
    -   **Docker:** Utilizado para criar um ambiente de desenvolvimento consistente e isolado para o banco de dados. O `docker-compose.yml` orquestra a criação do container do banco de dados. A stack utilizada é **MySQL**.

## Arquitetura da Aplicação

A aplicação segue uma arquitetura cliente-servidor desacoplada, com uma API RESTful no backend e uma Single Page Application (SPA) no frontend.

-   **API (Backend):**
    -   A API é construída com Laravel e segue os padrões de uma aplicação RESTful.
    -   **Controllers:** Responsáveis por receber as requisições HTTP, validar os dados e retornar as respostas.
    -   **Models:** Representam as tabelas do banco de dados e são responsáveis pela interação com o mesmo através do Eloquent ORM.
    -   **Routes:** As rotas da API são definidas no arquivo `routes/api.php`.
    -   **Autenticação:** A autenticação é baseada em tokens, utilizando o Laravel Sanctum.

-   **Frontend (SPA):**
    -   O frontend é uma SPA construída com React.
    -   **Componentes:** A interface é dividida em componentes reutilizáveis, localizados na pasta `src/components`.
    -   **Páginas:** As páginas da aplicação estão na pasta `src/pages`.
    -   **Roteamento:** O roteamento é gerenciado pelo `react-router-dom`, com as rotas definidas no arquivo `src/Router.tsx`.
    -   **Gerenciamento de Estado:** O estado de autenticação é gerenciado através de um `AuthContext`.
    -   **Comunicação com a API:** A comunicação com a API é feita através do `axios`, com uma instância pré-configurada no arquivo `src/services/api.ts`.

## Testando a API com o Postman

Para facilitar o teste dos endpoints da API, um arquivo de coleção do Postman (`stoix.postman_collection.json`) está incluído no projeto.

1.  **Importar a Coleção:**
    -   Abra o Postman.
    -   Clique em "Import" no canto superior esquerdo.
    -   Selecione o arquivo `stoix.postman_collection.json` que está na raiz da pasta `desafio-fullstack`.

2.  **Configurar o Ambiente:**
    -   A coleção utiliza uma variável de ambiente `{{base_url}}` para a URL base da API.
    -   Crie um novo ambiente no Postman.
    -   Adicione uma variável chamada `base_url` com o valor `http://localhost:8000` (ou a URL onde sua API está sendo executada).

3.  **Utilizando a Coleção:**
    -   Após importar a coleção e configurar o ambiente, você verá uma lista de requisições prontas para serem utilizadas.
    -   **`POST /api/login`:** Endpoint para autenticação. Envie o `email` e `password` de um usuário para obter um token de autenticação.
    -   **`GET /api/tasks`:** Endpoint para listar as tarefas. Requer autenticação.
    -   **`POST /api/tasks`:** Endpoint para criar uma nova tarefa. Requer autenticação.
    -   **`GET /api/tasks/{id}`:** Endpoint para buscar uma tarefa específica. Requer autenticação.
    -   **`PUT /api/tasks/{id}`:** Endpoint para atualizar uma tarefa. Requer autenticação.
    -   **`DELETE /api/tasks/{id}`:** Endpoint para deletar uma tarefa. Requer autenticação.
    -   **`POST /api/logout`:** Endpoint para fazer o logout. Requer autenticação.

    **Importante:** Para os endpoints que requerem autenticação, você precisa primeiro fazer o login para obter um token. O Postman está configurado para extrair o token da resposta do login e usá-lo automaticamente nas requisições subsequentes.
