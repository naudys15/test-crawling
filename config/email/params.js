'use strict'
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'licoresya2018@gmail.com',
           pass: 'fdizytyybozzhepq'
    }
});

const general_config_email = {
    'from_default': 'support@crawlingdata.com'
}

async function sendEmail(from, to, subject, html)
{
    var mail_options = {
        "from": from, 
        "to": to,
        "subject": subject,
        "html": html
    };
    return new Promise ((resolve) => {
        transporter.sendMail(mail_options, function (err, info) {
            if (err) {
                resolve(false)
            } else {
                resolve(true)
            }
        });
    })
}

module.exports.sendEmail = sendEmail
module.exports.general_config_email = general_config_email