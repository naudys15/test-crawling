'use strict'
const Users = require('../config/database/models').User,
    city_model = require('./city'),
    role_model = require('./role'),
    jwt = require('jsonwebtoken'),
    encryption = require('../config/encryption/params'),
    files = require('fs'),
    route_files = __dirname + '/../files/',
    route_files_public = '/'

var errors = {},
    band_errors = false

//Permite crear un nuevo usuario
async function createUser(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_insert = data
        data_insert.validate_account = true
        data_insert.validation_code = ''
        data_insert.restore_password_code = ''
        if (data.avatar != '') {
            var file = data.avatar
            const ba64 = require('ba64')
            var base64Data = file.replace(/^data:image\/(gif|png|jpg)/gi, "data:image/jpeg"),
                name_file = encryption.generateCodeFiles(),
                route_store = route_files + 'images/profile/',
                fullname_file = route_store + '' + name_file,
                fullname_public = route_files_public + 'images/profile/' + name_file
            ba64.writeImageSync(fullname_file, base64Data)
            data_insert.avatar = fullname_public + '.jpeg'
            data_insert.avatar = await(encryption.encrypt(data_insert.avatar))
        }
        var insert = new Users(data_insert)
        insert.save(function (err, user) {
            if (err) {
                files.unlinkSync(fullname_file + '.jpeg')
                resolve('error_db')
            } else {
                resolve('user_created')
            }
        })
    })
}

//Permite actualizar un usuario
async function updateUser(data, id)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var data_update = data
        if (data_update.avatar != '') {
            const ba64 = require('ba64')
            var file = data_update.avatar
            var base64Data = file.replace(/^data:image\/(gif|png|jpg)/gi, "data:image/jpeg"),
                name_file = encryption.generateCodeFiles(),
                route_store = route_files + 'images/profile/',
                fullname_file = route_store + '' + name_file,
                fullname_public = route_files_public + 'images/profile/' + name_file
            ba64.writeImageSync(fullname_file, base64Data)
            data_update.avatar = fullname_public + '.jpeg'
            data_update.avatar = encryption.encrypt(data_update.avatar)
        }
        var check_user = await(getUserById(id))
        Users.findByIdAndUpdate(id, data_update, function(err, result) {
            if (err) {
                if (encryption.decrypt(data_update.avatar) != '') {
                    files.unlinkSync(fullname_file + '.jpeg')
                }
                resolve('error_db')
            }
            if (encryption.decrypt(check_user[0].avatar) != '') {
                try {
                    files.unlinkSync(__dirname + '/../files' + encryption.decrypt(check_user[0].avatar))
                } catch (e) {
                }
            }
            resolve('user_updated')
        })
    })
}

//Permite borrar un usuario
async function deleteUser(id)
{
    return new Promise(async (resolve) => {
        var check_user = await(getUserById(id))
        if (check_user != 'no_user') {
            Users.deleteMany({_id : id}).exec(function(err, result) {
                if (err || result == undefined) resolve('error_db')
                if (result == null || (result != null && result.deletedCount == 0)) {
                    resolve('no_user')
                }
                if (encryption.decrypt(check_user[0].avatar) != '') {
                    try {
                        files.unlinkSync(__dirname + '/../files' + encryption.decrypt(check_user[0].avatar))
                    } catch (e) {
                    }
                }
                resolve('user_deleted')
            })
        } else {
            resolve('no_user')
        }
    })
}
//Permite obtener un usuario por el id
async function getUserById(id)
{
    return new Promise((resolve) => {
        Users.find({_id : id}).exec(async function(err, user) {
            if (err || user == undefined) resolve('error_db')
            if (user != undefined && user.length == 0) {
                resolve('no_user')
            }
            if (user != null && user.length > 0) {
                var new_users = []
                var new_user = {}
                new_user.id = user[0]['_id']
                new_user.firstname = user[0]['firstname']
                new_user.lastname = user[0]['lastname']
                new_user.dni = user[0]['dni']
                var role_object = await(role_model.getRoleById(user[0]['role']))
                new_user.role = {}
                new_user.role.id = user[0]['role']
                new_user.role.name = role_object.name
                var city_object = await(city_model.getCityById(user[0]['city']))
                new_user.city = {}
                new_user.city.id = user[0]['city']
                new_user.city.name = city_object.name
                new_user.fiscal = {}
                new_user.fiscal.company_name = user[0]['fiscal']['company_name']
                new_user.fiscal.fiscal_dni = user[0]['fiscal']['fiscal_dni']
                new_user.fiscal.vat = user[0]['fiscal']['vat']
                new_user.fiscal.company_address = user[0]['fiscal']['company_address']
                new_user.fiscal.company_city = user[0]['fiscal']['company_city']
                new_user.fiscal.company_postal_code = user[0]['fiscal']['company_postal_code']
                new_user.fiscal.phone = user[0]['phone']
                new_user.avatar = user[0]['avatar']
                new_user.status = user[0]['status']
                new_user.address = user[0]['address']
                new_user.postal_code = user[0]['postal_code']
                new_user.phone = user[0]['phone']
                new_user.skype = user[0]['skype']
                new_user.email = user[0]['email']
                new_user.datebirth = user[0]['datebirth']
                new_user.paypal_email = user[0]['paypal_email']
                new_user.validate_account = user[0]['validate_account']
                new_user.validation_code = user[0]['validation_code']
                new_user.restore_password_code = user[0]['restore_password_code']
                new_users.push(new_user)
                resolve(new_users)
            }
        })
    })
}

