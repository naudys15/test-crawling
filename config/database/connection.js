'use strict'
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/crawlingdata', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.once('open', function() {
    console.log("Conectado a la base de datos")
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;