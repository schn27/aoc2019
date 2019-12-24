"use strict";

function calc() {
	const part1 = getPermutations([0, 1, 2, 3, 4]).reduce((s, e) => Math.max(s, getOutput(input, e)), 0);
	const part2 = getPermutations([5, 6, 7, 8, 9]).reduce((s, e) => Math.max(s, getOutput2(input, e)), 0);
	return part1 + " " + part2;
}

function getPermutations(atoms) {
	const fact = (n) => {
		let result = n;
		while (--n > 1) {
			result *= n;
		}
		return result;	
	};

	let res = [];

	for (let index = 0, total = fact(atoms.length); index < total; ++index) {
		let src = atoms.slice();
		let dest = [];

		for (let i = 0, j = index; i < atoms.length; ++i) {
			const item = j % src.length;
			j = Math.floor(j / src.length);
			dest.push(src[item]);
			src.splice(item, 1);
		}

		res.push(dest);
	}

	return res;
}

function getOutput(text, phases) {
	let output = 0;

	for (let i = 0; i < phases.length; ++i) {
		const amp = new IntCode(text, [phases[i], output]);
		amp.run();
		output = amp.output[0];
	}

	return output;
}

function getOutput2(text, phases) {
	const amps = phases.map(p => new IntCode(text, [p]));
	amps[0].input.push(0);

	while (amps[amps.length - 1].running) {
		for (let i = 0; i < amps.length; ++i) {
			if (amps[i].running) {
				amps[i].output = [];
				amps[i].run();
			}

			if (amps[i].output.length > 0) {
				amps[(i + 1) % amps.length].input.push(amps[i].output[0]);
			}
		}
	}

	return amps[amps.length - 1].output[0];
}

function IntCode(text, input) {
	const m = text.split(",").map(Number).reduce((o, e, i) => (o[i] = e, o), {});
	let ip = 0;

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
	const opHalt = 99;

	this.get = (a, mode) => {
		if (mode == 0) {
			return m[a] || 0;
		} else if (mode == 1) {
			return a;
		} else {
			return 0;
		}
	}

	this.set = (a, mode, value) => {
		if (mode == 0) {
			m[a] = value;
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

			} else if (opcode == opHalt) {
				this.running = false;
				break;

			} else {
				ip += 1;	// invalid opcode
			}
		}
	}
}

const input = `3,8,1001,8,10,8,105,1,0,0,21,38,55,64,81,106,187,268,349,430,99999,3,9,101,2,9,9,1002,9,2,9,101,5,9,9,4,9,99,3,9,102,2,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,1001,9,4,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99`;
