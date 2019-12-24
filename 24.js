"use strict";

function calc() {
	let state = input.split("\n").join("").split("");

	const track = {};

	for (let gen = 0;; ++gen) {
		if (track[state] != undefined) {
			break;
		}

		track[state] = gen;
		state = getNext(state);
	}

	const part1 = getRating(state);

	return part1 + " " + undefined;
}

function getNext(state) {
	const size = 5;
	let [x, y] = [0, 0];

	return state.map(c => {
		const l = x > 0 ? state[y * size + x - 1] : ".";
		const r = x < size - 1 ? state[y * size + x + 1] : ".";
		const u = y > 0 ? state[(y - 1) * size + x] : ".";
		const d = y < size - 1 ? state[(y + 1) * size + x] : ".";
		const n = [l, r, u, d].filter(c => c == "#").length;

		if (++x >= size) {
			x = 0;
			++y;
		}

		return (c == "#" && n != 1) ? "." : (c == "." && (n == 1 || n == 2) ? "#" : c);
	});
}

function getRating(state) {
	return state.reduce((s, e, i) => s + (e == "#" ? (1 << i) : 0), 0);
}

const test = `....#
#..#.
#..##
..#..
#....`;

const input = `##.#.
.#.##
.#...
#..#.
.##..`;
