// === display ===

g.col = Uint16Array([0, 8, 31, 0xce9b, 0x001D, 0x3299, 2220, 0x0F6A, 0xce9b, 0x0F6A, 0x00ff, 0xfff, 0xf00, 0xff000, 0x07FF, 65535]);
g.setCol = (c, v) => { g.setColor(g.col[v]); };
g.isOn = true;

// === eW object === 

global.ew = { "face": {}, "sys": {}, "apps": {}, "dbg": 0, "logger": {}, "notify": {}, "log": [], "def": {}, "is": {}, "comm": {}, "tid": {}, "pin": {}, UI: {} };
ew.pin = { BAT: D3, CHRG: D23, BUZZ: D19, BUZ0: 1, BL: D8, i2c: { SCL: D34, SDA: D33 }, touch: { SCL: D34, SDA: D33, RST: D35, INT: D36, SLP: 0xE5 }, disp: { CS: D5, DC: D6, RST: D7, BL: D8 }, acc: { SDA: D37, SLC: D38, INT: D39 } };
//Bangle.setOptions({ wakeOnTouch: 0, lockTimeout: 0, backlightTimeout: 0, wakeOnBTN1: 0, wakeOnTwist: 0, wakeOnFaceUp: 0, powerSave: 1, btnLoadTimeout: 5000 });
//Bangle.setLocked(0);
ew.is.maxTx = 8;


// === font support ===

const font1 = atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAA/AAAAAAAAH/AAAAAAAA//AAAAAAAP//AAAAAAB///AAAAAAP///AAAAAB////AAAAAf////AAAAD////4AAAAf////AAAAH////4AAAA////+AAAAA////wAAAAA///+AAAAAA///gAAAAAA//8AAAAAAA//gAAAAAAA/4AAAAAAAA/AAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////gD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4B/gH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/wB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/wB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAH+AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

const width1 = atob("ERkmHyYmJiYmJCYmEQ==");


Graphics.prototype.setFontLECO1976Regular42 = function (scale) {
  // Actual height 42 (41 - 0)
  g.setFontCustom(
    font1, //atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAA/AAAAAAAAH/AAAAAAAA//AAAAAAAP//AAAAAAB///AAAAAAP///AAAAAB////AAAAAf////AAAAD////4AAAAf////AAAAH////4AAAA////+AAAAA////wAAAAA///+AAAAAA///gAAAAAA//8AAAAAAA//gAAAAAAA/4AAAAAAAA/AAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAH/AAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA//h////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////gD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4AAAH/AAA/4B/gH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAA////wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAAAAB/wAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA////x//AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/wB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/4B////AAA/wB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA//gAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA/4AAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA////wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA/4B/wH/AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAP+AAH/AAAAH+AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
    46,
    width1, //atob("ERkmHyYmJiYmJCYmEQ=="),
    60 + (scale << 8) + (1 << 16)
  );
};

const font2 = atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/nA/+cD/5wP/nAAAAAAAAPwAA/gAD+AAPwAAAAAD+AAP4AA/gAAAAAAAAAAAAAcOAP//A//8D//wP//AHDgAcOAP//A//8D//wP//AHDgAAAAAAAAH/jgf+OB/44H/jj8OP/w4//Dj/8OPxw/4HD/gcP+Bw/4AAAAAAAP+AA/8AD/wQOHHA4c8D//wP/8A//gAD4AAfAAH/8A//wP//A84cDjhwIP/AA/8AB/wAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA4f8Dh/wOH/A4f8ABwAAAAAAAAD8AAP4AA/gAD8AAAAAAAAAAAEAAD+AB//A///v/D//gB/wABwAAAAAADgAA/wAf/4P8///wf/4AP8AAOAAAAAAAAAyAAHcAAPwAD/gAP/AA/8AA/AAH8AAMwAAAAAAAAAAAAADgAAOAAA4AAf8AD/wAP/AA/8AAOAAA4AADgAAAAAAAAAAD8AAfwAB/AAD8AAAAAAAADgAAOAAA4AADgAAOAAA4AADgAAAAAAAAAADgAAOAAA4AADgAAAAAAAAABwAB/AA/8A//gP/gA/wADwAAIAAAAAAD//wP//A//8D//wOAHA4AcDgBwOAHA//8D//wP//A//8AAAAAAAA4AcDgBwOAHA//8D//wP//A//8AABwAAHAAAcAAAAAAAA+f8D5/wPn/A+f8DhxwOHHA4ccDhxwP/HA/8cD/xwP/HAAAAAAAAOAHA4AcDhxwOHHA4ccDhxwOHHA4ccD//wP//A//8D//wAAAAAAAD/wAP/AA/8AD/wAAHAAAcAABwAAHAA//8D//wP//A//8AAAAAAAA/98D/3wP/fA/98DhxwOHHA4ccDhxwOH/A4f8Dh/wOH/AAAAAAAAP//A//8D//wP//A4ccDhxwOHHA4ccDh/wOH/A4f8Dh/wAAAAAAAD4AAPgAA+AADgAAOAAA4AADgAAP//A//8D//wP//AAAAAAAAP//A//8D//wP//A4ccDhxwOHHA4ccD//wP//A//8D//wAAAAAAAD/xwP/HA/8cD/xwOHHA4ccDhxwOHHA//8D//wP//A//8AAAAAAAAOA4A4DgDgOAOA4AAAAAAAAOA/A4H8DgfwOA/AAAAAAAAB4AAPwAA/AAD8AAf4ABzgAPPAA8cAHh4AAAAAAAAAAAAHHAAccABxwAHHAAccABxwAHHAAccABxwAHHAAAAAAAAAOHAA4cADzwAPPAAf4AB/gAD8AAPwAAeAAB4AAAAAAAAA+AAD4AAPgAA+ecDh9wOH3A4fcDhwAP/AA/8AD/wAP/AAAAAAAAAP//4///j//+P//44ADjn/OOf845/zjnHOP8c4//zj//OP/84AAAAAAAP//A//8D//wP//A4cADhwAOHAA4cAD//wP//A//8D//wAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA//8D//wP9/A/j8AAAAAAAA//8D//wP//A//8DgBwOAHA4AcDgBwOAHA4AcDgBwOAHAAAAAAAAP//A//8D//wP//A4AcDgBwOAHA8A8D//wH/+AP/wAf+AAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA4ccDhxwOAHA4AcAAAAAAAA//8D//wP//A//8DhwAOHAA4cADhwAOHAA4cADgAAOAAAAAAD//wP//A//8D//wOAHA4ccDhxwOHHA4f8Dh/wOH/A4f8AAAAAAAA//8D//wP//A//8ABwAAHAAAcAABwAP//A//8D//wP//AAAAAAAAP//A//8D//wP//AAAAAAAAOAHA4AcDgBwOAHA4AcDgBwOAHA//8D//wP//A//8AAAAAAAA//8D//wP//A//8AHwAA/AAP8AB/wAPn/A8f8DB/wIH/AAAAAAAAP//A//8D//wP//AAAcAABwAAHAAAcAABwAAHAAAAAAAAP//A//8D//wP//Af8AAP+AAH/AAD8AAHwAD/AB/wAf8AP+AA//8D//wP//AAAAAAAAP//A//8D//wP//AfwAAfwAAfwAAfwAAfwP//A//8D//wAAAAAAAAAAAP//A//8D//wP//A4AcDgBwOAHA4AcD//wP//A//8D//wAAAAAAAD//wP//A//8D//wOHAA4cADhwAOHAA/8AD/wAP/AA/8AAAAAP//A//8D//wP//A4AcDgBwOAHA4AcD//+P//4///j//+AAA4AADgAAAP//A//8D//wP//A4eADh+AOH8A4f4D/3wP/HA/8MD/wQAAAAAAAD/xwP/HA/8cD/xwOHHA4ccDhxwOHHA4f8Dh/wOH/A4f8AAAAAAAA4AADgAAOAAA//8D//wP//A//8DgAAOAAA4AADgAAAAAA//8D//wP//A//8AABwAAHAAAcAABwP//A//8D//wP//AAAADAAAPgAA/wAD/4AB/8AA/8AAfwAB/AA/8Af+AP/AA/wAD4AAMAAA4AAD+AAP/gA//8AH/wAB/AAf8Af/wP/4A/4AD/gAP/4AH/8AB/wAB/AB/8D//wP/gA/gADgAAIABA4AcDwDwPw/Afn4Af+AA/wAD/AA//AH5+A/D8DwDwOAHAgAEAAAAP/AA/8AD/wAP/AAAf8AB/wAH/AAf8D/wAP/AA/8AD/wAAAAAAAADh/wOH/A4f8Dh/wOHHA4ccDhxwOHHA/8cD/xwP/HA/8cAAAAAAAAf//9///3///f//9wAA3AADcAAMAAAOAAA/gAD/wAH/8AB/8AA/wAAPAAAEAAAAHAADcAANwAB3///f//9///wAA");
const width2 = atob("BwYLDg4UDwYJCQwMBgkGCQ4MDg4ODg4NDg4GBgwMDA4PDg4ODg4NDg4GDQ4MEg8ODQ8ODgwODhQODg4ICQg=");

