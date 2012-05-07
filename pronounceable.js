// alphabetic encoding for numbers using pronouncable syllables (consonant/vowel pairs)
//
// using a combination of 20 consonants and 5 vowels each syllable encodes the same
// number of bits as two base 10 digits, so encoded length is roughly the same as pure
// digits

var consonants = 'bdfghjklmnpqrstvwxyz'; // no C to avoid confusion with K/S
var vowels = 'aeiou';

var encode_table = [], decode_table = {};
for (var i = 0; i < consonants.length; i++) {
  for (var j = 0; j < vowels.length; j++) {
    encode_table.push(consonants[i] + vowels[j]);
  }
}
for (i = 0; i < encode_table.length; i++) {
  decode_table[encode_table[i]] = i;
}

if (typeof(exports) == "undefined") exports = {};

exports.encode = function(n) {
  n = n >>> 0; // force n to UInt32 form

  var words = [], digits = n.toString(10).split('');
  if (digits.length % 2) digits.unshift('0');
  while (digits.length) words.push(parseInt(digits.splice(0, 2).join(''), 10));
  return words.map(function (w) { return encode_table[w]; }).join('');
}

exports.decode = function(s) {
  s = s.replace(/\W/g, '').toLowerCase();
  if (s.length % 2) return NaN;
  var words = [], digits = s.split('');
  while (digits.length) {
    var syllable = digits.splice(0, 2).join('');
    if (!(syllable in decode_table)) return NaN;
    words.push(decode_table[syllable]);
  }
  return words.reduce(function (t, w) { return t * 100 + w; });
}
