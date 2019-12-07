'use strict'
const submodule_model = require('../models/submodule'),
    format_request = {}

//Permite crear un nuevo submódulo
async function createSubmodule(data)
{
    var result_insert = await (submodule_model.createSubmodule(data))
    if (result_insert == 'submodule_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar un submódulo
async function updateSubmodule(data, id)
{
    var result_update = await (submodule_model.updateSubmodule(data, id))
    if (result_update == 'submodule_updated') {
        format_request.code = 200
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un submódulo
async function deleteSubmodule(id)
{
    var result_delete = await (submodule_model.deleteSubmodule(id))
    if (result_delete == 'submodule_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un submódulo por su id
async function getSubmoduleById(id)
{
    var result_get = await (submodule_model.getSubmoduleById(id))
    if (result_get == 'no_submodule') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los submódulos
async function getSubmodules()
{
    var result_get = await (submodule_model.getSubmodules())
    if (result_get == 'no_submodules') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener los submódulos de un módulo
async function getSubmodulesByModule(modules)
{
    var result_get = await (submodule_model.getSubmodulesByModule(modules))
    if (result_get == 'no_submodules' || result_get == 'no_module') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createSubmodule = createSubmodule
module.exports.updateSubmodule = updateSubmodule
module.exports.deleteSubmodule = deleteSubmodule
module.exports.getSubmoduleById = getSubmoduleById
module.exports.getSubmodules = getSubmodules
module.exports.getSubmodulesByModule = getSubmodulesByModule