'use strict'
const province_model = require('../models/province'),
    format_request = {}

//Permite crear una nueva provincia
async function createProvince(data)
{
    var result_insert = await (province_model.createProvince(data))
    if (result_insert == 'province_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar una provincia
async function updateProvince(data, id)
{
    var result_update = await (province_model.updateProvince(data, id))
    if (result_update == 'province_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar una provincia
async function deleteProvince(id)
{
    var result_delete = await (province_model.deleteProvince(id))
    if (result_delete == 'province_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un provincia por su id
async function getProvinceById(id)
{
    var result_get = await (province_model.getProvinceById(id))
    if (result_get == 'no_province') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todas las provincias
async function getProvinces()
{
    var result_get = await (province_model.getProvinces())
    if (result_get == 'no_provinces') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener las provincias de un país
async function getProvincesByCountry(country)
{
    var result_get = await (province_model.getProvincesByCountry(country))
    if (result_get == 'no_provinces' || result_get == 'no_country') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createProvince = createProvince
module.exports.updateProvince = updateProvince
module.exports.deleteProvince = deleteProvince
module.exports.getProvinceById = getProvinceById
module.exports.getProvinces = getProvinces
module.exports.getProvincesByCountry = getProvincesByCountry