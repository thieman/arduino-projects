var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

board.on('ready', function() {

	sensor = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	led = new five.Led({
		pin: 11
	});

	board.repl.inject({
		sensor: sensor,
		led: led
	});

	sensor.scale([1, 255]).on('read', function() {
		led.brightness(this.scaled);
	});

});