Graphics.prototype.setFontLECO1976Regular22 = function (scale) {
  // Actual height 22 (21 - 0)
  g.setFontCustom(
    font2, //atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/nA/+cD/5wP/nAAAAAAAAPwAA/gAD+AAPwAAAAAD+AAP4AA/gAAAAAAAAAAAAAcOAP//A//8D//wP//AHDgAcOAP//A//8D//wP//AHDgAAAAAAAAH/jgf+OB/44H/jj8OP/w4//Dj/8OPxw/4HD/gcP+Bw/4AAAAAAAP+AA/8AD/wQOHHA4c8D//wP/8A//gAD4AAfAAH/8A//wP//A84cDjhwIP/AA/8AB/wAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA4f8Dh/wOH/A4f8ABwAAAAAAAAD8AAP4AA/gAD8AAAAAAAAAAAEAAD+AB//A///v/D//gB/wABwAAAAAADgAA/wAf/4P8///wf/4AP8AAOAAAAAAAAAyAAHcAAPwAD/gAP/AA/8AA/AAH8AAMwAAAAAAAAAAAAADgAAOAAA4AAf8AD/wAP/AA/8AAOAAA4AADgAAAAAAAAAAD8AAfwAB/AAD8AAAAAAAADgAAOAAA4AADgAAOAAA4AADgAAAAAAAAAADgAAOAAA4AADgAAAAAAAAABwAB/AA/8A//gP/gA/wADwAAIAAAAAAD//wP//A//8D//wOAHA4AcDgBwOAHA//8D//wP//A//8AAAAAAAA4AcDgBwOAHA//8D//wP//A//8AABwAAHAAAcAAAAAAAA+f8D5/wPn/A+f8DhxwOHHA4ccDhxwP/HA/8cD/xwP/HAAAAAAAAOAHA4AcDhxwOHHA4ccDhxwOHHA4ccD//wP//A//8D//wAAAAAAAD/wAP/AA/8AD/wAAHAAAcAABwAAHAA//8D//wP//A//8AAAAAAAA/98D/3wP/fA/98DhxwOHHA4ccDhxwOH/A4f8Dh/wOH/AAAAAAAAP//A//8D//wP//A4ccDhxwOHHA4ccDh/wOH/A4f8Dh/wAAAAAAAD4AAPgAA+AADgAAOAAA4AADgAAP//A//8D//wP//AAAAAAAAP//A//8D//wP//A4ccDhxwOHHA4ccD//wP//A//8D//wAAAAAAAD/xwP/HA/8cD/xwOHHA4ccDhxwOHHA//8D//wP//A//8AAAAAAAAOA4A4DgDgOAOA4AAAAAAAAOA/A4H8DgfwOA/AAAAAAAAB4AAPwAA/AAD8AAf4ABzgAPPAA8cAHh4AAAAAAAAAAAAHHAAccABxwAHHAAccABxwAHHAAccABxwAHHAAAAAAAAAOHAA4cADzwAPPAAf4AB/gAD8AAPwAAeAAB4AAAAAAAAA+AAD4AAPgAA+ecDh9wOH3A4fcDhwAP/AA/8AD/wAP/AAAAAAAAAP//4///j//+P//44ADjn/OOf845/zjnHOP8c4//zj//OP/84AAAAAAAP//A//8D//wP//A4cADhwAOHAA4cAD//wP//A//8D//wAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA//8D//wP9/A/j8AAAAAAAA//8D//wP//A//8DgBwOAHA4AcDgBwOAHA4AcDgBwOAHAAAAAAAAP//A//8D//wP//A4AcDgBwOAHA8A8D//wH/+AP/wAf+AAAAAAAAD//wP//A//8D//wOHHA4ccDhxwOHHA4ccDhxwOAHA4AcAAAAAAAA//8D//wP//A//8DhwAOHAA4cADhwAOHAA4cADgAAOAAAAAAD//wP//A//8D//wOAHA4ccDhxwOHHA4f8Dh/wOH/A4f8AAAAAAAA//8D//wP//A//8ABwAAHAAAcAABwAP//A//8D//wP//AAAAAAAAP//A//8D//wP//AAAAAAAAOAHA4AcDgBwOAHA4AcDgBwOAHA//8D//wP//A//8AAAAAAAA//8D//wP//A//8AHwAA/AAP8AB/wAPn/A8f8DB/wIH/AAAAAAAAP//A//8D//wP//AAAcAABwAAHAAAcAABwAAHAAAAAAAAP//A//8D//wP//Af8AAP+AAH/AAD8AAHwAD/AB/wAf8AP+AA//8D//wP//AAAAAAAAP//A//8D//wP//AfwAAfwAAfwAAfwAAfwP//A//8D//wAAAAAAAAAAAP//A//8D//wP//A4AcDgBwOAHA4AcD//wP//A//8D//wAAAAAAAD//wP//A//8D//wOHAA4cADhwAOHAA/8AD/wAP/AA/8AAAAAP//A//8D//wP//A4AcDgBwOAHA4AcD//+P//4///j//+AAA4AADgAAAP//A//8D//wP//A4eADh+AOH8A4f4D/3wP/HA/8MD/wQAAAAAAAD/xwP/HA/8cD/xwOHHA4ccDhxwOHHA4f8Dh/wOH/A4f8AAAAAAAA4AADgAAOAAA//8D//wP//A//8DgAAOAAA4AADgAAAAAA//8D//wP//A//8AABwAAHAAAcAABwP//A//8D//wP//AAAADAAAPgAA/wAD/4AB/8AA/8AAfwAB/AA/8Af+AP/AA/wAD4AAMAAA4AAD+AAP/gA//8AH/wAB/AAf8Af/wP/4A/4AD/gAP/4AH/8AB/wAB/AB/8D//wP/gA/gADgAAIABA4AcDwDwPw/Afn4Af+AA/wAD/AA//AH5+A/D8DwDwOAHAgAEAAAAP/AA/8AD/wAP/AAAf8AB/wAH/AAf8D/wAP/AA/8AD/wAAAAAAAADh/wOH/A4f8Dh/wOHHA4ccDhxwOHHA/8cD/xwP/HA/8cAAAAAAAAf//9///3///f//9wAA3AADcAAMAAAOAAA/gAD/wAH/8AB/8AA/wAAPAAAEAAAAHAADcAANwAB3///f//9///wAA"),
    32,
    width2, //atob("BwYLDg4UDwYJCQwMBgkGCQ4MDg4ODg4NDg4GBgwMDA4PDg4ODg4NDg4GDQ4MEg8ODQ8ODgwODhQODg4ICQg="),
    22 + (scale << 8) + (1 << 16)
  );
};

