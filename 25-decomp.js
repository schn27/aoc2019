function main() {
//0         addbase 4776

  setRoom_1424(3124);
//2         add 3124, 0, [base + 1]
//6         add 0, 13, [base + 0]
//10        jmp 1424
                                
  for (;;) {
    printMessage_1234(166); // "Command?"
//13        mul 1, 166, [base + 1]
//17        add 24, 0, [base + 0]
//21        jmp 1234

    readAndDoCommand_1984();
//24        mul 31, 1, [base + 0]
//28        jmp 1984

  }
//31        jmp 13
}

/*
34-40: 


== 
41-45:  ==

46-65: 

Doors here lead:

*/

let g_66 = new Array(3);

/*
70-75: north
76-80: east
81-86: south
87-91: west
92-105: 
Items here:

106-132: 
Items in your inventory:

133-165: 
You aren't carrying any items.

166-176: 
Command?

177-200: 
Unrecognized command.

201-225: 
You can't go that way.

226-257: 
You don't see that item here.

258-272: 
You take the 
273-300: 
You don't have that item.

301-315: 
You drop the 
316-376: 
The giant electromagnet is stuck to you.  You can't move!!

377-406: 
You take the infinite loop.

407-451: 
The molten lava is way too hot! You melt!


452-511: 
It is suddenly completely dark! You are eaten by a Grue!


512-547: 
You're launched into space! Bye!


548-686: 
A loud, robotic voice says "Alert! Droids on this ship are heavier than the detected value!" and you are ejected back to the checkpoint.

687-825: 
A loud, robotic voice says "Alert! Droids on this ship are lighter than the detected value!" and you are ejected back to the checkpoint.

826-1089: 
A loud, robotic voice says "Analysis complete! You may proceed." and you enter the cockpit.
Santa notices your small droid, looks puzzled for a moment, realizes what has happened, and radios your ship directly.
"Oh, hello! You should be able to get in by typing 
1090-1127:  on the keypad at the main airlock."
*/

let currentRoom_1128 = 0;
let stuck_1129 = 0;

////////////////////////////////////////////////////////////////////////////////////////////
function forEach_1130(ptr, n, elemSize, func) {
//1130      addbase 7

  for (let i = 0; i != n; ++i) {
//1132      add 0, 0, [base - 2]
//1136      eq  [base - 2], [base - 5], [base - 1]
//1140      jt  [base - 1], 1169

    func(ptr + i * elemSize, i);
//1143      mul [base - 2], [base - 4], [base + 1]
//1147      add [base + 1], [base - 6], [base + 1]
//1151      add 0, [base - 2], [base + 2]
//1155      add 0, 1162, [base + 0]
//1159      jmp [base - 3]

  }
//1162      add [base - 2], 1, [base - 2]
//1166      jmp 1136

}
//1169      addbase -7
//1171      jmp [base + 0]


////////////////////////////////////////////////////////////////////////////////////////////
function doMessage_1174(msg, func) {
//1174      addbase 6

  let length = msg[0];
//1176      mul [base - 5], 1, [1182]
//1180  y   add 0, [0], [base - 2]

// let i = 0; *** moved to for ***
//1184      mul 1, 0, [base - 3]

  ++msg;
//1188      add [base - 5], 1, [base - 5]

  for (let i = 0; i != length; ++i) {
//1192      eq  [base - 3], [base - 2], [base - 1]
//1196      jt  [base - 1], 1229

    func(msg[i], i, length);
//1199      add [base - 5], [base - 3], [1204]
//1203  x   add [0], 0, [base + 1]
//1207      mul 1, [base - 3], [base + 2]
//1211      mul [base - 2], 1, [base + 3]
//1215      add 1222, 0, [base + 0]
//1219      jmp [base - 4]

  }
//1222      add [base - 3], 1, [base - 3]
//1226      jmp 1192

}
//1229      addbase -6
//1231      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////
function printMessage_1234(msg) {
//1234      addbase 2

  doMessage_1174(msg, printMessageChar_1256)
//1236      mul [base - 1], 1, [base + 1]
//1240      mul 1256, 1, [base + 2]
//1244      add 1251, 0, [base + 0]
//1248      jmp 1174

}
//1251      addbase -2
//1253      jmp [base + 0]


////////////////////////////////////////////////////////////////////////////////////////////
function printMessageChar_1256(char, index, length) {
//1256      addbase 5

  out(char + index + length);
//1258      add [base - 4], [base - 3], [base - 1]
//1262      add [base - 2], [base - 1], [base - 1]
//1266      out [base - 1]

}
//1268      addbase -5
//1270      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////
function func_1273(arg0, arg1) {
//1273      addbase 3

  if (*arg0 == 0) {
    return;
  }
//1275      mul 1, [base - 2], [1280]
//1279  x   jf  [0], 1303

  out("- ");
//1282      out 45
//1284      out 32

  printMessage_1234(g_66[arg1]);
//1286      add [base - 1], 66, [1291]
//1290  x   mul [0], 1, [base + 1]
//1294      mul 1301, 1, [base + 0]
//1298      jmp 1234

  out("\n");
//1301      out 10

}
//1303      addbase -3
//1305      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////
let headerPrinted_1308 = 0;
let g_1309 = 0;

