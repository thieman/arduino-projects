var sys = require('sys');
var child = require('child_process');

var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

var mode;
var middleTrigger = 0.25;
var middleMin = 0.15;
var middleRange = 0.17;

var ledCount = 8;

function setVolume(level) {
	child.exec("osascript -e 'set Volume " + level + "'");
	lighting = cycle[Math.round(level)];
	lc.row(0, 0, lighting);
};

function getVolume() {
	cmd = child.spawn("osascript -e  'get volume settings'");
	cmd.stdout.on('data', function(data) {
		console.log(data);
	});
}

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

	dial = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	middleFinger = new five.Sensor({
		pin: 'A1',
		freq: 100
	});

	ringFinger = new five.Sensor({
		pin: 'A2',
		freq: 100
	});

	hwSwitch = new five.Button({
		pin: 13
	});

	board.repl.inject({
		led: led,
		lc: lc,
		dial: dial,
		middleFinger: middleFinger,
		ringFinger: ringFinger,
		hwSwitch: hwSwitch,
		setVolume: setVolume,
		getVolume: getVolume
	});

	function monitorSwitch() {
		if (hwSwitch.isDown) {
			mode = 'dial';
		} else {
			mode = 'glove';
		}
		setTimeout(monitorSwitch, 250);
	}

	monitorSwitch();

	idx = 0;
	cycle = [8, 12, 14, 15, 31, 63, 127, 255];

	dial.scale([0, 7]).on('read', function() {
		if (mode === 'dial') {
			setVolume(Math.abs(this.scaled - 7));
		}
	});

	middleFinger.scale([0, 1]).on('read', function() {
		if (mode === 'glove') {
			newVolume = (this.scaled - middleMin) * (7 / middleRange);
			newVolume = Math.max(0, Math.min(newVolume, 10));
			setVolume(newVolume);
		}
	});

});
