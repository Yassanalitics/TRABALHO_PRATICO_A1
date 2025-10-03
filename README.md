Clínica API
Descrição do Projeto
Este projeto é uma API RESTful para gerenciar uma clínica médica, permitindo controlar pacientes, médicos, consultas, exames e medicamentos.
A API suporta os métodos GET, POST, PUT e DELETE e utiliza listas com IDs sequenciais para cada entidade.

Instalação e Execução
Criar rrepositório
Clonar o repositório:
git clone https://github.com/Yassanalitics/TRABALHO_PRATICO_A1.git

Entre na pasta do projeto:
CRUD_CLINICA
Criar o index.js
Instale as dependências:
npm install express
npm install cors
npm install --save-dev jest supertest nodemon

criar o script de start e test :
"start": "nodemon index.js",
    "test": "jest"

Pasta routes para organizar as rotas e implementação, dntro do arquivo habilitar o roteador e o seu export 
//Inicializar
const express = require('express')
const router = express.Router()

//Mapear o roteador 

//exportar o roteador 
module.exports= router

index.js :
//Inicializar
const express = require("express")
const app = express()

//configurar e mapear intermediarios
const cors = require('cors')
app.use(cors()) //Habilita no cors no browser
app.use(express.json()) //receber JSON no body da requisição

//Mapeando routes 
const exemploRouter = require ('./router/exemplo') importar o router que criou
app.use(exemploRouter) este comando fara com que toda a aplicação passe por esse router após passar pelos midleweres

//executar aplicação
app.listen(3000, () => {
    console.log("aplicação rodando em http://localhost:3000")
})

npm start

A API será executada em http://localhost:3000.

Endpoints
1. Pacientes (Karoline)
Campos: id, nome, cpf, telefone, historicoMedico
Lista inicial com 5 IDs
Exemplo de requisição:
GET todos: GET /pacientes
GET por ID: GET /pacientes/1 ou nome
POST: POST /pacientes

2. Médicos (Davi)
Campos: id, nome, especialidade, crm, horarioAtendimento
Lista inicial com 5 IDs

3. Consultas (Ygor)
Campos: id, paciente, medico, data, horario, diagnostico
Exemplo GET: GET /consultas/1 

4. Exames (Alex)
CAmpos: id, paciente, tipoExame, resultado, data 

5. Medicamentos (Yasmin)
Campos: id, nome, uso, dosagem, periodo