////////////////////////////////////////////////////////////////////////////////////////////
function printItems_1310(room) {
//1310      addbase 2

  g_1309 = room;
//1312      add [base - 1], 0, [1309]

  headerPrinted_1308 = 0;
//1316      add 0, 0, [1308]

  forEach_1130(items_4601, 13, 4, printItem_1353);
//1320      add 4601, 0, [base + 1]
//1324      add 13, 0, [base + 2]
//1328      add 0, 4, [base + 3]
//1332      add 0, 1353, [base + 4]
//1336      add 1343, 0, [base + 0]
//1340      jmp 1130

  return headerPrinted_1308;
//1343      add [1308], 0, [base - 1]

}
//1347      addbase -2
//1349      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////

const g_1352 = 57;

////////////////////////////////////////////////////////////////////////////////////////////
function printItem_1353(item, i) {
//1353      addbase 3

  if (item[0] != g_1309) {
    return;
  }
//1355      mul 1, [base - 2], [1360]
//1359      eq  [0], [1309], [base - 1]
//1363      jf  [base - 1], 1419

  if (headerPrinted_1308 == 0) {
//1366      jt  [1308], 1398

    headerPrinted_1308 = 1;
//1369      add 0, 1, [1308]

    printMessage_1234(g_1309 == -1 ? 106 : 92); // "Items in your inventory:" : "Items here:"
//1373      eq  [1309], -1, [base - 1]
//1377      jf  [base - 1], 1387
//1380      add 0, 106, [base + 1]
//1384      jmp 1391
//1387      add 92, 0, [base + 1]
//1391      mul 1398, 1, [base + 0]
//1395      jmp 1234
  }    

  out("- ");
//1398      out 45
//1400      out 32

  printMessage_1234(item[1]);
//1402      add [base - 2], 1, [1407]
//1406      mul [0], 1, [base + 1]
//1410      add 1417, 0, [base + 0]
//1414      jmp 1234

  out("\n");
//1417      out 10

}
//1419      addbase -3
//1421      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////
function setRoom_1424(room) {
//1424      addbase 3

  currentRoom_1128 = room;
//1426      mul 1, [base - 2], [1128]

  printMessage_1234(34); //"\n\n=="
//1430      mul 34, 1, [base + 1]
//1434      add 0, 1441, [base + 0]
//1438      jmp 1234

  printMessage_1234(currentRoom_1128[0]);
//1441      add [1128], 0, [1447]
//1445  y   add 0, [0], [base + 1]
//1449      add 1456, 0, [base + 0]
//1453      jmp 1234

  printMessage_1234(41); // " =="
//1456      add 41, 0, [base + 1]
//1460      add 0, 1467, [base + 0]
//1464      jmp 1234

  printMessage_1234(currentRoom_1128[1]);
//1467      add [1128], 1, [1472]
//1471  x   add [0], 0, [base + 1]
//1475      add 0, 1482, [base + 0]
//1479      jmp 1234

  printMessage_1234(46); // "\nDoors here lead:"
//1482      mul 1, 46, [base + 1]
//1486      add 1493, 0, [base + 0]
//1490      jmp 1234

  forEach_1130(currentRoom_1128 + 3, 4, 1, func_1273);
//1493      add [1128], 3, [base + 1]
//1497      add 4, 0, [base + 2]
//1501      mul 1, 1, [base + 3]
//1505      add 1273, 0, [base + 4]
//1509      mul 1516, 1, [base + 0]
//1513      jmp 1130

  printItems_1310(currentRoom_1128);
//1516      mul 1, [1128], [base + 1]
//1520      add 0, 1527, [base + 0]
//1524      jmp 1310

  if (currentRoom_1128[2] != 0) {
//1527      add [1128], 2, [1533]
//1531  y   mul 1, [0], [base - 1]
//1535      jf  [base - 1], 1545

    currentRoom_1128[2]();
//1538      add 1545, 0, [base + 0]
//1542      jmp [base - 1]

  }
}
//1545      addbase -3
//1547      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
let itemsWeightSum_1550 = 109;
let magicConstant_1551 = 0;
let checkResult_1552 = 99;

