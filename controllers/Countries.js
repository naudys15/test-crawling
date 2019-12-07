'use strict'
const country_model = require('../models/country'),
    format_request = {}

//Permite crear un nuevo país
async function createCountry(data)
{
    var result_insert = await (country_model.createCountry(data))
    if (result_insert == 'country_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}
//Permite actualizar un país
async function updateCountry(data, id)
{
    var result_update = await (country_model.updateCountry(data, id))
    if (result_update == 'country_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un país
async function deleteCountry(id)
{
    var result_delete = await (country_model.deleteCountry(id))
    if (result_delete == 'country_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un país por su id
async function getCountryById(id)
{
    var result_get = await (country_model.getCountryById(id))
    if (result_get == 'no_country') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los países
async function getCountries()
{
    var result_get = await (country_model.getCountries())
    if (result_get == 'no_countries') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

module.exports.createCountry = createCountry
module.exports.updateCountry = updateCountry
module.exports.deleteCountry = deleteCountry
module.exports.getCountryById = getCountryById
module.exports.getCountries = getCountries