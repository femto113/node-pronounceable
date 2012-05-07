# pronounceable [![Build Status](https://secure.travis-ci.org/femto113/node-pronounceable.png)](http://travis-ci.org/femto113/node-pronounceable)

This is an alphabetic encoding for numbers using "pronouncable" syllables (consonant/vowel pairs)

Using a combination of 20 consonants (excluding C and Y) and 5 vowels each syllable encodes the same
number of bits as two base 10 digits, so encoded length is roughly the same as pure
numeric digits (there will be one extra character if the numeric length is odd).

This encoding may not have any practical purpose, the original use was for
a simple way of generating nonsense words, but let me know if you come up with one.  

## Install

    git clone http://github.com/femto113/node-pronounceable.git
    cd node-pronounceable
    npm link

## Example

    var p = require("pronounceable");

    var a = p.encode(9787);
    // a == "zixi"

    // can change case and/or add spaces or non-alphabetic characters without problem
    var b = [
      "ZIXI", // upper case
      "Zixi"  // mixed case
      "zi-xi" // injected hyphen
      "zixi " // trailing space
    ].map(function (s) { return p.decode(s); });
    // b == [9787, 9787, 9787]

    // drop a character or slip in a C or Y and you get NaN
    var c = [
      "zix"
      , "cixi"
      , "zixy"
    ].map(function (s) { return p.decode(s); });
    // c == [NaN, NaN, NaN]

    console.log(a, b, c);