/////////////////////////////////////////////////////////////////////////////////////////////////
function checkWeight_1553() {
//1553      addbase 2

  itemsWeightSum_1550 = 0;
//1555      add 0, 0, [1550]

  forEach_1130(items_4601, 13, 4, addItemWeight_1664);
//1559      add 0, 4601, [base + 1]
//1563      add 13, 0, [base + 2]
//1567      mul 4, 1, [base + 3]
//1571      add 1664, 0, [base + 4]
//1575      mul 1, 1582, [base + 0]
//1579      jmp 1130

  magicConstant_1551 = g_2486 * g_1352; // 57 * 53 = 3021
//1582      mul [2486], [1352], [1551]

  checkResult_1552 = 0;
//1586      add 0, 0, [1552]

  func_2722(itemsWeightSum_1550, 33, func_1702);
//1590      mul 1, [1550], [base + 1]
//1594      mul 33, 1, [base + 2]
//1598      mul 1702, 1, [base + 3]
//1602      mul 1, 1609, [base + 0]
//1606      jmp 2722

  if (checkResult_1552 < 0) {
//1609      less    [1552], 0, [base - 1]
//1613      jt  [base - 1], 1630

    printMessage_1234(548); // "A loud, robotic voice says "Alert! Droids on this ship are heavier than the detected value!" and you are ejected back to the checkpoint."
//1630      mul 548, 1, [base + 1]
//1634      jmp 1641
//1641      add 1648, 0, [base + 0]
//1645      jmp 1234

    setRoom_1424(4457);
//1648      mul 4457, 1, [base + 1]
//1652      add 1659, 0, [base + 0]
//1656      jmp 1424

  } else if (checkResult_1552 > 0) {
//1616      less    0, [1552], [base - 1]
//1620      jt  [base - 1], 1637

    printMessage_1234(687); // "A loud, robotic voice says "Alert! Droids on this ship are lighter than the detected value!" and you are ejected back to the checkpoint."
//1637      add 687, 0, [base + 1]
//1641      add 1648, 0, [base + 0]
//1645      jmp 1234

    setRoom_1424(4457);
//1648      mul 4457, 1, [base + 1]
//1652      add 1659, 0, [base + 0]
//1656      jmp 1424

  } else {
    success_1752();
//1623      add 1630, 0, [base + 0]
//1627      jmp 1752

  }
}
//1659      addbase -2
//1661      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function addItemWeight_1664(item, i) {
//1664      addbase 4

//  i = -i; *** moved down ***
//1666      mul [base - 2], -1, [base - 2]

  if (item[0] != -1) {
    return;
  }
//1670      mul 1, [base - 3], [1675]
//1674  x   eq  [0], -1, [base - 1]
//1678      jf  [base - 1], 1697

  itemsWeightSum_1550 += item[2] - 27 - i;
//1681      add [base - 3], 2, [1687]
//1685  y   add -27, [0], [base - 3]
//1689      add [base - 3], [base - 2], [base - 3]
//1693      add [1550], [base - 3], [1550]

}
//1697      addbase -4
//1699      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1702(arg0, arg1) {
//1702      addbase 5

  if (checkResult_1552 != 0) {
    return;
  }
//1704      eq  [1552], 0, [base - 1]
//1708      jf  [base - 1], 1747

  let t = g_1901[arg1];
//1711      add [base - 3], 1901, [1716]
//1715  x   add [0], 0, [base - 2]

  if (arg0 == 0) {
//1719      jt  [base - 4], 1736

    if (t >= magicConstant_1551) {
//1722      less    [base - 2], [1551], [base - 1]
//1726      jt  [base - 1], 1747

      checkResult_1552 = -1;
//1729      mul -1, 1, [1552]
//1733      jmp 1747
    }

  } else { 
    if (t <= magicConstant_1551) {
//1736      less    [1551], [base - 2], [base - 1]
//1740      jt  [base - 1], 1747

      checkResult_1552 = 1;
//1743      add 1, 0, [1552]
    
    }
  }
}
//1747      addbase -5
//1749      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function success_1752() {
//1752      addbase 1

/* 
"A loud, robotic voice says \"Analysis complete! You may proceed.\" and you enter the cockpit.\n
Santa notices your small droid, looks puzzled for a moment, realizes what has happened, and radios your ship directly.\n
\"Oh, hello! You should be able to get in by typing"
*/
  printMessage_1234(826);
//1754      add 826, 0, [base + 1]
//1758      mul 1, 1765, [base + 0]
//1762      jmp 1234

  printCode_2863(itemsWeightSum_1550);
//1765      add 0, [1550], [base + 1]
//1769      add 1776, 0, [base + 0]
//1773      jmp 2863

  printMessage_1234(1090); // "on the keypad at the main airlock.\""
//1776      mul 1090, 1, [base + 1]
//1780      mul 1, 1787, [base + 0]
//1784      jmp 1234

  exit(0);
//1787      halt
//1788      jmp 1787

}
//1791      addbase -1
//1793      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1796() {
//1796      addbase 1

  printMessage_1234(512); // "You're launched into space! Bye!"
//1798      mul 1, 512, [base + 1]
//1802      add 0, 1809, [base + 0]
//1806      jmp 1234

  exit(0);
//1809      halt
//1810      jmp 1809

}
//1813      addbase -1
//1815      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1818() {
//1818      addbase 1

  stuck_1129 = 1;
