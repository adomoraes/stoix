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
