'use strict'
const Roles = require('../config/database/models').Role,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear un nuevo rol
async function createRole(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var insert = new Roles(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('role_created')
        })
        
    })
}
//Permite actualizar un rol
async function updateRole(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var check_role = await(getRoleById(id))
        if (check_role != 'no_role') {
            Roles.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_role')
                if (err) resolve('error_db')
                resolve('role_updated')
            })
        } else {
            errors.role = 'no_role'
            resolve(errors)
        }
    })
}

//Permite borrar un rol
async function deleteRole(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_role = await(getRoleById(id))
        if (check_role != 'no_role') {
            Roles.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_role')
                }
                resolve('role_deleted')
            })
        } else {
            resolve('no_role')
        }
    })
}
//Permite obtener el rol por el id
async function getRoleById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Roles.find({_id : id}).exec(function(err, role) {
            if (err || role == undefined) resolve('error_db')
            if (role != undefined && role.length == 0) {
                resolve('no_role')
            }
            if (role != null && role.length > 0) {
                var new_role = {}
                new_role.id = role[0]['_id']
                new_role.name = encryption.decrypt(role[0]['name'])
                new_role.description = encryption.decrypt(role[0]['description'])
                resolve(new_role)
            }
        })
    })
}

//Permite obtener el rol por el nombre
async function getRoleByName(name_role)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Roles.find({name : encryption.encrypt(name_role)}).exec(function(err, role) {
            if (err || role == undefined) resolve('error_db')
            if (role != undefined && role.length == 0) {
                resolve('no_role')
            }
            if (role != null && role.length > 0) {
                var new_role = {}
                new_role.id = role[0]['_id']
                new_role.name = encryption.decrypt(role[0]['name'])
                new_role.description = encryption.decrypt(role[0]['description'])
                resolve(new_role)
            }
        })
    })
}

//Permite obtener todos los roles
async function getRoles()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Roles.find({}).exec(function(err, roles) {
            if (err) resolve('error_db')
            if (roles.length > 0) {
                var new_roles = []
                for (var i = 0; i < roles.length; i++) {
                    var role = {}
                    role.id = roles[i]['_id']
                    role.name = encryption.decrypt(roles[i]['name'])
                    role.description = encryption.decrypt(roles[i]['description'])
                    new_roles.push(role)
                }
                resolve(new_roles)
            } else {
                resolve('no_roles')
            }
            
        })
    })
}

module.exports.createRole = createRole
module.exports.updateRole = updateRole
module.exports.deleteRole = deleteRole
module.exports.getRoleById = getRoleById
module.exports.getRoleByName = getRoleByName
module.exports.getRoles = getRoles