//1820      mul 1, 1, [1129]

}
//1824      addbase -1
//1826      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1829() {
//1829      addbase 1

  for (;;) {
    printMessage_1234(377); // "You take the infinite loop."
//1831      add 377, 0, [base + 1]
//1835      mul 1842, 1, [base + 0]
//1839      jmp 1234

//1842      jmp 1831
  }

}
//1845      addbase -1
//1847      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1850() {
//1850      addbase 1

  printMessage_1234(407); // "The molten lava is way too hot! You melt!"
//1852      mul 407, 1, [base + 1]
//1856      add 0, 1863, [base + 0]
//1860      jmp 1234

  exit(0);
//1863      halt
//1864      jmp 1863

}
//1867      addbase -1
//1869      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function func_1872() {
//1872      addbase 1

  printMessage_1234(452); // "It is suddenly completely dark! You are eaten by a Grue!"
//1874      add 452, 0, [base + 1]
//1878      add 0, 1885, [base + 0]
//1882      jmp 1234

  exit(0);
//1885      halt
//1886      jmp 1885

}
//1889      addbase -1
//1891      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////

const commands_1894 = [1941, 1947, 1953, 1958, 1965, 1972, 1978];
// "drop", "east", "inv", "north", "south", "take", "west"

const g_1901 = [2903, 2775, 2855, 2861, 2984, 2705, 2372, 2870, 3115, 2890, 2439, 3057, 2725, 3004, 2387, 3041, 2741, 2550, 2590, 3047, 2482, 2598, 2745, 2809, 2335, 2994, 2418, 2415, 2915, 2578, 2399, 2861, 2656];

/////////////////////////////////////////////////////////////////////////////////////////////////

const cmdHandlers_1934 = [doDrop_2281, doEast_2468, doInv_2418, doNorth_2450, doSouth_2487, doTake_2125, doWest_2505];

/*
1941: drop 
1947: east

1953: inv

1958: north

1965: south

1972: take 
1978: west

*/

/////////////////////////////////////////////////////////////////////////////////////////////////
function readAndDoCommand_1984() {
//1984      addbase 3

  readInput_2634();
//1986      mul 1, 1993, [base + 0]
//1990      jmp 2634

  if (stuck_1129 != 0) {
//1993      jf  [1129], 2010

    printMessage_1234(316); // "The giant electromagnet is stuck to you.  You can't move!!"
//1996      mul 1, 316, [base + 1]
//2000      add 0, 2007, [base + 0]
//2004      jmp 1234

    return;
//2007      jmp 2076
  }

  for (let i = 0; i < 7; ++i) {  
//2010      mul 0, 1, [base - 1]

    if (compareInputWithMessage_2525(commands_1894[i], 0, 0); != 0) {
//2014      add [base - 1], 1894, [2020]
//2018  y   add 0, [0], [base + 1]
//2022      add 0, 0, [base + 2]
//2026      mul 0, 1, [base + 3]
//2030      mul 1, 2037, [base + 0]
//2034      jmp 2525
//2037      jf  [base + 1], 2054

      cmdHandlers_1934[i]();
//2040      add [base - 1], 1934, [2050]
//2044      add 2051, 0, [base + 0]
//2048  y   jmp [1940]

      return;
//2051      jmp 2076

    }
  }
//2054      add [base - 1], 1, [base - 1]
//2058      less    [base - 1], 7, [base - 2]
//2062      jt  [base - 2], 2014

}
//2076      addbase -3
//2078      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function goToDoor_2081(door) {
//2081      addbase 3

  setRoom_1424(currentRoom_1128[door]);
//2083      add [1128], [base - 2], [2088]
//2087  x   mul [0], 1, [base - 1]
//2091      jt  [base - 1], 2108
//2108      mul 1, [base - 1], [base + 1]
//2112      mul 2119, 1, [base + 0]
//2116      jmp 1424

}
//2119      addbase -3
//2121      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////

let itemWasTaken_2124 = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////
function doTake_2125() {
//2125      addbase 1

  itemWasTaken_2124 = 0;
//2127      add 0, 0, [2124]

  forEach_1130(items_4601, 13, 4, takeItem_2173);
//2131      add 0, 4601, [base + 1]
//2135      mul 1, 13, [base + 2]
//2139      add 4, 0, [base + 3]
//2143      add 0, 2173, [base + 4]
//2147      mul 2154, 1, [base + 0]
//2151      jmp 1130

  if (itemWasTaken_2124 == 0) {
//2154      jt  [2124], 2168

    printMessage_1234(226); // "You don't see that item here."
//2157      mul 226, 1, [base + 1]
//2161      add 2168, 0, [base + 0]
//2165      jmp 1234
  }

}
//2168      addbase -1
//2170      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function takeItem_2173(item, i) {
//2173      addbase 3

  if (itemWasTaken_2124 != 0 || item[0] != currentRoom_1128) {
    return;
  }
