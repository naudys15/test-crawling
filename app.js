var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')


var indexRouter = require('./routes/index')
//Usuarios
var usersRouter = require('./routes/users')
//Países
var countriesRouter = require('./routes/countries')
//Provincias
var provincesRouter = require('./routes/provinces')
//Ciudades
var citiesRouter = require('./routes/cities')
//Módulos
var modulesRouter = require('./routes/modules')
//Submodulos
var submodulesRouter = require('./routes/submodules')
//Rango de submódulos
var rangeSubmodulesRouter = require('./routes/rangesubmodules')
//Roles
var rolesRouter = require('./routes/roles')
//Membresías
var membershipsRouter = require('./routes/memberships')
//Redes sociales
var socialsRouter = require('./routes/socials')
//Logs de la aplicación
var logsRouter = require('./routes/logs')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors())
app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.raw({limit: "20mb", extended: true, parameterLimit: 50000}))
app.use(bodyParser.json({limit: "20mb"}))
app.use(bodyParser.urlencoded({limit: "20mb", extended: true, parameterLimit: 50000}))
app.use(bodyParser.text({limit: "20mb", extended: true, parameterLimit: 50000}))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/', usersRouter)
app.use('/', countriesRouter)
app.use('/', provincesRouter)
app.use('/', citiesRouter)
app.use('/', modulesRouter)
app.use('/', submodulesRouter)
app.use('/', rangeSubmodulesRouter)
app.use('/', rolesRouter)
app.use('/', membershipsRouter)
app.use('/', socialsRouter)
app.use('/', logsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app