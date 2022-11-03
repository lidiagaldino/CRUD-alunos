/*

    Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
    Autor: Lídia Galdino
    Data de criação: 06/10/22
    Última modificação em: 31/10/22
    Versão: 1.0 

*/

const selectAllCursos = async () =>{

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso order by id desc` 

    if (rsCursos.length > 0) {
        return rsCursos
    } else{
        return false
    }
}

const selectCursoById = async (id) => {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const sql = `
        select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso where id = ${id}
    `

    const rsCurso = await prisma.$queryRawUnsafe(sql)

    if(rsCurso.length > 0){
        return rsCurso
    } else{
        return false
    }
}

const insertCurso = async (curso) => {

    try {
        
        const { PrismaClient } = require('@prisma/client')
    
        const prisma = new PrismaClient()

        let sql = `
            insert into tbl_curso(nome, carga_horaria, icone, sigla)
                values('${curso.nome}', ${curso.carga_horaria}, '${curso.icone}', '${curso.sigla}')
        `

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

const deleteCurso = async (id) => {

    try {
        
        const { PrismaClient } = require('@prisma/client')
    
        const prisma = new PrismaClient()
    
        const sql = `delete from tbl_curso where id = ${id}`
    
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

const updateCurso = async function(curso) {

    try {
        const { PrismaClient } = require('@prisma/client')
        
        const prisma = new PrismaClient()
    
        let sql = `update tbl_curso set nome = '${curso.nome}', icone = '${curso.icone}', carga_horaria = ${curso.carga_horaria}, sigla = '${curso.sigla}' where id = ${curso.id}`
    
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

module.exports = {
    selectAllCursos,
    selectCursoById,
    insertCurso,
    deleteCurso,
    updateCurso
}