//2175      jt  [2124], 2275
//2178      add [base - 2], 0, [2183]
//2182  x   eq  [0], [1128], [base - 1]
//2186      jf  [base - 1], 2275

  if (compareInputWithMessage_2525(item[1], 5, 1) == 0) {
    return;
  }
//2189      add [base - 2], 1, [2194]
//2193  x   mul [0], 1, [base - 1]
//2197      add 0, [base - 1], [base + 1]
//2201      add 0, 5, [base + 2]
//2205      add 0, 1, [base + 3]
//2209      add 0, 2216, [base + 0]
//2213      jmp 2525
//2216      jf  [base + 1], 2275

  printMessage_1234(258); // "You take the "
//2219      add 0, 258, [base + 1]
//2223      add 2230, 0, [base + 0]
//2227      jmp 1234

  printMessage_1234(item[1]);
//2230      add 0, [base - 1], [base + 1]
//2234      mul 1, 2241, [base + 0]
//2238      jmp 1234

  out(".\n");
//2241      out 46
//2243      out 10

  itemWasTaken_2124 = 1;
//2245      mul 1, 1, [2124]

  item[0] = -1;
//2249      add [base - 2], 0, [2256]
//2253  z   add -1, 0, [0]

  if (item[3] != 0) {
    item[3]();
  }
//2257      add [base - 2], 3, [2263]
//2261  y   add 0, [0], [base - 1]
//2265      jf  [base - 1], 2275
//2268      mul 1, 2275, [base + 0]
//2272      jmp [base - 1]

}
//2275      addbase -3
//2277      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////

let itemWasDropped_2280 = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////
function doDrop_2281() {
//2281      addbase 1

  itemWasDropped_2280 = 0;
//2283      mul 0, 1, [2280]

  forEach_1130(items_4601, 13, 4, dropItem_2329);
//2287      mul 1, 4601, [base + 1]
//2291      add 13, 0, [base + 2]
//2295      add 4, 0, [base + 3]
//2299      add 0, 2329, [base + 4]
//2303      mul 2310, 1, [base + 0]
//2307      jmp 1130

  if (itemWasDropped_2280 == 0) {
//2310      jt  [2280], 2324

    printMessage_1234(273); // "You don't have that item."
//2313      add 273, 0, [base + 1]
//2317      add 2324, 0, [base + 0]
//2321      jmp 1234
  
  }
}
//2324      addbase -1
//2326      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function dropItem_2329(item, i) {
//2329      addbase 3

  if (itemWasDropped_2280 != 0) {
    return;
  }
//2331      jt  [2280], 2413

  if (item[0] != -1) {
    return;
  }
//2334      add [base - 2], 0, [2339]
//2338  x   eq  [0], -1, [base - 1]
//2342      jf  [base - 1], 2413

  if (compareInputWithMessage_2525(item[1], 5, 1) == 0) {
    return;
  }
//2345      add [base - 2], 1, [2350]
//2349  x   add [0], 0, [base - 1]
//2353      add [base - 1], 0, [base + 1]
//2357      mul 5, 1, [base + 2]
//2361      add 1, 0, [base + 3]
//2365      add 2372, 0, [base + 0]
//2369      jmp 2525
//2372      jf  [base + 1], 2413

  printMessage_1234(301); // "You drop the "
//2375      add 301, 0, [base + 1]
//2379      add 2386, 0, [base + 0]
//2383      jmp 1234

  printMessage_1234(item[1]);
//2386      add [base - 1], 0, [base + 1]
//2390      add 0, 2397, [base + 0]
//2394      jmp 1234

  out(".\n");
//2397      out 46
//2399      out 10

  itemWasDropped_2280 = 1;
//2401      add 0, 1, [2280]

  item[0] = currentRoom_1128;
//2405      add [base - 2], 0, [2412]
//2409  z   add [1128], 0, [0]

}
//2413      addbase -3
//2415      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function doInv_2418() {
//2418      addbase 1

  if (printItems_1310(-1) == 0) {
//2420      add -1, 0, [base + 1]
//2424      mul 2431, 1, [base + 0]
//2428      jmp 1310
//2431      jt  [base + 1], 2445

    printMessage_1234(133); // "You aren't carrying any items."
//2434      add 0, 133, [base + 1]
//2438      mul 1, 2445, [base + 0]
//2442      jmp 1234

  }
}
//2445      addbase -1
//2447      jmp [base + 0]


/////////////////////////////////////////////////////////////////////////////////////////////////
function doNorth_2450() {
//2450      addbase 1

  goToDoor_2081(3);
//2452      add 0, 3, [base + 1]
//2456      mul 1, 2463, [base + 0]
//2460      jmp 2081

}
//2463      addbase -1
//2465      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function doEast_2468() {
//2468      addbase 1

  goToDoor_2081(4);
//2470      mul 1, 4, [base + 1]
//2474      add 2481, 0, [base + 0]
//2478      jmp 2081

}
//2481      addbase -1
//2483      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////////

