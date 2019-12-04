"use strict";

function calc() {
	const [min, max] = input.match(/\d+/g).map(Number);

	let part1 = 0;
	let part2 = 0;

	for (let n = min; n <= max; ++n) {
		if (isPwd(n, false)) {
			++part1;
		}

		if (isPwd(n, true)) {
			++part2;
		}
	}

	return part1 + " " + part2;
}

function isPwd(n, part2) {
	let prev = 0;
	let dec = false;
	let double = false;
	let large = false;
	let same = 1;

	n.toString().split("").forEach(c => {
		dec |= +c < prev;

		if (+c == prev) {
			++same;
		} else {
			double |= same == 2;
			large |= same > 2;
			same = 1;
		}

		prev = +c;
	});

	double |= same == 2;
	large |= same > 2;

	return !dec && (part2 ? double : (double || large));
}

const input = `172851-675869`;
