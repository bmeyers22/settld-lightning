global._BASE_PATH = __dirname;
global.winston = require('./logger.js');
var SOCKET_PORT = 7000;

var SocketServer = require(_BASE_PATH + '/socketServer');
//
// server.listen(SOCKET_PORT);

winston.log('info', 'Server up and running!');

var WebSocketServer = require('ws').Server;
var ws = new WebSocketServer({port: SOCKET_PORT});

new SocketServer({
    io: ws
}).init();

process.on("SIGINT", function() {
    winston.log('info', 'CLOSING [SIGINT]');
    process.exit();
});

// db.on("fullsetup", function() {
//             db.collection("user_settings", function(err, collection) {
//                 // Attempt to read (should fail due to the server not being a primary);
//                 collection.find().setReadPreference(ReadPreference.SECONDARY).toArray(function(err, items) {
//                     assert.ok(err != null);
//                     assert.equal("No replica set secondary available for query with ReadPreference SECONDARY", err.message);
//
//                 });
//             });

// });
