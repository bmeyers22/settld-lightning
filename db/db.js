var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

//the MongoDB connection
var connectionInstance;

module.exports = function(callback) {
    //if already we have a connection, don't connect to database again
    if (connectionInstance) {
        callback(connectionInstance);
        return;
    }

    var db = new Db('roomy_development', new Server("localhost", 27017, {
        auto_reconnect: true
    }));
    db.open(function(error, databaseConnection) {
        if (error) throw new Error(error);
        connectionInstance = databaseConnection;
        callback(databaseConnection);
    });
};
