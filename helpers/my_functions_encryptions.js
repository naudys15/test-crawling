'use strict'
const encryption = require('../config/encryption/params')

async function encryptEntity(entity, data)
{
    if (entity == 'user') {
        for (var i in data) {
            if (i != 'city' && i != 'role' && i != 'email' && i != 'username' && i != 'fiscal' && i != 'avatar' && i != 'password' && i != 'status' && i != 'datebirth') {
                data[i] = encryption.encrypt(data[i] + '')
            }
            if (i == 'fiscal') {
                for (var j in data[i]) {
                    if (j != 'company_city') {
                        data[i][j] = encryption.encrypt(data[i][j] + '')
                    }
                }
            }
            if (i == 'password') {
                data[i] = await(encryption.encryptPasswords(data[i]))
            }
        }
    }
    return data
}

async function decryptEntity(entity, data)
{
    if (entity == 'user') {
        for (var h in data) {
            for (var i in data[h]) {
                if (i != 'id' && i != 'role' && i != 'city' && i != 'fiscal' && i != 'status' && i != 'email' && i != 'datebirth' && i != 'username' && i != 'validate_account' && i != 'validation_code' && i != 'password' && i != 'restore_password_code') {
                    data[h][i] = encryption.decrypt(data[h][i] + '')
                }
                if (i == 'city') {
                    for (var j in data[h][i]) {
                        if (j != 'id') {
                            data[h][i][j] = encryption.decrypt(data[h][i][j] + '')
                        }
                    }
                } else if (i == 'role') {
                    for (var j in data[h][i]) {
                        if (j != 'id') {
                            data[h][i][j] = encryption.decrypt(data[h][i][j] + '')
                        }
                    }
                } else if (i == 'fiscal') {
                    for (var j in data[h][i]) {
                        if (j != 'company_city') {
                            data[h][i][j] = encryption.decrypt(data[h][i][j] + '')
                        }
                    }
                }
            }
        }
    }
    return data
}

module.exports.encryptEntity = encryptEntity
module.exports.decryptEntity = decryptEntity