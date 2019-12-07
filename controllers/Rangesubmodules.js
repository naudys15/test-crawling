'use strict'
const rangesubmodule_model = require('../models/rangesubmodule'),
    format_request = {}

//Permite crear un nuevo rango de submódulo
async function createRangesubmodule(data)
{
    var result_insert = await (rangesubmodule_model.createRangesubmodule(data))
    if (result_insert == 'range_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar un rango de submódulo
async function updateRangesubmodule(data, id)
{
    var result_update = await (rangesubmodule_model.updateRangesubmodule(data, id))
    if (result_update == 'range_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un rango de submódulo
async function deleteRangesubmodule(id)
{
    var result_delete = await (rangesubmodule_model.deleteRangesubmodule(id))
    if (result_delete == 'range_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un rango de submódulo por su id
async function getRangesubmoduleById(id)
{
    var result_get = await (rangesubmodule_model.getRangesubmoduleById(id))
    if (result_get == 'no_rangesubmodule') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los rangos de submódulos
async function getRangesubmodules()
{
    var result_get = await (rangesubmodule_model.getRangesubmodules())
    if (result_get == 'no_rangesubmodules') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createRangesubmodule = createRangesubmodule
module.exports.updateRangesubmodule = updateRangesubmodule
module.exports.deleteRangesubmodule = deleteRangesubmodule
module.exports.getRangesubmoduleById = getRangesubmoduleById
module.exports.getRangesubmodules = getRangesubmodules