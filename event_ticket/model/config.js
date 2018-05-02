
/* Connection with database */

var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit : 100, //focus it
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'event_ticket',
    port: '3306'
});
module.exports = connection;