"use strict";

function calc() {
	const comp1 = new IntCode(input);
	comp1.set(1, 12);
	comp1.set(2, 2);
	comp1.run();
	const part1 = comp1.get(0);

	const part2 = (target) => {
		for (let noun = 0; noun < 100; ++noun) {
			for (let verb = 0; verb < 100; ++verb) {
				const comp2 = new IntCode(input);
				comp2.set(1, noun);
				comp2.set(2, verb);
				comp2.run();

				if (comp2.get(0) == target) {
					return 100 * noun + verb;
				}
			}
		}

		return -1;	
	}

	return part1 + " " + part2(19690720);
}

function IntCode(text) {
	const m = text.split(",").map(Number).reduce((o, e, i) => (o[i] = e, o), {});
	let ip = 0;

	const opAdd = 1;
	const opMul = 2;
	const opHalt = 99;

	this.get = (a) => m[a];
	this.set = (a, v) => m[a] = v;

	this.run = () => {
		for (;;) {
			const [opcode, x, y, z] = [m[ip] || 0, m[ip + 1] || 0, m[ip + 2] || 0, m[ip + 3] || 0];
			
			if (opcode == opAdd) {
				this.set(z, this.get(x) + this.get(y));
				ip += 4;

			} else if (opcode == opMul) {
				this.set(z, this.get(x) * this.get(y));
				ip += 4;

			} else if (opcode == opHalt) {
				break;

			} else {
				ip += 1;	// invalid opcode
			}
		}
	}
}

const input = `1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,2,9,19,23,2,23,10,27,1,6,27,31,1,31,6,35,2,35,10,39,1,39,5,43,2,6,43,47,2,47,10,51,1,51,6,55,1,55,6,59,1,9,59,63,1,63,9,67,1,67,6,71,2,71,13,75,1,75,5,79,1,79,9,83,2,6,83,87,1,87,5,91,2,6,91,95,1,95,9,99,2,6,99,103,1,5,103,107,1,6,107,111,1,111,10,115,2,115,13,119,1,119,6,123,1,123,2,127,1,127,5,0,99,2,14,0,0`;
