'use strict'
const Socials = require('../config/database/models').Social,
    encryption = require('../config/encryption/params')

var errors = {},
    band_errors = false

//Permite crear una nueva red social
async function createSocial(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var insert = new Socials(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            }
            resolve('social_created')
        })
        
    })
}
//Permite actualizar una red social
async function updateSocial(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = {
            name: (typeof data.name != undefined)? encryption.encrypt(data.name) : '',
            description: (typeof data.description != undefined)? encryption.encrypt(data.description) : ''
        }
        var check_social = await(getSocialById(id))
        if (check_social != 'no_social') {
            Socials.findByIdAndUpdate(id, data_update, function(err, result) {
                if (result == undefined) resolve('no_social')
                if (err) resolve('error_db')
                resolve('social_updated')
            })
        } else {
            errors.social = 'no_social'
            resolve(errors)
        }
    })
}

//Permite borrar una red social
async function deleteSocial(id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var check_social = await(getSocialById(id))
        if (check_social != 'no_social') {
            Socials.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_social')
                }
                resolve('social_deleted')
            })
        } else {
            resolve('no_social')
        }
    })
}
//Permite obtener la red social por el id
async function getSocialById(id)
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Socials.find({_id : id}).exec(function(err, social) {
            if (err || social == undefined) resolve('error_db')
            if (social != undefined && social.length == 0) {
                resolve('no_social')
            }
            if (social != null && social.length > 0) {
                var new_social = {}
                new_social.id = social[0]['_id']
                new_social.name = encryption.decrypt(social[0]['name'])
                new_social.description = encryption.decrypt(social[0]['description'])
                resolve(new_social)
            }
        })
    })
}

//Permite obtener todas las redes sociales
async function getSocials()
{
    return new Promise((resolve) => {
        errors = {}
        band_errors = false
        Socials.find({}).exec(function(err, socials) {
            if (err) resolve('error_db')
            if (socials.length > 0) {
                var new_socials = []
                for (var i = 0; i < socials.length; i++) {
                    var new_social = {}
                    new_social.id = socials[i]['_id']
                    new_social.name = encryption.decrypt(socials[i]['name'])
                    new_social.description = encryption.decrypt(socials[i]['description'])
                    new_socials.push(new_social)
                }
                resolve(new_socials)
            } else {
                resolve('no_socials')
            }
            
        })
    })
}

module.exports.createSocial = createSocial
module.exports.updateSocial = updateSocial
module.exports.deleteSocial = deleteSocial
module.exports.getSocialById = getSocialById
module.exports.getSocials = getSocials