'use strict'
const logs_model = require('../models/log'),
    responses = require('./my_functions_responses'),
    routes_permissions = require('./my_functions_permissions_routes'),
    validator_rules = require('./my_functions_validator'),
    encryption_entities = require('./my_functions_encryptions'),
    email_sender = require('../config/email/params'),
    email_templates = require('./my_functions_email_templates')

//Guardar log en el sistema
async function saveLog(user, description)
{
    return new Promise(async (resolve) =>  {
        var data = {
            'user': user,
            'description': description
        }
        var save_log = await(logs_model.createLog(data))
        resolve(save_log)
    })
}

module.exports.saveLog = saveLog
module.exports.formatResponse = responses.formatResponse
module.exports.formatResponseByCode = responses.formatResponseByCode
module.exports.obtainInfoRoute = routes_permissions.obtainInfoRoute
module.exports.verifyPermissionsRoute = routes_permissions.verifyPermissionsRoute
module.exports.validateRoute = validator_rules.validateRoute
module.exports.params_email = email_sender.general_config_email
module.exports.sendEmail = email_sender.sendEmail
module.exports.getTemplate = email_templates.getTemplate
module.exports.encryptEntity = encryption_entities.encryptEntity
module.exports.decryptEntity = encryption_entities.decryptEntity