const font3 = atob('AAAAAAAAAAAD+w/sAAAAA8APAAAA8APAAAAMwP/D/wMwDMD/w/8DMAAAAAD8w/M8z/M/zPM/DPwAAAAPwD8QzcP/D/AHgD/D/wzMI/APwAAAAD/w/8MzDMwzMM/DPwDAAADwA8AAAAAAD8H/74f4BwAAAA4B/z8/8D8AAAAAeAPwD8AeAHgAAAAAAAAYAGAH4B+AGABgAAAAAAHgB4AAAAAYAGABgAYAAAAAABgAYAAAAQA8D/D+A8AAAAAA/8P/DAwwMMDD/w/8AAAAAwMMDD/w/8ADAAwAAO/DvwzMMzDMw/MPzAAAAAMDDMwzMMzDMw/8P/AAAAAPwD8ADAAwAMA/8P/AAAAAP3D9wzMMzDMwz8M/AAAAAP/D/wzMMzDMwz8M/AAA4AOADAAwAMAD/w/8AAAAA/8P/DMwzMMzD/w/8AAAAA/MPzDMwzMMzD/w/8AAAAAYYGGAAAAAGHhh4AABwAcAPgDYB3AYwAAAAAZgGYBmAZgGYBmAAAAABjAdwDYA+AHABwAAA4AOADOwzsMwD8A/AAAAAA//P/zAM37N+zZs/7P+wAAAAP/D/wzAMwDMA/8P/AAAAAP/D/wzMMzDMw/8P/AAAAAP/D/wwMMDDAwwMMDAAAAAP/D/wwMMDDhw/8H+AAAAAP/D/wzMMzDMwzMMDAAAAAP/D/wzAMwDMAzAMAAAA/8P/DAwzMMzDPwz8AAAAA/8P/AMADAAwD/w/8AAAAA/8P/AAAwMMDDAwwMMDD/w/8AAAAA/8P/AcAPAPwDvwj8AAAAA/8P/AAwAMADAAwAAP/D/w/AB+AHwA8B+B+A/8P/AAA/8P/D/wfAB8AHw/8P/AAAAAP/D/wwMMDDAw/8P/AAAAAP/D/wzAMwDMA/APwAAA/8P/DAwwMMDD/8//AAwAA/8P/DOAzwM/D9w/EAAAAA/MPzDMwzMMzDPwz8AADAAwAMAD/w/8MADAAwAAAD/w/8ADAAwAMP/D/wAAPAD8AP4AfAHwP4PwDgAAAPgD/gH8AfB/w/AP4A/wA8D/D/A8AAADAw4cP/A/APwH+DzwwMAAAAA/APwAPwD8A/D8A/AAAAAAz8M/DMwzMMzD8w/MAAAAA/////ADwA4ADwA/wB/ADwAAMAPAD////8A');
const width3 = atob("BAQHCQkNCQQGBggIBAYEBgkHCQkJCQkICQkEBAcIBwkKCQkJCQkICQkECAkHDAkJCAkJCQgJCQ0JCQkFBgU=");

Graphics.prototype.setFontLECO1976Regular14 = function () {
  // Actual height 14 (13 - 0)
  g.setFontCustom(
    font3, //atob('AAAAAAAAAAAD+w/sAAAAA8APAAAA8APAAAAMwP/D/wMwDMD/w/8DMAAAAAD8w/M8z/M/zPM/DPwAAAAPwD8QzcP/D/AHgD/D/wzMI/APwAAAAD/w/8MzDMwzMM/DPwDAAADwA8AAAAAAD8H/74f4BwAAAA4B/z8/8D8AAAAAeAPwD8AeAHgAAAAAAAAYAGAH4B+AGABgAAAAAAHgB4AAAAAYAGABgAYAAAAAABgAYAAAAQA8D/D+A8AAAAAA/8P/DAwwMMDD/w/8AAAAAwMMDD/w/8ADAAwAAO/DvwzMMzDMw/MPzAAAAAMDDMwzMMzDMw/8P/AAAAAPwD8ADAAwAMA/8P/AAAAAP3D9wzMMzDMwz8M/AAAAAP/D/wzMMzDMwz8M/AAA4AOADAAwAMAD/w/8AAAAA/8P/DMwzMMzD/w/8AAAAA/MPzDMwzMMzD/w/8AAAAAYYGGAAAAAGHhh4AABwAcAPgDYB3AYwAAAAAZgGYBmAZgGYBmAAAAABjAdwDYA+AHABwAAA4AOADOwzsMwD8A/AAAAAA//P/zAM37N+zZs/7P+wAAAAP/D/wzAMwDMA/8P/AAAAAP/D/wzMMzDMw/8P/AAAAAP/D/wwMMDDAwwMMDAAAAAP/D/wwMMDDhw/8H+AAAAAP/D/wzMMzDMwzMMDAAAAAP/D/wzAMwDMAzAMAAAA/8P/DAwzMMzDPwz8AAAAA/8P/AMADAAwD/w/8AAAAA/8P/AAAwMMDDAwwMMDD/w/8AAAAA/8P/AcAPAPwDvwj8AAAAA/8P/AAwAMADAAwAAP/D/w/AB+AHwA8B+B+A/8P/AAA/8P/D/wfAB8AHw/8P/AAAAAP/D/wwMMDDAw/8P/AAAAAP/D/wzAMwDMA/APwAAA/8P/DAwwMMDD/8//AAwAA/8P/DOAzwM/D9w/EAAAAA/MPzDMwzMMzDPwz8AADAAwAMAD/w/8MADAAwAAAD/w/8ADAAwAMP/D/wAAPAD8AP4AfAHwP4PwDgAAAPgD/gH8AfB/w/AP4A/wA8D/D/A8AAADAw4cP/A/APwH+DzwwMAAAAA/APwAPwD8A/D8A/AAAAAAz8M/DMwzMMzD8w/MAAAAA/////ADwA4ADwA/wB/ADwAAMAPAD////8A'),
    32,
    width3, //atob("BAQHCQkNCQQGBggIBAYEBgkHCQkJCQkICQkEBAcIBwkKCQkJCQkICQkECAkHDAkJCAkJCQgJCQ0JCQkFBgU="),
    14 | 65536
  );
};

