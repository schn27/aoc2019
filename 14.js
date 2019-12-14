"use strict";

function calc() {
	const reactions = input.split("\n")
			.map(s => 
					s.match(/\d+|[A-Z]+/g)
					.map((e, i, a) => (i & 1) ? {name: e, qty: +a[i - 1]} : null)
					.filter(e => e != null))
			.reduce((m, s) => {
				m[s[s.length - 1].name] = {qty: s[s.length - 1].qty, from: s.slice(0, s.length - 1)};
				return m;
			}, {});

	const part1 = getOre(reactions, "FUEL", 1);

	const part2 = getMaxFuel(reactions, 1000000000000);

	return part1 + " " + part2;
}

function getOre(reactions, name, qty) {
	let ore = 0;
	const inv = {};

	const produce = (n, q) => {
		inv[n] = inv[n] || 0;

		if (q <= inv[n]) {
			inv[n] -= q;
		} else {
			q -= inv[n];
			inv[n] = 0;

			const mul = Math.ceil(q / reactions[n].qty);

			inv[n] += reactions[n].qty * mul - q;

			ore += mul * reactions[n].from.filter(e => e.name == "ORE").reduce((s, e) => s + e.qty, 0);

			reactions[n].from.filter(e => e.name != "ORE").forEach(e => produce(e.name, mul * e.qty));
		}
	}

	produce(name, qty);

	return ore;
}

function getMaxFuel(reactions, ores) {
	const oresForOneFuel = getOre(reactions, "FUEL", 1);
	let fuel = Math.floor(ores / oresForOneFuel);

	let delta = Math.floor((ores - getOre(reactions, "FUEL", fuel)) / oresForOneFuel);

	while (Math.abs(delta) > 0) {
		fuel += delta;

		const used = getOre(reactions, "FUEL", fuel);
		
		if (used == ores) {
			return fuel;
		}

		if (Math.sign(ores - used) != Math.sign(delta)) {
			delta = -Math.sign(delta) * Math.floor(Math.abs(delta) / 2);
		}
	}

	return getOre(reactions, "FUEL", fuel) <= ores ? fuel : fuel - 1;
}

const input = `4 QBQB, 2 NTLZ => 2 DPJP
5 SCSDX, 3 WBLBS => 5 GVPG
128 ORE => 1 WCQS
14 LHMZ => 2 SWBFV
5 NZJV, 1 MCLXC => 2 BSRT
1 WJHZ => 6 HRZV
5 SPNML, 1 QTVZL => 6 HBGD
1 BSRT, 1 JRBM, 1 GVPG => 2 XVDQT
10 CBQSB => 6 NRXGX
6 TBFQ => 7 QPXS
1 LKSVN => 1 FBFC
39 CBQSB => 7 PSLXZ
3 HBGD, 4 RCZF => 4 ZCTS
2 BMDV, 6 DPJP => 1 RCZF
1 GPBXP, 11 SWBFV, 12 XSBGR, 7 ZCLVG, 9 VQLN, 12 HRZV, 3 VLDVB, 3 QTVZL, 12 DVSD, 62 PSLXZ => 1 FUEL
10 CFPG, 1 TBFQ => 3 NHKZB
24 QLMJ => 1 SCSDX
2 VKHZC => 1 SMLPV
3 SMLPV, 11 NZJV, 1 HTSXK => 2 GPBXP
1 SCKB => 3 TBFQ
3 VKHZC, 2 XVDQT => 6 PHJH
3 QBQB => 3 XHWH
19 NHKZB, 3 MBQVK, 10 HTSXK, 2 GXVQG, 8 VKHZC, 1 XHWH, 1 RCZF => 5 ZCLVG
1 GVPG => 4 QTVZL
4 TMHMV => 7 LHMZ
5 NRXGX, 9 NTLZ, 3 PSLXZ => 1 BMDV
10 MCLXC => 3 VKHZC
1 KTLR => 1 VLDVB
5 HTSXK => 6 TMHMV
5 LKSVN, 1 CGQHF, 11 WJHZ => 1 HGZC
15 XHWH, 1 WBLBS => 4 NZJV
3 MCLXC => 9 KTLR
1 CBQSB => 1 SCKB
140 ORE => 4 LKSVN
2 NZJV, 8 XVDQT, 1 PHJH => 8 GXVQG
21 NJXV, 1 XHWH, 12 TMHMV, 1 QPXS, 10 ZCTS, 3 TBFQ, 1 VLDVB => 7 DVSD
4 QLMJ, 2 LKSVN => 1 NTLZ
1 LKSVN => 4 QBQB
1 SPNML, 3 CPBQ => 4 BKLPC
2 CFPG => 5 MCLXC
147 ORE => 7 CGQHF
7 HGZC, 5 QLMJ => 3 CFPG
3 LCLQV, 3 MLXGB, 1 NTLZ => 8 JRBM
4 NHWG => 5 GPQN
2 XHWH => 7 WBLBS
7 CGFN, 2 RCZF, 13 NHWG, 1 VLDVB, 3 PHJH, 9 CBQSB => 9 XSBGR
181 ORE => 7 WJHZ
8 WJHZ => 9 CBQSB
3 BTQWK, 8 BKLPC => 2 CGFN
3 SCSDX => 3 NJXV
6 JTBM, 23 GPQN => 1 VQLN
23 MCLXC, 1 NTLZ => 7 SPNML
1 SPNML => 2 JTBM
1 BMDV => 7 HTSXK
1 WBLBS => 9 NHWG
4 FBFC, 1 LKSVN, 4 VKHZC => 7 CPBQ
1 WCQS => 7 QLMJ
1 BMDV, 2 DPJP => 6 MBQVK
3 XHWH, 5 QLMJ => 4 LCLQV
1 CBQSB, 2 PSLXZ => 2 MLXGB
3 NHWG => 9 BTQWK`;
