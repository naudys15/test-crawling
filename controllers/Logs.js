'use strict'
const log_model = require('../models/log'),
    format_request = {}

//Permite crear un nuevo log
async function createLog(data)
{
    var result_insert = await (log_model.createLog(data))
    if (result_insert == 'log_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}

//Permite obtener un log por su id
async function getLogById(id)
{
    var result_get = await (log_model.getLogById(id))
    if (result_get == 'no_log') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los logs
async function getLogs()
{
    var result_get = await (log_model.getLogs())
    if (result_get == 'no_logs') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener los logs de un usuario
async function getLogsByUser(user)
{
    var result_get = await (log_model.getLogsByUser(user))
    if (result_get == 'no_logs') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener los logs de una fecha específica
async function getLogsByDate(date)
{
    var result_get = await (log_model.getLogsByDate(date))
    if (result_get == 'no_logs') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener los logs de un rango de fechas
async function getLogsByDates(begin, end)
{
    var result_get = await (log_model.getLogsByDates(begin, end))
    if (result_get == 'no_logs') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createLog = createLog
module.exports.getLogById = getLogById
module.exports.getLogs = getLogs
module.exports.getLogsByUser = getLogsByUser
module.exports.getLogsByDate = getLogsByDate
module.exports.getLogsByDates = getLogsByDates