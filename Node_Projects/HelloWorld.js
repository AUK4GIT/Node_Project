"use strict";

(function () {

    console.log("Hello World");

    //Launches the html on a browser
    //var spawn = require('child_process').spawn
    //spawn('open', ['test.html']);

    //Launches the html on a browser. Requires "Open" module to be installed. Handles Cross platform issues
    var open = require('open');
    //open('http://www.google.com');
    open('test.html', function (err) {
        if (err) throw err;
        console.log('The user closed the browser');
    });

    //lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/my_database_name';

    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.

            //Close connection
            db.close();
        }
    });
})();