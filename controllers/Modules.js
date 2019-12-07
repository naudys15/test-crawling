'use strict'
const module_model = require('../models/module'),
    format_request = {}

//Permite crear un nuevo módulo
async function createModule(data)
{
    var result_insert = await (module_model.createModule(data))
    if (result_insert == 'module_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar un módulo
async function updateModule(data, id)
{
    var result_update = await (module_model.updateModule(data, id))
    if (result_update == 'module_updated') {
        format_request.code = 200
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un módulo
async function deleteModule(id)
{
    var result_delete = await (module_model.deleteModule(id))
    if (result_delete == 'module_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un módulo por su id
async function getModuleById(id)
{
    var result_get = await (module_model.getModuleById(id))
    if (result_get == 'no_module') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los módulos
async function getModules()
{
    var result_get = await (module_model.getModules())
    if (result_get == 'no_modules') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createModule = createModule
module.exports.updateModule = updateModule
module.exports.deleteModule = deleteModule
module.exports.getModuleById = getModuleById
module.exports.getModules = getModules