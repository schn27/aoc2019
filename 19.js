"use strict";

function calc() {
	const getBeamLine = (x, y, maxX) => {
		let width = 0;
		let x0 = 0;

		for (let inside = false; (width == 0) && (x < maxX || maxX == undefined); ++x) {
			const drone = new IntCode(input, [x, y]);
			drone.run();

			if (drone.output[0] == 1) {
				if (!inside) {
					inside = true;
					x0 = x;
				}
			} else if (inside) {
				inside = false;
				width = x - x0;
			}
		}

		return [x0, width];
	}
	
	let part1 = 0;
	let x0 = 0;
	let width = 0;

	for (let y = 0; y < 50; ++y) {
		[x0, width] = getBeamLine(x0, y, 50);
		part1 += width;
	}
	
	let part2 = 0;
	const queue = [];

	for (let y = Math.floor(50 / width * 100);; ++y) {
		[x0, width] = getBeamLine(x0, y);
		queue.push([x0, width]);

		if (queue.length == 100) {
			const [x0Up, widthUp] = queue.shift();
			if (x0 + 99 < x0Up + widthUp) {

				part2 = x0 * 10000 + (y - 99);
				break;
			}
		}
	}

	return part1 + " " + part2;
}

function IntCode(text, input) {
	const m = text.split(",").map(Number).reduce((o, e, i) => (o[i] = e, o), {});
	let ip = 0;
	let base = 0;

	this.input = input || [];
	this.output = [];
	this.running = true;

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

	this.get = (a, mode) => {
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

	this.set = (a, mode, value) => {
		if (mode == 0) {
			m[a] = value;
		} else if (mode == 2) {
			m[a + base] = value;
		}
	}

	this.run = () => {
		for (;;) {
			const [op, x, y, z] = [m[ip] || 0, m[ip + 1] || 0, m[ip + 2] || 0, m[ip + 3] || 0];
			const opcode = op % 100;
			const modeX = Math.floor(op / 100) % 10;
			const modeY = Math.floor(op / 1000) % 10;
			const modeZ = Math.floor(op / 10000) % 10;
			
			if (opcode == opAdd) {
				this.set(z, modeZ, this.get(x, modeX) + this.get(y, modeY));
				ip += 4;

			} else if (opcode == opMul) {
				this.set(z, modeZ, this.get(x, modeX) * this.get(y, modeY));
				ip += 4;

			} else if (opcode == opIn) {
				if (this.input.length == 0) {
					break;
				}

				this.set(x, modeX, this.input.shift());
				ip += 2;

			} else if (opcode == opOut) {
				this.output.push(this.get(x, modeX));
				ip += 2;

			} else if (opcode == opJumpIfTrue) {;
				if (this.get(x, modeX) != 0) {
					ip = this.get(y, modeY);
				} else {
					ip += 3;
				}

			} else if (opcode == opJumpIfFalse) {
				if (this.get(x, modeX) == 0) {
					ip = this.get(y, modeY);
				} else {
					ip += 3;
				}

			} else if (opcode == opLessThan) {
				this.set(z, modeZ, this.get(x, modeX) < this.get(y, modeY) ? 1 : 0);
				ip += 4;

			} else if (opcode == opEquals) {
				this.set(z, modeZ, this.get(x, modeX) == this.get(y, modeY) ? 1 : 0);
				ip += 4;

			} else if (opcode == opRelBase) {
				base += this.get(x, modeX);
				ip += 2;

			} else if (opcode == opHalt) {
				this.running = false;
				break;

			} else {
				ip += 1;	// invalid opcode
			}
		}
	}
}

const input = `109,424,203,1,21102,11,1,0,1105,1,282,21101,18,0,0,1106,0,259,2101,0,1,221,203,1,21101,0,31,0,1105,1,282,21101,0,38,0,1106,0,259,21001,23,0,2,21202,1,1,3,21102,1,1,1,21102,57,1,0,1105,1,303,2101,0,1,222,21002,221,1,3,20101,0,221,2,21101,259,0,1,21101,0,80,0,1105,1,225,21102,198,1,2,21102,91,1,0,1106,0,303,1201,1,0,223,21002,222,1,4,21101,0,259,3,21102,225,1,2,21102,225,1,1,21102,1,118,0,1106,0,225,21001,222,0,3,21101,0,140,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,1,148,0,1106,0,259,2101,0,1,223,21002,221,1,4,21002,222,1,3,21101,0,24,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,1,195,0,106,0,108,20207,1,223,2,21001,23,0,1,21102,1,-1,3,21102,1,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,21202,-3,1,1,22101,0,-2,2,21202,-1,1,3,21102,1,250,0,1105,1,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22101,0,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22102,1,-2,3,21101,0,343,0,1105,1,303,1106,0,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,1,384,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2105,1,0`;
