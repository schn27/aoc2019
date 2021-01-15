"use strict";

const GRID_SIZE = 5;

function calc() {
	let state1 = new Set();
	let state2 = new Set();

	input.split("\n").forEach((line, r) => line.split("").forEach((e, c) => {
		if (e == "#") {
			state1.add([r, c].join(":"));
			state2.add([r, c, 0].join(":"));
		}
	}));

	const track = new Set();

	for (;;) {
		const stateStr = Array.from(state1).sort().join(";");

		if (track.has(stateStr)) {
			break;
		}

		track.add(stateStr);
		state1 = getNextState(state1, getNeighbors1);
	}

	const part1 = Array.from(state1).reduce((s, e) => {
		const [r, c] = e.split(":").map(Number);
		return s + (1 << (c + r * GRID_SIZE));
	}, 0);

	for (let gen = 1; gen <= 200; ++gen) {
		state2 = getNextState(state2, getNeighbors2);
	}

	const part2 = state2.size;

	return part1 + " " + part2;
}

function getNextState(state, getNeighbors) {
	const newState = new Set();

	const candidates = new Set(state);
	state.forEach(k => getNeighbors(k).forEach(e => candidates.add(e)));

	candidates.forEach(k => {
		const n = getNeighbors(k).filter(k => state.has(k)).length;

		if ((state.has(k) && (n == 1)) || (!state.has(k) && (n == 1 || n == 2))) {
			newState.add(k);
		}
	});

	return newState;
}

function getNeighbors1(k) {
	const [r, c] = k.split(":").map(Number);

	const neighbors = [[r, c - 1], [r - 1, c], [r, c + 1], [r + 1, c]];

	return neighbors.filter(e => e[0] >= 0 && e[0] < GRID_SIZE && e[1] >= 0 && e[1] < GRID_SIZE)
					.map(e => e.join(":"));
}

function getNeighbors2(k) {
	const [r, c, z] = k.split(":").map(Number);

	let neighbors = [[r, c - 1, z], [r - 1, c, z], [r, c + 1, z], [r + 1, c, z]];

	const isOuter = e => e[0] < 0 || e[1] < 0 || e[0] >= GRID_SIZE || e[1] >= GRID_SIZE;
	const isInner = e => e[0] == 2 && e[1] == 2;

	let outer = neighbors.filter(isOuter).map(e => {
		const zz = z - 1;

		if (e[0] < 0) {
			return [1, 2, zz];
		} else if (e[0] >= GRID_SIZE) {
			return [3, 2, zz];
		} else if (e[1] < 0) {
			return [2, 1, zz];
		} else if (e[1] >= GRID_SIZE) {
			return [2, 3, zz];
		}
	});

	let inner = neighbors.find(isInner);

	if (inner) {
		const zz = z + 1;

		if (r == 2 && c == 1) {
			const cc = 0;
			inner = [[0, cc, zz], [1, cc, zz], [2, cc, zz], [3, cc, zz], [4, cc, zz]];
		} else if (r == 1 && c == 2) {
			const rr = 0;
			inner = [[rr, 0, zz], [rr, 1, zz], [rr, 2, zz], [rr, 3, zz], [rr, 4, zz]];
		} else if (r == 2 && c == 3) {
			const cc = GRID_SIZE - 1;
			inner = [[0, cc, zz], [1, cc, zz], [2, cc, zz], [3, cc, zz], [4, cc, zz]];
		} else if (r == 3 && c == 2) {
			const rr = GRID_SIZE - 1;
			inner = [[rr, 0, zz], [rr, 1, zz], [rr, 2, zz], [rr, 3, zz], [rr, 4, zz]];
		}

	} else {
		inner = [];
	}

	neighbors = [...neighbors.filter(e => !isOuter(e) && !isInner(e)), ...outer, ...inner];

	return neighbors.map(e => e.join(":"));
}

const input = `##.#.
.#.##
.#...
#..#.
.##..`;
