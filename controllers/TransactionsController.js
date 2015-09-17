var db = require(_BASE_PATH + '/db/db'),
    redis = require('redis').createClient(6379, 'localhost');

var TransactionsController = function(options) {

    var self = this;

    this.socket = options.socket;
    this.userId = options.userId;

    winston.log('info', 'Creating subscription!');
    redis.subscribe('transaction-message');

    redis.on('message', function(channel, message) {
      winston.log('info', 'Got message!');
      winston.log('info', message);
      message = JSON.parse(message);
      winston.log('info', message);
      if (channel == "transaction-message") {
        winston.log('info', 'Got Transacition message!');
          var data = {
            transaction: message.data
          }
          // self.socket.send(JSON.stringify(data));
          winston.log('info', JSON.stringify(data));
          try {
            self.socket.send(JSON.stringify(data));
          } catch (e) {
            winston.log('info', e);
            winston.log('info', 'SEND FAILED!');
          }
          winston.log('info', "MEssage sent!");
      }
      winston.log("REDIS MESSAGE", message);
    })

    // this.socket.on('TransactionsController.NewTransaction', function(data) {
    //     db(function(databaseConnection) {
    //         databaseConnection.collection('user_settings', function(error, collection) {
    //             collection.find().toArray(function(error, results) {
    //                 self.socket.emit('user_data_push', {
    //                     userData: results
    //                 });
    //             });
    //         });
    //     });
    // });
}

module.exports = TransactionsController;
