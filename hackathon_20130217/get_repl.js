var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

board.on('ready', function() {

	led = new five.Led({
		pin: 13
	});
	led.on();

	dial = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	sensor = new five.Sensor({
		pin: 'A2',
		freq: 100
	});

	lc = new five.LedControl({
		pins: {
			data: 2,
			clock: 3,
			cs: 4
		},
		devices: 1,
		isMatrix: true
	});


	board.repl.inject({
		led: led,
		dial: dial,
		sensor: sensor,
		lc: lc
	});

	sensor.on('read', function() {
		console.log(this.normalized);
	});

});
