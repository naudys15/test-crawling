'use strict'
const translations = {
    //Títulos de correos
    'register': 'Register',
    'restore_password' : 'Password recovery',
    //Validaciones de campos
    "password_complex": "The password must contain between 8 and 15 characters, and at least: 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character",
    "invalid_firstname": 'The firstname is invalid',
    "invalid_lastname": "The lastname is invalid",
    "invalid_dni": "The dni is invalid",
    "invalid_city": 'The city is invalid',
    "invalid_role": "The role is invalid",
    "invalid_status": "The status is invalid",
    "invalid_address": 'The address is invalid',
    "invalid_postal_code": "The postal code is invalid",
    "invalid_phone": "The phone is invalid",
    "invalid_skype": 'The skype is invalid',
    "invalid_company_name": "The company name is invalid",
    "invalid_fiscal_dni": "The fiscal dni is invalid",
    "invalid_vat": 'The vat is invalid',
    "invalid_company_address": "The company address is invalid",
    "invalid_company_city": "The company city is invalid",
    "invalid_company_postal_code": 'The company postal code is invalid',
    "invalid_company_phone": "The company phone is invalid",
    "invalid_email": "The email is invalid",
    "invalid_email_unique": "The email is already in use",
    "invalid_datebirth": 'The datebirth is invalid',
    "invalid_username": "The username is invalid",
    "invalid_username_unique": "The username is already in use",
    "invalid_password": "The password must contain between 8 and 15 characters, and at least: 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character",
    "invalid_confirmation_code": "The confirmation code to verify your account is invalid",
    "required_fields_user": 'The fields city, role, email, username and password are required',
    "required_fields_user_login": 'The fields username or email and password are required',
    'required_confirmation_code' : 'The confirmation code to verify your account is required',
    'error_db' : 'There was an error in the database',
    'non_verified_account' : 'The account isn\'t verified yet',
    'deactivated_account' : 'The account is deactivated, you can\'t login until an administrator reactivates your account',
    //Singular
    "no_city": "The city doesn\'t exist",
    "no_country": "The country doesn\'t exist",
    "no_log": "The log doesn\'t exist",
    "no_membership": "The membership doesn\'t exist",
    "no_module": "The module doesn\'t exist",
    "no_province": "The province doesn\'t exist",
    "no_rangesubmodule": "The range doesn\'t exist",
    "no_role": "The role doesn\'t exist",
    "no_social": "The social network doesn\'t exist",
    "no_submodule": "The submodule doesn\'t exist",
    "no_user": "The user doesn\'t exist",
    //Plural
    "no_cities": "There\'s no cities to show",
    "no_countries": "There\'s no countries to show",
    "no_logs": "There\'s no logs to show",
    "no_memberships": "There\'s no memberships to show",
    "no_modules": "There\'s no modules to show",
    "no_provinces": "There\'s no provinces to show",
    "no_rangesubmodules": "There\'s no ranges to show",
    "no_roles": "There\'s no roles to show",
    "no_social": "There\'s no social to show",
    "no_submodules": "There\'s no submodules to show",
    "no_users": "There\'s no users to show",
    //Mensajes respuesta entidades
    "city_created": "City created successfully",
    "city_updated": "City updated successfully",
    "city_deleted": "City deleted successfully",
    "country_created": "Country created successfully",
    "country_updated": "Country updated successfully",
    "country_deleted": "Country deleted successfully",
    "log_created": "Log created successfully",
    "log_updated": "Log updated successfully",
    "log_deleted": "Log deleted successfully",
    "membership_created": "Membership created successfully",
    "membership_updated": "Membership updated successfully",
    "membership_deleted": "Membership deleted successfully",
    "module_created": "Module created successfully",
    "module_updated": "Module updated successfully",
    "module_deleted": "Module deleted successfully",
    "province_created": "Province created successfully",
    "province_updated": "Province updated successfully",
    "province_deleted": "Province deleted successfully",
    "range_created": "Range created successfully",
    "range_updated": "Range updated successfully",
    "range_deleted": "Range deleted successfully",
    "role_created": "Role created successfully",
    "role_updated": "Role updated successfully",
    "role_deleted": "Role deleted successfully",
    "social_created": "Social network created successfully",
    "social_updated": "Social network updated successfully",
    "social_deleted": "Social network deleted successfully",
    "submodule_created": "Submodule created successfully",
    "submodule_updated": "Submodule updated successfully",
    "submodule_deleted": "Submodule deleted successfully",
    "user_created": "User created successfully",
    "user_confirmed" : 'User confirmed successfully',
    "user_generate_request_password": "User restore password link sent to your email",
    "user_updated": "User updated successfully",
    "user_deleted": "User deleted successfully",
    "wrong_credentials": "The username or the password is incorrect",
}

module.exports = translations