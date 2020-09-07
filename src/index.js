console.clear();
import words from "./words";
import { Trie } from "./trie";
import {
  buildRegexOr,
  chunkNumber,
  multiDimensionalUnique,
  permutations,
} from "./utils";

//import ???

document.addEventListener("DOMContentLoaded", function () {
  //NOTE: CURRENT NOT USING THIS TRIE. all word searches are done using the regex match
  //convert words array to trie
  const wordTrie = new Trie();
  words.forEach((word) => wordTrie.insert(word));
  //

  // hardcode major system maps
  const majorSytem = {
    0: ["s", "ss", "z"],
    1: ["t", "tt", "d", "dd"],
    2: ["n", "nn"],
    3: ["m", "mm"],
    4: ["r", "rr"],
    5: ["l", "ll"],
    6: ["ch", "j"],
    7: ["k", "g", "ck", "q"],
    8: ["f", "ff", "v", "th"],
    9: ["p", "b", "bb", "pp"],
  };
  const regExConsons = buildRegexOr(majorSytem);

  //

  //chunk number and map to sounds given in major system
  const mapToSounds = (number, chunkSize) => {
    let numbers = chunkNumber(number, chunkSize);
    let sounds = [];
    numbers.forEach((number) => {
      let n = number.toString().split("");
      let r = n.map((n) => majorSytem[n]);
      sounds.push(r);
    });
    return sounds;
  };

  // find all words given array of form [["h"],["t"],["r"]]
  function findWords(arr, words) {
    // could use trie here to replace words with only words that start with non regexconsons (except for the first sound/letter of the number)
    arr = arr.map((a) => a[0]);
    let re = new RegExp(
      "\\b" +
        "^[^" +
        regExConsons +
        "]" +
        `{0,5}` +
        arr.join("[^" + regExConsons + "]" + `{0,5}`) +
        "[^" +
        regExConsons +
        "]" +
        `{0,5}` +
        "\\b",
      "gi"
    );
    // console.log(re);
    return words.filter((w) => w.match(re));
  }
  //generate words
  function generateWords(number, chunkSize) {
    let sounds = mapToSounds(number, chunkSize); //chunk number and map numbers to sounds
    let allPerm = sounds.map((a) => permutations(a)); // generate all permutations including all possible matching sounds
    allPerm = allPerm.map((a) => multiDimensionalUnique(a)); // remove dupes

    //NOTE: this probably isn't the most efficient method (nested maps and findwords function filters over all words.)
    let results = allPerm.map((group) => group.map((c) => findWords(c, words))); //find matching words for all chunks
    results = results.map((a) => a.flat());
    return results;
  }

  //DOM

  const genForm = document.getElementById("genForm");
  const results = document.getElementById("results");
  //

  genForm.addEventListener("submit", (e) => submitHandler(e));

  function submitHandler(e) {
    e.preventDefault();
    let number = e.target.numberInput.value;
    let chunk = e.target.chunkSize.value;

    let words = generateWords(number, chunk);
    let b = document.createElement("div");
    words.forEach((n) => {
      let d = createDropDown(n);
      b.append(d);
    });
    let span = document.createElement("span");
    span.innerText = chunkNumber(number, chunk).join(" ");
    b.append(span);
    results.append(b);
  }

  function createDropDown(array) {
    let s = document.createElement("select");
    array.forEach((el) => {
      let o = document.createElement("option");
      o.value = el;
      o.innerText = el;
      s.append(o);
    });
    return s;
  }
  // generateWords(24542624, 3);
});

////// ----------------------------------------------------------------------------------------------------
//unused
//

// function findWords(arr) {
//   //applies to sub sub arrays i.e. [["s"],["p"],["ch"]]
//   //recursion like with permutations above..
//   // let words = [];
//   // let n = arr.length;
//   // let fL = arr[0][0];

//   //find words..??

//   // but how ???
//   //binary tree search with multiple iterations right?

//   // for (let j = 0; j < arr.length; j++) {
//   //   for (let i = 0; i < vowelCombos.length; i++) {
//   //     // if (j == arr.length - 1) {

//   //     // }

//   //   }
//   // }

//   // function fn(pref) {
//   //   vowelCombos.forEach((v) => {
//   //     let i = 1;
//   //     i++;
//   //     let pref = fL+v
//   //     let w = wordTrie.find(pref);
//   //     if (i === n) {
//   //       words.push(w);
//   //     } else {
//   //       fn(w+arr[i]);
//   //     }
//   //   });
//   // }
//   // fn(fL);

//   //find all words that fit this structure...

//   let words = [];

//   return words;
// }
