'use strict'
const Countries = require('../config/database/models').Country,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear un nuevo país
async function createCountry(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            iso: (typeof data.iso != undefined)? encryption.encrypt(data.iso) : ''
        }
        var insert = new Countries(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('country_created')
        })
        
    })
}
//Permite actualizar un país
async function updateCountry(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            iso: (typeof data.iso != undefined)? encryption.encrypt(data.iso) : ''
        }
        var check_country = await(getCountryById(id))
        if (check_country != 'no_country') {
            Countries.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_country')
                if (err) resolve('error_db')
                resolve('country_updated')
            })
        } else {
            errors.country = 'no_country'
            resolve(errors)
        }
    })
}

//Permite borrar un país
async function deleteCountry(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_country = await(getCountryById(id))
        if (check_country != 'no_city') {
            Countries.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_country')
                }
                resolve('country_deleted')
            })
        } else {
            resolve('no_country')
        }
    })
}
//Permite obtener el país por el id
async function getCountryById(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        Countries.find({_id : id}).exec(function(err, country) {
            if (err || country == undefined) resolve('error_db')
            if (country != undefined && country.length == 0) {
                resolve('no_country')
            }
            if (country != null && country.length > 0) {
                var new_country = {}
                new_country.id = country[0]['_id']
                new_country.name = encryption.decrypt(country[0]['name'])
                new_country.iso = encryption.decrypt(country[0]['iso'])
                resolve(new_country)
            }
        })
    })
}

//Permite obtener el país por el nombre
async function getCountryByName(name_country)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Countries.find({name : encryption.encrypt(name_country)}).exec(function(err, country) {
            if (err || country == undefined) resolve('error_db')
            if (country != undefined && country.length == 0) {
                resolve('no_country')
            }
            if (country != null && country.length > 0) {
                var new_country = {}
                new_country.id = country[0]['_id']
                new_country.name = encryption.decrypt(country[0]['name'])
                new_country.iso = encryption.decrypt(country[0]['iso'])
                resolve(new_country)
            }
        })
    })
}

//Permite obtener todos los países
async function getCountries()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Countries.find({}).exec(function(err, countries) {
            if (err) resolve('error_db')
            if (countries.length > 0) {
                var new_countries = []
                for (var i = 0; i < countries.length; i++) {
                    var country = {}
                    country.id = countries[i]['_id']
                    country.name = encryption.decrypt(countries[i]['name'])
                    country.iso = encryption.decrypt(countries[i]['iso'])
                    new_countries.push(country)
                }
                resolve(new_countries)
            } else {
                resolve('no_countries')
            }
            
        })
    })
}

module.exports.createCountry = createCountry
module.exports.updateCountry = updateCountry
module.exports.deleteCountry = deleteCountry
module.exports.getCountryById = getCountryById
module.exports.getCountryByName = getCountryByName
module.exports.getCountries = getCountries