const font4 = E.toString(require('heatshrink').decompress(atob("ABH/5k/+YVRh/AgfwBBoAEhgNBmEP//D//wBBgaEnkwj+Oh1x4cMmH//k//4FB4eOuFx/EMngaE+Ewnkch8OgfHgEDwEB4EA8fAuHwnE8hkPGovwj/+h154eemF/5kPn8Ag4fB8EA/kAmZwJFwNwgH4EoK4TE4N/wE4uEch0OgPDgCCFUpEA4eAuFwnEOjkB/0AKgIAImEwCIXOLoShDgHMgFzHwUMFYIADgZpDIgIMBn/wh5XBBAYREHZUAjkAn0AWYoANFhAIDACQdEGJxLBhzrBC4LtBGoLvBcAM4HI8P4EH/EDw4VB8Hgjk4g8HD4Ph4Ef8ED+A4IJAPA4EwXghuEJ5E8jkfh0O4cHmHDxgCBhgCBzkwv0Mh50FFwLzBhkB4YiBC4cM+HDv1w/P4nk8JgvAgJZB9kAuZ9B4AbBh//4f/BoJUH/kwn41B4PDHYPMhkzgcM4HDnFw4/4mH8UIvwg/+gex4PMmHjKAYCBh1wgP4gBQFHoZ3BQwJlBwExKQK3Ba4IZHAwPwj/+h15QYgCEz1wv/4h4bFAoMfwBEBC4vHNwODxvAv/gMgLbIAAkMhkDZwoAON4Mchk+gcPChopBgPgYILXBwC1BjkOhz7DI5PAgYMB5kAmYIODxEAXINwuE4h0cgPOgE/gEHwDRCMo0AhxWCDoPMmPza4ScBvAqCAAk/a4ZiD5/MmYaB5nD2cwv/AXg0P/kH/8DxgbC8HAnEwg4vB8bnB/kD/4aE//8n//d4gCGz1wv/4h88KBvAC4MDR4z9BGpIRBDRQ1Cc4JQTAQIjDDRQvDHA7UBeIxrNhnDwcwuH8hj3BGo4mCFgJECF4YIBCIgAHJoiPICxAKCh0AgIvFHAlw//4n6hJC4UegEP4EHnEDw4kB8HgjihKMo5uIDRIJC8EAj8Ag/AgeADYSGIBAgPBnAYBD4ccGAQaIa5qhBwFwv/4h6GJCgodFzkAvyRBXYo1J5kwn8Mg+DwPgv/8h/zGp3AmH4hk3GoPgv0ch6hFnkwj+Oh1x4YdBAQ2OuFxEIM8DQjIIHwjaHKAvwn/+gEBeRVw//4n6hFAoM/c4N8SgIEDeoM+AYQpBn41NuEA/AYCBAY1I+E8n0fgPOFAUHwEB8BDCueA/F8njYF+ArFnAaB/kB/8ADgI9DUAp3BXoUMh3Dg62BxkxXgPg4dwboU8a4oADh//4ZyB4D4FVQIIDCwi0BhxQGBYJOBjjABVQJTBEQJQEFhY+EJhAWBFwIpBG4QyBHJIbIBIQZBLAIINABbFGDIIAJBYMegHP4EzmEM5kDmcA5nAncwcAMAcAIAD//8n4IB4HAmAaBhkDI4IIBnFwg7zBDgIADgfwgP+gHhDRIIGDSpHEDRHtNZiLBbZKwEn/8j//hz+DABBQF5kwmZQB4cDmHABAM3h//wf/HAKhIeJM4gC8IAAh9D5/8mYRCeZoADGQMH5//2ZHFABhdB4f/SgIXBvCLBgEc8EOjjXGGYvDI4LOFKBcP/kDQwZ9DgIIB8CGLDQyhTa4qhCa4JiCVQM4uEH/EADgKCIXgYaRGp4IBV4oAHaAM/+AXBgJpBQwJ0GGokMgPjIAPAmY1B5kDmcA5gIB+EMvATBeZKhDIgM/LIPBKATXJJIIRBJQS9INYLODDQgQBMAMfAgccaIINBwEH4ADBgYgBGpdwgCzBnwIEh/4ga8FWYWHgFzwEP4EBG4N4gE/HYPgh0cYoQ1J5kAToMM4EDOAIIBm7XBwbMBGowjB4fAmKzB9kDuZUB4E8fYoAIFoMeJYPwj8+h0B4YLB4EMmAaKAAf8/k/NIIAMEYbRB4eAuF8/DQBRAQLBJZTPBhzWBwC9CAwLEEnAeH/5HB/6TB4f/+AIMLJoARA=")));
Graphics.prototype.setFontTeletext10x18Ascii = function () {
  g.setFontCustom(
    font4, //E.toString(require('heatshrink').decompress(atob("ABH/5k/+YVRh/AgfwBBoAEhgNBmEP//D//wBBgaEnkwj+Oh1x4cMmH//k//4FB4eOuFx/EMngaE+Ewnkch8OgfHgEDwEB4EA8fAuHwnE8hkPGovwj/+h154eemF/5kPn8Ag4fB8EA/kAmZwJFwNwgH4EoK4TE4N/wE4uEch0OgPDgCCFUpEA4eAuFwnEOjkB/0AKgIAImEwCIXOLoShDgHMgFzHwUMFYIADgZpDIgIMBn/wh5XBBAYREHZUAjkAn0AWYoANFhAIDACQdEGJxLBhzrBC4LtBGoLvBcAM4HI8P4EH/EDw4VB8Hgjk4g8HD4Ph4Ef8ED+A4IJAPA4EwXghuEJ5E8jkfh0O4cHmHDxgCBhgCBzkwv0Mh50FFwLzBhkB4YiBC4cM+HDv1w/P4nk8JgvAgJZB9kAuZ9B4AbBh//4f/BoJUH/kwn41B4PDHYPMhkzgcM4HDnFw4/4mH8UIvwg/+gex4PMmHjKAYCBh1wgP4gBQFHoZ3BQwJlBwExKQK3Ba4IZHAwPwj/+h15QYgCEz1wv/4h4bFAoMfwBEBC4vHNwODxvAv/gMgLbIAAkMhkDZwoAON4Mchk+gcPChopBgPgYILXBwC1BjkOhz7DI5PAgYMB5kAmYIODxEAXINwuE4h0cgPOgE/gEHwDRCMo0AhxWCDoPMmPza4ScBvAqCAAk/a4ZiD5/MmYaB5nD2cwv/AXg0P/kH/8DxgbC8HAnEwg4vB8bnB/kD/4aE//8n//d4gCGz1wv/4h88KBvAC4MDR4z9BGpIRBDRQ1Cc4JQTAQIjDDRQvDHA7UBeIxrNhnDwcwuH8hj3BGo4mCFgJECF4YIBCIgAHJoiPICxAKCh0AgIvFHAlw//4n6hJC4UegEP4EHnEDw4kB8HgjihKMo5uIDRIJC8EAj8Ag/AgeADYSGIBAgPBnAYBD4ccGAQaIa5qhBwFwv/4h6GJCgodFzkAvyRBXYo1J5kwn8Mg+DwPgv/8h/zGp3AmH4hk3GoPgv0ch6hFnkwj+Oh1x4YdBAQ2OuFxEIM8DQjIIHwjaHKAvwn/+gEBeRVw//4n6hFAoM/c4N8SgIEDeoM+AYQpBn41NuEA/AYCBAY1I+E8n0fgPOFAUHwEB8BDCueA/F8njYF+ArFnAaB/kB/8ADgI9DUAp3BXoUMh3Dg62BxkxXgPg4dwboU8a4oADh//4ZyB4D4FVQIIDCwi0BhxQGBYJOBjjABVQJTBEQJQEFhY+EJhAWBFwIpBG4QyBHJIbIBIQZBLAIINABbFGDIIAJBYMegHP4EzmEM5kDmcA5nAncwcAMAcAIAD//8n4IB4HAmAaBhkDI4IIBnFwg7zBDgIADgfwgP+gHhDRIIGDSpHEDRHtNZiLBbZKwEn/8j//hz+DABBQF5kwmZQB4cDmHABAM3h//wf/HAKhIeJM4gC8IAAh9D5/8mYRCeZoADGQMH5//2ZHFABhdB4f/SgIXBvCLBgEc8EOjjXGGYvDI4LOFKBcP/kDQwZ9DgIIB8CGLDQyhTa4qhCa4JiCVQM4uEH/EADgKCIXgYaRGp4IBV4oAHaAM/+AXBgJpBQwJ0GGokMgPjIAPAmY1B5kDmcA5gIB+EMvATBeZKhDIgM/LIPBKATXJJIIRBJQS9INYLODDQgQBMAMfAgccaIINBwEH4ADBgYgBGpdwgCzBnwIEh/4ga8FWYWHgFzwEP4EBG4N4gE/HYPgh0cYoQ1J5kAToMM4EDOAIIBm7XBwbMBGowjB4fAmKzB9kDuZUB4E8fYoAIFoMeJYPwj8+h0B4YLB4EMmAaKAAf8/k/NIIAMEYbRB4eAuF8/DQBRAQLBJZTPBhzWBwC9CAwLEEnAeH/5HB/6TB4f/+AIMLJoARA="))),
    33, 12, 18);
};

