<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
<h3 align="center">
  Aplicação para uma transportadora fictícia
</h3>
</h1>

---

## Descrição:

Esse repositório é referente ao backend do FastFeet desenvolvido em nodejs com express.

---

## Ferramentas utilizadas:

- **Sequelize:** ORM usado para conversação com banco de dados.
- **Bcryptjs:** Usado para criptografia de senhas.
- **DotEnv:** Usado para lidar com variáveis de ambiente.
- **Date-fns:** Usado para manipulação de datas.
- **Yup:** Usado para validações de schemas.
- **JWT:** Usado para autenticação.
- **Multer:** Usado para auxiliar o upload de arquivos.
- **Nodemailer:** Usado para enviar emails.

## Banco de dados da aplicação:

- Postgres
- Redis

---

## Como executar o projeto:

1. Instale as dependências:
   > \$ yarn
2. Crie uma copia do arquivo .env.example, renomeie para .env e adicione os devidos valores.
3. Execute o script para executar as migrations:
   > \$ yarn sequelize db:migrate

- Para inicializar um perfil de admin execute:
  > \$ yarn sequelize db:seed:all

4. Execute a fila para envio de emails:

   > \$ yarn queue

5. Execute a aplicação:
   > \$ yarn dev

---
