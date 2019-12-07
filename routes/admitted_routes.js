'use strict'
//Variable que almacena las rutas admitidas en el sistema, con sus permisos y parámetros específicos
var admitted_routes = [
    {route: '/initializeApplication', output: 'initializeApplication', login: false, admin: false}, 
    //Usuarios
    {route: '/users/create', output: 'users/create', login: false, admin: true},
    {route: '/users/update', output: 'users/update', login: false, admin: true},
    {route: '/users/delete', output: 'users/delete', login: false, admin: true}, 
    {route: '/users/getall', output: 'users/getall', login: false, admin: true}, 
    {route: '/users/getbyid', output: 'users/getbyid', login: false, admin: true},
    //Paises
    {route: '/countries/create', output: 'countries/create', login: false, admin: false}, 
    {route: '/countries/update', output: 'countries/update', login: false, admin: false}, 
    {route: '/countries/delete', output: 'countries/delete', login: false, admin: false}, 
    {route: '/countries/getall', output: 'countries/getall', login: false, admin: false}, 
    {route: '/countries/getbyid', output: 'countries/getbyid', login: false, admin: false}, 
    //Provincias
    // {route: '/provinces/create', output: 'provinces/create', login: false, admin: false}, 
    // {route: '/provinces/update', output: 'provinces/update', login: false, admin: false}, 
    // {route: '/provinces/delete', output: 'provinces/delete', login: false, admin: false}, 
    // {route: '/provinces/getall', output: 'provinces/getall', login: false, admin: false}, 
    // {route: '/provinces/getbyid', output: 'provinces/getbyid', login: false, admin: false}, 
    // {route: '/provinces/getbycountry', output: 'provinces/getbycountry', login: false, admin: false},
    //Ciudades
    {route: '/cities/create', output: 'cities/create', login: false, admin: false}, 
    {route: '/cities/update', output: 'cities/update', login: false, admin: false}, 
    {route: '/cities/delete', output: 'cities/delete', login: false, admin: false}, 
    {route: '/cities/getall', output: 'cities/getall', login: false, admin: false}, 
    {route: '/cities/getbyid', output: 'cities/getbyid', login: false, admin: false}, 
    // {route: '/cities/getbyprovince', output: 'cities/getbyprovince', login: false, admin: false},
    {route: '/cities/getbycountry', output: 'cities/getbycountry', login: false, admin: false},
    //Módulos
    {route: '/modules/create', output: 'modules/create', login: false, admin: false}, 
    {route: '/modules/update', output: 'modules/update', login: false, admin: false}, 
    {route: '/modules/delete', output: 'modules/delete', login: false, admin: false}, 
    {route: '/modules/getall', output: 'modules/getall', login: false, admin: false}, 
    {route: '/modules/getbyid', output: 'modules/getbyid', login: false, admin: false}, 
    //Submódulos
    {route: '/submodules/create', output: 'submodules/create', login: false, admin: false}, 
    {route: '/submodules/update', output: 'submodules/update', login: false, admin: false}, 
    {route: '/submodules/delete', output: 'submodules/delete', login: false, admin: false}, 
    {route: '/submodules/getall', output: 'submodules/getall', login: false, admin: false}, 
    {route: '/submodules/getbyid', output: 'submodules/getbyid', login: false, admin: false}, 
    {route: '/submodules/getbymodule', output: 'submodules/getbymodule', login: false, admin: false},
    //Rango de submódulos
    {route: '/rangesubmodules/create', output: 'rangesubmodules/create', login: false, admin: false}, 
    {route: '/rangesubmodules/update', output: 'rangesubmodules/update', login: false, admin: false}, 
    {route: '/rangesubmodules/delete', output: 'rangesubmodules/delete', login: false, admin: false}, 
    {route: '/rangesubmodules/getall', output: 'rangesubmodules/getall', login: false, admin: false}, 
    {route: '/rangesubmodules/getbyid', output: 'rangesubmodules/getbyid', login: false, admin: false},
    //Roles
    {route: '/roles/create', output: 'roles/create', login: false, admin: false}, 
    {route: '/roles/update', output: 'roles/update', login: false, admin: false}, 
    {route: '/roles/delete', output: 'roles/delete', login: false, admin: false}, 
    {route: '/roles/getall', output: 'roles/getall', login: false, admin: false}, 
    {route: '/roles/getbyid', output: 'roles/getbyid', login: false, admin: false},
    //Membresías
    {route: '/memberships/create', output: 'memberships/create', login: false, admin: false}, 
    {route: '/memberships/update', output: 'memberships/update', login: false, admin: false}, 
    {route: '/memberships/delete', output: 'memberships/delete', login: false, admin: false}, 
    {route: '/memberships/getall', output: 'memberships/getall', login: false, admin: false}, 
    {route: '/memberships/getbyid', output: 'memberships/getbyid', login: false, admin: false},
    //Redes sociales
    {route: '/socials/create', output: 'socials/create', login: false, admin: false}, 
    {route: '/socials/update', output: 'socials/update', login: false, admin: false}, 
    {route: '/socials/delete', output: 'socials/delete', login: false, admin: false}, 
    {route: '/socials/getall', output: 'socials/getall', login: false, admin: false}, 
    {route: '/socials/getbyid', output: 'socials/getbyid', login: false, admin: false},
    //Log
    {route: '/logs/create', output: 'logs/create', login: false, admin: false}, 
    {route: '/logs/getall', output: 'logs/getall', login: false, admin: false}, 
    {route: '/logs/getbyid', output: 'logs/getbyid', login: false, admin: false},
    {route: '/logs/getbyuser', output: 'logs/getbyuser', login: false, admin: false}, 
    {route: '/logs/getbydate', output: 'logs/getbydate', login: false, admin: false},
    {route: '/logs/getbydates', output: 'logs/getbydates', login: false, admin: false},
    //Autenticación
    {route: '/users/login', output: 'users/login', login: false, admin: false}, 
    {route: '/users/register', output: 'users/register', login: false, admin: false},
    {route: '/users/sendRequestPassword', output: 'users/sendRequestPassword', login: false, admin: false}, 
    {route: '/users/changePassword', output: 'users/changePassword', login: false, admin: false}, 
]
module.exports = admitted_routes