const font6 = atob("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");
const width6 = atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY=");


Graphics.prototype.setFontDylex7x13 = function () {

  g.setFontCustom(
    font6, //atob("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"),
    32,
    width6, //atob("AwIEBgYIBwIEBAYGAwYCBgYGBgYHBgYGBgYCAwUGBQYIBwcHBwcGBwcEBgcGBwcHBgcHBwgHBwgHCAcEBgQGCAMGBgYGBgYGBgMFBgMIBgYGBgYGBgYGCAYGBgYCBggABwADBgQGBgYGBwcECAAHAAADAwUFBgYIBQgGBAgABggAAgYGCAgCBgQIBQYFAAgIBQYFBQMIBwQDBAUGBwcIBgcHBwcHBwgHBgYGBgQEBAQIBwcHBwcHBgcHBwcHCAYIBgYGBgYGCAYGBgYGAwMEBAYGBgYGBgYGBgYGBgYGBgY="),
    13
  );
};

// === UI ===

ew.UI = {
  size: { _2x2: 20, _2x1: 25, _txt: 19, t1: 8, t2: 28, t3: 34, txt: 0.9, len: 1, sca: 0.63 },
  pos: {
    _2x1: [25, [89],
      [45, 122],
      [176],
      [78, 78]
    ],
    _2x2: [22, [45, 135],
      [40, 120],
      [88, 88],
      [78, 78]
    ],
    _2x3: [23, [28, 87, 146],
      [27, 86],
      [56, 56, 56],
      [56, 56]
    ],
    _3x1: [25, [90],
      [40, 120, 200]
    ],
    _kp4x3: [25, [30, 89, 145],
      [20, 58, 100, 140],
      [58, 58, 58],
      [40, 40, 40, 40]
    ],
    _bar: [16, [30, 88, 145, 43, 133, 88],
      [150],
      [58, 58, 58, 84, 84, 176],
      [50]
    ],
    _header: [19, [25, 88, 145, 58, 113, 88],
      [15],
      [50, 60, 60, 120, 126, 176],
      [30]
    ],
    _main: [20, [44, 132, 88],
      [61, 104, 73, 57, 88],
      [88, 88, 176],
      [61, 22, 86, 116, 176]
    ],
    _ind: [50, 116, 126, 124, 0, 176],
    _foot: [142, 132, 155]

  },
  loc: function (no, po) {
    let m = {};
    const p = (ew.UI.pos[no]);
    let ln = p[1].length;
    m.x = p[1][(po - 1) % ln];
    m.y = p[2][((po - 1) / ln) | 0];
    m.szX = p[3][(po - 1) % ln] / 2;
    m.szY = p[4][((po - 1) / ln) | 0] / 2;
    return m;
  },
  btn: {
    size: { _xs: 28, _s: 22, _m: 28, _l: 35, _xl: 45, txt: 1, len: 1 },

    i2l: function (loc, no, po, txt1, txt2, fclr, bclr, size) {

      const p = (ew.UI.pos[no]);
      const ln = p[1].length;
      const x = p[1][(po - 1) % ln];
      const y = p[2][((po - 1) / ln) | 0];
      const szX = p[3][(po - 1) % ln] / 2;
      const szY = p[4][((po - 1) / ln) | 0] / 2;
      g.setCol(0, bclr);
      g.fillRect({ x: x - szX, y: y - szY, x2: x + szX, y2: y + szY, r: 10 });
      g.setCol(1, fclr);

      if (txt1) {
        g.setFont("LECO1976Regular22", size ? size : 2);
        if (txt1 != "fill") g.drawString(txt1, x - (g.stringWidth(txt1) / 2), y - (g.stringMetrics(txt1).height / 2));
      }
      if (txt2) {
        g.setFont("Vector", p[0] * ew.UI.size.txt);
        if (txt2 != "fill") g.drawString(txt2, x - (g.stringWidth(txt2) / 2), y + szY - 10 - (g.stringMetrics(txt2).height / 2));
      }
      if (ew.UI.c.get[loc])
        ew.UI.c.raw[loc] = ew.UI.c.raw[loc] + `${ew.UI.c.raw[loc] == " " ? '' : 'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) ew.UI.c.${loc}.${no}(${po},l);`;
    },

    c2l: function (loc, no, po, txt1, txt2, fclr, bclr, size, offset, font, round, alignX, alignY) { //type:main|bar,
      //"ram";
      //draw
      const p = (ew.UI.pos[no]);
      let len = p[1].length;
      let x = p[1][(po - 1) % len];
      let y = p[2][((po - 1) / len) | 0];
      let szX = p[3][(po - 1) % len] / 2;
      let szY = p[4][((po - 1) / len) | 0] / 2;

      g.setCol(0, bclr);

      g.fillRect({ x: x - szX, y: y - szY, x2: x + szX, y2: y + szY, r: (round ? round : 10) });

      g.setCol(1, fclr);
      if (txt2 && txt2 != "") {
        g.setFont("Vector", p[0] * 0.70 * ew.UI.size.txt * (size ? size : 1));
        g.drawString(txt1, x - (g.stringWidth(txt1) / 2), y - 6 - g.stringMetrics(txt1).height);
        g.setFont("Vector", p[0] * 1 * ew.UI.size.txt * (size ? size : 1));
        g.drawString(txt2, x - (g.stringWidth(txt2) / 2), y + (1.00 - ew.UI.size.txt));
      }
      else {
        if (offset) y = y + offset;
        if (font) g.setFont(font, size ? size : 1);
        else g.setFont("Vector", p[0] * ew.UI.size.txt * (size ? size : 1));
        g.setFontAlign((alignX || 0), (alignY || 0));
        g.drawString(txt1, (alignX ? (alignX === 1 ? x + szX : x - szX) : x), y);
        g.setFontAlign(-1, -1);

      }
      //coordinates
      if (ew.UI.c.get[loc])
        ew.UI.c.raw[loc] = ew.UI.c.raw[loc] + `${ew.UI.c.raw[loc] == " " ? '' : 'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) ew.UI.c.${loc}.${no}(${po},l);`;

      else g.flip();
    },
    img: function (loc, no, po, img, txt, fclr, bclr, size, side, tran) {
      let bSize = 1;
      size = size || 1;
      if (img.endsWith('.img')) {
        img = require("Storage").read(img);
        bSize = 1.3;
      } else
        img = require("heatshrink").decompress(atob(ew.UI.icon[img]));

      const p = (ew.UI.pos[no]);
      let len = p[1].length;
      let x = p[1][(po - 1) % len];
      let y = p[2][((po - 1) / len) | 0];
      let szX = p[3][(po - 1) % len] / 2;
      let szY = p[4][((po - 1) / len) | 0] / 2;
      if (!tran) {
        g.setCol(0, bclr);
        g.fillRect({ x: x - szX, y: y - szY, x2: x + szX, y2: y + szY, r: 10 });
      }
      g.setCol(1, fclr);
      let imgW = g.imageMetrics(img).width;
      let imgH = g.imageMetrics(img).height;
      if (txt && side) {
        g.setFont("Vector", p[0] * 1.5 * ew.UI.size.txt * size);
        let xa = x - ((imgW + g.stringWidth(txt)) / 2);
        g.setCol(1, 11);
        //g.drawImage(img, (xa, y - szY) (imgH / 2)*0.86*size, { scale: ew.UI.size.sca*size });
        g.drawImage(img, xa, y - ((imgH * ew.UI.size.sca * size) / 2) * 1.3, { scale: ew.UI.size.sca * size });
        g.setCol(1, fclr);
        g.drawString(txt, xa + imgW, y - (p[0] * 1.7 * ew.UI.size.txt) / 2 + 2);
      }
      else
        g.drawImage(img, x - (imgW * ew.UI.size.sca * size / 2), y - (imgH * ew.UI.size.sca * size / 2), { scale: ew.UI.size.sca * size });

      img = 0;
      //coordinates
      if (ew.UI.c.get[loc])
        ew.UI.c.raw[loc] = ew.UI.c.raw[loc] + `${ew.UI.c.raw[loc] == " " ? '' : 'else '}if (${x}-${szX}<x&&x<${x}+${szX}&&${y}-${szY}<y&&y<${y}+${szY}) ew.UI.c.${loc}.${no}(${po},l);`;
      else g.flip();
    },
    ntfy: function (rst, tmot, ignr, no, po, txt1, txt2, fclr, bclr, sel, img, pri) {
      //"ram";

      if (ew.is.UIpri && !pri) return;
      if (pri) ew.is.UIpri = 1;
      if (ew.UI.ntid) {
        clearTimeout(ew.UI.ntid);
        ew.UI.ntid = 0;
      }
      if (rst && !sel) {
        ew.UI.c.xy.replaceWith(new Function("x", "y", "l", '' + ew.UI.c.raw.main + ''));

        ew.is.slide = 0;
      }
      if (!ignr) {
        //ew.face.off();
        const p = (ew.UI.pos[no]);
        let len = p[1].length;
        let x = p[1][(po - 1) % len];
        let y = p[2][((po - 1) / len) | 0];
        let szX = p[3][(po - 1) % len] / 2;
        let szY = p[4][((po - 1) / len) | 0] / 2;
        g.setCol(0, bclr);
        g.fillRect({ x: x - szX, y: y - szY, x2: x + szX, y2: y + szY, r: 10 });
        g.setCol(1, fclr);
        g.setFont("LECO1976Regular22");
        if (txt1)
          g.drawString(txt1, x - (g.stringWidth(txt1) / 2), (txt2) ? ew.UI.pos._foot[1] : ew.UI.pos._foot[0]);

        if (txt2)
          g.drawString(txt2, x - (g.stringWidth(txt2) / 2), ew.UI.pos._foot[2]);

        if (sel && rst) {
          //g.flip
          ew.is.bar = 1;
          ew.is.slide = 0;

          ew.UI.c.raw.bar = `if (x<120&&${y}-${szY}<y&&y<${y}+${szY}) ew.UI.c.bar._ntfy(1); else if (120<x&&${y}-${szY}<y&&y<${y}+${szY}) ew.UI.c.bar._ntfy(2);`;
          ew.UI.c.xy.replaceWith(new Function("x", "y", "l", '' + ew.UI.c.raw.main + ew.UI.c.raw.bar + ''));
        }
        else ew.UI.c.bar._ntfy = function () { };
        g.flip();
      }
      if (txt1 && ew.face && ew.face[0]) ew.face[0].ntfy = txt1;
      //if (!sel) g.flip();
      ew.UI.ntid = setTimeout(function (t) {
        if (ew.face && ew.face[0]) ew.face[0].ntfy = false;
        ew.UI.rtb();
      }, tmot ? tmot * 1000 : 1000);

    }
  },
  ele: {

    ind: function (c, t, clrB, clrF) {

      let p = ew.UI.pos._ind; // [50, 118, 126, 124, 0, 176]

      g.setCol(0, clrB !== undefined ? clrB : 0);
      g.fillRect(p[4], p[1], p[5], p[3]);

      if (!c) return;

      let startX = p[0];
      let startY = p[1];
      let endX = p[2];
      let height = p[3] - p[1];

      let availableWidth = endX - startX;
      let circleDiameter = Math.min(10, Math.floor(availableWidth / t) - 2);
      let circleRadius = Math.floor(circleDiameter / 3);

      let totalDotsWidth = circleDiameter * t + 2 * (t - 1);
      let startDrawingX = startX + Math.floor((availableWidth - totalDotsWidth) / 2);
      let centerY = startY + Math.floor(height / 2) - 1;

      g.setCol(0, 4); // ÏÏÏ <= Î case Î try Î case Î undefined-Î false Î default Î false ÏÎ finally Ï <= Î default
      for (let i = 0; i < t; i++) {
        let x = startDrawingX + i * (circleDiameter + 2) + circleRadius;
        g.fillCircle(x, centerY, circleRadius);
      }
      if (c > 0 && c <= t) {
        g.setCol(0, clrF !== undefined ? clrF : 15);
        let activeX = startDrawingX + (c - 1) * (circleDiameter + 2) + circleRadius;
        g.fillCircle(activeX, centerY, circleRadius);
      }
    },

    fill: function (no, po, clr) {
      //"ram";
      let m = ew.UI.loc(no, po);
      g.setCol(0, clr);
      g.fillRect(m.x - m.szX, m.y - m.szY, m.x + m.szX, m.y + m.szY);
    },

    coord: function (loc, no, po) {
      //"ram";
      let m = ew.UI.loc(no, po);
      ew.UI.c.raw[loc] = ew.UI.c.raw[loc] + `${ew.UI.c.raw[loc] == " " ? '' : 'else '}if (${m.x}-${m.szX}<x&&x<${m.x}+${m.szX}&&${m.y}-${m.szY}<y&&y<${m.y}+${m.szY}) ew.UI.c.${loc}.${no}(${po},l);`;
    }
  },
  rtb: function () {
    if (ew.UI.ntid) {
      clearTimeout(ew.UI.ntid);
      ew.UI.ntid = 0;
    }
    ew.is.UIpri = 0;

    ew.is.bar = 0;
    ew.is.slide = 0;
    if (ew.face[0].exe) {
      ew.face[0].exe();
      ew.face[0].exe = 0;
    }
    if (ew.face.appCurr.includes("-set")) ew.face[1].bar();
    else ew.face[0].bar();
  },
  bar: function (i) {
    //"ram"
    ew.is.UIpri = 0;
    ew.is.bar = 1;
    ew.is.slide = 0;
    ew.UI.btn.ntfy(0, 1.3, 1);
    ew.UI.ele.fill("_bar", 6, 15);

    ew.UI.c.start(0, 1);
    ew.UI.btn.img("bar", "_bar", 1, "clock", "", 0, 15, 0, 0, 1);
    ew.UI.btn.img("bar", "_bar", 2, "launcher", "", 0, 2, 0, 0, 1);
    if (!ew.face.appCurr.includes("-set")) ew.UI.btn.img("bar", "_bar", 3, "settings", "", 0, 2, 0, 0, 1);
    ew.UI.c.end();

    ew.UI.c.bar._bar = (i) => {
      if (ew.UI.ntid && !ew.is.UIpri) {
        clearTimeout(ew.UI.ntid);
        ew.UI.ntid = 0;
      }
      if (i === 3) {
        ew.sys.buzz.nav(ew.sys.buzz.type.ok);
        ew.face[0].clear();
        ew.face[1].init();
        ew.face[1].show();
      } else if (i === 1) {
        ew.face.out();
        Bangle.load();
      } else {
        ew.face.out();
        setTimeout(()=>{Bangle.showLauncher()},50);
      }

    };
  }
};



