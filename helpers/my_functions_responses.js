'use strict'
var format_response = {}

//Dar formato a la respuesta
function formatResponse(format)
{
    format_response.message = format.message
    format_response.status = format.status
    format_response.code = format.code
    return format_response
}
//Dar respuestas automatizadas por tipo de código
function formatResponseByCode(code)
{
    if (code == 'no_data') {
        format_response.message = 'Los campos no pueden estar vacíos'
        format_response.status = 'error'
        format_response.code = 400
    }
    return format_response
}

module.exports.formatResponse = formatResponse
module.exports.formatResponseByCode = formatResponseByCode