'use strict'
const entities_validator = require('./my_functions_validator_entites'),
    regex_password =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/,
    regex_email = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    regex_url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
    regex_phone = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
    regex_date = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/

async function validateRoute(data, method, entity)
{
    var errors = [],
        form_errors = {}
    if (entity == 'user') {
        if (method.toLowerCase() == 'post' || method.toLowerCase() == 'put') {
            var required_fields = await(entities_validator.getRequiredFieldsEntity(entity)),
                count_required_fields = 0
            required_fields = required_fields.split(',')
            for (var i in data) {
                for (var j in required_fields) {
                    if (i == required_fields[j]){
                        count_required_fields++
                    }  
                }
            }
            if (required_fields.length == count_required_fields) {
                for (var i in data) {
                    if (i == 'id') {
                        if (!await(entities_validator.isValidUser(data[i]))) {
                            form_errors.id = 'no_user'
                        }
                    }
                    if (i == 'firstname') {
                        if (!await(isString(data[i]))) {
                            form_errors.firstname = 'invalid_firstname'
                        }
                    }
                    if (i == 'lastname') {
                        if (!await(isString(data[i]))) {
                            form_errors.lastname = 'invalid_lastname'
                        }
                    }
                    if (i == 'dni') {
                        if (!await(isString(data[i]))) {
                            form_errors.dni = 'invalid_dni'
                        }
                    }
                    if (i == 'city') {
                        if (!await(entities_validator.isValidCity(data[i]))) {
                            form_errors.city = 'invalid_city'
                        }
                    }
                    if (i == 'role') {
                        if (!await(entities_validator.isValidRole(data[i]))) {
                            form_errors.role = 'invalid_role'
                        }
                    }
                    if (i == 'status') {
                        if (!await(isBoolean(data[i]))) {
                            form_errors.status = 'invalid_status'
                        }
                    }
                    if (i == 'address') {
                        if (!await(isString(data[i]))) {
                            form_errors.address = 'invalid_address'
                        }
                    }
                    if (i == 'postal_code') {
                        if (!await(isString(data[i]))) {
                            form_errors.postal_code = 'invalid_postal_code'
                        }
                    }
                    if (i == 'phone') {
                        if (!await(isString(data[i]))) {
                            form_errors.phone = 'invalid_phone'
                        }
                    }
                    if (i == 'skype') {
                        if (!await(isString(data[i]))) {
                            form_errors.skype = 'invalid_skype'
                        }
                    }
                    if (i == 'email') {
                        if (!await(isEmail(data[i]))) {
                            form_errors.email_invalid = 'invalid_email'
                        }
                        if (method == 'post') {
                            if (!await(entities_validator.isValidEmail(data[i], null))) {
                                form_errors.email_unique = 'invalid_email_unique'
                            }
                        } else {
                            if (!await(entities_validator.isValidEmail(data[i], data.id))) {
                                form_errors.email_unique = 'invalid_email_unique'
                            }
                        }
                    }
                    if (i == 'datebirth') {
                        if (!await(isDate(data[i]))) {
                            form_errors.datebirth = 'invalid_datebirth'
                        }
                    }
                    if (i == 'username') {
                        if (!await(isNotEmpty(data[i]))) {
                            form_errors.username_invalid = 'invalid_username'
                        }
                        if (method == 'post') {
                            if (!await(entities_validator.isValidUsername(data[i], null))) {
                                form_errors.username_unique = 'invalid_username_unique'
                            }
                        } else {
                            if (!await(entities_validator.isValidUsername(data[i], data.id))) {
                                form_errors.username_unique = 'invalid_username_unique'
                            }
                        }
                    }
                    if (i == 'password') {
                        if (!await(isValidPassword(data[i]))) {
                            form_errors.password = 'invalid_password'
                        }
                    }
                    if (i == 'fiscal') {
                        for (var j in data[i]) {
                            if (j == 'company_name') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_name = 'invalid_company_name'
                                }
                            }
                            if (j == 'fiscal_dni') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.fiscal_dni = 'invalid_fiscal_dni'
                                }
                            }
                            if (j == 'vat') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.vat = 'invalid_vat'
                                }
                            }
                            if (j == 'company_address') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_address = 'invalid_company_address'
                                }
                            }
                            if (j == 'company_city') {
                                if (!await(entities_validator.isValidCity(data[i][j]))) {
                                    form_errors.company_city = 'invalid_company_city'
                                }
                            }
                            if (j == 'company_postal_code') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_postal_code = 'invalid_company_postal_code'
                                }
                            }
                            if (j == 'company_phone') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_phone = 'invalid_company_phone'
                                }
                            }
                        }
                    }
                }
                if (Object.values(form_errors).length > 0) {
                    errors.push(form_errors)
                    errors = parseErrors(errors)
                    return errors
                } else {
                    return 'success'
                }
            } else {
                form_errors.required_fields_user = 'required_fields_user'
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            }
        } else if (method.toLowerCase() == 'delete') {
            for (var i in data) {
                if (i == 'id') {
                    if (!await(entities_validator.isValidUser(data[i]))) {
                        form_errors.id = 'no_user'
                    }
                }
            }
            if (Object.values(form_errors).length > 0) {
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            } else {
                return 'success'
            }
        } else if (method.toLowerCase() == 'get') {
            for (var i in data) {
                if (i == 'id') {
                    if (!await(entities_validator.isValidUser(data[i]))) {
                        form_errors.id = 'no_user'
                    }
                }
            }
            if (Object.values(form_errors).length > 0) {
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            } else {
                return 'success'
            }
        }
    } else if (entity == 'user_login') {
        if (method.toLowerCase() == 'post') {
            var required_fields = await(entities_validator.getRequiredFieldsEntity(entity)),
                count_required_fields = 0
            required_fields = required_fields.split(',')
            for (var i in data) {
                for (var j in required_fields) {
                    if (i == required_fields[j]){
                        count_required_fields++
                    }  
                }
            }
            if (required_fields.length == count_required_fields) {
                return 'success'
            } else {
                form_errors.required_fields_user_login = 'required_fields_user_login'
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            }
        }
    } else if (entity == 'user_register') {
        if (method.toLowerCase() == 'post') {
            var required_fields = await(entities_validator.getRequiredFieldsEntity(entity)),
                count_required_fields = 0
            required_fields = required_fields.split(',')
            for (var i in data) {
                for (var j in required_fields) {
                    if (i == required_fields[j]){
                        count_required_fields++
                    }  
                }
            }
            if (required_fields.length == count_required_fields) {
                for (var i in data) {
                    if (i == 'firstname') {
                        if (!await(isString(data[i]))) {
                            form_errors.firstname = 'invalid_firstname'
                        }
                    }
                    if (i == 'lastname') {
                        if (!await(isString(data[i]))) {
                            form_errors.lastname = 'invalid_lastname'
                        }
                    }
                    if (i == 'dni') {
                        if (!await(isString(data[i]))) {
                            form_errors.dni = 'invalid_dni'
                        }
                    }
                    if (i == 'city') {
                        if (!await(entities_validator.isValidCity(data[i]))) {
                            form_errors.city = 'invalid_city'
                        }
                    }
                    if (i == 'address') {
                        if (!await(isString(data[i]))) {
                            form_errors.address = 'invalid_address'
                        }
                    }
                    if (i == 'postal_code') {
                        if (!await(isString(data[i]))) {
                            form_errors.postal_code = 'invalid_postal_code'
                        }
                    }
                    if (i == 'phone') {
                        if (!await(isString(data[i]))) {
                            form_errors.phone = 'invalid_phone'
                        }
                    }
                    if (i == 'skype') {
                        if (!await(isString(data[i]))) {
                            form_errors.skype = 'invalid_skype'
                        }
                    }
                    if (i == 'email') {
                        if (!await(isEmail(data[i]))) {
                            form_errors.email_invalid = 'invalid_email'
                        }
                        if (method == 'post') {
                            if (!await(entities_validator.isValidEmail(data[i], null))) {
                                form_errors.email_unique = 'invalid_email_unique'
                            }
                        } else {
                            if (!await(entities_validator.isValidEmail(data[i], data.id))) {
                                form_errors.email_unique = 'invalid_email_unique'
                            }
                        }
                    }
                    if (i == 'datebirth') {
                        if (!await(isDate(data[i]))) {
                            form_errors.datebirth = 'invalid_datebirth'
                        }
                    }
                    if (i == 'username') {
                        if (!await(isNotEmpty(data[i]))) {
                            form_errors.username_invalid = 'invalid_username'
                        }
                        if (method == 'post') {
                            if (!await(entities_validator.isValidUsername(data[i], null))) {
                                form_errors.username_unique = 'invalid_username_unique'
                            }
                        } else {
                            if (!await(entities_validator.isValidUsername(data[i], data.id))) {
                                form_errors.username_unique = 'invalid_username_unique'
                            }
                        }
                    }
                    if (i == 'password') {
                        if (!await(isValidPassword(data[i]))) {
                            form_errors.password = 'invalid_password'
                        }
                    }
                    if (i == 'fiscal') {
                        for (var j in data[i]) {
                            if (j == 'company_name') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_name = 'invalid_company_name'
                                }
                            }
                            if (j == 'fiscal_dni') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.fiscal_dni = 'invalid_fiscal_dni'
                                }
                            }
                            if (j == 'vat') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.vat = 'invalid_vat'
                                }
                            }
                            if (j == 'company_address') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_address = 'invalid_company_address'
                                }
                            }
                            if (j == 'company_city') {
                                if (!await(entities_validator.isValidCity(data[i][j]))) {
                                    form_errors.company_city = 'invalid_company_city'
                                }
                            }
                            if (j == 'company_postal_code') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_postal_code = 'invalid_company_postal_code'
                                }
                            }
                            if (j == 'company_phone') {
                                if (!await(isString(data[i][j]))) {
                                    form_errors.company_phone = 'invalid_company_phone'
                                }
                            }
                        }
                    }
                }
                if (Object.values(form_errors).length > 0) {
                    errors.push(form_errors)
                    errors = parseErrors(errors)
                    return errors
                } else {
                    return 'success'
                }
            } else {
                form_errors.required_fields_user_register = 'required_fields_user_register'
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            }
        } 
    } else if (entity == 'user_register_confirmation') {
        if (method.toLowerCase() == 'get') {
            for (var i in data) {
                if (i == 'id' && data[i] == '') {
                    form_errors.confirmation_code = 'required_confirmation_code'
                }
            }
            if (Object.values(form_errors).length > 0) {
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            } else {
                return 'success'
            }
        }
    } else if (entity == 'user_request_password') {
        if (method.toLowerCase() == 'post') {
            for (var i in data) {
                if (i == 'email') {
                    if (!await(isEmail(data[i]))) {
                        form_errors.email_invalid = 'invalid_email'
                    }
                    if (await(entities_validator.isValidEmail(data[i], null))) {
                        form_errors.email_unique = 'invalid_email'
                    }
                }
            }
            if (Object.values(form_errors).length > 0) {
                errors.push(form_errors)
                errors = parseErrors(errors)
                return errors
            } else {
                return 'success'
            }
        }
    }
    return true
}

function isNotEmpty(field)
{
    if (field != '') {
        return true
    } else {
        return false
    }
}

function isBoolean( n )
{
    return !!n === n || n === 0 || n === 1
}

function isNumber( n )
{
    return +n === n
}

function isString( n )
{
    return ''+n === n
}

async function isEmail(field)
{
    return field.match(regex_email)
}

async function isValidPassword(pass)
{
    return pass.match(regex_password)
}

async function isUrl(uri)
{
    return uri.match(regex_url)
}

async function isPhoneNumber(phone)
{
    return phone.match(regex_phone)
}

async function isDate(date)
{
    return date.match(regex_date)
}

async function parseErrors(errors)
{
    var message = {}
    message.message = errors
    message.status = 'error'
    message.code = 400
    return message
}



module.exports.validateRoute = validateRoute