// === UI control ==

ew.UI.c = {
  get: { bar: 0, main: 0 },
  raw: { main: " ", bar: " ", up: " ", down: " ", back: " ", next: " " },
  xy: function () { },
  main: {},
  bar: {},
  start: function (m, b) {
    if (m) {
      ew.UI.c.raw.main = " ";
      ew.UI.c.get.main = 1;
    }
    if (b) {
      ew.UI.c.raw.bar = " ";
      ew.UI.c.get.bar = 1;
    }
  },
  end: function () {
    g.flip();
    ew.UI.c.get.main = 0;
    ew.UI.c.get.bar = 0;
    ew.UI.c.xy.replaceWith(new Function("x", "y", "l", '' + ew.UI.c.raw.main + ew.UI.c.raw.bar + ''));
    //ew.UI.c.xy.replaceWith(new Function("x", "y", "l", 'setTimeout(()=>{' + ew.UI.c.raw.main + ew.UI.c.raw.bar + '},0);'));
  },
  clear: function () {
    this.raw = { main: " ", bar: " ", up: " ", down: " ", back: " ", next: " " };
  }
};

// === UI navigation ===

ew.UI.nav = {
  dn: function (x, y) {
    "ram";
    if (!ew.face.appCurr.includes("-set")) {
      ew.sys.buzz.nav(ew.sys.buzz.type.na);
      return;
    }
    ew.sys.buzz.nav(ew.sys.buzz.type.ok);
    if (ew.UI.ntid && !ew.is.UIpri) {
      clearTimeout(ew.UI.ntid);
      ew.UI.ntid = 0;
    }
    ew.face[1].clear();
    ew.face[0].init();
    ew.face[0].show();
  },
  up: function (x, y) {
    "ram";
    ew.sys.buzz.nav(ew.sys.buzz.type.ok);
    ew.UI.bar(2);

  },
  back: function () {
    ew.sys.buzz.nav(ew.sys.buzz.type.ok);
  },
  next: function () {
    ew.sys.buzz.nav(ew.sys.buzz.type.na);
  },
  bar: function (a, b, r) { ew.UI.c.tcBar(a, b, r); },
};


