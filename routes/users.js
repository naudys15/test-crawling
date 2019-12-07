'use strict'
//Resources
const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    functions_general = require('../helpers/my_functions_general'),
    prefix = require('../config/parameters/params').api_prefix + 'users/',
    users_controller = require('../controllers/Users'),
    translations_functions = require('../translations/index')

//Responses
var url_request = '',
    format_request = {
        message: '', 
        status:'', 
        code:''
    },
    format_response = {
        message: '', 
        status:''
    },
    info = [],
    errors = [],
    other_errors = [],
    result_errors = [],
    data = [],
    id,
    language_request = '',
    translations = []

//Allow to use body parser in requests
router.use(
    bodyParser.urlencoded({
    extended: true
}))

router.use(bodyParser.json())

//Crear usuario
router.post(prefix + 'create', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        var result_validate = await(functions_general.validateRoute(info, 'post', 'user'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            data = {
                "firstname": (typeof info.firstname != undefined)? info.firstname : '',
                "lastname": (typeof info.lastname != undefined)? info.lastname : '',
                "dni": (typeof info.dni != undefined)? info.dni : '',
                "city": (typeof info.city != undefined)? info.city : '',
                "role": (typeof info.role != undefined)? info.role : '',
                "status": (typeof info.status != undefined)? info.status : '',
                "avatar": (typeof info.avatar != undefined)? info.avatar : '',
                "address": (typeof info.address != undefined)? info.address : '',
                "postal_code": (typeof info.postal_code != undefined)? info.postal_code : '',
                "phone": (typeof info.phone != undefined)? info.phone : '',
                "skype": (typeof info.skype != undefined)? info.skype : '',
                "fiscal": {
                    "company_name": (typeof info.fiscal.company_name != undefined)? info.fiscal.company_name : '',
                    "fiscal_dni": (typeof info.fiscal.fiscal_dni != undefined)? info.fiscal.fiscal_dni : '',
                    "vat": (typeof info.fiscal.vat != undefined)? info.fiscal.vat : '',
                    "company_address": (typeof info.fiscal.company_address != undefined)? info.fiscal.company_address : '',
                    "company_city": (typeof info.fiscal.company_city != undefined)? info.fiscal.company_city : '',
                    "company_postal_code": (typeof info.fiscal.company_postal_code != undefined)? info.fiscal.company_postal_code : '',
                    "company_phone": (typeof info.fiscal.company_phone != undefined)? info.fiscal.company_phone : '',
                },
                "email": (typeof info.email != undefined)? info.email : '',
                "datebirth": (typeof info.datebirth != undefined)? info.datebirth : '',
                "paypal_email": (typeof info.paypal_email != undefined)? info.paypal_email : '',
                "username": (typeof info.username != undefined)? info.username : '',
                "password": (typeof info.password != undefined)? info.password : ''
            }
            data = await(functions_general.encryptEntity('user', data))
            var result_insert = await(users_controller.createUser(data))
            if (result_insert.status == 'success') {
                result_insert.message = translations[result_insert.message]
                functions_general.saveLog(format_request.id, 'create_user')
            } else if (result_insert.status == 'error') {
                result_insert.message = translations[result_insert.message]
            }
            format_response = functions_general.formatResponse(result_insert)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Actualizar usuario
router.put(prefix + 'update/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        info.id = req.params.id
        var result_validate = await(functions_general.validateRoute(info, 'put', 'user'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            data = {
                "firstname": (typeof info.firstname != undefined)? info.firstname : '',
                "lastname": (typeof info.lastname != undefined)? info.lastname : '',
                "dni": (typeof info.dni != undefined)? info.dni : '',
                "city": (typeof info.city != undefined)? info.city : '',
                "role": (typeof info.role != undefined)? info.role : '',
                "status": (typeof info.status != undefined)? info.status : '',
                "avatar": (typeof info.avatar != undefined)? info.avatar : '',
                "address": (typeof info.address != undefined)? info.address : '',
                "postal_code": (typeof info.postal_code != undefined)? info.postal_code : '',
                "phone": (typeof info.phone != undefined)? info.phone : '',
                "skype": (typeof info.skype != undefined)? info.skype : '',
                "fiscal": {
                    "company_name": (typeof info.fiscal.company_name != undefined)? info.fiscal.company_name : '',
                    "fiscal_dni": (typeof info.fiscal.fiscal_dni != undefined)? info.fiscal.fiscal_dni : '',
                    "vat": (typeof info.fiscal.vat != undefined)? info.fiscal.vat : '',
                    "company_address": (typeof info.fiscal.company_address != undefined)? info.fiscal.company_address : '',
                    "company_city": (typeof info.fiscal.company_city != undefined)? info.fiscal.company_city : '',
                    "company_postal_code": (typeof info.fiscal.company_postal_code != undefined)? info.fiscal.company_postal_code : '',
                    "company_phone": (typeof info.fiscal.company_phone != undefined)? info.fiscal.company_phone : '',
                },
                "email": (typeof info.email != undefined)? info.email : '',
                "datebirth": (typeof info.datebirth != undefined)? info.datebirth : '',
                "paypal_email": (typeof info.paypal_email != undefined)? info.paypal_email : '',
                "username": (typeof info.username != undefined)? info.username : '',
                "password": (typeof info.password != undefined)? info.password : ''
            }
            data = await(functions_general.encryptEntity('user', data))
            var result_update = await (users_controller.updateUser(data, info.id))
            if (result_update.status == 'success') {
                result_update.message = translations[result_update.message]
                functions_general.saveLog(format_request.id, 'update_user')
            } else if (result_update.status == 'error') {
                result_update.message = translations[result_update.message]
            }
            format_response = functions_general.formatResponse(result_update)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Borrar el usuario
router.delete(prefix + 'delete/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = {}
        info.id = req.params.id
        var result_validate = await(functions_general.validateRoute(info, 'delete', 'user'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var result_delete = await (users_controller.deleteUser(info.id))
            result_delete.message = translations[result_delete.message]
            if (result_delete.status == 'success') {
                functions_general.saveLog(format_request.id, 'delete_user')
            }
            format_response = functions_general.formatResponse(result_delete)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Obtener todos los usuarios
router.get(prefix + 'getall', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    translations = translations_functions.setTranslations(language_request)
    if (format_request.code == 200) {
        var result_get = await (users_controller.getUsers())
        if (typeof result_get.message == 'string') {
            result_get.message = translations[result_get.message]
        } else {
            result_get.message = await(functions_general.decryptEntity('user', result_get.message))
        }
        format_response = functions_general.formatResponse(result_get)
        res
            .status(format_response.code)
            .json(format_response)
        
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Obtener el usuario por id
router.get(prefix + 'getbyid/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = {}
        info.id = req.params.id
        var result_validate = await(functions_general.validateRoute(info, 'get', 'user'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var result_get = await (users_controller.getUserById(info.id))
            if (typeof result_get.message == 'string') {
                result_get.message = translations[result_get.message]
            } else {
                result_get.message = await(functions_general.decryptEntity('user', result_get.message))
            }
            format_response = functions_general.formatResponse(result_get)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Inicio de sesión
router.post(prefix + 'login', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        var result_validate = await(functions_general.validateRoute(info, 'post', 'user_login'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var user = info.username,
                password = info.password
            var login = await (users_controller.login(user, password))
            if (typeof login.message == 'string') {
                var aux_message = translations[login.message]
                if (aux_message != undefined) {
                    login.message = translations[login.message]
                }
            }
            format_response = functions_general.formatResponse(login)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Registro de usuario
router.post(prefix + 'register', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        var result_validate = await(functions_general.validateRoute(info, 'post', 'user_register'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            data = {
                "firstname": (typeof info.firstname != undefined)? info.firstname : '',
                "lastname": (typeof info.lastname != undefined)? info.lastname : '',
                "dni": (typeof info.dni != undefined)? info.dni : '',
                "city": (typeof info.city != undefined)? info.city : '',
                "address": (typeof info.address != undefined)? info.address : '',
                "postal_code": (typeof info.postal_code != undefined)? info.postal_code : '',
                "phone": (typeof info.phone != undefined)? info.phone : '',
                "skype": (typeof info.skype != undefined)? info.skype : '',
                "fiscal": {
                    "company_name": (typeof info.fiscal.company_name != undefined)? info.fiscal.company_name : '',
                    "fiscal_dni": (typeof info.fiscal.fiscal_dni != undefined)? info.fiscal.fiscal_dni : '',
                    "vat": (typeof info.fiscal.vat != undefined)? info.fiscal.vat : '',
                    "company_address": (typeof info.fiscal.company_address != undefined)? info.fiscal.company_address : '',
                    "company_city": (typeof info.fiscal.company_city != undefined)? info.fiscal.company_city : '',
                    "company_postal_code": (typeof info.fiscal.company_postal_code != undefined)? info.fiscal.company_postal_code : '',
                    "company_phone": (typeof info.fiscal.company_phone != undefined)? info.fiscal.company_phone : '',
                },
                "email": (typeof info.email != undefined)? info.email : '',
                "datebirth": (typeof info.datebirth != undefined)? info.datebirth : '',
                "paypal_email": (typeof info.paypal_email != undefined)? info.paypal_email : '',
                "username": (typeof info.username != undefined)? info.username : '',
                "password": (typeof info.password != undefined)? info.password : ''
            }
            data = await(functions_general.encryptEntity('user', data))
            var register = await (users_controller.register(data))
            if (register.status == 'success') {
                var url = req.protocol + '://' + req.get('host') + req.originalUrl + '/' + register.confirmation_code,
                    send_email_result = await (functions_general.sendEmail(functions_general.params_email['from_default'], info.email, translations['register'], await(functions_general.getTemplate('register', language_request, {"url": url}))))
                register.message = translations[register.message]
            } else if (register.status == 'error') {
                for (var i in register.message) {
                    register.message[i] = translations[register.message[i]]
                }
            }
            format_response = functions_general.formatResponse(register)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Verificar el token de registro
router.get(prefix + 'register/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = {}
        info.id = req.params.id
        var result_validate = await(functions_general.validateRoute(info, 'get', 'user_register_confirmation'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var result_get = await (users_controller.confirmRegister(info.id))
            if (typeof result_get.message == 'string') {
                result_get.message = translations[result_get.message]
            }
            format_response = functions_general.formatResponse(result_get)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Enviar petición de restablecimiento de contraseña
router.post(prefix + 'sendRequestPassword', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        var result_validate = await(functions_general.validateRoute(info, 'post', 'user_request_password'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var result_post = await (users_controller.sendRequestPassword(info.email))
            if (typeof result_post.message == 'string') {
                var url = req.protocol + '://' + req.get('host') + prefix + 'changePassword/' + result_post.password_code,
                    send_email_result = await (functions_general.sendEmail(functions_general.params_email['from_default'], info.email, translations['restore_password'], await(functions_general.getTemplate('restore_password', language_request, {"url": url}))))
                result_post.message = translations[result_post.message]
            }
            format_response = functions_general.formatResponse(result_post)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Enviar petición de restablecimiento de contraseña
router.post(prefix + 'changePassword/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        var result_validate = await(functions_general.validateRoute(info, 'post', 'user_change_password'))
        translations = translations_functions.setTranslations(language_request)
        if (result_validate == 'success') {
            var result_post = await (users_controller.sendRequestPassword(info.email))
            if (typeof result_post.message == 'string') {
                var url = req.protocol + '://' + req.get('host') + prefix + 'changePassword/' + result_post.password_code,
                    send_email_result = await (functions_general.sendEmail(functions_general.params_email['from_default'], info.email, translations['restore_password'], await(functions_general.getTemplate('restore_password', language_request, {"url": url}))))
                result_post.message = translations[result_post.message]
            }
            format_response = functions_general.formatResponse(result_post)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            for (var i in result_validate.message) {
                for (var j in result_validate.message[i]) {
                    result_validate.message[i][j] = translations[result_validate.message[i][j]]
                }
            }
            res
                .status(400)
                .json(result_validate)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

module.exports = router;
