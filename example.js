var p = require("./pronounceable");

var a = p.encode(9787);
// a == "zixi"

// can change case without problem
var b = [
  "ZIXI", // upper case
  "Zixi"  // mixed case
].map(function (s) { return p.decode(s); });
// b == [9787, 9787]

// drop a character or slip in a C or Y and you get NaN
var c = [
  "zix"
  , "cixi"
  , "zixy"
].map(function (s) { return p.decode(s); });
// c == [NaN, NaN, NaN]

console.log(a, b, c);
