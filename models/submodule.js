'use strict'
const Submodules = require('../config/database/models').Submodule,
    encryption = require('../config/encryption/params'),
    module_model = require('./module')

var errors = {},
    band_errors = false

//Permite crear un nuevo submódulo
async function createSubmodule(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : '',
            module: (typeof data.module != undefined)? data.module : ''
        }
        var check_module = await(module_model.getModuleById(data.module))
        if (check_module != 'no_module') {
            var insert = new Submodules(data_insert)
            insert.save(function (err, user) {
                if (err) {
                    errors.error_db = 'error_db'
                    resolve(errors)
                }
                resolve('submodule_created')
            })
        } else {
            errors.module = 'no_module'
            resolve(errors)
        }
    })
}
//Permite actualizar un submódulo
async function updateSubmodule(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : '',
            module: (typeof data.module != undefined)? data.module : ''
        }
        var check_module = await(module_model.getModuleById(data.module))
        var check_submodule = await(getSubmoduleById(id))
        if (check_module != 'no_module' && check_submodule != 'no_submodule') {
            Submodules.findByIdAndUpdate(id, data_update, function(err, result) {
                if (err) resolve('error_db')
                resolve('submodule_updated')
            })
        }
        if (check_module == 'no_module') {
            band_errors = true
            errors.module = 'no_module'
        }
        if (check_submodule == 'no_submodule') {
            band_errors = true
            errors.submodule = 'no_submodule'
        }
        if (band_errors) {
            resolve(errors)
        }  
    })
}

//Permite borrar un submódulo
async function deleteSubmodule(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_submodule = await(getSubmoduleById(id))
        if (check_submodule != 'no_submodule') {
            Submodules.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_submodule')
                }
                resolve('submodule_deleted')
            })
        } else {
            resolve('no_submodule')
        }
    })
}
//Permite obtener un submódulo por el id
async function getSubmoduleById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Submodules.find({_id : id}).exec(async function(err, submodule) {
            if (err || submodule == undefined) resolve('error_db')
            if (submodule != undefined && submodule.length == 0) {
                resolve('no_submodule')
            }
            if (submodule != null && submodule.length > 0) {
                var new_submodule = {}
                new_submodule.id = submodule[0]['_id']
                new_submodule.name = encryption.decrypt(submodule[0]['name'])
                new_submodule.description = encryption.decrypt(submodule[0]['description'])
                var module_object = await(module_model.getModuleById(submodule[0]['module']))
                new_submodule.module = {}
                new_submodule.module.id = submodule[0]['module']
                new_submodule.module.name = module_object.name
                resolve(new_submodule)
            }
        })
    })
}

//Permite obtener todos los submódulos
async function getSubmodules()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Submodules.find({}).exec(async function(err, submodules) {
            if (err) resolve('error_db')
            if (submodules.length > 0) {
                var new_submodules = []
                for (var i = 0; i < submodules.length; i++) {
                    var submodule = {}
                    submodule.id = submodules[i]['_id']
                    submodule.name = encryption.decrypt(submodules[i]['name'])
                    submodule.description = encryption.decrypt(submodules[i]['description'])
                    var module_object = await(module_model.getModuleById(submodules[i]['module']))
                    submodule.module = {}
                    submodule.module.id = submodules[i]['module']
                    submodule.module.name = module_object.name
                    new_submodules.push(submodule)
                }
                resolve(new_submodules)
            } else {
                resolve('no_submodules')
            }
        })
    })
}

//Permite obtener todos los submódulos de un módulo
async function getSubmodulesByModule(modules)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_module = await(module_model.getModuleById(modules))
        if (check_module != 'no_module') {
            Submodules.find({module: modules}).exec(function(err, submodules) {
                if (err) resolve('error_db')
                if (submodules != undefined && submodules.length > 0) {
                    var new_submodules = []
                    for (var i = 0; i < submodules.length; i++) {
                        var submodule = {}
                        submodule.id = submodules[i]['_id']
                        submodule.name = encryption.decrypt(submodules[i]['name'])
                        submodule.description = encryption.decrypt(submodules[i]['description'])
                        new_submodules.push(submodule)
                    }
                    resolve(new_submodules)
                } else {
                    resolve('no_submodules')
                }
                
            })
        } else {
            resolve('no_module')
        } 
    })
}

module.exports.createSubmodule = createSubmodule
module.exports.updateSubmodule = updateSubmodule
module.exports.deleteSubmodule = deleteSubmodule
module.exports.getSubmoduleById = getSubmoduleById
module.exports.getSubmodules = getSubmodules
module.exports.getSubmodulesByModule = getSubmodulesByModule