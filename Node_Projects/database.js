//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/database';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // do some work here with the database.
        insertData(db);
//        updateData(db);
//        retrieveAllDataForUser(db);
//        retrieveLimitedUserDataUsingCursor(db);
        retrieveAllDataForUser(db);
        
        
        //Close connection
        //        db.close();
    }
});

//Insert Sample Data
function insertData(db) {
    // Get the documents collection
    var collection = db.collection('users');

    //Create some users
    var user1 = {
        name: 'admin',
        age: 42,
        roles: ['admin', 'moderator', 'user'],
        password: 'password'
    };
    var user2 = {
        name: 'user',
        age: 22,
        roles: ['user'],
        password: 'password'
    };
    var user3 = {
        name: 'superadmin',
        age: 92,
        roles: ['super-admin', 'admin', 'moderator', 'user'],
        password: 'password'
    };

    // Insert some users
    collection.insert([user1, user2, user3], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        db.close();
    })
}

function updateData(db) {
    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.update({
        name: 'user'
    }, {
        $set: {
            enabled: false
        }
    }, function (err, numUpdated) {
        if (err) {
            console.log(err);
        } else if (numUpdated) {
            console.log('Updated Successfully %d document(s).', numUpdated);
        } else {
            console.log('No document found with defined "find" criteria!');
        }
        //Close connection
        db.close();
    });
}

function retrieveAllDataForUser(db) {
    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.find({
        name: 'user'
    }).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Found:', result);
        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }
        //Close connection
        db.close();
    })
}

function retrieveLimitedUserDataUsingCursor(db) {

    // Get the documents collection
    var collection = db.collection('users');

    //We have a cursor now with our find criteria
    var cursor = collection.find({
        name: 'user'
    });

    //We need to sort by age descending
    cursor.sort({
        age: -1
    });

    //Limit to max 10 records
    cursor.limit(10);

    //Skip specified records. 0 for skipping 0 records.
    cursor.skip(0);

    //Lets iterate on the result
    cursor.each(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log('Fetched:', doc);
        }
        //Close connection
        db.close();
    });
}

function retrieveAllRecords(db) {
    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else if (result.length) {
            console.log('Found:', result);
        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }
        //Close connection
        db.close();
    })
}