'use strict'
//Resources
const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    functions_general = require('../helpers/my_functions_general'),
    prefix = require('../config/parameters/params').api_prefix + 'initializeApplication',
    general_controller = require('../controllers/General')

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
    id

router.use(
        bodyParser.urlencoded({
        extended: true
    }))
    
router.use(bodyParser.json())

router.get(prefix, async function(req, res, next) {
    url_request = req.originalUrl
    url_request = url_request.replace(/\/api\/crawlingdata\/v1/g, "")
    format_request = await(functions_general.verifyPermissionsRoute(url_request, req))
    if (format_request.code == 200) {
        const result = await (general_controller.initialize())
        format_response = functions_general.formatResponse(result)
        res
            .status(format_request.code)
            .json(format_response)
    } else {
        format_response = functions_general.formatResponse(format_request)
        res
            .status(format_request.code)
            .json(format_response)
    }
})

module.exports = router;
