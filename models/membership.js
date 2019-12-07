'use strict'
const Memberships = require('../config/database/models').Membership,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear una nueva membresía
async function createMembership(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : '',
            price: (typeof data.price != undefined)? encryption.encrypt(data.price) : ''
        }
        var insert = new Memberships(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('membership_created')
        })
        
    })
}
//Permite actualizar una membresía
async function updateMembership(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : '',
            price: (typeof data.price != undefined)? encryption.encrypt(data.price) : ''
        }
        var check_membership = await(getMembershipById(id))
        if (check_membership != 'no_membership') {
            Memberships.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_membership')
                if (err) resolve('error_db')
                resolve('membership_updated')
            })
        } else {
            errors.membership = 'no_membership'
            resolve(errors)
        }
    })
}

//Permite borrar una membresía
async function deleteMembership(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_membership = await(getMembershipById(id))
        if (check_membership != 'no_membership') {
            Memberships.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_membership')
                }
                resolve('membership_deleted')
            })
        } else {
            resolve('no_membership')
        }
    })
}
//Permite obtener la membresía por el id
async function getMembershipById(id)
{
    return new Promise((resolve) => {
        Memberships.find({_id : id}).exec(function(err, membership) {
            if (err || membership == undefined) resolve('error_db')
            if (membership != undefined && membership.length == 0) {
                resolve('no_membership')
            }
            if (membership != null && membership.length > 0) {
                var new_membership = {}
                new_membership.id = membership[0]['_id']
                new_membership.name = encryption.decrypt(membership[0]['name'])
                new_membership.description = encryption.decrypt(membership[0]['description'])
                new_membership.price = encryption.decrypt(membership[0]['price'])
                resolve(new_membership)
            }
        })
    })
}

//Permite obtener todas las membresías
async function getMemberships()
{
    return new Promise((resolve) => {
        Memberships.find({}).exec(function(err, memberships) {
            if (err) resolve('error_db')
            if (memberships.length > 0) {
                var new_memberships = []
                for (var i = 0; i < memberships.length; i++) {
                    var membership = {}
                    membership.id = memberships[i]['_id']
                    membership.name = encryption.decrypt(memberships[i]['name'])
                    membership.description = encryption.decrypt(memberships[i]['description'])
                    membership.price = encryption.decrypt(memberships[i]['price'])
                    new_memberships.push(membership)
                }
                resolve(new_memberships)
            } else {
                resolve('no_memberships')
            }
            
        })
    })
}

module.exports.createMembership = createMembership
module.exports.updateMembership = updateMembership
module.exports.deleteMembership = deleteMembership
module.exports.getMembershipById = getMembershipById
module.exports.getMemberships = getMemberships