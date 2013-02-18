var sys = require('sys');
var exec = require('child_process').exec;
var child;

var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

var ledCount = 8;

function getCycle() {
	result = [];
	for (var i = 0; i < ledCount; i++) {
		result.push(Math.pow(2, i));
	}
	return result;
};

function setVolume(level) {
	exec("osascript -e 'set Volume " + level + "'");
};

board.on('ready', function() {

	led = new five.Led({
		pin: 13
	});
	led.on();

	lc = new five.LedControl({
		pins: {
			data: 2,
			clock: 3,
			cs: 4
		},
		devices: 1,
		isMatrix: true
	});


	sensor = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	board.repl.inject({
		led: led,
		lc: lc,
		sensor: sensor,
		getCycle: getCycle
	});

	idx = 0;
	cycle = [255, 127, 63, 31, 15, 14, 12, 8];

	sensor.scale([0, 7]).on('read', function() {
		lighting = cycle[Math.round(this.scaled)];
		lc.row(0, 0, lighting);
		setVolume(Math.abs(this.scaled - 7));
	});

});
