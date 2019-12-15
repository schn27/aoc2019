"use strict";

const [Wall, Empty, Target] = [0, 1, 2];
const [North, South, West, East] = [1, 2, 3, 4];

const xyToStr = xy => xy.join(":");
const strToXy = str => str.split(":").map(Number);
const moves = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const nextXy = (xy, move) => [xy[0] + move[0], xy[1] + move[1]];

function calc() {
	const m = input.split(",").map(Number).reduce((o, e, i) => (o[i] = e, o), {});
	
	const map = buildMap(m);
	const targetXy = strToXy(Object.keys(map).filter(k => map[k] == Target)[0]);

	const wave = getWave(map, targetXy);
	const path = getPath(wave, [0, 0], targetXy);

	drawMap(map, path);

	return path.length + " " + Math.max(...Object.keys(wave).map(k => wave[k]));
}

function drawMap(map, path) {
	let canvas = document.getElementsByTagName("canvas")[0];
	
	if (canvas == null) {
		canvas = document.createElement('canvas');
		canvas.width = 250;
		canvas.height = 250;
		document.getElementsByTagName("body")[0].appendChild(canvas);
	}
	
	const ctx = canvas.getContext("2d");

	const ofs = [30, 30];
	const scale = 3;

	Object.keys(map).forEach(k => {
		const [x, y] = strToXy(k);
		const cell = map[k];
		ctx.fillStyle = cell == Wall ? "black" : (cell == Target ? "red" : "green");
		ctx.fillRect((x + ofs[0]) * scale, (y + ofs[1]) * scale, scale, scale);
	});

	ctx.fillStyle = "yellow";
	ctx.fillRect((0 + ofs[0]) * scale, (0 + ofs[1]) * scale, scale, scale);

	path.forEach(xy => {
		const [x, y] = xy;
		ctx.fillStyle = "red";
		ctx.fillRect((x + ofs[0]) * scale, (y + ofs[1]) * scale, scale, scale);
	});
}

function buildMap(m) {
	const map = {};

	let xy = [0, 0];
	map[xyToStr(xy)] = Empty;

	let heading = 0;
	const headings = [North, East, South, West];
	const turnLeft = heading => (heading != 0) ? heading - 1 : headings.length - 1;
	const turnRight = heading => (heading != headings.length - 1) ? heading + 1 : 0;

	const state = {m: {...m}, input: [], ip: 0, base: 0, output: []};

	for (let status = Empty; status != Target;) {
		const right = map[xyToStr(nextXy(xy, moves[turnRight(heading)]))];
		const front = map[xyToStr(nextXy(xy, moves[heading]))];

		if (right == Wall && front == Wall) {
			heading = turnLeft(heading);
		} else if (right != Wall) {
			heading = turnRight(heading);
		}

		let xy1 = nextXy(xy, moves[heading]);
		let cell = map[xyToStr(xy1)];

		state.input = [headings[heading]];
		run(state);
		status = state.output.shift();

		map[xyToStr(xy1)] = status;

		if (status != Wall) {
			xy = xy1;
		}
	}

	return map;
}

function getWave(map, from) {
	const wave = {};
	wave[xyToStr(from)] = 0;

	let front = [from];

	for (let step = 1; front.length != 0; ++step) {
		front = front.reduce((a, f) => {
			a.push(...moves.map(m => nextXy(f, m)).filter(xy => {
				const xyStr = xyToStr(xy);
				return (wave[xyStr] == undefined) && (map[xyStr] == Empty || map[xyStr] == Target);
			}));
			return a;
		}, []);

		front.forEach(f => wave[xyToStr(f)] = step);
	}

	return wave;
}

