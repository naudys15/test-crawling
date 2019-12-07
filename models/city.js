'use strict'
const Cities = require('../config/database/models').City,
    country_model = require('./country'),
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear una nueva ciudad
async function createCity(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            country: (typeof data.country != undefined)? data.country : '',
            latitude: (typeof data.latitude != undefined)? encryption.encrypt(data.latitude) : '',
            longitude: (typeof data.longitude != undefined)? encryption.encrypt(data.longitude) : ''
        }
        var check_country = await(country_model.getCountryById(data.country))
        if (check_country != 'no_country') {
            var insert = new Cities(data_insert)
            insert.save(function (err, user) {
                if (err) {
                    resolve('error_db')
                }
                resolve('city_created')
            })
        } else {
            errors.country = 'no_country'
            resolve(errors)
        }
    })
}
//Permite actualizar una ciudad
async function updateCity(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            country: (typeof data.country != undefined)? data.country : '',
            latitude: (typeof data.latitude != undefined)? encryption.encrypt(data.latitude) : '',
            longitude: (typeof data.longitude != undefined)? encryption.encrypt(data.longitude) : ''
        }
        var check_city = await(getCityById(id))
        if (check_city != 'no_city') {
            var check_country = await(country_model.getCountryById(data.country))
            if (check_country != 'no_country') {
                Cities.findByIdAndUpdate(id, data_update, function(err, result) {
                    if (result == undefined) resolve('no_city')
                    if (err) resolve('error_db')
                    resolve('city_updated')
                })
            } else {
                errors.country = 'no_country'
                resolve(errors)
            }
        } else {
            errors.city = 'no_city'
            resolve(errors)
        }
    })
}

//Permite borrar una ciudad
async function deleteCity(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_city = await(getCityById(id))
        if (check_city != 'no_city') {
            Cities.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_city')
                }
                resolve('city_deleted')
            })
        } else {
            resolve('no_city')
        }
    })
}
//Permite obtener una ciudad por el id
async function getCityById(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        Cities.find({_id : id}).exec(async function(err, city) {
            if (err || city == undefined) resolve('error_db')
            if (city != undefined && city.length == 0) {
                resolve('no_city')
            }
            if (city != null && city.length > 0) {
                var new_city = {}
                new_city.id = city[0]['_id']
                new_city.name = encryption.decrypt(city[0]['name'])
                var country = await(country_model.getCountryById(city[0]['country']))
                new_city.country = {}
                new_city.country.id = city[0]['country']
                new_city.country.name = country.name
                new_city.latitude = encryption.decrypt(city[0]['latitude'])
                new_city.longitude = encryption.decrypt(city[0]['longitude'])
                resolve(new_city)
            }
        })
    })
}

//Permite obtener todas las ciudades
async function getCities()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Cities.find({}).exec(async function(err, cities) {
            if (err) resolve('error_db')
            if (cities.length > 0) {
                var new_cities = []
                for (var i = 0; i < cities.length; i++) {
                    var city = {}
                    city.id = cities[i]['_id']
                    city.name = encryption.decrypt(cities[i]['name'])
                    var country = await(country_model.getCountryById(cities[i]['country']))
                    city.country = {}
                    city.country.id = cities[i]['country']
                    city.country.name = country.name
                    city.latitude = encryption.decrypt(cities[i]['latitude'])
                    city.longitude = encryption.decrypt(cities[i]['longitude'])
                    new_cities.push(city)
                }
                resolve(new_cities)
            } else {
                resolve('no_cities')
            }
            
        })
    })
}

//Permite obtener todas las ciudades de un país
async function getCitiesByCountry(country)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_country = await(country_model.getCountryById(country))
        if (check_country != 'no_country') {
            Cities.find({country: country}).exec(function(err, cities) {
                if (err) resolve('error_db')
                if (cities != null && cities.length > 0) {
                    var new_cities = []
                    for (var i = 0; i < cities.length; i++) {
                        var city = {}
                        city.id = cities[i]['_id']
                        city.name = encryption.decrypt(cities[i]['name'])
                        city.latitude = encryption.decrypt(cities[i]['latitude'])
                        city.longitude = encryption.decrypt(cities[i]['longitude'])
                        new_cities.push(city)
                    }
                    resolve(new_cities)
                } else {
                    resolve('no_cities')
                }
            })
        } else {
            resolve('no_country')
        }
    })
}

module.exports.createCity = createCity
module.exports.updateCity = updateCity
module.exports.deleteCity = deleteCity
module.exports.getCityById = getCityById
module.exports.getCities = getCities
module.exports.getCitiesByCountry = getCitiesByCountry