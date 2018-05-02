//var configDB = require('model/config');
var mysql = require('mysql');
var configDB = mysql.createConnection({
    connectionLimit : 100, //focus it
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'event_ticket',
    port: '3306'
});

var addEvent = function (param, socket) {
    configDB.query('INSERT INTO events SET ?', param, function (err, rows) {
        var recordAdded = false;
        if(err != null){
            console.log(err);
        }else{
            configDB.query("SELECT * FROM `events` WHERE `eventID` = " + rows['insertId'] , function (errR, recordAdded) {
                if(errR) throw errR;

                socket.emit('returnRecordAdded', recordAdded);
            });
        }
       //socket.emit('res_event_add', {})
    });
}
var addEventWithSpecificValue = function (objectEvent, dateEvent, socket) {
    configDB.query("INSERT INTO `events` " +
        "(`eventID`, `eventName`, `shortDescription`, `price`, `numberPPInvolved`, `numberTicketSold`, " +
        "`limitedAge`, `location`, `startedDate`, `eventTime`) " +
        "VALUES (NULL, '" + objectEvent.eventTitle + "', '" + objectEvent.shortDescription + "', '" + objectEvent.price + "', '" + 0.0 + "', '" + 0 + "', " +
        "'" + 0 + "', '" + objectEvent.eventLocation + "', '" + dateEvent + "', '8pm')" , function (err, result) {
        if(err) throw err;
    });

}
var getEvents = function (socket) {
    configDB.query("SELECT * FROM `events`", function (err, events) {
        if(err == null) {
            socket.emit('receivedEvents', events);
        }else{
            socket.emit('receivedEvents', []);
        }
    });
}
var getSpecificEvents = function(eventID, callback){
    console.log('module: ' + eventID);
    configDB.query("SELECT * FROM `events` WHERE `eventID` = " + eventID , function (errR, recordAdded) {
        if(errR) throw errR;
        callback(recordAdded);
    });
}
module.exports = {addEvent, addEventWithSpecificValue, getEvents, getSpecificEvents}

