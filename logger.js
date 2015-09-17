var winston = require('winston');

winston.add(winston.transports.File, {
    filename: './roomy_socket.log'
});
winston.log('info', 'Hello distributed log files!');
module.exports = winston;