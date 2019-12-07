'use strict'
const crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    algorithm = 'aes-256-ctr',
    applicationPass = '-.-Cr4wl1ngD4t42019-.-'

//Permite encriptar un texto
function encrypt(text)
{
    let cipher = crypto.createCipher(algorithm, applicationPass)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}
//Permite desencriptar un texto
function decrypt(hash)
{
    let decipher = crypto.createDecipher(algorithm, applicationPass)
    let dec = decipher.update(hash, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

//Permite generar un código de 20 bytes para el identificador de un archivo
function generateCodeFiles()
{
    var code = crypto.randomBytes(10).toString('hex')
    return code
}

//Permite generar un hash de las contraseñas
async function encryptPasswords(pass)
{
    return new Promise ((resolve) => {
        bcrypt.hash(pass, saltRounds, function(err, hash) {
            resolve(hash)
        });
    })
    
}
//Permite comparar el texto plano de las contraseñas y el hash almacenado
async function comparePasswords(plain, hash)
{
    return new Promise((resolve) => {
        bcrypt.compare(plain, hash, function(err, res) {
            resolve(res)
        });
    })
}

//Permite generar un código de 40 bytes para la verificación de cuenta
function generateCodeVerificationAccount()
{
    var code = crypto.randomBytes(40).toString('hex')
    return code
}

//Permite generar un código para la solicitud de cambio de contraseña
function generateCodeRequestPassword(email)
{
    var text = new Date().getTime() + '~' + email,
        code = encrypt(text)
    return code
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
module.exports.generateCodeFiles = generateCodeFiles
module.exports.encryptPasswords = encryptPasswords
module.exports.comparePasswords = comparePasswords
module.exports.generateCodeVerificationAccount = generateCodeVerificationAccount
module.exports.generateCodeRequestPassword = generateCodeRequestPassword