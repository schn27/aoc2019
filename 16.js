"use strict";

function calc() {
	const list = input.split("").map(Number);

	const part1 = getFft([...list], 100).slice(0, 8).join("");

	let list2 = [];
	for (let i = 0; i < 10000; ++i) {
		list2.push(...list);
	}

	const offset = +list2.slice(0, 7).join("");
	const part2 = getFftHack(list2, 100, offset).slice(offset, offset + 8).join("");

	return part1 + " " + part2;
}

function getFftPhase(list) {
	const res = [];

	for (let p = 0; p < list.length; ++p) {
		let sum = 0;

		let sign = 1;
		const n = p + 1;
		let j = 0;
		
		for (let i = p; i < list.length; ++i) {
			sum += (sign == 1) ? list[i % list.length] : -list[i % list.length];
			if (++j == n) {
				j = 0;
				sign = -sign;
				i += n;
			}
		}

		res.push(Math.abs(sum) % 10);
	}

	return res;	
}

function getFft(list, n) {
	for (let i = 0; i < n; ++i) {
		list = getFftPhase(list);
	}

	return list;
}

function getFftHack(list, n, offset) {
	if (offset < list.length / 2) {
		return undefined;
	}

	for (let i = 0; i < n; ++i) {
		let sum = list[list.length - 1];
		for (let p = list.length - 2; p >= list.length / 2; --p) {
			sum += list[p];
			list[p] = sum % 10;
		}
	}

	return list;
}

const input = `59754835304279095723667830764559994207668723615273907123832849523285892960990393495763064170399328763959561728553125232713663009161639789035331160605704223863754174835946381029543455581717775283582638013183215312822018348826709095340993876483418084566769957325454646682224309983510781204738662326823284208246064957584474684120465225052336374823382738788573365821572559301715471129142028462682986045997614184200503304763967364026464055684787169501819241361777789595715281841253470186857857671012867285957360755646446993278909888646724963166642032217322712337954157163771552371824741783496515778370667935574438315692768492954716331430001072240959235708`;
