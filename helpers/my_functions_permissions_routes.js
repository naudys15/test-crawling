'use strict'
const admitted_routes = require('../routes/admitted_routes'),
    users_controller = require('../controllers/Users')
    
var format_response = {}

//Obtener la información de la ruta admitida
function obtainInfoRoute(url_request) {
    var routeObject = ''
    admitted_routes.forEach(function(index) {
        if (url_request.includes(index.route)) {
            routeObject = index
        }
    })
    if (routeObject != '') {
        return routeObject
    } else {
        return ''
    }
}
//Verificar los permisos de una ruta específica
async function verifyPermissionsRoute(route, req)
{
    var format_response = {status:'', message: '', code:''}
    var info_route = obtainInfoRoute(route)
    if (typeof info_route == "object") {
        if (info_route.login == true) {
            var user_code = req.header('Authorization')
            if (user_code == undefined) {
                format_response.message = "Error de autenticación"
                format_response.status = "error"
                format_response.code = 401
            } else {
                var check_user = await (users_controller.checkToken(user_code))
                if (check_user != false) {
                    if (info_route.admin == false) {
                        format_response.message = "Exito"
                        format_response.status = "success"
                        format_response.code = 200
                        format_response.id = check_user.id
                        format_response.token = user_code
                    } else if (info_route.admin == true && check_user.role.name == "admin") {
                        format_response.message = "Exito"
                        format_response.status = "success"
                        format_response.code = 200
                        format_response.id = check_user.id
                        format_response.token = user_code
                    } else if (info_route.admin == true && check_user.role.name != "admin") {
                        format_response.message = "No tienes permisos para realizar la acción"
                        format_response.status = "error"
                        format_response.code = 403
                    } 
                } else if (typeof check_user == "boolean" && check_user == false) {
                    format_response.message = "Error de autenticación"
                    format_response.status = "error"
                    format_response.code = 401
                }
            }
        } else {
            format_response.message = "Exito"
            format_response.status = "success"
            format_response.code = 200
        }
    } else {
        format_response.message = "Página no encontrada"
        format_response.status = "error"
        format_response.code = 500
    }
    return new Promise((resolve) => {resolve(format_response)});
}
module.exports.obtainInfoRoute = obtainInfoRoute
module.exports.verifyPermissionsRoute = verifyPermissionsRoute
