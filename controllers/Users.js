'use strict'
const user_model = require('../models/user'),
    format_request = {}

//Permite verificar el token jwt
async function checkToken(token)
{
    var check_user = await (user_model.checkToken(token))
    return check_user
}

//Permite crear un nuevo usuario
async function createUser(data)
{
    var result_insert = await (user_model.createUser(data))
    if (result_insert == 'user_created') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_insert
    return format_request
}

//Permite actualizar un usuario
async function updateUser(data, id)
{
    var result_update = await (user_model.updateUser(data, id))
    if (result_update == 'user_updated') {
        format_request.code = 201
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_update
    return format_request
}

//Permite borrar un usuario
async function deleteUser(id)
{
    var result_delete = await (user_model.deleteUser(id))
    if (result_delete == 'user_deleted') {
        format_request.code = 204
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_delete
    return format_request
}
//Permite obtener un usuario por su id
async function getUserById(id)
{
    var result_get = await (user_model.getUserById(id))
    if (result_get == 'no_user') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}
//Permite obtener todos los usuarios
async function getUsers()
{
    var result_get = await (user_model.getUsers())
    if (result_get == 'no_users') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = result_get
    return format_request
}

//Permite realizar el inicio de sesión
async function login(user, pass)
{
    var login = await (user_model.login(user, pass))
    if (login == 'no_user' || login == 'wrong_credentials' || login == 'non_verified_account' || login == 'deactivated_account') {
        format_request.code = 400
        format_request.status = 'error'
    } else {
        format_request.code = 200
        format_request.status = 'success'
    }
    format_request.message = login
    return format_request
}

//Permite obtener el usuario autenticado
async function getUserAuthenticated(id)
{
    var user = await (user_model.getUserById(id))
    if (user != false) {
        format_request.code = 200
        format_request.status = 'success'
        format_request.message = user
    }
    return format_request
}

//Permite realizar el cierre de sesión
async function logout(token)
{
    var response = await (user_model.logout(token))
    if (response == "success") {
        format_request.code = 200
        format_request.status = 'Cierre de sesión exitoso'
        format_request.message = response
    } else {
        format_request.code = 400
        format_request.status = 'error'
        format_request.message = response
    }
    return format_request
}

//Registrar un nuevo usuario
async function register(data)
{
    var result_insert = await (user_model.register(data))
    if (result_insert.includes('user_created')) {
        format_request.code = 201
        format_request.confirmation_code = result_insert.substring(12)
        format_request.status = 'success'
        format_request.message = result_insert.substring(0, 12)
    } else {
        format_request.code = 400
        format_request.status = 'error'
        format_request.message = result_insert
    }
    return format_request
}

//Verificar el código de registro de un usuario
async function confirmRegister(data)
{
    var result_get = await (user_model.confirmRegister(data))
    if (result_get.includes('user_confirmed')) {
        format_request.code = 200
        format_request.status = 'success'
    } else {
        format_request.code = 400
        format_request.status = 'error'
    }
    format_request.message = result_get
    return format_request
}

async function sendRequestPassword(data)
{
    var result_get = await (user_model.sendRequestPassword(data))
    if (result_get.includes('user_generate_request_password')) {
        format_request.code = 200
        format_request.password_code = result_get.substring(30)
        format_request.status = 'success'
        format_request.message = result_get.substring(0, 30)
    } else {
        format_request.code = 400
        format_request.status = 'error'
        format_request.message = result_get
    }
    return format_request
}

module.exports.checkToken = checkToken
module.exports.createUser = createUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.getUserById = getUserById
module.exports.getUsers = getUsers
module.exports.login = login
module.exports.register = register
module.exports.confirmRegister = confirmRegister
module.exports.getUserAuthenticated = getUserAuthenticated
module.exports.logout = logout
module.exports.sendRequestPassword = sendRequestPassword