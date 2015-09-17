TransactionsController = require(_BASE_PATH + '/controllers/TransactionsController');

var Server = function(options) {
    var self = this;

    self.io = options.io;

    self.users = [];

    // init function
    self.init = function() {
        // Fired upon a connection
        self.io.on('connection', function connection(ws) {
          self.handleConnection(ws);
        });
    }

    self.handleConnection = function(socket) {
        console.log("CONNECTION RECIEVED");
        var transactionsController = new TransactionsController({
            userId: null,
            socket: socket
        });
    }
}

module.exports = Server;
