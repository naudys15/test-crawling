'use strict'
const general_model = require('../models/general'),
    format_request = {}

async function initialize()
{
    const result = await (general_model.initialize())
    if (result) {
        format_request.code = 201
        format_request.status = 'success'
        format_request.message = 'Aplicación inicializada'
    } else if (!result) {
        format_request.code = 500
        format_request.status = 'error'
        format_request.message = 'Hubo un error en base de datos'
    }
    return format_request
}

module.exports.initialize = initialize