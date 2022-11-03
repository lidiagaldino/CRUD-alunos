/*

    Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a module
    Autor: Lídia Galdino
    Data de criação: 06/10/22
    Última modificação em: 13/10/22
    Versão: 1.0 
 
*/

const { PrismaClientRustPanicError } = require('@prisma/client/runtime/index.js')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const novoAluno = async function(aluno){

    //Validação de campos obrigatorios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (!aluno.email.includes('@')) {
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } 

    const novoAluno = require('../model/DAO/aluno.js')
    const novoAlunoCurso = require('../model/DAO/aluno_curso.js')
    
    const resultAluno = await novoAluno.insertAluno(aluno)
    //console.log(Number(result[0].LAST_INSERT_ID()))

    if (resultAluno) {
        const lastId = await novoAluno.selectLastId()
        if (lastId > 0) {
            const date = new Date().getFullYear()
            let alunoCurso = {
                idAluno: lastId,
                idCurso: aluno.curso[0].id,
                matricula: `${lastId}${aluno.curso[0].id}${date}`,
                status_aluno: 'Cursando'
            }

            const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso)

            if (resultNovoAlunoCurso) {
                return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                await deletarAluno(lastId)
                return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
            }
        }else{
            await deletarAluno(lastId)
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    }else{
        return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
    }
    

}

const atualizarAluno = async function(aluno){

    if (aluno.id == '' || aluno.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (!aluno.email.includes('@')) {
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } 

    const atualizarAluno = require('../model/DAO/aluno.js')
    const verificar = await atualizarAluno.selectAlunoById(aluno.id)

    if(verificar){

        const result = await atualizarAluno.updateAluno(aluno)
    
        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

const deletarAluno = async function(id){
    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const deletarAluno = require('../model/DAO/aluno.js')
    const verificar = await buscarAluno(id)

    if (verificar) {
        
        const result = await deletarAluno.deleteAluno(id)
    
        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }


}

const listarAlunos = async function() {

    let dadosAlunosJSON = {}
    
    const { selectAllAlunos } = require('../model/DAO/aluno.js')
    const curso = require('../model/DAO/aluno_curso.js')

    const dadosAlunos = await selectAllAlunos()

    await Promise.all(dadosAlunos.map(async (item) => {
        item.curso = await curso.searchAluno(item.id)
    }))

    if (dadosAlunos) {

        /* dadosAlunos.forEach(element => {
            element.id = Number(element.id)
        }); */

        dadosAlunosJSON.alunos = dadosAlunos
        return dadosAlunosJSON
        
    } else{
        return false
    }
} 

const buscarAluno = async function(id) {
    
    let dadosAlunoJSON = {}

    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const { selectAlunoById } = require('../model/DAO/aluno.js')
    const { searchAluno } = require('../model/DAO/aluno_curso.js')
    const dadosAluno = await selectAlunoById(id)

    if (dadosAluno) {
        
        const dadosAlunoCurso = await searchAluno(id)

        if (dadosAlunoCurso) {
            dadosAluno[0].curso = dadosAlunoCurso
            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON
        } else{
            dadosAlunoJSON.aluno = dadosAluno

            return dadosAlunoJSON
        }

    } else{
        return false
    }

}

module.exports = {
    listarAlunos,
    novoAluno,
    atualizarAluno,
    deletarAluno,
    buscarAluno
}
