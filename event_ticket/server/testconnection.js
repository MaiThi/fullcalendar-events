var connection = require('../model/config');
var eventsModule = require('../model/eventsModule');
var socket = require('socket.io');
var Util = require('./UtilityFormat');

var converDateToString = function (date1) {
    var date = new Date(date1);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[date.getDay()] ;

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return n + ', ' + monthNames[monthIndex] + ' ' +day + ', ' + year;
}
module.exports = function(app) {
    // Load admin Dahsboard
    app.get('/', function (req, res) {
        res.render('calendar');
    });
    app.get('/index', function (req, res) {
        res.render('index',{title: 'index'});
    });
    app.get('/eventinfo/:eventID', function (req, res) {
            console.log('server: '+ req.params.eventID);
            eventsModule.getSpecificEvents(req.params.eventID, function (recordAdded) {
                    console.log(recordAdded[0]);
                    var formatStartedDate = converDateToString(recordAdded[0].startedDate);
                    console.log(formatStartedDate);
                    res.render('event-info', {event: recordAdded[0], startDate: formatStartedDate});
            });
    });
    io.on('connection', function (socket) {
        // socket.on('client_initialized'     //name of the parameter receive
        //     , function (message) { //function you want to execute
        //         configDB.query("SELECT * FROM `events`", function (err, events) {
        //             console.log(events);
        //
        //         });
        //         });
        //         socket.emit(
        //             'server_acknowledgement',
        //             objectRely
        //         );
        //     }); //receive a message from client side
        //
        socket.on('getEvents', function (message) {
            eventsModule.getEvents(socket);
        })

        socket.on('addEventToDatabase', function (objectEvent) {
            console.log(objectEvent.startedDate);
            eventsModule.addEvent(objectEvent,socket);
            //  eventsModule.addEventWithSpecificValue(objectEvent, fulldate, socket);
        })
    });

}