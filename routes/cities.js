'use strict'
//Resources
const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    functions_general = require('../helpers/my_functions_general'),
    prefix = require('../config/parameters/params').api_prefix + 'cities/',
    cities_controller = require('../controllers/Cities'),
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

//Crear ciudad
router.post(prefix + 'create', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        if (info.name != null && info.country != null && info.latitude != null && info.longitude != null) {
            data = {
                "name": (typeof info.name != undefined)? info.name : '',
                "country": (typeof info.country != undefined)? info.country : '',
                "latitude": (typeof info.latitude != undefined)? info.latitude : '',
                "longitude": (typeof info.longitude != undefined)? info.longitude : ''
            }
            var result_insert = await (cities_controller.createCity(data))
            translations = translations_functions.setTranslations(language_request)
            if (result_insert.status == 'success') {
                result_insert.message = translations[result_insert.message]
                functions_general.saveLog(format_request.id, 'create_city')
            } else if (result_insert.status == 'error') {
                for (var i in result_insert.message) {
                    result_insert.message[i] = translations[result_insert.message[i]]
                }
            }
            format_response = functions_general.formatResponse(result_insert)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            format_response = functions_general.formatResponseByCode('no_data')
            res
                .status(format_response.code)
                .json(format_response)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Actualizar ciudad
router.put(prefix + 'update/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        info = req.body
        id = req.params.id
        if (info.name != null && info.country != null && info.latitude != null && info.longitude != null) {
            data = {
                "name": (typeof info.name != undefined)? info.name : '',
                "country": (typeof info.country != undefined)? info.country : '',
                "latitude": (typeof info.latitude != undefined)? info.latitude : '',
                "longitude": (typeof info.longitude != undefined)? info.longitude : ''
            }
            var result_update = await (cities_controller.updateCity(data, id))
            translations = translations_functions.setTranslations(language_request)
            if (result_update.status == 'success') {
                result_update.message = translations[result_update.message]
                functions_general.saveLog(format_request.id, 'update_city')
            } else if (result_update.status == 'error') {
                for (var i in result_update.message) {
                    result_update.message[i] = translations[result_update.message[i]]
                }
            }
            format_response = functions_general.formatResponse(result_update)
            res
                .status(format_response.code)
                .json(format_response)
        } else {
            format_response = functions_general.formatResponseByCode('no_data')
            res
                .status(format_response.code)
                .json(format_response)
        }
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(500)
            .json(format_response)
    }
})

//Borrar la ciudad
router.delete(prefix + 'delete/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        var id = req.params.id
        var result_delete = await (cities_controller.deleteCity(id))
        translations = translations_functions.setTranslations(language_request)
        result_delete.message = translations[result_delete.message]
        if (result_delete.status == 'success') {
            functions_general.saveLog(format_request.id, 'delete_city')
        }
        format_response = functions_general.formatResponse(result_delete)
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

//Obtener todas las ciudades
router.get(prefix + 'getall', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        var result_get = await (cities_controller.getCities())
        translations = translations_functions.setTranslations(language_request)
        if (typeof result_get.message == 'string') {
            result_get.message = translations[result_get.message]
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

//Obtener todas las ciudades por el id
router.get(prefix + 'getbyid/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        var id = req.params.id
        var result_get = await (cities_controller.getCityById(id))
        translations = translations_functions.setTranslations(language_request)
        if (typeof result_get.message == 'string') {
            result_get.message = translations[result_get.message]
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

//Obtener todas las ciudades por el id del país
router.get(prefix + 'getbycountry/:id', async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    language_request = (req.header('Accept-Language') == undefined)? 'es': req.header('Accept-Language')
    if (format_request.code == 200) {
        var id = req.params.id
        var result_get = await (cities_controller.getCitiesByCountry(id))
        translations = translations_functions.setTranslations(language_request)
        if (typeof result_get.message == 'string') {
            result_get.message = translations[result_get.message]
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

module.exports = router;
