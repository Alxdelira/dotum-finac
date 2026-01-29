<div align="center">
  <img alt="Alexandre's personal logo" src="https://media.licdn.com/dms/image/v2/D4D0BAQFoFfDV-b2G_Q/company-logo_200_200/company-logo_200_200/0/1687952680468/dotum_io_logo?e=2147483647&v=beta&t=b2RBPqJKkcmLAxRsW2zjDuRxrYkM6PFsLupuHMmscdY" width="140" />

 </div>

# Desafio Dotum– API de Contas a Pagar e Receber

API backend em **NestJS** com **Prisma** e **MySQL** para controle de contas a pagar e contas a receber, incluindo lançamento de contas, listagem e cálculo de totais (a pagar, a receber e geral).

O projeto está preparado para rodar com **Docker** e **Docker Compose**, subindo a API e o banco MySQL em containers separados.

---

## Funcionalidades

- Cadastro de contas (contas a pagar e contas a receber).
- Campos principais: descrição, tipo (PAGAR/RECEBER), status (PENDENTE/PAGO), valor, data de vencimento, data de pagamento.
- Listagem de contas com seus detalhes.
- Cálculo:
  - Total de contas a pagar.
  - Total de contas a receber.
  - Total geral.

---

## Tecnologias

- Node.js / NestJS
- Prisma ORM
- MySQL
- Docker e Docker Compose

---

## Pré-requisitos

- Docker instalado
- Docker Compose instalado
- (Opcional) Node.js e npm, caso queira rodar localmente sem Docker

---

## Configuração de ambiente

Crie um arquivo `.env` na raiz do projeto

```env
# APPLICATION PORT
PORT=3077

# DEBUG SETTINGS
DEBUGLOG=true

# APPLICATION ENVIRONMENT
NODE_ENV=development

# DATABASE CONFIGURATION
DATABASE_URL="mysql://root:Dotum%401253@dotum-db:3306/dotum"

# DATABASE ENVIROMENTS
MYSQL_ROOT_PASSWORD="Dotum@1253"
MYSQL_DATABASE=dotum

# Docker Settings
DB_EXPOSE_PORT=3317
DB_VOLUME=data_dotum
```
## Estrutura Docker
O docker-compose.yml sobe dois serviços:

dotum-db: container MySQL, com volume persistente.

dotum-api: container da API NestJS, usando Prisma e conectando no dotum-db.

Trecho principal do compose:

```yml
services:
  dotum-db:
    image: mysql:8.0
    container_name: dotum-db
    restart: unless-stopped
    ports:
      - "${DB_EXPOSE_PORT}:3306"
    volumes:
      - data_dotum:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - TZ=America/Porto_Velho
      - LANG=${LANG}
    networks:
      - dotum-network

  dotum-api:
    container_name: dotum-api
    restart: unless-stopped
    depends_on:
      - dotum-db
    build:
      context: ./dotum-api
      args:
        DATABASE_URL: ${DATABASE_URL}
    environment:
      - PORT=${PORT}
      - NODE_ENV=production
      - DEBUGLOG=true
      - DATABASE_URL=${DATABASE_URL}
    ports:
      - "${PORT}:${PORT}"
    networks:
      - dotum-network

volumes:
  data_dotum:

networks:
  dotum-network:
    driver: bridge
```

O Dockerfile da API (dentro de dotum-api/) faz:

* Instala dependências.

* Gera Prisma Client.

* Build do Nest.

* Roda prisma migrate deploy e sobe a aplicação.

## Como subir o projeto com Docker
Clonar o repositório:

```bash
git clone https://github.com/Alxdelira/dotum-finac
cd dotum-finac
```
Criar o .env na raiz (ver seção de Configuração de ambiente).

Subir os containers (build + up):

```bash
docker compose up -d --build
```
Verificar se os containers estão rodando:

```bash
docker ps
```
## Acessar a API:

URL base: http://localhost:3077 (ou a porta definida em PORT).

Migrações do Prisma dentro do container
Por padrão, o CMD do container já executa:

```bash
npx prisma migrate deploy && node dist/src/main
```
Se precisar rodar manualmente:

```bash
docker compose exec dotum-api npx prisma migrate dev
```

## Execução local (sem Docker) – opcional
Instalar dependências:

```bash
npm install
```
Ajustar o .env para apontar para um MySQL local (por exemplo, localhost:3306).

Gerar Prisma Client e rodar migrações:

```bash
npx prisma generate
npx prisma migrate dev
```
Depois da ultima atualização do PRISMA ORM está ocorrendo um bug para conectar o banco. Só executar o comando:
```bash
npx prisma studio
```
## Subir a API:

```bash
npm run start:dev
```
API disponível em http://localhost:3077 (ou porta configurada).

## Endpoints

POST /conta – cria uma conta.

GET /conta – lista contas.

GET /conta/valor-total


<p align="center">
  <a href="https://portfolioalxdelira.vercel.app/" target="_blank" rel="noreferrer">
    <img src="https://github.com/Alxdelira/Alxdelira/raw/main/.github/assets/footer.png" alt="Banner linking to the portfolio" width="100%" />
  </a>
</p>
