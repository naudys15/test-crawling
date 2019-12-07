'use strict'
const country_model = require('../models/country'),
    city_model = require('../models/city'),
    membership_model = require('../models/membership'),
    module_model = require('../models/module'),
    province_model = require('../models/province'),
    rangesubmodule_model = require('../models/rangesubmodule'),
    role_model = require('../models/role'),
    social_model = require('../models/social'),
    submodule_model = require('../models/submodule'),
    user_model = require('../models/user'),
    Users = require('../config/database/models').User

const required_fields_entity = [
    {'user': 'city,role,email,username,password'},
    {'user_login': 'username,password'},
    {'user_register': 'city,email,username,password'}
]

async function isValidCountry(country) 
{
    var result = await(country_model.getCountryById(country))
    if (result == 'no_country' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidCity(city) 
{
    var result = await(city_model.getCityById(city))
    if (result == 'no_city' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidMembership(membership) 
{
    var result = await(membership_model.getMembershipById(membership))
    if (result == 'no_membership' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidModule(module_id) 
{
    var result = await(module_model.getModuleById(module_id))
    if (result == 'no_module' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidProvince(province) 
{
    var result = await(province_model.getProvinceById(province))
    if (result == 'no_province' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidRange(range) 
{
    var result = await(rangesubmodule_model.getRangesubmoduleById(range))
    if (result == 'no_rangesubmodule' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidRole(role) 
{
    var result = await(role_model.getRoleById(role))
    if (result == 'no_role' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidSocial(social) 
{
    var result = await(social_model.getSocialById(social))
    if (result == 'no_social' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidSubmodule(submodule) 
{
    var result = await(submodule_model.getSubmoduleById(submodule))
    if (result == 'no_submodule' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidUser(user) 
{
    var result = await(user_model.getUserById(user))
    if (result == 'no_user' || result == 'error_db') {
        return false
    } else {
        return true
    }
}

async function isValidEmail(em, update) 
{
    return new Promise ((resolve) => {
        if (update == null) {
            Users.find({email: em}).exec(async function(err, users) {
                if (err) resolve('error_db')
                if (users.length > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        } else {
            Users.find({email: em, _id: { $ne: update }}).exec(async function(err, users) {
                if (err) resolve('error_db')
                if (users.length > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        }
    })
}

async function isValidUsername(user, update) 
{
    return new Promise ((resolve) => {
        if (update == null) {
            Users.find({username: user}).exec(async function(err, users) {
                if (err) resolve('error_db')
                if (users.length > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        } else {
            Users.find({username: user, _id: { $ne: update }}).exec(async function(err, users) {
                if (err) resolve('error_db')
                if (users.length > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        }
    })
}

async function getRequiredFieldsEntity(entity)
{
    for (var i in required_fields_entity) {
        for (var j in required_fields_entity[i]) {
            if (entity === j) {
                return required_fields_entity[i][j]
            }
        }
    }
    return null
}

module.exports.isValidCountry = isValidCountry
module.exports.isValidCity = isValidCity
module.exports.isValidMembership = isValidMembership
module.exports.isValidModule = isValidModule
module.exports.isValidProvince = isValidProvince
module.exports.isValidRange = isValidRange
module.exports.isValidRole = isValidRole
module.exports.isValidSocial = isValidSocial
module.exports.isValidSubmodule = isValidSubmodule
module.exports.isValidUser = isValidUser
module.exports.isValidEmail = isValidEmail
module.exports.isValidUsername = isValidUsername
module.exports.getRequiredFieldsEntity = getRequiredFieldsEntity