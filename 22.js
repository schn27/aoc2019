"use strict";

function calc() {
	const commands = input.split("\n").map(l => {
		const res = [];
		res.push(l.match(/(new)|(cut)|(increment)/g)[0]);
		res.push((l.match(/-?\d+/g) || [0]).map(Number)[0]);
		return res;
	});


	const stackSize1 = 10007;
	const c1 = getTotalTransformLinearForm(commands, stackSize1);

	const part1 = (2019 * c1[0] + c1[1]) % stackSize1;

	const stackSize2 = 119315717514047;
	const repeat = 101741582076661;

	const c2 = getTotalTransformLinearForm(commands, stackSize2);
	
	let k = repeat;
	let g = [1, 0];
	
	while (k > 0) {
		if (k & 1) {
			g[1] = (g[1] + g[0] * c2[1]) % stackSize2;
			g[0] = (g[0] * c2[0]) % stackSize2;
		}

		k >>= 1;

		c2[1] = (c2[1] + c2[0] * c2[1]) % stackSize2;
		c2[0] = (c2[0] * c2[0]) % stackSize2;
	}

	console.log(c2);

	const part2 = (((stackSize2 + 2020 - g[1]) % stackSize2) * invMod(g[0], stackSize2)) % stackSize2;

	return part1 + " " + part2;
}

function getTotalTransformLinearForm(commands, m) {
	const [a, b] = commands.reduce((a, e) => {
		const [cmd, n] = e;
		switch (cmd) {
			case "new":
				a[0] = -a[0];
				a[1] = -a[1] - 1;
				break;
			case "cut":
				a[1] -= n;
				break;
			default:
				a[0] *= n;
				a[1] *= n;
				break;
		}

		return [(m + a[0]) % m, (m + a[1]) % m];
	}, [1, 0]);

	return [a, b];
}

function invMod(a, m) {
	return 108781389266234;
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
