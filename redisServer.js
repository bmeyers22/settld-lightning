var redis = require('redis'),
    connectionInstance;

module.exports = function(callback) {
    //if already we have a connection, don't connect to database again
    if (connectionInstance) {
        return connectionInstance;
    }

    connectionInstance = redis.createClient();
    if (callback)
        callback();
};