var url = 'http://mylogger.io/log';
function logMessage(message) {
    //send an HTTP request
    console.log(message);
}

module.exports = logMessage;
