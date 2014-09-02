var tessel = require('tessel'),
    port = tessel.port.GPIO,
    pin = port.pin['G3'];
pin.__proto__ = port.pwm[0].__proto__;
port.pwmFrequency(100);

var port = 80;
require('nodejs-websocket').createServer(function (conn) {
  conn.on('text', function (str) {
    var val = +str;
    console.log("got", val);
    pin.pwmDutyCycle(val);
  });
}).listen(port, function () {
  console.log(
    "http://" + require('os').networkInterfaces().en1[0].address +
    ":" + port //this.address().port
  );
});
