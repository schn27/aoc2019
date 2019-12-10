"use strict";

function calc() {
	const map = input.split("\n").map(s => s.split(""));

	let maxAsteroids = 0;
	let coords = [];

	for (let h = 0; h < map.length; ++h) {
		for (let w = 0; w < map[h].length; ++w) {
			if (map[h][w] == "#") {
				const asteroids = Object.keys(getAnglesFrom(map, h, w)).length;
				if (asteroids > maxAsteroids) {
					maxAsteroids = asteroids;
					coords = [h, w];
				}
			}
		}
	}

	console.log(coords);

	const part1 = maxAsteroids;

	const astrAngles = getAnglesFrom(map, coords[0], coords[1]);
	const angles = Object.keys(astrAngles).sort((a1, a2) => a1 - a2);

	let angleIndex = 0;
	for (let i = 1; i < 200; ++i) {
		console.log(i, astrAngles[angles[angleIndex]].shift());
		while (astrAngles[angles[++angleIndex]].length == 0) {} 
	}

	const target200 = astrAngles[angles[angleIndex]][0];

	const part2 = target200[0] + 100 * target200[1];

	return part1 + " " + part2;
}

function getAnglesFrom(map, h0, w0) {
	const angles = {};

	map.forEach((r, h) => r.forEach((e, w) => {
		if (e == "#" && (w != w0 || h != h0)) {
			let a = Math.atan2(w - w0, h0 - h);
			a = a < 0 ? a + Math.PI * 2 : a;
			angles[a] = angles[a] || [];
			angles[a].push([h, w]);
		}
	}));

	Object.keys(angles).forEach(a => angles[a].sort((e1, e2) => 
		Math.abs(e1[0] - h0) + Math.abs(e1[1] - w0) - Math.abs(e2[0] - h0) - Math.abs(e2[1] - w0)));

	return angles;
}

const input = `.###..#######..####..##...#
########.#.###...###.#....#
###..#...#######...#..####.
.##.#.....#....##.#.#.....#
###.#######.###..##......#.
#..###..###.##.#.#####....#
#.##..###....#####...##.##.
####.##..#...#####.#..###.#
#..#....####.####.###.#.###
#..#..#....###...#####..#..
##...####.######....#.####.
####.##...###.####..##....#
#.#..#.###.#.##.####..#...#
..##..##....#.#..##..#.#..#
##.##.#..######.#..#..####.
#.....#####.##........#####
###.#.#######..#.#.##..#..#
###...#..#.#..##.##..#####.
.##.#..#...#####.###.##.##.
...#.#.######.#####.#.####.
#..##..###...###.#.#..#.#.#
.#..#.#......#.###...###..#
#.##.#.#..#.#......#..#..##
.##.##.##.#...##.##.##.#..#
#.###.#.#...##..#####.###.#
#.####.#..#.#.##.######.#..
.#.#####.##...#...#.##...#.`;