const g_2486 = 53;

////////////////////////////////////////////////////////////////////////////////////////////////
function doSouth_2487() {
//2487      addbase 1

  goToDoor_2081(5);
//2489      add 5, 0, [base + 1]
//2493      add 0, 2500, [base + 0]
//2497      jmp 2081

}
//2500      addbase -1
//2502      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////////
function doWest_2505() {
//2505      addbase 1

  goToDoor_2081(6);
//2507      add 0, 6, [base + 1]
//2511      mul 2518, 1, [base + 0]
//2515      jmp 2081

}
//2518      addbase -1
//2520      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////////

let inputBufferOffset_2523 = 0;
let compareResult_2524 = 0;

////////////////////////////////////////////////////////////////////////////////////////////////
function compareInputWithMessage_2525(msg, ofs, flag) {
//2525      addbase 5

  inputBufferOffset_2523 = ofs;
//2527      add 0, [base - 3], [2523]

  compareResult_2524 = 1;
//2531      add 1, 0, [2524]

  doMessage_1174(msg, compareMessageChar_2585);
//2535      add 0, [base - 4], [base + 1]
//2539      mul 1, 2585, [base + 2]
//2543      mul 2550, 1, [base + 0]
//2547      jmp 1174

  if (flag != 0 && input_buffer_3094[ofs + msg[0]] != -1) {
//2550      jf  [base - 2], 2576    
//2553      mul [base - 4], 1, [2558]
//2557  x   add [0], [base - 3], [2566]
//2561      add 3094, [2566], [2566]
//2565  x   eq  [0], -1, [base - 1]
//2569      jt  [base - 1], 2576

    compareResult_2524 = 0;
//2572      add 0, 0, [2524]
    
  }
   
  return compareResult_2524;
//2576      mul [2524], 1, [base - 4]

}
//2580      addbase -5
//2582      jmp [base + 0]

////////////////////////////////////////////////////////////////////////////////////////////////
function compareMessageChar_2585(char, index, length) {
//2585      addbase 5

  char = char + index + length;
//2587      add [base - 4], [base - 3], [base - 4]
//2591      add [base - 4], [base - 2], [base - 4]

  if (char == "\n") {
//2595      eq  [base - 4], 10, [base - 1]
//2599      jf  [base - 1], 2606

    char = -1;
//2602      mul -1, 1, [base - 4]

  }

  if (char != input_buffer_3094[index + inputBufferOffset_2523]) {
//2606      add [base - 3], [2523], [2616]
//2610      add [2616], 3094, [2616]
//2614  y   add 0, [0], [base - 1]
//2618      eq  [base - 4], [base - 1], [base - 1]
//2622      jt  [base - 1], 2629

    compareResult_2524 = 0;
//2625      mul 1, 0, [2524]

  }
}
//2629      addbase -5
//2631      jmp [base + 0]

/////////////////////////////////////////////////////////////////////////////////////////////////
function readInput_2634() {
//2634      addbase 4

  forEach_1130(input_buffer_3094, 30, 1, setToMinusOne_2706);
//2636      mul 1, 3094, [base + 1]
//2640      mul 30, 1, [base + 2]
//2644      add 1, 0, [base + 3]
//2648      add 0, 2706, [base + 4]
//2652      mul 2659, 1, [base + 0]
//2656      jmp 1130

  for (let i = 0;; ++i) {
//2659      add 0, 0, [base - 3]

    let c = in();
//2663      in  [base - 2]

    if (c == "\n") {
      return;
    }
//2665      eq  [base - 2], 10, [base - 1]
//2669      jt  [base - 1], 2701

    if (c < 0) {
      continue;
    }
//2672      less    [base - 2], 0, [base - 1]
//2676      jt  [base - 1], 2663

    if (i < 29) {
//2679      less    [base - 3], 29, [base - 1]
//2683      jf  [base - 1], 2663

      input_buffer_3094[i] = c;
//2686      add 3094, [base - 3], [2693]
//2690  z   mul [base - 2], 1, [0]

    }
//2694      add [base - 3], 1, [base - 3]

  }
//2698      jmp 2663

}
//2701      addbase -4
//2703      jmp [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////
function setToMinusOne_2706(ptr) {
//2706      addbase 2

  *ptr = -1;
//2708      mul 1, [base - 1], [2715]
//2712  z   mul 1, -1, [0]

}
//2716      addbase -2
//2718      jmp [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////
let func1702ptr_2721 = 0;

///////////////////////////////////////////////////////////////////////////////////////////////
function func_2722(sumW, arg1, func) {
//2722      addbase 5

  func1702ptr_2721 = func;
//2724      mul 1, [base - 2], [2721]

  if (sumW < 0) {
//2728      less    [base - 4], 0, [base - 1]
//2732      jf  [base - 1], 2739

    sumW = 0;
//2735      add 0, 0, [base - 4]

  }

  func_2763(sumW, arg1, 1);
//2739      mul [base - 4], 1, [base + 1]
//2743      mul 1, [base - 3], [base + 2]
//2747      add 1, 0, [base + 3]
//2751      mul 2758, 1, [base + 0]
//2755      jmp 2763

}
//2758      addbase -5
//2760      jmp [base + 0]