// === Touch Handler ===

ew.sys.TC = {
  x: 0,
  y: 0,
  run: 0,
  tid: { nav: 0, fire: 0 },
  val: { cur: 0, up: 0, dn: 0, follow: 1 },
  start: function () {
    //Bangle.setLCDPower(1);
    //Bangle.setOptions({lockTimeout:0})
    digitalPulse(ew.pin.touch.RST, 1, [5, 50]);
    if (!this.run) this.init();
  },
  init: function () {
    this.run = 1;
    Bangle.on('drag', (data) => {
      if (1 < this.dbg) console.log("tc drag data:", data);
      if (this.dbg) console.log("tc start", this.nav);
      // ---- slider ----
      if (ew.is.slide && 116 < data.y) this.bar(data);

      // ---- nav ----
      else if (data.b && !this.nav) {
        if (this.dbg) console.log("tc drag nav:", data);

        if (this.tid.fire) {
          if (this.dbg) console.log("tc bar clear fire tid");
          clearInterval(this.tid.fire);
          this.tid.fire = 0;
          this.long = 0
        }

        // ---- gestures ----
        if (data.dy <= -3) {
          ew.UI.nav.up(data.x, data.y);
          this.nav = 1;
          //ew.face.off();
        }
        else if (3 <= data.dy) {
          ew.UI.nav.dn(data.x, data.y);
          this.nav = 1;
          //ew.face.off();
        }
        else if (data.dx <= -3) {
          ew.UI.nav.next();
          this.nav = 1;
          //ew.face.off();
        }
        else if (3 <= data.dx) {
          ew.UI.nav.back();
          this.nav = 1;
          //ew.face.off();
        }

        // ---- long press ----
        else if (!this.tid.nav) {
          if (this.dbg) console.log("tc nav long:", data);

          this.tid.nav = setTimeout((data) => {
            this.tid.nav = 0;
            if (this.dbg) console.log("tc nav long fire:", data);
            this.nav = 1;
            ew.UI.c.xy(data.x, data.y, 1);
          }, 1000, data);
        }
      }

      // ---- short press ----
      else if (!data.b) {
        if (this.tid.nav) {
          if (this.dbg) console.log("tc nav long clear:", data);
          clearTimeout(this.tid.nav);
          this.tid.nav = 0;
        }

        if (!this.nav) {
          if (this.dbg) console.log("tc nav short fire:", data);
          if (ew.UI.ntid && !ew.is.UIpri && !ew.is.bar && 116 < data.y) {
            clearTimeout(ew.UI.ntid);
            ew.UI.ntid = 0;
            ew.UI.rtb();
          }
          else ew.UI.c.xy(data.x, data.y, 0);
        }
        this.nav = 0;
      }
    });
  },
  move: function (data) {
    "ram";
    this.step = 1;
    this.long = 1;

    // ---- rapid fire mode ----
    if (this.val.fire) {
      if (this.dbg) console.log("tc: move fire mode");
      let fire = 1;
      if (!this.tid.fire) this.tid.fire = setInterval(() => {
        fire++;
        this.val.cur = this.val.cur + this.side
        if (this.val.up < this.val.cur) this.val.cur = (this.val.loop) ? this.val.dn : this.val.up;
        else if (this.val.cur < this.val.dn) this.val.cur = (this.val.loop) ? this.val.up : this.val.dn;
        ew.UI.c.tcBar(this.side, this.val.cur, fire);

      }, 50, fire);

      // ---- follow finger mode ----
    }
    else {
      if (this.dbg) console.log("tc: move follow mode");
      if (this.seg > this.val.up) this.seg = this.val.up;
      else if (this.seg < this.val.dn) this.seg = this.val.dn;
      this.val.cur = this.seg;
      ew.UI.c.tcBar(0, this.seg);
    }

  },
  bar: function (data) {
    "ram";
    if (data.dy) return;

    // ---- finger on screen ----
    if (data.b) {
      this.seg = this.val.dn + ((data.x - 5) * (this.val.up - this.val.dn) / 140) | 0;
      this.side = (data.x < 88) ? -1 : 1;

      // ---- long mode start ----
      if (!this.tid.nav) {
        if (this.dbg) console.log("tc: bar tid");
        this.tid.nav = setTimeout(() => {
          ew.sys.buzz.nav(25);
          this.move();
        }, 1000, data);
      }

      // ---- long mode ----
      if (this.long) {
        if (this.dbg) console.log("tc: bar long");
        this.move();
      }

      // ---- slide mode ----
      else {

        if (this.dbg) console.log("tc: bar else");
        if (this.val.reverce) this.val.tmp = this.val.tmp - data.dx;
        else this.val.tmp = this.val.tmp + data.dx;
        let len = this.val.len || 20;
        this.step = this.val.tmp / len | 0;
        if (this.step) {
          if (this.tid.nav) {
            if (this.dbg) console.log("tc bar clear move tid");
            clearTimeout(this.tid.nav);
            this.tid.nav = 0;
          }
          if (this.dbg) console.log("tc: bar step", this.step);
          this.val.cur = this.val.cur + this.step;
          this.val.tmp = 0;
          if (this.val.up < this.val.cur) this.val.cur = (this.val.loop) ? this.val.dn : this.val.up;
          else if (this.val.cur < this.val.dn) this.val.cur = (this.val.loop) ? this.val.up : this.val.dn;
          ew.sys.buzz.nav(10);
          ew.UI.c.tcBar(this.side, this.val.cur);
        }
      }
    }

    // ---- finger off screen ----
    else {
      if (this.dbg) console.log("tc data.b=0:", data);

      if (this.tid.nav) {
        if (this.dbg) console.log("tc bar clear move tid");
        clearTimeout(this.tid.nav);
        this.tid.nav = 0;
      }

      if (this.tid.fire) {
        if (this.dbg) console.log("tc bar clear fire tid");
        clearInterval(this.tid.fire);
        this.tid.fire = 0;
      }

      this.long = 0;

      // ---- tap mode ----
      if (!this.step) {
        ew.sys.buzz.nav(25);
        this.val.cur = this.val.cur + this.side;
        if (this.val.up < this.val.cur) this.val.cur = (this.val.loop) ? this.val.dn : this.val.up;
        else if (this.val.cur < this.val.dn) this.val.cur = (this.val.loop) ? this.val.up : this.val.dn;
        ew.UI.c.tcBar(this.side, this.val.cur);
      }
      this.step = 0;
      //ew.face.off();
    }
  },
  stop: function () {
    if (this.dbg) console.log("tc stop");

    if (this.tid.nav) {
      if (this.dbg) console.log("tc stop  clear move tid");
      clearTimeout(this.tid.nav);
      this.tid.nav = 0;
    }

    if (this.tid.fire) {
      if (this.dbg) console.log("tc stop clear fire tid");
      clearInterval(this.tid.fire);
      this.tid.fire = 0;
    }
    setTimeout(() => {
      digitalPulse(ew.pin.touch.RST, 1, [5, 50]);
      setTimeout(() => { Bangle.touchWr(ew.pin.touch.SLP, 3); ew.sys.TC.nav = 0; }, 100);
    }, 200);
    return true;
  }
};


// === buzzer ===

ew.sys.buzz = {};
ew.sys.buzz.type = { na: [15, 15, 15], ok: 15, ln: 80, info: [75, 50, 75, 50, 75], error: [100, 50, 75, 50, 100, 200, 100, 200, 100], on: 40, off: [20, 25, 20] };
ew.sys.buzz.nav = digitalPulse.bind(null, ew.pin.BUZZ, ew.pin.BUZ0);

