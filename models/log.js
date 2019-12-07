'use strict'
const Logs = require('../config/database/models').Log,
    encryption = require('../config/encryption/params')

//Permite crear un nuevo log
async function createLog(data)
{
    return new Promise(async (resolve) => {
        if (data.user != undefined) {
            var data_insert = {
                user: (typeof data.user != undefined)? encryption.encrypt(data.user) : '',
                description: (typeof data.description != undefined)? encryption.encrypt(data.description) : '',
                date: new Date()
            }
            var insert = new Logs(data_insert)
            insert.save(function (err, user) {
                if (err) {
                    resolve('error_db')
                }
                resolve('log_created')
            })
        } else {
            resolve('user_not_created')
        }
    })
}

//Permite obtener un log por el id
async function getLogById(id)
{
    return new Promise((resolve) => {
        Logs.find({_id : id}).exec(function(err, log) {
            if (err || log == undefined) resolve('error_db')
            if (log != undefined && log.length == 0) {
                resolve('no_log')
            }
            if (log != null && log.length > 0) {
                var new_log = {}
                new_log.id = log[0]['_id']
                new_log.user = log[0]['user']
                new_log.description = log[0]['description']
                new_log.date = log[0]['date']
                resolve(new_log)
            }
        })
    })
}

//Permite obtener todos los logs del sistema
async function getLogs()
{
    return new Promise((resolve) => {
        Logs.find({}).exec(function(err, logs) {
            if (err) resolve('error_db')
            if (logs.length > 0) {
                var new_logs = []
                for (var i = 0; i < logs.length; i++) {
                    var new_log = {}
                    new_log.id = logs[i]['_id']
                    new_log.user = logs[i]['user']
                    new_log.description = logs[i]['description']
                    new_log.date = logs[i]['date']
                    new_logs.push(new_log)
                }
                resolve(new_logs)
            } else {
                resolve('no_logs')
            }
            
        })
    })
}

//Permite obtener todos los logs de un usuario
async function getLogsByUser(id)
{
    return new Promise((resolve) => {
        Logs.find({user: id}).exec(function(err, logs) {
            if (err) resolve('error_db')
            if (logs.length > 0) {
                var new_logs = []
                for (var i = 0; i < logs.length; i++) {
                    var new_log = {}
                    new_log.id = logs[i]['_id']
                    new_log.description = logs[i]['description']
                    new_log.date = logs[i]['date']
                    new_logs.push(new_log)
                }
                resolve(new_logs)
            } else {
                resolve('no_logs')
            }
            
        })
    })
}

//Permite obtener todos los logs de un día específico
async function getLogsByDate(date)
{
    return new Promise((resolve) => {
        Logs.find({date: date}).exec(function(err, logs) {
            if (err) resolve('error_db')
            if (logs.length > 0) {
                var new_logs = []
                for (var i = 0; i < logs.length; i++) {
                    var new_log = {}
                    new_log.id = logs[i]['_id']
                    new_log.user = logs[i]['user']
                    new_log.description = logs[i]['description']
                    new_log.date = logs[i]['date']
                    new_logs.push(new_log)
                }
                resolve(new_logs)
            } else {
                resolve('no_logs')
            }
            
        })
    })
}

//Permite obtener todos los logs de un rango de fechas
async function getLogsByDates(begin, end)
{
    return new Promise((resolve) => {
        Logs.find({date: { $gt:  begin, $lt:  end }}).exec(function(err, logs) {
            if (err) resolve('error_db')
            if (logs.length > 0) {
                var new_logs = []
                for (var i = 0; i < logs.length; i++) {
                    var new_log = {}
                    new_log.id = logs[i]['_id']
                    new_log.user = logs[i]['user']
                    new_log.description = logs[i]['description']
                    new_log.date = logs[i]['date']
                    new_logs.push(new_log)
                }
                resolve(new_logs)
            } else {
                resolve('no_logs')
            }
            
        })
    })
}

module.exports.createLog = createLog
module.exports.getLogById = getLogById
module.exports.getLogs = getLogs
module.exports.getLogsByUser = getLogsByUser
module.exports.getLogsByDate = getLogsByDate
module.exports.getLogsByDates = getLogsByDates