///////////////////////////////////////////////////////////////////////////////////////////////
function func_2763(arg0, arg1, arg2) {
//2763      addbase 6

  if (arg1 < 1 && arg0 < arg2) {
//2765      less    [base - 4], 1, [base - 1]
//2769      jf  [base - 1], 2786
//2772      less    [base - 5], [base - 3], [base - 1]
//2776      jf  [base - 1], 2786

    return arg0;
//2779      add 0, [base - 5], [base - 5]
//2783      jmp 2858

  }

  arg0 = func_2763(arg0, arg1 - 1, arg2 * 2);
//2786      mul 1, [base - 5], [base + 1]
//2790      add [base - 4], -1, [base + 2]
//2794      mul [base - 3], 2, [base + 3]
//2798      mul 1, 2805, [base + 0]
//2802      jmp 2763
//2805      mul 1, [base + 1], [base - 5]

  let t = 1;
//2809      mul 1, 1, [base - 2]

  if (arg0 < arg2) {
//2813      less    [base - 5], [base - 3], [base - 1]
//2817      jf  [base - 1], 2824

    t = 0;
//2820      mul 0, 1, [base - 2]

  }

  arg2 = arg2 * t;
//2824      mul [base - 3], [base - 2], [base - 3]

  if (arg1 > 0) {
//2828      less    0, [base - 4], [base - 1]
//2832      jf  [base - 1], 2850

    (*func1702ptr_2721)(t, arg1 - 1);
//2835      mul 1, [base - 2], [base + 1]
//2839      add [base - 4], -1, [base + 2]
//2843      add 0, 2850, [base + 0]
//2847      jmp [2721]

  }

  return arg0 - arg2;
//2850      mul [base - 3], -1, [base - 3]
//2854      add [base - 5], [base - 3], [base - 5]

}
//2858      addbase -6
//2860      jmp [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////

function printCode_2863(sumW) {
//2863      addbase 3

  if (sumW != 0) {
//2865      eq  [base - 2], 0, [base - 1]
//2869      jt  [base - 1], 2902

    if (sumW < 0) {
//2872      less    [base - 2], 0, [base - 1]
//2876      jt  [base - 1], 2882
//2879      jmp 2888

      out("-");
//2882      out 45

      sumW = -sumW;
//2884      mul [base - 2], -1, [base - 2]

    }

    printDecimalNumber_2909(sumW);
//2888      mul 1, [base - 2], [base + 1]
//2892      add 0, 2899, [base + 0]
//2896      jmp 2909
//2899      jmp 2904
  
  } else {
    out("0");
//2902      out 48
  
  }
}
//2904      addbase -3
//2906      jmp [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////

function printDecimalNumber_2909(value) {
//2909      addbase 4

  let [a, b] = func_3010(value, 10);
//2911      mul 1, [base - 3], [base + 1]
//2915      add 0, 10, [base + 2]
//2919      add 2926, 0, [base + 0]
//2923      jmp 3010
//2926      mul 1, [base + 1], [base - 2]
//2930      add 0, [base + 2], [base - 1]

  if (a != 0) {
//2934      jf  [base - 2], 2948

    printDecimalNumber_2909(a);
//2937      mul [base - 2], 1, [base + 1]
//2941      add 0, 2948, [base + 0]
//2945      jmp 2909

  }

  out(b + '0');
//2948      add 48, [base - 1], [base - 1]
//2952      out [base - 1]

}
//2954      addbase -4
//2956      jmp [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////

const pow2_2959 = [1<<0, 1<<1, ..., 1<<50];

///////////////////////////////////////////////////////////////////////////////////////////////

function func_3010(arg0, arg1) {
//3010      addbase 8

  let t4 = 0;
//3012      add 0, 0, [base - 4]

  let t3 = 0;
//3016      mul 1, 0, [base - 3]

  let t2 = 51;
//3020      add 51, 0, [base - 2]

  do {
    --t2;
//3024      add [base - 2], -1, [base - 2]

    let t1 = pow2_2959[t2];
//3028      add [base - 2], 2959, [3034]
//3032  y   mul 1, [0], [base - 1]

    t3 *= 2;
//3036      mul [base - 3], 2, [base - 3]

    if (arg0 >= t1) {
//3040      less    [base - 7], [base - 1], [base - 5]
//3044      jt  [base - 5], 3059

      ++t3;
//3047      add [base - 3], 1, [base - 3]

      arg0 -= t1; 
//3051      mul -1, [base - 1], [base - 5]
//3055      add [base - 7], [base - 5], [base - 7]

    }

    if (t3 >= arg1) {
//3059      less    [base - 3], [base - 6], [base - 5]
//3063      jt  [base - 5], 3078

      t3 -= arg1;
//3066      mul -1, [base - 6], [base - 5]
//3070      add [base - 3], [base - 5], [base - 3]

      t4 += t1;
//3074      add [base - 1], [base - 4], [base - 4]

    }
  } while (t2 != 0);
//3078      jt  [base - 2], 3024

  return [t4, t3];
//3081      add [base - 4], 0, [base - 7]
//3085      add [base - 3], 0, [base - 6]

}
//3089      addbase -8
//3091      jf  0, [base + 0]

