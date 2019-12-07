"use strict";

function calc() {
	const m = input.split(",").map(Number);

	const part1 = getPermutations([0, 1, 2, 3, 4]).reduce((s, e) => Math.max(s, getOutput(m, e)), 0);
	const part2 = getPermutations([5, 6, 7, 8, 9]).reduce((s, e) => Math.max(s, getOutput2(m, e)), 0);

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

function getOutput(m, phases) {
	let output = 0;

	for (let i = 0; i < phases.length; ++i) {
		const state = {m: [...m], input: [phases[i], output], ip: 0, output: []};
		run(state);
		output = state.output[0];
	}

	return output;
}

function getOutput2(m, phases) {
	const states = phases.map(p => ({m: [...m], input: [p], ip: 0, output: []}));
	states[0].input.push(0);

	while (states[states.length - 1].ip >= 0) {
		for (let i = 0; i < states.length; ++i) {
			if (states[i].ip >= 0) {
				states[i].output = [];
				run(states[i]);
			}

			if (states[i].output.length > 0) {
				states[(i + 1) % states.length].input.push(states[i].output[0]);
			}
		}
	}

	return states[states.length - 1].output[0];
}

function run(state) {
	const m = state.m;
	let ip = state.ip;
	const input = state.input;
	const output = state.output;

	const opAdd = 1;
	const opMul = 2;
	const opIn = 3;
	const opOut = 4;
	const opJumpIfTrue = 5;
	const opJumpIfFalse = 6;
	const opLessThan = 7;
	const opEquals = 8
	const opHalt = 99;

	while (ip < m.length) {
		let [op, x, y, z] = m.slice(ip, ip + 4);
		const opcode = op % 100;
		const modeX = Math.floor(op / 100) % 10;
		const modeY = Math.floor(op / 1000) % 10;
		const modeZ = Math.floor(op / 10000) % 10;

		const get = (a, mode) => !mode ? m[a] : a;
		
		let size = 1;

		if (opcode == opAdd) {
			size = 4;
			m[z] = get(x, modeX) + get(y, modeY);
		} else if (opcode == opMul) {
			size = 4;
			m[z] = get(x, modeX) * get(y, modeY);
		} else if (opcode == opIn) {
			if (input.length == 0) {
				break;
			}

			size = 2;
			m[x] = input.shift();
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
			m[z] = get(x, modeX) < get(y, modeY) ? 1 : 0;
		} else if (opcode == opEquals) {
			size = 4;
			m[z] = get(x, modeX) == get(y, modeY) ? 1 : 0;
		} else if (opcode == opHalt) {
			ip = -1;
			break;
		}

		ip += size;
	}

	state.ip = ip;
	return state;
}

const input = `3,8,1001,8,10,8,105,1,0,0,21,38,55,64,81,106,187,268,349,430,99999,3,9,101,2,9,9,1002,9,2,9,101,5,9,9,4,9,99,3,9,102,2,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,1001,9,4,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99`;
