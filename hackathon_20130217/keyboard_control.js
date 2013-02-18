var sys = require('sys');
var exec = require('child_process').exec;
var child;

var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

function clickTop() {
	exec("osascript -e 'tell application \"System Events\" to key code 126'");
};

function clickBottom() {
	exec("osascript -e 'tell application \"System Events\" to key code 125'");
};

board.on('ready', function() {

	led = new five.Led({
		pin: 9
	});
	led.on();

	top = new five.Button(2);
	bottom = new five.Button(3);

	board.repl.inject({
		led: led,
		top: top,
		bottom: bottom
	});

	top.on('down', function() {
		clickTop();
	});

	bottom.on('down', function() {
		clickBottom();
	});

});
