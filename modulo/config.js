/*

    Objetivo: Arquivo responsável pela configuração de variaveis, constantes e menssagens do sistema
    Autor: Lídia Galdino
    Data de criação: 13/10/22
    Última modificação em: 13/10/22
    Versão: 1.0 
 
*/

const MESSAGE_ERROR = {
    REQUIRED_FIELDS: 'Existem campos obrigatórios que não foram preenchidos',
    INVALID_EMAIL: 'O e-mail informado não é válido',
    CONTENT_TYPE: 'O cabeçalho da requisição não possui um content-type válido',
    EMPTY_BODY: 'O body da requisição não pode ser vazio',
    NOT_FOUND_DB: 'Não foram encontrados registros no banco de dados',
    INTERNAL_SERVER_ERROR: 'Não foi possível realizar a operação com o Banco de Dados',
    REQUIRED_ID: 'O id do registro é obrigatório neste tipo de requisição'
}

const MESSAGE_SUCCESS = {
    INSERT_ITEM: 'Item criado com sucesso no BD',
    UPDATE_ITEM: 'Item atualizado com sucesso',
    DELETE_ITEM: 'Item deletado com sucesso',
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}