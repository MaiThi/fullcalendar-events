var connection = require('../model/config');
module.exports = function(app) {

    app.get('/enter-information/:eventID/:numberSold', function (req, res) {

        res.render('information-customer', {eventID: req.params.eventID, numberSold: req.params.numberSold});
    });

    app.post('/submit-customer-information', function (req, res) {
        var customerName = req.body.customerName;
        var customerAdress = req.body.customerAdress;
        var customerTelephone = req.body.customerTelephone;
        var numberOfTickets = req.body.numberOfTickets;
        var eventID = req.body.eventID;
        var numberTicketSolds = req.body.numberTicketSolds;

        console.log(eventID);
        console.log(req.body);
        var objectData = {
            eventId : eventID,
            customerName: customerName,
            customerAddress: customerAdress,
            customerAge: 18,
            customerTelephone: customerTelephone,
            numberTicketBuy : numberOfTickets,
            type: '',
            linkQRCode : ''
        }
        connection.query('INSERT INTO ticketsold SET ?', objectData, function (err, rows) {
            if(err != null){
                console.log(err);
            }else{
                var newNumberOfTicketSold = parseInt(numberTicketSolds) + parseInt(numberOfTickets);
                console.log(newNumberOfTicketSold);
                console.log(eventID);
                connection.query("UPDATE `events` SET `numberTicketSold` = '"+newNumberOfTicketSold+"' WHERE `events`.`eventID` = " + eventID, function(err, rows){
                    res.redirect('/');
                });
            }
        });
    });
}