//Permite obtener todos los usuarios
async function getUsers()
{
    return new Promise((resolve) => {
        Users.find({}).exec(async function(err, users) {
            if (err) resolve('error_db')
            if (users.length > 0) {
                var new_users = []
                for (var i = 0; i < users.length; i++) {
                    var user = {}
                    user.id = users[i]['_id']
                    user.firstname = users[i]['firstname']
                    user.lastname = users[i]['lastname']
                    user.dni = users[i]['dni']
                    var role_object = await(role_model.getRoleById(users[i]['role']))
                    user.role = {}
                    user.role.id = users[i]['role']
                    user.role.name = role_object.name
                    var city_object = await(city_model.getCityById(users[i]['city']))
                    user.city = {}
                    user.city.id = users[i]['city']
                    user.city.name = city_object.name
                    user.fiscal = {}
                    user.fiscal.company_name = users[i]['fiscal']['company_name']
                    user.fiscal.fiscal_dni = users[i]['fiscal']['fiscal_dni']
                    user.fiscal.vat = users[i]['fiscal']['vat']
                    user.fiscal.company_address = users[i]['fiscal']['company_address']
                    user.fiscal.company_city = users[i]['fiscal']['company_city']
                    user.fiscal.company_postal_code = users[i]['fiscal']['company_postal_code']
                    user.fiscal.phone = users[i]['phone']
                    user.avatar = users[i]['avatar']
                    user.status = users[i]['status']
                    user.address = users[i]['address']
                    user.postal_code = users[i]['postal_code']
                    user.phone = users[i]['phone']
                    user.skype = users[i]['skype']
                    user.email = users[i]['email']
                    user.datebirth = users[i]['datebirth']
                    user.paypal_email = users[i]['paypal_email']
                    user.username = users[i]['username']
                    user.password = users[i]['password']
                    user.validate_account = users[i]['validate_account']
                    user.validation_code = users[i]['validation_code']
                    user.restore_password_code = users[i]['restore_password_code']
                    new_users.push(user)
                }
                resolve(new_users)
            } else {
                resolve('no_users')
            }
            
        })
    })
}

//Permite realizar el inicio de sesión
async function login(user, pass)
{
    return new Promise((resolve) => {
        Users.find({ $or: [ {username : user}, {email : user} ]}).exec(async function(err, users) {
            if (err || users == undefined) resolve('error_db')
            if (users.length == 0) {
                resolve('wrong_credentials')
            } else {
                for (var i in users) {
                    if (users[i].validate_account == false) {
                        resolve('non_verified_account')
                    }
                    if (users[i].status == 0) {
                        resolve('deactivated_account')
                    }
                }
                let validate_pass = false,
                    user_id = 0
                for (var i in users) {
                    let check_pass = await(encryption.comparePasswords(pass, users[i].password))
                    if (check_pass) {
                        validate_pass = true
                        user_id = users[i].id
                    }
                }
                if (validate_pass) {
                    let tokenData = {id: user_id},
                    token = jwt.sign(tokenData, 'Secret Password', {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    })
                    resolve(token)
                } else {
                    resolve('wrong_credentials')
                }
            }
        })
    })
}

//Permite realizar el cierre de sesión
async function logout(token)
{
    var user = await(checkToken(token))
    if (user != false) {
        return new Promise((resolve) => { resolve(true) })
    } else {
        return new Promise((resolve) => { resolve(false) })
    }
}

//Permite comprobar si el token es válido
async function checkToken(token)
{
    var check = ''
    token = token.replace(/Bearer /gi, '');
    jwt.verify(token, 'Secret Password', function(err, user) {
        if (err) {
            check = false
        } else if (user != undefined) {
            check = user.id
        }
    })
    if (check == false) {
        return new Promise ((resolve) => { resolve(false) })
    } else {
        var user = await(getUserById(check))
        user.id = check
        return new Promise ((resolve) => { resolve(user) })
    }
}