function getPath(wave, from, to) {
	const path = [];

	let xy = from;

	while (xyToStr(xy) != xyToStr(to)) {
		const targetStep = wave[xyToStr(xy)] - 1;
		const targets = Object.keys(wave).filter(k => wave[k] == targetStep);
		
		xy = moves.map(m => nextXy(xy, m))
				  .filter(xy => targets.filter(t => t == xyToStr(xy)).length != 0)[0];

		path.push(xy);
	}

	return path;
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

const input = `3,1033,1008,1033,1,1032,1005,1032,31,1008,1033,2,1032,1005,1032,58,1008,1033,3,1032,1005,1032,81,1008,1033,4,1032,1005,1032,104,99,101,0,1034,1039,102,1,1036,1041,1001,1035,-1,1040,1008,1038,0,1043,102,-1,1043,1032,1,1037,1032,1042,1106,0,124,1002,1034,1,1039,101,0,1036,1041,1001,1035,1,1040,1008,1038,0,1043,1,1037,1038,1042,1105,1,124,1001,1034,-1,1039,1008,1036,0,1041,1002,1035,1,1040,102,1,1038,1043,1001,1037,0,1042,1106,0,124,1001,1034,1,1039,1008,1036,0,1041,1001,1035,0,1040,1001,1038,0,1043,1001,1037,0,1042,1006,1039,217,1006,1040,217,1008,1039,40,1032,1005,1032,217,1008,1040,40,1032,1005,1032,217,1008,1039,1,1032,1006,1032,165,1008,1040,39,1032,1006,1032,165,1102,2,1,1044,1105,1,224,2,1041,1043,1032,1006,1032,179,1101,0,1,1044,1105,1,224,1,1041,1043,1032,1006,1032,217,1,1042,1043,1032,1001,1032,-1,1032,1002,1032,39,1032,1,1032,1039,1032,101,-1,1032,1032,101,252,1032,211,1007,0,45,1044,1106,0,224,1101,0,0,1044,1105,1,224,1006,1044,247,102,1,1039,1034,102,1,1040,1035,102,1,1041,1036,1001,1043,0,1038,1002,1042,1,1037,4,1044,1106,0,0,12,89,14,22,56,12,54,34,71,12,40,31,83,2,95,25,4,70,18,59,32,11,19,23,67,17,25,18,72,14,60,9,85,6,84,89,2,14,10,44,85,34,63,11,23,79,6,56,4,88,69,20,2,88,87,31,56,16,68,29,84,43,58,6,14,98,73,3,35,79,24,89,43,59,12,78,86,13,10,61,37,46,44,61,25,12,71,36,65,79,31,5,71,13,99,90,87,35,40,98,3,80,69,97,31,37,93,37,78,34,48,32,51,41,75,50,16,25,10,92,88,28,50,7,95,11,15,99,10,61,56,25,14,99,23,23,90,73,66,94,23,60,34,26,73,44,38,71,41,42,79,10,25,69,43,39,92,19,35,95,23,60,8,75,38,55,82,40,44,29,84,82,33,36,63,93,10,7,50,41,22,76,79,59,42,61,40,72,4,51,5,83,99,22,79,33,6,53,62,30,77,37,22,94,84,43,19,60,52,44,82,99,23,47,29,68,57,38,66,40,55,17,15,78,86,10,54,25,52,39,62,35,11,19,15,75,12,20,63,67,98,35,70,17,95,66,24,37,56,10,75,3,95,35,41,62,8,3,60,72,5,98,61,27,42,63,16,55,29,6,54,48,40,7,66,92,31,48,16,41,87,86,6,16,24,53,85,17,4,12,20,89,74,5,84,67,27,37,67,30,29,27,92,46,40,14,77,95,50,17,31,38,44,83,12,39,12,98,96,20,7,69,82,7,12,75,49,85,59,17,44,98,58,28,94,34,81,49,48,66,51,43,5,96,52,22,81,36,83,94,32,28,94,27,97,18,99,32,49,53,31,16,61,57,18,87,22,93,18,21,25,77,33,78,41,34,69,5,28,15,87,38,98,38,41,83,10,61,90,21,92,35,93,51,35,92,23,50,23,5,51,97,60,36,69,4,62,20,39,88,11,48,56,9,92,8,85,78,62,24,62,82,15,16,30,81,34,9,98,94,8,16,85,22,75,40,62,78,25,70,16,47,28,93,32,21,62,53,94,62,14,75,19,69,8,47,9,39,90,35,10,86,50,15,84,42,72,19,24,5,77,79,3,93,66,6,89,16,11,55,32,37,38,28,50,78,21,29,35,13,95,71,3,14,12,96,23,75,33,97,26,41,96,88,68,22,39,18,4,7,46,91,8,55,39,37,28,47,79,38,73,11,72,8,28,76,70,69,27,84,37,84,79,81,34,71,97,43,94,74,13,58,14,64,20,53,22,67,86,39,46,28,50,34,62,54,8,41,24,68,57,80,94,32,79,18,61,15,90,23,6,67,92,18,18,83,36,46,44,31,76,39,2,77,23,93,10,67,37,25,46,19,87,21,2,92,92,92,68,27,13,38,42,85,13,46,39,61,96,9,53,29,44,81,84,91,11,79,75,5,13,88,84,19,1,18,38,86,42,6,85,63,40,93,3,33,83,41,82,51,79,37,85,1,53,40,39,74,33,54,29,23,49,21,31,43,29,98,32,70,59,10,24,21,74,89,20,96,78,21,25,9,99,52,8,39,64,25,29,95,37,49,94,35,1,85,48,5,97,23,64,41,98,14,76,97,55,56,11,23,81,42,98,43,46,37,22,99,1,98,91,58,20,23,94,53,63,23,59,8,32,94,37,70,24,33,69,79,77,35,32,52,79,17,62,31,30,70,61,20,2,54,17,46,36,75,58,61,33,71,10,50,10,53,10,79,30,79,41,91,80,52,20,54,65,84,24,85,9,69,11,54,12,83,86,54,27,68,9,86,0,0,21,21,1,10,1,0,0,0,0,0,0`;
