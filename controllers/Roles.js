'use strict'
const role_model = require('../models/role'),
    format_request = {}

//Permite crear un nuevo rol
async function createRole(data)
{
    var result_insert = await (role_model.createRole(data))
    if (result_insert == 'role_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar un rol
async function updateRole(data, id)
{
    var result_update = await (role_model.updateRole(data, id))
    if (result_update == 'role_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un rol
async function deleteRole(id)
{
    var result_delete = await (role_model.deleteRole(id))
    if (result_delete == 'role_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un rol por su id
async function getRoleById(id)
{
    var result_get = await (role_model.getRoleById(id))
    if (result_get == 'no_role') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los roles
async function getRoles()
{
    var result_get = await (role_model.getRoles())
    if (result_get == 'no_roles') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createRole = createRole
module.exports.updateRole = updateRole
module.exports.deleteRole = deleteRole
module.exports.getRoleById = getRoleById
module.exports.getRoles = getRoles