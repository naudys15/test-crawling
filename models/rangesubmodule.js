'use strict'
const Rangesubmodule = require('../config/database/models').Rangesubmodule,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear un nuevo rango de submódulo
async function createRangesubmodule(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var insert = new Rangesubmodule(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('range_created')
        })
        
    })
}
//Permite actualizar un rango de submódulo
async function updateRangesubmodule(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var check_range = await(getRangesubmoduleById(id))
        if (check_range != 'no_rangesubmodule') {
            Rangesubmodule.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_rangesubmodule')
                if (err) resolve('error_db')
                resolve('range_updated')
            })
        } else {
            errors.rangesubmodule = 'no_rangesubmodule'
            resolve(errors)
        }
    })
}

//Permite borrar un rango de submódulo
async function deleteRangesubmodule(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_range = await(getRangesubmoduleById(id))
        if (check_range != 'no_rangesubmodule') {
            Rangesubmodule.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_rangesubmodule')
                }
                resolve('range_deleted')
            })
        } else {
            resolve('no_rangesubmodule')
        }
    })
}
//Permite obtener el rango de submódulo por el id
async function getRangesubmoduleById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Rangesubmodule.find({_id : id}).exec(function(err, rangesubmodules) {
            if (err || rangesubmodules == undefined) resolve('error_db')
            if (rangesubmodules != undefined && rangesubmodules.length == 0) {
                resolve('no_rangesubmodule')
            }
            if (rangesubmodules != null && rangesubmodules.length > 0) {
                var new_rangesubmodule = {}
                new_rangesubmodule.id = rangesubmodules[0]['_id']
                new_rangesubmodule.name = encryption.decrypt(rangesubmodules[0]['name'])
                new_rangesubmodule.description = encryption.decrypt(rangesubmodules[0]['description'])
                resolve(new_rangesubmodule)
            }
        })
    })
}

//Permite obtener todos los rangos de submódulos
async function getRangesubmodules()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Rangesubmodule.find({}).exec(function(err, rangesubmodules) {
            if (err) resolve('error_db')
            if (rangesubmodules.length > 0) {
                var new_rangesubmodules = []
                for (var i = 0; i < rangesubmodules.length; i++) {
                    var new_rangesubmodule = {}
                    new_rangesubmodule.id = rangesubmodules[i]['_id']
                    new_rangesubmodule.name = encryption.decrypt(rangesubmodules[i]['name'])
                    new_rangesubmodule.description = encryption.decrypt(rangesubmodules[i]['description'])
                    new_rangesubmodules.push(new_rangesubmodule)
                }
                resolve(new_rangesubmodules)
            } else {
                resolve('no_rangesubmodules')
            }
            
        })
    })
}

module.exports.createRangesubmodule = createRangesubmodule
module.exports.updateRangesubmodule = updateRangesubmodule
module.exports.deleteRangesubmodule = deleteRangesubmodule
module.exports.getRangesubmoduleById = getRangesubmoduleById
module.exports.getRangesubmodules = getRangesubmodules