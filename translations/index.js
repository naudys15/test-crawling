'use strict'

const spanish_translations = require('./spanish/index'),
    english_translations = require('./english/index'),
    spanish_email_translations = require('./spanish/email'),
    english_email_translations = require('./english/email')

var translations = []

function setTranslations(lang)
{
    if (lang == 'es') {
        translations = spanish_translations
    } else if (lang == 'en') {
        translations = english_translations
    } else {
        translations = spanish_translations
    }
    return translations
}

function setTranslationsEmailTemplates(lang)
{
    if (lang == 'es') {
        translations = spanish_email_translations
    } else if (lang == 'en') {
        translations = english_email_translations
    } else {
        translations = spanish_email_translations
    }
    return translations
}

module.exports.setTranslations = setTranslations
module.exports.setTranslationsEmailTemplates = setTranslationsEmailTemplates