const { selectAlunoById } = require('../model/DAO/aluno.js')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const listarCursos = async () => {

    const { selectAllCursos } = require('../model/DAO/curso.js')

    const dadosCursos = await selectAllCursos()

    if (dadosCursos) {
        return {status: 200, message: dadosCursos}
    }else{
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}

const buscarCurso = async (id) => {

    let cursoJSON = {}

    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const { selectCursoById } = require('../model/DAO/curso.js')
    const dadosCurso = await selectCursoById(id)

    if (dadosCurso) {
        cursoJSON.curso = dadosCurso
        return cursoJSON
    } else{
        return false
    }
}

const novoCurso = async (curso) => {
    if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }

    const novoCurso = require('../model/DAO/curso.js')

    const result = await novoCurso.insertCurso(curso)

    if (result) {
        return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
    } else{
        return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
    }
}

const deletarCurso = async function(id){
    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const deletarCurso = require('../model/DAO/curso.js')
    const verificar = await buscarCurso(id)

    if (verificar) {
        
        const result = await deletarCurso.deleteCurso(id)
    
        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }



}

const atualizarCurso = async function(curso){

    if (curso.id == '' || curso.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else if (curso.nome == '' || curso.nome == undefined || curso.carga_horaria == '' || curso.carga_horaria == undefined || curso.icone == '' || curso.icone == undefined || curso.sigla == '' || curso.sigla == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } 

    const atualizarCurso = require('../model/DAO/curso.js')
    const verificar = await atualizarCurso.selectCursoById(curso.id)

    if(verificar){

        const result = await atualizarCurso.updateCurso(curso)
    
        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_SERVER_ERROR, status: 500}
        }
    } else{
        return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404} 
    }
}

module.exports = {
    listarCursos,
    buscarCurso,
    novoCurso,
    deletarCurso,
    atualizarCurso
}