//Permite registrar un nuevo usuario
async function register(data)
{
    return new Promise(async (resolve) => {
        errors = {}
        band_errors = false
        var role = await(role_model.getRoleByName('client'))
        var data_insert = data
        var validation_code = encryption.generateCodeVerificationAccount()
        data_insert.role = role.id + ''
        data_insert.status = 1
        data_insert.validate_account = false
        data_insert.validation_code = validation_code
        data_insert.restore_password_code = ''
        data_insert.avatar = ''
        var insert = new Users(data_insert)
        insert.save(function (err, user) {
            if (err) {
                resolve('error_db')
            } else {

                resolve('user_created' + validation_code)
            }
        })
    })
}

//Permite verificar el token de registro de un usuario, para habilitar su cuenta
async function confirmRegister(id)
{
    return new Promise((resolve) => {
        Users.find({validation_code : id, validate_account: false}).exec(async function(err, user) {
            if (err || user == undefined) resolve('error_db')
            if (user != undefined && user.length == 0) {
                resolve('invalid_confirmation_code')
            }
            if (user != null && user.length > 0) {
                user[0].validate_account = true
                var id = user[0]._id
                user = {
                    "firstname": user[0].firstname,
                    "lastname": user[0].lastname,
                    "dni": user[0].dni,
                    "city": user[0].city,
                    "address": user[0].address,
                    "postal_code": user[0].postal_code,
                    "phone": user[0].phone,
                    "skype": user[0].skype,
                    "avatar": user[0].avatar,
                    "fiscal": {
                        "company_name": user[0].fiscal.company_name,
                        "fiscal_dni": user[0].fiscal.fiscal_dni,
                        "vat": user[0].fiscal.vat,
                        "company_address": user[0].fiscal.company_address,
                        "company_city": user[0].fiscal.company_city,
                        "company_postal_code": user[0].fiscal.company_postal_code,
                        "company_phone": user[0].fiscal.company_phone,
                    },
                    "email": user[0].email,
                    "datebirth": user[0].datebirth,
                    "paypal_email": user[0].paypal_email,
                    "username": user[0].username,
                    "password": user[0].password,
                    "validate_account": user[0].validate_account,
                    "validation_code": user[0].validation_code,
                    "restore_password_code": user[0].restore_password_code
                }
                var new_user_confirmed = user
                Users.findByIdAndUpdate(id, new_user_confirmed, function(err, result) {
                    if (err) {
                        resolve('error_db')
                    }
                    resolve('user_confirmed')
                })
            }
        })
    })
}

async function sendRequestPassword(em)
{
    return new Promise((resolve) => {
        Users.find({email : em}).exec(async function(err, user) {
            if (err || user == undefined) resolve('error_db')
            if (user != undefined && user.length == 0) {
                resolve('no_user')
            }
            if (user != null && user.length > 0) {
                user[0].validate_account = true
                var id = user[0]._id
                var request_password_code = await(encryption.generateCodeRequestPassword(em))
                user = {
                    "firstname": user[0].firstname,
                    "lastname": user[0].lastname,
                    "dni": user[0].dni,
                    "city": user[0].city,
                    "address": user[0].address,
                    "postal_code": user[0].postal_code,
                    "phone": user[0].phone,
                    "skype": user[0].skype,
                    "avatar": user[0].avatar,
                    "fiscal": {
                        "company_name": user[0].fiscal.company_name,
                        "fiscal_dni": user[0].fiscal.fiscal_dni,
                        "vat": user[0].fiscal.vat,
                        "company_address": user[0].fiscal.company_address,
                        "company_city": user[0].fiscal.company_city,
                        "company_postal_code": user[0].fiscal.company_postal_code,
                        "company_phone": user[0].fiscal.company_phone,
                    },
                    "email": user[0].email,
                    "datebirth": user[0].datebirth,
                    "paypal_email": user[0].paypal_email,
                    "username": user[0].username,
                    "password": user[0].password,
                    "validate_account": user[0].validate_account,
                    "validation_code": user[0].validation_code,
                    "restore_password_code": request_password_code
                }
                var new_user_confirmed = user
                Users.findByIdAndUpdate(id, new_user_confirmed, function(err, result) {
                    if (err) {
                        resolve('error_db')
                    }
                    resolve('user_generate_request_password' + request_password_code)
                })
            }
        })
    })
}

module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.getUserById = getUserById
module.exports.getUsers = getUsers
module.exports.checkToken = checkToken
module.exports.login = login
module.exports.logout = logout
module.exports.register = register
module.exports.confirmRegister = confirmRegister
module.exports.sendRequestPassword = sendRequestPassword