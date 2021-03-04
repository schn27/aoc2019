"use strict";

function calc() {
	const commands = input.split("\n").map(l => [
		l.match(/(new)|(cut)|(increment)/g)[0],
		(l.match(/-?\d+/g) || [0]).map(Number)[0]
	]);

	return getPart1(commands) + " " + getPart2(commands);
}

function getPart1(commands) {
	const size = 10007;
	const [a, b] = getTotalTransformLinearForm(commands, size);
	return (2019 * a + b) % size;
}

function getPart2(commands) {
	let size = 119315717514047;
	const repeat = BigInt(101741582076661);

	let [a, b] = getTotalTransformLinearForm(commands, size);
	[a, b] = [BigInt(a), BigInt(b)];

	console.log(a, b);
	
	let [c, d] = [BigInt(1), BigInt(0)];

	size = BigInt(size);
	
	for (let k = repeat; k > 0; k >>= 1n) {
		if (k & 1n) {
			[c, d] = [(a * c) % size, (a * d + b) % size];
		}

		[a, b] = [(a * a) % size, (a * b + b) % size];
	}

	console.log(c, d);

	return ((size + BigInt(2020) - d) % size) * invMod(c, size) % size;
}

function getTotalTransformLinearForm(commands, size) {
	return commands.reduce(([a, b], [cmd, n]) => {
		switch (cmd) {
		case "new":
			a = -a;
			b = -b - 1;
			break;
		case "cut":
			b -= n;
			break;
		case "increment":
			a *= n;
			b *= n;
			break;
		}

		return [(size + a) % size, (size + b) % size];
	}, [1, 0]);
}

// https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/ 
function invMod(a, m) { 
	if (m == 1n) {
	   return 0n;
	}

	let m0 = m;
	let x0 = 0n;
	let x1 = 1n;

	while (a > 1n) {
		const q = BigInt(Math.floor(Number(a / m)));
		[a, m] = [m, a % m];
		[x0, x1] = [x1 - q * x0, x0];
	}

	if (x1 < 0n) {
	   x1 += m0;
	}

	return x1;
}

const input = `cut 8808
deal with increment 59
deal into new stack
deal with increment 70
cut -5383
deal with increment 4
deal into new stack
cut 9582
deal with increment 55
cut -355
deal with increment 61
deal into new stack
cut -6596
deal with increment 8
cut 4034
deal with increment 37
cut -8183
deal with increment 16
cut 9529
deal with increment 24
cut -7751
deal with increment 15
cut -8886
deal with increment 17
deal into new stack
cut -1157
deal with increment 74
cut -6960
deal with increment 49
cut 9032
deal with increment 47
cut 8101
deal with increment 59
cut -8119
deal with increment 35
cut -2017
deal with increment 10
cut -4431
deal with increment 47
cut 5712
deal with increment 18
cut 4424
deal with increment 69
cut 5382
deal with increment 40
cut -4266
deal with increment 58
cut -8911
deal with increment 24
cut 8231
deal with increment 74
cut -2055
deal into new stack
cut -1308
deal with increment 31
deal into new stack
deal with increment 18
cut 4815
deal with increment 5
deal into new stack
cut 1044
deal with increment 75
deal into new stack
deal with increment 13
cut 177
deal into new stack
deal with increment 28
cut 5157
deal with increment 31
deal into new stack
cut -8934
deal with increment 50
cut 4183
deal with increment 50
cut 1296
deal with increment 5
cut -5162
deal with increment 52
deal into new stack
cut -5207
deal with increment 30
cut -2767
deal with increment 71
deal into new stack
cut 5671
deal with increment 67
cut 4818
deal with increment 35
cut 9234
deal with increment 58
cut -8832
deal with increment 72
cut 1289
deal with increment 55
cut -8444
deal into new stack
deal with increment 19
cut -5512
deal with increment 29
cut 3680`;
