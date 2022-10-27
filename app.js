/*

    Objetivo: API responsável pela manipulação de dados do Back-End (GET, POST, PUT, DELETE)
    Autor: Lídia Galdino
    Data de criação: 10/10/22
    Última modificação em: 27/10/22
    Versão: 1.0 

    Anotações:

        Para manipular o acesso ao BD podemos utilizar o Prisma

        Comandos para instalação:

            npm install prisma --save
            npx prisma
            npx prisma init
            npm install @prisma/client

*/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { request, response } = require('express')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js')
const { json } = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Criamos um objeto que permite receber um JSON no body nas requisições
const jsonParser = bodyParser.json()

/*
    Rotas para CRUD de alunos
    Data: 10/10/22
*/

//EndPoint listar alunos
app.get('/v1/alunos', cors(), async function(request, response, next){

    let statusCode
    let message = {}

    const controllerAluno = require('./controller/controllerAluno.js')

    const dadosAlunos = await controllerAluno.listarAlunos()

    if (dadosAlunos) {
        statusCode = 200   
        message = dadosAlunos
    } else{
        statusCode = 404
        message.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

//EndPoint para listar cursos
app.get('/v1/cursos', cors(), async function(request, response, next){

    const controllerCurso = require('./controller/controllerCurso.js')
    const dadosCurso = await controllerCurso.listarCursos()

    let statusCode = dadosCurso.status
    let message = dadosCurso.message

    response.status(statusCode)
    response.json(message)
})

//EndPoint para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function(request, response, next){

    let statusCode
    let message
    let headerContentType

    //Recebe o content type que foi enviado no header da requisicão
    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        let dadosBody = request.body
        
        //Realiza um processo de conversão de dados para conseguir comparar um JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerAluno = require('./controller/controllerAluno.js')
            const novoAluno = await controllerAluno.novoAluno(dadosBody)

            statusCode = novoAluno.status
            message = novoAluno.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }

    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//EndPoint para inserir um novo curso
app.post('/v1/curso', cors(), jsonParser, async function(request, response, next){

    let statusCode
    let message
    let headerContentType

    //Recebe o content type que foi enviado no header da requisicão
    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        let dadosBody = request.body
        
        //Realiza um processo de conversão de dados para conseguir comparar um JSON vazio
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerCurso = require('./controller/controllerCurso.js')
            const novoCurso = await controllerCurso.novoCurso(dadosBody)

            statusCode = novoCurso.status
            message = novoCurso.message

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }

    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//EndPoint para atualizar um aluno
app.put('/v1/aluno/:id', cors(), jsonParser, async function(request, response, next){

    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id

            if(id != '' && id != undefined){
                
                dadosBody.id = id

                const controllerAluno = require('./controller/controllerAluno.js')
                const atualizarAluno = await controllerAluno.atualizarAluno(dadosBody)
    
                statusCode = atualizarAluno.status
                message = atualizarAluno.message
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
    
})

//EndPoint para atualizar um curso
app.put('/v1/curso/:id', cors(), jsonParser, async function(request, response, next){

    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id

            if(id != '' && id != undefined){
                
                dadosBody.id = id

                const controllerCurso = require('./controller/controllerCurso.js')
                const atualizarCurso = await controllerCurso.atualizarCurso(dadosBody)
    
                statusCode = atualizarCurso.status
                message = atualizarCurso.message
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }

        } else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
    
})

//EndPoint para deletar um aluno
app.delete('/v1/aluno/:id', cors(), jsonParser, async function(request,response,next){

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        
        const controllerAluno = require('./controller/controllerAluno.js')
        const deletarAluno = await controllerAluno.deletarAluno(id)

        statusCode = deletarAluno.status
        message = deletarAluno.message
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)

})

//EndPoint para deletar um curso
app.delete('/v1/curso/:id', cors(), jsonParser, async function(request,response,next){

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        
        const controllerCurso = require('./controller/controllerCurso.js')
        const deletarCurso = await controllerCurso.deletarCurso(id)

        statusCode = deletarCurso.status
        message = deletarCurso.message
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)

})

//EndPoint para buscar um aluno pelo ID
app.get('/v1/aluno/:id', cors(), async function(request, response, next){

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        
        const controllerAluno = require('./controller/controllerAluno.js')
    
        const dadosAluno = await controllerAluno.buscarAluno(id)
    
        if (dadosAluno) {
            statusCode = 200   
            message = dadosAluno
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    } else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }


    response.status(statusCode)
    response.json(message)
})

//EndPoint para buscar um curso pelo ID
app.get('/v1/curso/:id', cors(), async function(request, response, next){

    let statusCode
    let message
    let id = request.params.id

    if (id != '' && id != undefined) {
        
        const controllerCurso = require('./controller/controllerCurso.js')
        const dadosCurso = await controllerCurso.buscarCurso(id)

        if (dadosCurso) {
            statusCode = 200
            message = dadosCurso
        } else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

app.listen(8080, function() {
    console.log('Aguardando requisições')
})