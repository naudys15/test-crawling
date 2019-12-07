'use strict'
const translations_index = require('../translations/index')

var translations = []

async function getTemplate(type_email, lang, data)
{
    translations = await(translations_index.setTranslationsEmailTemplates(lang))
    var style_message = `
        <style>
            .body_message_cd {
                background: #e012cb;
            }
        </style>
    `
    var html = `<div><header>${translations['header']}</header>`
    if (type_email == 'register') {
        html += `<div>
                    ${translations['register']} <a href="${data.url}">${translations['verify']}</a>
                </div>`
    } else if (type_email == 'restore_password') {
        html += `<div>
                    ${translations['restore_password']} <a href="${data.url}">${translations['change_password']}</a>
                </div>`
    }
    html += `<footer>${translations['footer']}</footer></div>`
    return html
}

module.exports.getTemplate = getTemplate