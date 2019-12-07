'use strict'
const Country = require('../config/database/models').Country

async function initialize()
{
    return new Promise(async (resolve) => {
        const data = [
            {
                "name": "Andorra",
                "iso": "AD"
            },
            {
                "name": "Emiratos Árabes Unidos",
                "iso": "AE"
            },
            {
                "name": "Afganistán",
                "iso": "AF"
            },
            {
                "name": "Antigua y Barbuda",
                "iso": "AG"
            },
            {
                "name": "Anguilla",
                "iso": "AI"
            },
            {
                "name": "Albania",
                "iso": "AL"
            },
            {
                "name": "Armenia",
                "iso": "AM"
            },
            {
                "name": "Antillas Holandesas",
                "iso": "AN"
            },
            {
                "name": "Angola",
                "iso": "AO"
            },
            {
                "name": "Antártida",
                "iso": "AQ"
            },
            {
                "name": "Argentina",
                "iso": "AR"
            },
            {
                "name": "Samoa Americana",
                "iso": "AS"
            },
            {
                "name": "Austria",
                "iso": "AT"
            },
            {
                "name": "Australia",
                "iso": "AU"
            },
            {
                "name": "Aruba",
                "iso": "AW"
            },
            {
                "name": "Islas Gland",
                "iso": "AX"
            },
            {
                "name": "Azerbaiyán",
                "iso": "AZ"
            },
            {
                "name": "Bosnia y Herzegovina",
                "iso": "BA"
            },
            {
                "name": "Barbados",
                "iso": "BB"
            },
            {
                "name": "Bangladesh",
                "iso": "BD"
            },
            {
                "name": "Bélgica",
                "iso": "BE"
            },
            {
                "name": "Burkina Faso",
                "iso": "BF"
            },
            {
                "name": "Bulgaria",
                "iso": "BG"
            },
            {
                "name": "Bahréin",
                "iso": "BH"
            },
            {
                "name": "Burundi",
                "iso": "BI"
            },
            {
                "name": "Benin",
                "iso": "BJ"
            },
            {
                "name": "Bermudas",
                "iso": "BM"
            },
            {
                "name": "Brunéi",
                "iso": "BN"
            },
            {
                "name": "Bolivia",
                "iso": "BO"
            },
            {
                "name": "Brasil",
                "iso": "BR"
            },
            {
                "name": "Bahamas",
                "iso": "BS"
            },
            {
                "name": "Bhután",
                "iso": "BT"
            },
            {
                "name": "Isla Bouvet",
                "iso": "BV"
            },
            {
                "name": "Botsuana",
                "iso": "BW"
            },
            {
                "name": "Bielorrusia",
                "iso": "BY"
            },
            {
                "name": "Belice",
                "iso": "BZ"
            },
            {
                "name": "Canadá",
                "iso": "CA"
            },
            {
                "name": "Islas Cocos",
                "iso": "CC"
            },
            {
                "name": "República Democrática del Congo",
                "iso": "CD"
            },
            {
                "name": "República Centroafricana",
                "iso": "CF"
            },
            {
                "name": "Congo",
                "iso": "CG"
            },
            {
                "name": "Suiza",
                "iso": "CH"
            },
            {
                "name": "Costa de Marfil",
                "iso": "CI"
            },
            {
                "name": "Islas Cook",
                "iso": "CK"
            },
            {
                "name": "Chile",
                "iso": "CL"
            },
            {
                "name": "Camerún",
                "iso": "CM"
            },
            {
                "name": "China",
                "iso": "CN"
            },
            {
                "name": "Colombia",
                "iso": "CO"
            },
            {
                "name": "Costa Rica",
                "iso": "CR"
            },
            {
                "name": "Serbia y Montenegro",
                "iso": "CS"
            },
            {
                "name": "Cuba",
                "iso": "CU"
            },
            {
                "name": "Cabo Verde",
                "iso": "CV"
            },
            {
                "name": "Isla de Navidad",
                "iso": "CX"
            },
            {
                "name": "Chipre",
                "iso": "CY"
            },
            {
                "name": "República Checa",
                "iso": "CZ"
            },
            {
                "name": "Alemania",
                "iso": "DE"
            },
            {
                "name": "Yibuti",
                "iso": "DJ"
            },
            {
                "name": "Dinamarca",
                "iso": "DK"
            },
            {
                "name": "Dominica",
                "iso": "DM"
            },
            {
                "name": "República Dominicana",
                "iso": "DO"
            },
            {
                "name": "Argelia",
                "iso": "DZ"
            },
            {
                "name": "Ecuador",
                "iso": "EC"
            },
            {
                "name": "Estonia",
                "iso": "EE"
            },
            {
                "name": "Egipto",
                "iso": "EG"
            },
            {
                "name": "Sahara Occidental",
                "iso": "EH"
            },
            {
                "name": "Eritrea",
                "iso": "ER"
            },
            {
                "name": "España",
                "iso": "ES"
            },
            {
                "name": "Etiopía",
                "iso": "ET"
            },
            {
                "name": "Finlandia",
                "iso": "FI"
            },
            {
                "name": "Fiyi",
                "iso": "FJ"
            },
            {
                "name": "Islas Malvinas",
                "iso": "FK"
            },
            {
                "name": "Micronesia",
                "iso": "FM"
            },
            {
                "name": "Islas Feroe",
                "iso": "FO"
            },
            {
                "name": "Francia",
                "iso": "FR"
            },
            {
                "name": "Gabón",
                "iso": "GA"
            },
            {
                "name": "Reino Unido",
                "iso": "GB"
            },
            {
                "name": "Granada",
                "iso": "GD"
            },
            {
                "name": "Georgia",
                "iso": "GE"
            },
            {
                "name": "Guayana Francesa",
                "iso": "GF"
            },
            {
                "name": "Ghana",
                "iso": "GH"
            },
            {
                "name": "Gibraltar",
                "iso": "GI"
            },
            {
                "name": "Groenlandia",
                "iso": "GL"
            },
            {
                "name": "Gambia",
                "iso": "GM"
            },
            {
                "name": "Guinea",
                "iso": "GN"
            },
            {
                "name": "Guadalupe",
                "iso": "GP"
            },
            {
                "name": "Guinea Ecuatorial",
                "iso": "GQ"
            },
            {
                "name": "Grecia",
                "iso": "GR"
            },
            {
                "name": "Islas Georgias del Sur y Sandwich del Sur",
                "iso": "GS"
            },
            {
                "name": "Guatemala",
                "iso": "GT"
            },
            {
                "name": "Guam",
                "iso": "GU"
            },
            {
                "name": "Guinea-Bissau",
                "iso": "GW"
            },
            {
                "name": "Guyana",
                "iso": "GY"
            },
            {
                "name": "Hong Kong",
                "iso": "HK"
            },
            {
                "name": "Islas Heard y McDonald",
                "iso": "HM"
            },
            {
                "name": "Honduras",
                "iso": "HN"
            },
            {
                "name": "Croacia",
                "iso": "HR"
            },
            {
                "name": "Haití",
                "iso": "HT"
            },
            {
                "name": "Hungría",
                "iso": "HU"
            },
            {
                "name": "Indonesia",
                "iso": "ID"
            },
            {
                "name": "Irlanda",
                "iso": "IE"
            },
            {
                "name": "Israel",
                "iso": "IL"
            },
            {
                "name": "India",
                "iso": "IN"
            },
            {
                "name": "Territorio Británico del Océano Índico",
                "iso": "IO"
            },
            {
                "name": "Iraq",
                "iso": "IQ"
            },
            {
                "name": "Irán",
                "iso": "IR"
            },
            {
                "name": "Islandia",
                "iso": "IS"
            },
            {
                "name": "Italia",
                "iso": "IT"
            },
            {
                "name": "Jamaica",
                "iso": "JM"
            },
            {
                "name": "Jordania",
                "iso": "JO"
            },
            {
                "name": "Japón",
                "iso": "JP"
            },
            {
                "name": "Kenia",
                "iso": "KE"
            },
            {
                "name": "Kirguistán",
                "iso": "KG"
            },
            {
                "name": "Camboya",
                "iso": "KH"
            },
            {
                "name": "Kiribati",
                "iso": "KI"
            },
            {
                "name": "Comoras",
                "iso": "KM"
            },
            {
                "name": "San Cristóbal y Nevis",
                "iso": "KN"
            },
            {
                "name": "Corea del Norte",
                "iso": "KP"
            },
            {
                "name": "Corea del Sur",
                "iso": "KR"
            },
            {
                "name": "Kuwait",
                "iso": "KW"
            },
            {
                "name": "Islas Caimán",
                "iso": "KY"
            },
            {
                "name": "Kazajstán",
                "iso": "KZ"
            },
            {
                "name": "Laos",
                "iso": "LA"
            },
            {
                "name": "Líbano",
                "iso": "LB"
            },
            {
                "name": "Santa Lucía",
                "iso": "LC"
            },
            {
                "name": "Liechtenstein",
                "iso": "LI"
            },
            {
                "name": "Sri Lanka",
                "iso": "LK"
            },
            {
                "name": "Liberia",
                "iso": "LR"
            },
            {
                "name": "Lesotho",
                "iso": "LS"
            },
            {
                "name": "Lituania",
                "iso": "LT"
            },
            {
                "name": "Luxemburgo",
                "iso": "LU"
            },
            {
                "name": "Letonia",
                "iso": "LV"
            },
            {
                "name": "Libia",
                "iso": "LY"
            },
            {
                "name": "Marruecos",
                "iso": "MA"
            },
            {
                "name": "Mónaco",
                "iso": "MC"
            },
            {
                "name": "Moldavia",
                "iso": "MD"
            },
            {
                "name": "Madagascar",
                "iso": "MG"
            },
            {
                "name": "Islas Marshall",
                "iso": "MH"
            },
            {
                "name": "ARY Macedonia",
                "iso": "MK"
            },
            {
                "name": "Malí",
                "iso": "ML"
            },
            {
                "name": "Myanmar",
                "iso": "MM"
            },
            {
                "name": "Mongolia",
                "iso": "MN"
            },
            {
                "name": "Macao",
                "iso": "MO"
            },
            {
                "name": "Islas Marianas del Norte",
                "iso": "MP"
            },
            {
                "name": "Martinica",
                "iso": "MQ"
            },
            {
                "name": "Mauritania",
                "iso": "MR"
            },
            {
                "name": "Montserrat",
                "iso": "MS"
            },
            {
                "name": "Malta",
                "iso": "MT"
            },
            {
                "name": "Mauricio",
                "iso": "MU"
            },
            {
                "name": "Maldivas",
                "iso": "MV"
            },
            {
                "name": "Malawi",
                "iso": "MW"
            },
            {
                "name": "México",
                "iso": "MX"
            },
            {
                "name": "Malasia",
                "iso": "MY"
            },
            {
                "name": "Mozambique",
                "iso": "MZ"
            },
            {
                "name": "Namibia",
                "iso": "NA"
            },
            {
                "name": "Nueva Caledonia",
                "iso": "NC"
            },
            {
                "name": "Níger",
                "iso": "NE"
            },
            {
                "name": "Isla Norfolk",
                "iso": "NF"
            },
            {
                "name": "Nigeria",
                "iso": "NG"
            },
            {
                "name": "Nicaragua",
                "iso": "NI"
            },
            {
                "name": "Países Bajos",
                "iso": "NL"
            },
            {
                "name": "Noruega",
                "iso": "NO"
            },
            {
                "name": "Nepal",
                "iso": "NP"
            },
            {
                "name": "Nauru",
                "iso": "NR"
            },
            {
                "name": "Niue",
                "iso": "NU"
            },
            {
                "name": "Nueva Zelanda",
                "iso": "NZ"
            },
            {
                "name": "Omán",
                "iso": "OM"
            },
            {
                "name": "Panamá",
                "iso": "PA"
            },
            {
                "name": "Perú",
                "iso": "PE"
            },
            {
                "name": "Polinesia Francesa",
                "iso": "PF"
            },
            {
                "name": "Papúa Nueva Guinea",
                "iso": "PG"
            },
            {
                "name": "Filipinas",
                "iso": "PH"
            },
            {
                "name": "Pakistán",
                "iso": "PK"
            },
            {
                "name": "Polonia",
                "iso": "PL"
            },
            {
                "name": "San Pedro y Miquelón",
                "iso": "PM"
            },
            {
                "name": "Islas Pitcairn",
                "iso": "PN"
            },
            {
                "name": "Puerto Rico",
                "iso": "PR"
            },
            {
                "name": "Palestina",
                "iso": "PS"
            },
            {
                "name": "Portugal",
                "iso": "PT"
            },
            {
                "name": "Palau",
                "iso": "PW"
            },
            {
                "name": "Paraguay",
                "iso": "PY"
            },
            {
                "name": "Qatar",
                "iso": "QA"
            },
            {
                "name": "Reunión",
                "iso": "RE"
            },
            {
                "name": "Rumania",
                "iso": "RO"
            },
            {
                "name": "Rusia",
                "iso": "RU"
            },
            {
                "name": "Ruanda",
                "iso": "RW"
            },
            {
                "name": "Arabia Saudí",
                "iso": "SA"
            },
            {
                "name": "Islas Salomón",
                "iso": "SB"
            },
            {
                "name": "Seychelles",
                "iso": "SC"
            },
            {
                "name": "Sudán",
                "iso": "SD"
            },
            {
                "name": "Suecia",
                "iso": "SE"
            },
            {
                "name": "Singapur",
                "iso": "SG"
            },
            {
                "name": "Santa Helena",
                "iso": "SH"
            },
            {
                "name": "Eslovenia",
                "iso": "SI"
            },
            {
                "name": "Svalbard y Jan Mayen",
                "iso": "SJ"
            },
            {
                "name": "Eslovaquia",
                "iso": "SK"
            },
            {
                "name": "Sierra Leona",
                "iso": "SL"
            },
            {
                "name": "San Marino",
                "iso": "SM"
            },
            {
                "name": "Senegal",
                "iso": "SN"
            },
            {
                "name": "Somalia",
                "iso": "SO"
            },
            {
                "name": "Surinam",
                "iso": "SR"
            },
            {
                "name": "Santo Tomé y Príncipe",
                "iso": "ST"
            },
            {
                "name": "El Salvador",
                "iso": "SV"
            },
            {
                "name": "Siria",
                "iso": "SY"
            },
            {
                "name": "Suiza",
                "iso": "SZ"
            },
            {
                "name": "Islas Turcas y Caicos",
                "iso": "TC"
            },
            {
                "name": "Chad",
                "iso": "TD"
            },
            {
                "name": "Territorios Australes Franceses",
                "iso": "TF"
            },
            {
                "name": "Togo",
                "iso": "TG"
            },
            {
                "name": "Tailandia",
                "iso": "TH"
            },
            {
                "name": "Tayikistán",
                "iso": "TJ"
            },
            {
                "name": "Tokelau",
                "iso": "TK"
            },
            {
                "name": "Timor Oriental",
                "iso": "TL"
            },
            {
                "name": "Turkmenistán",
                "iso": "TM"
            },
            {
                "name": "Túnez",
                "iso": "TN"
            },
            {
                "name": "Tonga",
                "iso": "TO"
            },
            {
                "name": "Turquía",
                "iso": "TR"
            },
            {
                "name": "Trinidad y Tobago",
                "iso": "TT"
            },
            {
                "name": "Tuvalu",
                "iso": "TV"
            },
            {
                "name": "Taiwán",
                "iso": "TW"
            },
            {
                "name": "Tanzania",
                "iso": "TZ"
            },
            {
                "name": "Ucrania",
                "iso": "UA"
            },
            {
                "name": "Uganda",
                "iso": "UG"
            },
            {
                "name": "Islas ultramarinas de Estados Unidos",
                "iso": "UM"
            },
            {
                "name": "Estados Unidos",
                "iso": "US"
            },
            {
                "name": "Uruguay",
                "iso": "UY"
            },
            {
                "name": "Uzbekistán",
                "iso": "UZ"
            },
            {
                "name": "Ciudad del Vaticano",
                "iso": "VA"
            },
            {
                "name": "San Vicente y las Granadinas",
                "iso": "VC"
            },
            {
                "name": "Venezuela",
                "iso": "VE"
            },
            {
                "name": "Islas Vírgenes Británicas",
                "iso": "VG"
            },
            {
                "name": "Islas Vírgenes de los Estados Unidos",
                "iso": "VI"
            },
            {
                "name": "Vietnam",
                "iso": "VN"
            },
            {
                "name": "Vanuatu",
                "iso": "VU"
            },
            {
                "name": "Wallis y Futuna",
                "iso": "WF"
            },
            {
                "name": "Samoa",
                "iso": "WS"
            },
            {
                "name": "Yemen",
                "iso": "YE"
            },
            {
                "name": "Mayotte",
                "iso": "YT"
            },
            {
                "name": "Sudáfrica",
                "iso": "ZA"
            },
            {
                "name": "Zambia",
                "iso": "ZM"
            },
            {
                "name": "Zimbabue",
                "iso": "ZW"
            }
        ]
        var a = true;
        for (var country in data) {
            var insert = new Country(data[country])
            insert.save(function (err, user) {
                if (err) {
                    a = false 
                }
            })
        }
        resolve(a)
    })
}

module.exports.initialize = initialize;