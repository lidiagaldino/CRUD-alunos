/*

    Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
    Autor: Lídia Galdino
    Data de criação: 06/10/22
    Última modificação em: 13/10/22
    Versão: 1.0 

*/

const e = require('express')

const insertAluno = async function(aluno) {

    try {
        const { PrismaClient } = require('@prisma/client')
    
        const prisma = new PrismaClient()
    
        let sql = `insert into tbl_aluno(nome, foto, rg, cpf, email, data_nascimento, telefone, celular, sexo)
                        values('${aluno.nome}', '${aluno.foto}', '${aluno.rg}', '${aluno.cpf}', '${aluno.email}', '${aluno.data_nascimento}', '${aluno.telefone}', '${aluno.celular}', '${aluno.sexo}')`
    
        const result = await prisma.$executeRawUnsafe(sql)
    
        if (result) {
            return true
        } else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}

const updateAluno = async function(aluno) {

    try {
        const { PrismaClient } = require('@prisma/client')
        
        const prisma = new PrismaClient()
    
        let sql = `update tbl_aluno set nome = '${aluno.nome}', foto = '${aluno.foto}', rg = '${aluno.rg}', cpf = '${aluno.cpf}', email = '${aluno.email}', data_nascimento = '${aluno.data_nascimento}', telefone = '${aluno.telefone}', celular = '${aluno.celular}', sexo = '${aluno.sexo}'  where id = ${aluno.id}`
    
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}

const deleteAluno = async function(id) {

    try {
        
        const { PrismaClient } = require('@prisma/client')
    
        const prisma = new PrismaClient()
    
        const sql = `delete from tbl_aluno where id = ${id}`
    
        const result = await prisma.$executeRawUnsafe(sql)
    
        if (result) {
            return true
        } else{
            return false
        }
    } catch (error) {
        return false
    }
    
}

const selectAllAlunos = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    //Criamos um objeto do tipo RecordSet para receber os dados do BD através do script SQL (select)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno order by id desc` 

    if (rsAlunos.length > 0) {
        return rsAlunos
    } else{
        return false
    }
}

const selectAlunoById = async function(id) {
    
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const sql = `select cast(id as float) as id, 
                                            nome, 
                                            foto, 
                                            sexo, 
                                            rg, 
                                            cpf, 
                                            email, 
                                            telefone, 
                                            celular, 
                                            data_nascimento 
                                            from tbl_aluno where id = ${id} `

    const rsAluno = await prisma.$queryRawUnsafe(sql)

    if(rsAluno.length > 0){
        return rsAluno
    } else{
        return false
    }
}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAlunoById
}