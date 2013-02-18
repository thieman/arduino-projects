var five = require ('/Users/omnijinx/Documents/repos/johnny-five/lib/johnny-five.js');
var board = new five.Board();

var ledCount = 8;

var getCycle = function() {
	result = [];
	for (var i = 0; i < ledCount; i++) {
		result.push(Math.pow(2, i));
	}
	return result;
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

	board.repl.inject({
		led: led,
		lc: lc,
		getCycle: getCycle
	});

	idx = 0;
	cycle = [136, 204, 238, 255];

	function next() {
		lc.row(0, 0, cycle[idx]);
		idx = (idx + 1) % cycle.length;
		setTimeout(next, 100);
	}

	next();

});
