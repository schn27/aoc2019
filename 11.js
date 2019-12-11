"use strict";

function calc() {
	const m = input.split(",").map(Number).reduce((o, e, i) => (o[i] = e, o), {});

	const part1 = Object.keys(launchRobot(m, false)).length;
	
	const map = launchRobot(m, true);
	drawMap(map);

	return part1;
}

function drawMap(map) {
	const canvas = document.createElement('canvas');
	canvas.width = 250;
	canvas.height = 30;
	document.getElementsByTagName("body")[0].appendChild(canvas);
	const ctx = canvas.getContext("2d");

	Object.keys(map).map(k => k.split(":").map(Number)).forEach(k => {
		const [x, y] = k;
		ctx.fillStyle = map[k.join(":")] == 1 ? "black" : "white";
		ctx.fillRect(x * 4, y * 4, 4, 4);
	});
}

function launchRobot(m, part2) {
	const map = {};
	const moves = [[0, -1], [1, 0], [0, 1], [-1, 0]];
	const coords = [0, 0];
	let heading = 0;

	const state = {m: {...m}, input: [], ip: 0, base: 0, output: []};

	if (part2 == true) {
		map["0:0"] = 1;
	}

	while (state.ip >= 0) {
		state.input.push(map[coords.join(":")] || 0);
		
		run(state);
		
		map[coords.join(":")] = state.output.shift();
		
		heading += (state.output.shift() == 1) ? 1 : -1;
		
		if (heading < 0) {
			heading += moves.length;
		} else if (heading >= moves.length) {
			heading -= moves.length;
		}

		coords[0] += moves[heading][0];
		coords[1] += moves[heading][1];
	}

	return map;	
}

function run(state) {
	const m = state.m;
	let ip = state.ip;
	let base = state.base;
	const input = state.input;
	const output = state.output;

	const opAdd = 1;
	const opMul = 2;
	const opIn = 3;
	const opOut = 4;
	const opJumpIfTrue = 5;
	const opJumpIfFalse = 6;
	const opLessThan = 7;
	const opEquals = 8;
	const opRelBase = 9;
	const opHalt = 99;

	while (true) {
		let [op, x, y, z] = [m[ip] || 0, m[ip + 1] || 0, m[ip + 2] || 0, m[ip + 3] || 0];
		const opcode = op % 100;
		const modeX = Math.floor(op / 100) % 10;
		const modeY = Math.floor(op / 1000) % 10;
		const modeZ = Math.floor(op / 10000) % 10;

		const get = (a, mode) => {
			if (mode == 0) {
				return m[a] || 0;
			} else if (mode == 1) {
				return a;
			} else if (mode == 2) {
				return m[a + base] || 0;
			} else {
				return 0;
			}
		}

		const set = (a, mode, value) => {
			if (mode == 0) {
				m[a] = value;
			} else if (mode == 2) {
				m[a + base] = value;
			}
		}
		
		let size = 1;

		if (opcode == opAdd) {
			size = 4;
			set(z, modeZ, get(x, modeX) + get(y, modeY));
		} else if (opcode == opMul) {
			size = 4;
			set(z, modeZ, get(x, modeX) * get(y, modeY));
		} else if (opcode == opIn) {
			if (input.length == 0) {
				break;
			}

			size = 2;
			set(x, modeX, input.shift());
		} else if (opcode == opOut) {
			size = 2;
			output.push(get(x, modeX));
		} else if (opcode == opJumpIfTrue) {
			size = 3;
			if (get(x, modeX) != 0) {
				ip = get(y, modeY);
				size = 0;
			}
		} else if (opcode == opJumpIfFalse) {
			size = 3;
			if (get(x, modeX) == 0) {
				ip = get(y, modeY);
				size = 0;
			}
		} else if (opcode == opLessThan) {
			size = 4;
			set(z, modeZ, get(x, modeX) < get(y, modeY) ? 1 : 0);
		} else if (opcode == opEquals) {
			size = 4;
			set(z, modeZ, get(x, modeX) == get(y, modeY) ? 1 : 0);
		} else if (opcode == opRelBase) {
			size = 2;
			base += get(x, modeX);
		} else if (opcode == opHalt) {
			ip = -1;
			break;
		}

		ip += size;
	}

	state.ip = ip;
	state.base = base;
	return state;
}

const input = `3,8,1005,8,361,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,28,2,1104,18,10,1006,0,65,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,57,1,1101,5,10,2,108,15,10,2,102,12,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,91,2,1005,4,10,2,1107,10,10,1006,0,16,2,109,19,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,129,1,104,3,10,1,1008,9,10,1006,0,65,1,104,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,165,1,1106,11,10,1,1106,18,10,1,8,11,10,1,4,11,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,203,2,1003,11,10,1,1105,13,10,1,101,13,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,237,2,7,4,10,1006,0,73,1,1003,7,10,1006,0,44,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,273,2,108,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,299,1,1107,6,10,1006,0,85,1,1107,20,10,1,1008,18,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1001,8,0,337,2,107,18,10,101,1,9,9,1007,9,951,10,1005,10,15,99,109,683,104,0,104,1,21102,1,825594852248,1,21101,378,0,0,1105,1,482,21101,0,387240006552,1,21101,0,389,0,1106,0,482,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,29032025091,1,21101,436,0,0,1106,0,482,21101,29033143299,0,1,21102,1,447,0,1105,1,482,3,10,104,0,104,0,3,10,104,0,104,0,21101,988669698916,0,1,21101,0,470,0,1106,0,482,21101,0,709052072804,1,21102,1,481,0,1106,0,482,99,109,2,21202,-1,1,1,21101,0,40,2,21101,0,513,3,21101,503,0,0,1106,0,546,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,508,509,524,4,0,1001,508,1,508,108,4,508,10,1006,10,540,1101,0,0,508,109,-2,2105,1,0,0,109,4,1202,-1,1,545,1207,-3,0,10,1006,10,563,21102,0,1,-3,21202,-3,1,1,22101,0,-2,2,21102,1,1,3,21101,582,0,0,1105,1,587,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,610,2207,-4,-2,10,1006,10,610,21202,-4,1,-4,1106,0,678,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,629,1,0,1106,0,587,22102,1,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,648,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,670,21202,-1,1,1,21101,670,0,0,105,1,545,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0`;
