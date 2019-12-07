'use strict'
const Provinces = require('../config/database/models').Province,
    encryption = require('../config/encryption/params'),
    country_model = require('./country')

var errors = {},
    band_errors = false

//Permite crear una nueva provincia
async function createProvince(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            country: (typeof data.country != undefined)? data.country : ''
        }
        var check_country = await(country_model.getCountryById(data.country))
        if (check_country != 'no_country') {
            var insert = new Provinces(data_insert)
            insert.save(function (err, user) {
                if (err) {
                    errors.error_db = 'error_db'
                    resolve(errors)
                }
                resolve('province_created')
            })
        } else {
            errors.country = 'no_country'
            resolve(errors)
        }
    })
}
//Permite actualizar una provincia
async function updateProvince(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            country: (typeof data.country != undefined)? data.country : ''
        }
        var check_country = await(country_model.getCountryById(data.country))
        var check_province = await(getProvinceById(id))
        if (check_country != 'no_country' && check_province != 'no_province') {
            Provinces.findByIdAndUpdate(id, data_update, function(err, result) {
                if (err) {
                    errors.error_db = 'error_db' 
                    resolve(errors) 
                }
                resolve('province_updated')
            })
        }
        if (check_country == 'no_country') {
            band_errors = true
            errors.country = 'no_country'
        }
        if (check_province == 'no_province') {
            band_errors = true
            errors.province = 'no_province'
        }
        if (band_errors) {
            resolve(errors)
        }
    })
}

//Permite borrar una provincia
async function deleteProvince(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_province = await(getProvinceById(id))
        if (check_province != 'no_province') {
            Provinces.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) {
                    resolve('error_db') 
                }
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_province')
                }
                resolve('province_deleted')
            })
        } else {
            resolve('no_province')
        }
    })
}
//Permite obtener una provincia por el id
async function getProvinceById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Provinces.find({_id : id}).exec(async function(err, province) {
            if (err || province == undefined) resolve('error_db')
            if (province != undefined && province.length == 0) {
                resolve('no_province')
            }
            if (province != null && province.length > 0) {
                var new_province = {}
                new_province.id = province[0]['_id']
                new_province.name = encryption.decrypt(province[0]['name'])
                var country = await(country_model.getCountryById(province[0]['country']))
                new_province.country = {}
                new_province.country.id = province[0]['country']
                new_province.country.name = country.name
                resolve(new_province)
            }
        })
    })
}

//Permite obtener todas las provincias
async function getProvinces()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Provinces.find({}).exec(async function(err, provinces) {
            if (err) resolve('error_db')
            if (provinces.length > 0) {
                var new_provinces = []
                for (var i = 0; i < provinces.length; i++) {
                    var province = {}
                    province.id = provinces[i]['_id']
                    province.name = encryption.decrypt(provinces[i]['name'])
                    var country = await(country_model.getCountryById(provinces[i]['country']))
                    province.country = {}
                    province.country.id = provinces[i]['country']
                    province.country.name = country.name
                    new_provinces.push(province)
                }
                resolve(new_provinces)
            } else {
                resolve('no_provinces')
            }
            
        })
    })
}

//Permite obtener todas las provincias de un país
async function getProvincesByCountry(country)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_country = await(country_model.getCountryById(country))
        if (check_country != 'no_country') {
            Provinces.find({country: country}).exec(async function(err, provinces) {
                if (err) resolve('error_db')
                if (provinces.length > 0) {
                    var new_provinces = []
                    for (var i = 0; i < provinces.length; i++) {
                        var province = {}
                        province.id = provinces[i]['_id']
                        province.name = encryption.decrypt(provinces[i]['name'])
                        new_provinces.push(province)
                    }
                    resolve(new_provinces)
                } else {
                    resolve('no_provinces')
                }
                
            })
        } else {
            resolve('no_country')
        }
    })
}

module.exports.createProvince = createProvince
module.exports.updateProvince = updateProvince
module.exports.deleteProvince = deleteProvince
module.exports.getProvinceById = getProvinceById
module.exports.getProvinces = getProvinces
module.exports.getProvincesByCountry = getProvincesByCountry