///////////////////////////////////////////////////////////////////////////////////////////////

let input_buffer_3094 = new Array(30);

///////////////////////////////////////////////////////////////////////////////////////////////

/* 

==== ROOMS ====================================================================================

      name  desc clb   N   E    S     W
        |     |   |    |   |    |     |
3124: 3131, 3143, 0, 3252, 0, 3321, 3417
3131: Hull Breach
3143: You got in through a hole in the floor here. To keep your ship from also freezing, the hole has been sealed.

3252: 3259, 3280, 0, 0, 0, 3124, 0
3259: Gift Wrapping Center
3280: How else do you wrap presents on the go?

3321: 3328, 3339, 0, 3124, 3614, 3492, 0
3328: Navigation
3339: Status: Stranded. Please supply measurements from fifty stars to recalibrate.

3417: 3424, 3436, 0, 0, 3124, 0, 3549
3424: Science Lab
3436: You see evidence here of prototype polymer design work.

3492: 3499, 3513, 0, 3321, 0, 0, 3866
3499: Crew Quarters
3513: The beds are all too small for you.

3549: 3556, 3579, 0, 0, 3417, 3925, 3656
3556: Warp Drive Maintenance
3579: It appears to be working normally.

3614: 3621, 3629, 0, 0, 0, 3777, 3321
3621: Kitchen
3629: Everything's freeze-dried.

3656: 3663, 3675, 0, 0, 3549, 3727, 0
3663: Engineering
3675: You see a whiteboard with plans for Springdroid v2.

3727: 3734, 3742, 0, 3656, 3980, 0, 0
3734: Stables
3742: Reindeer-sized. They're all empty.

3777: 3784, 3793, 0, 3614, 0, 4132, 0
3784: Sick Bay
3793: Supports both Red-Nosed Reindeer medicine and regular reindeer medicine.

3866: 3873, 3896, 0, 4365, 3492, 0, 0
3873: Hot Chocolate Fountain
3896: Somehow, it's still working.

3925: 3932, 3939, 0, 3549, 0, 0, 0
3932: Arcade
3939: None of the cabinets seem to have power.

3980: 3987, 3996, 0, 0, 4196, 4052, 3727
3987: Passages
3996: They're a little twisty and starting to look all alike.

4052: 4059, 4071, 0, 3980, 0, 0, 0
4059: Observatory
4071: There are a few telescopes; they're all bolted down, though.

4132: 4139, 4147, 0, 3777, 0, 0, 0
4139: Storage
4147: The boxes just contain more boxes.  Recursively.

4196: 4203, 4212, 0, 0, 4292, 0, 3980
4203: Corridor
4212: The metal walls and the metal floor are slightly different colors. Or are they?

4292: 4299, 4308, 0, 0, 0, 0, 4196
4299: Holodeck
4308: Someone seems to have left it on the Giant Grid setting.

4365: 4372, 4380, 0, 4457, 0, 3866, 0
4372: Hallway
4380: This area has been optimized for something; you're just not quite sure what.

4457: 4464, 4484, 0, 4556, 0, 4365, 0
4464: Security Checkpoint
4484: In the next room, a pressure-sensitive floor will verify your identity.

4556: 4563, 4588, checkWeight_1553, 0, 0, 4457, 0
4563: Pressure-Sensitive Floor
4588: Analyzing...
*/

///////////////////////////////////////////////////////////////////////////////////////////////

//  room    name    weight      clb
const items_4601 = [
    [4052,  4653,   27,         func_1850], 
    [3549,  4665,   540,        0], 
    [4132,  4673,   262173,     0], 
    [3417,  4683,   8222,       0], 
    [3727,  4688,   2079,       0], 
    [3925,  4699,   131104,     0], 
    [3866,  4708,   33,         func_1829], 
    [3614,  4722,   33554466,   0], 
    [4365,  4728,   35,         func_1818], 
    [3321,  4748,   16777252,   0], 
    [3980,  4753,   37,         func_1872], 
    [3656,  4761,   38,         func_1796],
    [4292,  4772,   2097191,    0]
];

/*
4653: molten lava
4665: pointer
4673: hypercube
4683: cake
4688: tambourine
4699: monolith
4708: infinite loop
4722: mouse
4728: giant electromagnet
4748: coin
4753: photons
4761: escape pod
4772: mug
*/
