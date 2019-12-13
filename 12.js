"use strict";

function calc() {
	const objects = input.split("\n").filter(e => e != null).map(o => o.match(/-?\d+/g).map(Number));
	objects.forEach(o => o.push(0, 0, 0));

	const part1 = getPart1(objects);

	const periods = [];

	for (let c = 0; c < 3; ++c) {
		const x = getPeriod(objects, c);
		periods.push(x);
	}

	const part2 = getLcmN(periods);

	return part1 + " " + part2;
}

function getPart1(objects) {
	objects = [...objects].map(o => [...o]);

	for (let s = 0; s < 1000; ++s) {
		step(objects);
	}

	let res = 0;

	for (let i = 0; i < objects.length; ++i) {
		const o = objects[i].map(e => Math.abs(e));
		const pot = o[0] + o[1] + o[2];
		const kin = o[3] + o[4] + o[5];
		res += pot * kin;
	}

	return res;
}

function getPeriod(objects, c) {
	objects = [...objects].map(o => [...o]);

	const key = () => objects.map(o => o[c]).join(":") + ":" + objects.map(o => o[c + 3]).join(":");
	const history = {};

	for (let i = 0; ; ++i) {
		if (history[key()] == undefined) {
			history[key()] = i;
		} else {
			return i - history[key()];
		}

		step(objects);
	}
}

function step(objects) {
	for (let i = 0; i < objects.length - 1; ++i) {
		for (let j = i; j < objects.length; ++j) {
			const o1 = objects[i];
			const o2 = objects[j];

			for (let k = 0; k < 3; ++k) {
				if (o1[k] < o2[k]) {
					o1[k + 3] += 1;
					o2[k + 3] -= 1;
				}

				if (o1[k] > o2[k]) {
					o1[k + 3] -= 1;
					o2[k + 3] += 1;
				}
			}
		}
	}

	for (let i = 0; i < objects.length; ++i) {
		const o = objects[i];
		o[0] += o[3];
		o[1] += o[4];
		o[2] += o[5];
	}
}

function getLcmN(nums) {
	let res = getLcm(nums[0], nums[1]);

	for (let i = 2; i < nums.length ; ++i) {
		res = getLcm(res, nums[i]);
	}

	return res;
}

function getLcm(x, y) {
	return (!x || !y) ? 0 : Math.abs((x * y) / getGcd(x, y));
}

function getGcd(x, y) {
	x = Math.abs(x);
	y = Math.abs(y);
	
	while (y) {
		const t = y;
		y = x % y;
		x = t;
	}

	return x;
}

const test = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

const input = `<x=14, y=4, z=5>
<x=12, y=10, z=8>
<x=1, y=7, z=-10>
<x=16, y=-5, z=3>`;
