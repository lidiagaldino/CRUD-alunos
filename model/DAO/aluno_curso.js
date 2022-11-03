/*

    Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
    Autor: Lídia Galdino
    Data de criação: 31/10/22
    Última modificação em: 31/10/22
    Versão: 1.0 

*/
const { PrismaClient } = require('@prisma/client')
    
const prisma = new PrismaClient()

const insertAlunoCurso = async function(alunoCurso) {

    try {
        let sql = `insert into tbl_aluno_curso(id_aluno, id_curso, matricula, status_aluno)
                        values(${alunoCurso.idAluno}, ${alunoCurso.idCurso}, '${alunoCurso.matricula}', '${alunoCurso.status_aluno}')`
                        console.log(sql)
    
        const result = await prisma.$queryRawUnsafe(sql)
    
        if (result) {
            return true
        } else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}

const searchAluno = async function(id) {
    let sql = `select cast(tbl_curso.id as float) as id_curso, tbl_curso.nome as nome_curso, tbl_curso.carga_horaria, tbl_curso.sigla as sigla_curso, tbl_aluno_curso.matricula as matricula_aluno, tbl_aluno_curso.status_aluno
	from tbl_aluno 
	inner join tbl_aluno_curso 
		on tbl_aluno.id = tbl_aluno_curso.id_aluno
	inner join tbl_curso 
		on tbl_curso.id = tbl_aluno_curso.id_curso
where tbl_aluno.id = ${id};`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result) {
        return result
    }else{
        return false
    }
}

module.exports = {
    insertAlunoCurso,
    searchAluno
}
