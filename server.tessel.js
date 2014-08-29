var tessel = require('tessel'),
    port = tessel.port.GPIO,
    pin = port.pin['G3'];
pin.__proto__ = port.pwm[0].__proto__;
port.pwmFrequency(100);

var port = 80;
require('http').createServer(function (req, res) {
  //var val = +req.headers['x-val'];
  var val = +req.url.slice(1);
  console.log("got", val);
  pin.pwmDutyCycle(val);
  res.writeHead(200, {'Access-Control-Allow-Origin':"*"});
  res.end("as you wish\n");
}).listen(port, function () {
  console.log(
    "http://" + require('os').networkInterfaces().en1[0].address +
    ":" + this.address().port
  );
});

/*
var hw = process.binding('hw');

var cycle = 0.9,
    len_u = 1e6 / 1000;

var t_on = cycle * len_u,
    t_off = len_u - t_on;
console.log(t_on, t_off);
while (1) {
  pin.output(1);
  hw.sleep_us(t_on);
  pin.output(0);
  hw.sleep_us(t_off);
}
*/

/*
var t_on = 1e5,
    t_off = (1e6 / 1) - t_on;
console.log(t_on, t_off);
while (1) {
  pin.output(1);
  hw.sleep_us(t_on);
  pin.output(0);
  hw.sleep_us(t_off);
}
*/