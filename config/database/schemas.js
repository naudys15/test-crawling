'use strict';
const mongoose = require('./connection'),
      Schema = mongoose.Schema;

const schemas = {
    //Usuario
    userSchema: new Schema({
        firstname: {type: String},
        lastname: {type: String},
        dni: {type: String},
        city: {type: Schema.Types.ObjectId, ref: 'city'},
        role: {type: Schema.Types.ObjectId, ref: 'role'},
        status: {type: Boolean},
        avatar: {type: String},
        address: {type: String},
        postal_code: {type: String},
        phone: {type: String},
        skype: {type: String},
        fiscal: {
            company_name: {type: String},
            fiscal_dni: {type: String},
            vat: {type: String},
            company_address: {type: String},
            company_city: {type: Schema.Types.ObjectId, ref: 'city'},
            company_postal_code: {type: String},
            company_phone: {type: String},
        },
        email: {type: String, unique: true, dropDups: true},
        datebirth: {type: Date},
        paypal_email: {type: String},
        username: {type: String, unique: true, dropDups: true},
        password: {type: String},
        validate_account: {type: Boolean},
        validation_code: {type: String},
        restore_password_code: {type: String}
    }),
    //Roles
    roleSchema: new Schema({
        name: {type: String},
        description: {type: String},
    }),
    //Membresías
    membershipSchema: new Schema({
        name: {type: String},
        description: {type: String},
        price: {type: String},
    }),
    //Log donde se almacenan todas las operaciones
    logSchema: new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        description: {type: String},
        date: {type: Date},
    }),
    //Países presentes en el sistema
    countrySchema: new Schema({
        name: {type: String},
        iso: {type: String, unique: true, dropDups: true}
    }),
    //Provincias asociadas a los países
    provinceSchema: new Schema({
        name: {type: String},
        country: {type: Schema.Types.ObjectId, ref: 'country'}
    }),
    //Ciudades asociadas a las provincias
    citySchema: new Schema({
        name: {type: String},
        // province: {type: Schema.Types.ObjectId, ref: 'provinces'},
        country: {type: Schema.Types.ObjectId, ref: 'country'},
        latitude: {type: String},
        longitude: {type: String}
    }),
    //Módulos del sistema
    moduleSchema: new Schema({
        name: {type: String},
        description: {type: String},
    }),
    //Submódulos del sistema
    submoduleSchema: new Schema({
        name: {type: String},
        description: {type: String},
        module: {type: Schema.Types.ObjectId, ref: 'module'},
    }),
    //Rangos de visibilidad de los submódulos
    rangeSubmoduleSchema: new Schema({
        name: {type: String},
        description: {type: String},
    }),
    //Permisos del usuario
    permissionUserSchema: new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        submodule: {type: Schema.Types.ObjectId, ref: 'submodule'},
        range: {type: Schema.Types.ObjectId, ref: 'range_submodule'}
    }),
    //Permisos por rol
    permissionRoleSchema: new Schema({
        role: {type: Schema.Types.ObjectId, ref: 'role'},
        submodule: {type: Schema.Types.ObjectId, ref: 'submodule'},
        range: {type: Schema.Types.ObjectId, ref: 'range_submodule'}
    }),
    //Permisos por membresía
    permissionMembershipSchema: new Schema({
        membership: {type: Schema.Types.ObjectId, ref: 'membership'},
        submodule: {type: Schema.Types.ObjectId, ref: 'submodule'},
        range: {type: Schema.Types.ObjectId, ref: 'range_submodule'}
    }),
    //Membresías que ha adquirido un usuario
    membershipUserSchema: new Schema({
        membership: {type: Schema.Types.ObjectId, ref: 'membership'},
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        date_begin: {type: Date},
        date_end: {type: Date},
        paypal_id: {type: String},
        status: {type: Boolean}
    }),
    //Redes sociales que pueden ser usadas en el sistema
    socialSchema: new Schema({
        name: {type: String},
        description: {type: String}
    }),
    //Redes sociales agregadas por el usuario
    socialUserSchema: new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        name: {type: String},
        description: {type: String}
    }),
    //Consultas realizadas por los usuarios 
    socialSearchUserSchema: new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'user'},
        social: {type: Schema.Types.ObjectId, ref: 'social'},
        file_search: {type: String}
    }),
};

module.exports = schemas;