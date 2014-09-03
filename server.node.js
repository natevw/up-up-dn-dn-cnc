var five = require('johnny-five'),
    board = new five.Board();

var xAxis, yAxis, zAxis;
board.on('ready', function () {
  xAxis = new five.Servo({pin:9});
  yAxis = new five.Servo({pin:10});
  zAxis = new five.Servo({pin:11});
});

var port = 8080;
require('nodejs-websocket').createServer(function (conn) {
  conn.on('text', function (str) {
    var val = JSON.parse(str);
    console.log("got", val);
    if (xAxis) xAxis.to(90 + val.x*90);
    if (yAxis) yAxis.to(90 + val.y*90);
    if (zAxis) zAxis.to(90 + val.z*90);
  });
  conn.on('error', function (e) { console.error(e); });
}).listen(port, function () {
  console.log("ws://localhost:"+port);
});