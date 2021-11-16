# Compass Hiring API

=================

###### Esse projeto é uma API criada para um teste de contratação na Compass UOL. É possível:

- Cadastrar cidade
- Cadastrar cliente
- Consultar cidade pelo nome
- Consultar cidade pelo estado
- Consultar cliente pelo nome
- Consultar cliente pelo Id
- Remover cliente
- Alterar o nome do cliente

### Pré-requisitos

Antes de começar você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- Node v. 10+
- MySQL Server 8+

### Rodando o Back End (servidor)

- Acesse a pasta do projeto no terminal/cmd

- Instale as dependências
  $ npm install

- Crie um banco (além das credenciais de acesso ao banco, o nome escolhido deverá ser informado no MYSQL_DATABASE do arquivo .env) 

- Altere o arquivo .env.example informando as suas configurações de conexão com banco e a porta que deseja usar para rodar a aplicação nas variáveis globais abaixo:
MYSQL_USER = "" (usuário de acesso ao banco)
MYSQL_PASSWORD = "" (senha caso tenha configurado uma)
MYSQL_DATABASE = "" (nome do banco de dados)
MYSQL_HOST = "" (servidor do banco de dados)
MYSQL_PORT = "" (porta de acesso ao banco)
SERVER_PORT = "" (porta de acesso à aplicação)

- Renomeie o arquivo .env.example para .env

- Execute a aplicação
  $ npm run server.js

- Para testar a aplicação acesse a pasta principal e, no terminal/cmd, execute o comando:
  $ mocha

### Documentação

- Acesse a documentação completa da API pela URL (substitua SERVER_PORT pela porta definida no arquivo .env)
  http://localhost:SERVER_PORT/api-docs
