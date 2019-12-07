'use strict'
const social_model = require('../models/social'),
    format_request = {}

//Permite crear una nueva red social
async function createSocial(data)
{
    var result_insert = await (social_model.createSocial(data))
    if (result_insert == 'social_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar una red social
async function updateSocial(data, id)
{
    var result_update = await (social_model.updateSocial(data, id))
    if (result_update == 'social_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    } 
    format_request.message = result_update
    return format_request
}

//Permite borrar una red social
async function deleteSocial(id)
{
    var result_delete = await (social_model.deleteSocial(id))
    if (result_delete == 'social_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener una red social por su id
async function getSocialById(id)
{
    var result_get = await (social_model.getSocialById(id))
    if (result_get == 'no_social') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todas las redes sociales
async function getSocials()
{
    var result_get = await (social_model.getSocials())
    if (result_get == 'no_socials') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createSocial = createSocial
module.exports.updateSocial = updateSocial
module.exports.deleteSocial = deleteSocial
module.exports.getSocialById = getSocialById
module.exports.getSocials = getSocials