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

	lastValue = 0;

	sensor.scale([1, 10]).on('read', function() {
		currValue = Math.round(this.scaled);
		if (lastValue !== currValue) {
			led.stop();
			led.strobe(currValue * 100);
			lastValue = currValue;
		}
	});

});
