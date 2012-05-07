var p = require("./pronounceable"), assert = require("assert");

var scale = 15, N = Math.pow(2, scale);

console.log("Testing " + N + " random integers");
var start = new Date();
for (var i = 0; i < N; i++) {
   var r = Math.floor(Math.random() * Math.pow(2, 32));
   var a = p.encode(r);
   assert.equal(a.length % 2, 0, "bad encoded length");
   // ensure the encoding can survive addition of non-alphabetics, changes in capitalization
   var b = a.split("").map(function (s, i) { return r % i ? s.toUpperCase() : s.toLowerCase() }).join("-/ ");
   var c = p.decode(b);
   assert.ok(!isNaN(c), "decode failed: " + [r, a, b, c].join(" => "));
   assert.equal(c, r, "decode yielded incorrect result: " + [r, a, b, c].join(" => "));
}
var elapsed = new Date() - start;
console.log("done. (approx.", Math.floor(N / (elapsed / 1000.0)), "encode/decode cycles per second)"); 
