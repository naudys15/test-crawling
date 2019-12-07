'use strict'
const translations = {
    //Títulos de correos
    'register': 'Registro',
    'restore_password' : 'Recuperación de contraseña',
    //Validaciones de campos
    "password_complex": "La contraseña debe contener entre 8 y 15 caracteres, y al menos: 1 letra mayúscula, 1 minúscula, 1 dígito y 1 caracter especial",
    "invalid_firstname": 'El nombre es inválido',
    "invalid_lastname": "El apellido es inválido",
    "invalid_dni": "El dni es inválido",
    "invalid_city": 'La ciudad es inválida',
    "invalid_role": "El rol es inválido",
    "invalid_status": "El estatus es inválido",
    "invalid_address": 'La dirección es inválida',
    "invalid_postal_code": "El código postal es inválido",
    "invalid_phone": "El número de teléfono es inválido",
    "invalid_skype": 'El skype es inválido',
    "invalid_company_name": "El nombre de la compañía es inválido",
    "invalid_fiscal_dni": "El dni fiscal es inválido",
    "invalid_vat": 'El vat es inválido',
    "invalid_company_address": "La dirección de la compañía es inválida",
    "invalid_company_city": "La ciudad de la compañía es inválida",
    "invalid_company_postal_code": 'El código postal de la compañía es inválido',
    "invalid_company_phone": "El teléfono de la compañía es inválida",
    "invalid_email": "El correo es inválido",
    "invalid_email_unique": "El correo ya está en uso",
    "invalid_datebirth": 'La fecha de nacimiento es inválido',
    "invalid_username": "El username es inválido",
    "invalid_username_unique": "El username ya está en uso",
    "invalid_password": "La contraseña debe contener entre 8 y 15 caracteres, y al menos: 1 letra mayúscula, 1 minúscula, 1 dígito y 1 caracter especial",
    "invalid_confirmation_code": "El código para verificar tu cuenta es inválido",
    "required_fields_user": 'Los campos ciudad, rol, correo, username y contraseña son requeridos',
    "required_fields_user_login": 'Los campos usuario o correo son requeridos',
    'required_confirmation_code' : 'El código de confirmación de la cuenta es requerido',
    'error_db' : 'Hubo un error en la base de datos',
    'non_verified_account' : 'La cuenta aún no está verificada',
    'deactivated_account' : 'La cuenta está desactivada, no puedes loguearte hasta que el administrador active tu cuenta',
    //Singular entidades
    "no_city": "La ciudad no existe",
    "no_country": "El país no existe",
    "no_log": "El log no existe",
    "no_membership": "La membresía no existe",
    "no_module": "El módulo no existe",
    "no_province": "La provincia no existe",
    "no_rangesubmodule": "El rango no existe",
    "no_role": "El rol no existe",
    "no_social": "La red social no existe",
    "no_submodule": "El submódulo no existe",
    "no_user": "El usuario no existe",
    //Plural entidades
    "no_cities": "No hay ciudades para mostrar",
    "no_countries": "No hay paises para mostrar",
    "no_logs": "No hay logs para mostrar",
    "no_memberships": "No hay membresías para mostrar",
    "no_modules": "No hay módulos para mostrar",
    "no_provinces": "No hay provincias para mostrar",
    "no_rangesubmodules": "No hay rangos para mostrar",
    "no_roles": "No hay roles para mostrar",
    "no_social": "No hay redes sociales para mostrar",
    "no_submodules": "No hay submódulos para mostrar",
    "no_users": "No hay usuarios para mostrar",
    //Mensajes respuesta entidades
    "city_created": "Ciudad creada correctamente",
    "city_updated": "Ciudad actualizada correctamente",
    "city_deleted": "Ciudad eliminada correctamente",
    "country_created": "País creado correctamente",
    "country_updated": "País actualizado correctamente",
    "country_deleted": "País eliminado correctamente",
    "log_created": "Log creado correctamente",
    "log_updated": "Log actualizado correctamente",
    "log_deleted": "Log eliminado correctamente",
    "membership_created": "Membresía creada correctamente",
    "membership_updated": "Membresía actualizada correctamente",
    "membership_deleted": "Membresía eliminada correctamente",
    "module_created": "Módulo creado correctamente",
    "module_updated": "Módulo actualizado correctamente",
    "module_deleted": "Módulo eliminado correctamente",
    "province_created": "Provincia creada correctamente",
    "province_updated": "Provincia actualizada correctamente",
    "province_deleted": "Provincia eliminada correctamente",
    "range_created": "Rango creado correctamente",
    "range_updated": "Rango actualizado correctamente",
    "range_deleted": "Rango eliminado correctamente",
    "role_created": "Rol creado correctamente",
    "role_updated": "Rol actualizado correctamente",
    "role_deleted": "Rol eliminado correctamente",
    "social_created": "Red social creada correctamente",
    "social_updated": "Red social actualizada correctamente",
    "social_deleted": "Red social eliminada correctamente",
    "submodule_created": "Submódulo creado correctamente",
    "submodule_updated": "Submódulo actualizado correctamente",
    "submodule_deleted": "Submódulo eliminado correctamente",
    "user_created": "Usuario creado correctamente",
    "user_confirmed" : 'Usuario confirmado correctamente',
    "user_generate_request_password": "Link para restablecer la contraseña enviado a tu correo electrónico",
    "user_updated": "Usuario actualizado correctamente",
    "user_deleted": "Usuario eliminado correctamente",
    "wrong_credentials": "El usuario o la contraseña son incorrectos",
}

module.exports = translations
