var http=require('http');
const express = require('express');


// app Init
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(express.static('views'));
app.set('view engine', 'ejs');
//var path = __dirname + '/views/';
app.use('/layout', express.static('layout'));

//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false} ));

const io = require('socket.io')(http);
global.io = io;


//config database
const configDB = require('./model/config');
var testConnect = require('./server/testconnection')(app);
var orderTicketRoutes = require('./server/order-ticket-server')(app);

// start server
const port = process.env.PORT || 8080;
const server = http.listen(port);

var eventsModule = require('./model/eventsModule');