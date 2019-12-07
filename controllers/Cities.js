'use strict'
const city_model = require('../models/city'),
    format_request = {}

//Permite crear una nueva ciudad
async function createCity(data)
{
    var result_insert = await (city_model.createCity(data))
    if (result_insert == 'city_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar una ciudad
async function updateCity(data, id)
{
    var result_update = await (city_model.updateCity(data, id))
    if (result_update == 'city_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar una ciudad
async function deleteCity(id)
{
    var result_delete = await (city_model.deleteCity(id))
    if (result_delete == 'city_deleted') {
        format_request.code = 204
        format_request.status = 'error'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener una ciudad por su id
async function getCityById(id)
{
    var result_get = await (city_model.getCityById(id))
    if (result_get == 'no_city') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todas las ciudades
async function getCities()
{
    var result_get = await (city_model.getCities())
    if (result_get == 'no_cities') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite obtener las ciudades de un país
async function getCitiesByCountry(country)
{
    var result_get = await (city_model.getCitiesByCountry(country))
    if (result_get == 'no_cities' || result_get == 'no_country' || result_get == 'error_db') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createCity = createCity
module.exports.updateCity = updateCity
module.exports.deleteCity = deleteCity
module.exports.getCityById = getCityById
module.exports.getCities = getCities
module.exports.getCitiesByCountry = getCitiesByCountry