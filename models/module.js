'use strict'
const Modules = require('../config/database/models').Module,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear un nuevo módulo
async function createModule(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var insert = new Modules(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('module_created')
        })
        
    })
}
//Permite actualizar un módulo
async function updateModule(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var check_module = await(getModuleById(id))
        if (check_module != 'no_module') {
            Modules.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_module')
                if (err) resolve('error_db')
                resolve('module_updated')
            })
        } else {
            errors.module = 'no_module'
            resolve(errors)
        }
    })
}

//Permite borrar un módulo
async function deleteModule(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_module = await(getModuleById(id))
        if (check_module != 'no_module') {
            Modules.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_module')
                }
                resolve('module_deleted')
            })
        } else {
            resolve('no_module')
        }
    })
}
//Permite obtener el módulo por el id
async function getModuleById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Modules.find({_id : id}).exec(function(err, modules) {
            if (err || modules == undefined) resolve('error_db')
            if (modules != undefined && modules.length == 0) {
                resolve('no_module')
            }
            if (modules != null && modules.length > 0) {
                var new_module = {}
                new_module.id = modules[0]['_id']
                new_module.name = encryption.decrypt(modules[0]['name'])
                new_module.description = encryption.decrypt(modules[0]['description'])
                resolve(new_module)
            }
        })
    })
}

//Permite obtener todos los módulos
async function getModules()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Modules.find({}).exec(function(err, modules) {
            if (err) resolve('error_db')
            if (modules.length > 0) {
                var new_modules = []
                for (var i = 0; i < modules.length; i++) {
                    var new_module = {}
                    new_module.id = modules[i]['_id']
                    new_module.name = encryption.decrypt(modules[i]['name'])
                    new_module.description = encryption.decrypt(modules[i]['description'])
                    new_modules.push(new_module)
                }
                resolve(new_modules)
            } else {
                resolve('no_modules')
            }
            
        })
    })
}

module.exports.createModule = createModule
module.exports.updateModule = updateModule
module.exports.deleteModule = deleteModule
module.exports.getModuleById = getModuleById
module.exports.getModules = getModules