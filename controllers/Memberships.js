'use strict'
const membership_model = require('../models/membership'),
    format_request = {}

//Permite crear una nueva membresía
async function createMembership(data)
{
    var result_insert = await (membership_model.createMembership(data))
    if (result_insert == 'membership_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar una membresía
async function updateMembership(data, id)
{
    var result_update = await (membership_model.updateMembership(data, id))
    if (result_update == 'membership_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar una membresía
async function deleteMembership(id)
{
    var result_delete = await (membership_model.deleteMembership(id))
    if (result_delete == 'membership_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    } 
    format_request.message = result_delete
    return format_request
}
//Permite obtener una membresía por su id
async function getMembershipById(id)
{
    var result_get = await (membership_model.getMembershipById(id))
    if (result_get == 'no_membership') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todas las membresías
async function getMemberships()
{
    var result_get = await (membership_model.getMemberships())
    if (result_get == 'no_memberships') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createMembership = createMembership
module.exports.updateMembership = updateMembership
module.exports.deleteMembership = deleteMembership
module.exports.getMembershipById = getMembershipById
module.exports.getMemberships = getMemberships