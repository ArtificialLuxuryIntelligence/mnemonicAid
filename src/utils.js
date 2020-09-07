//utils
//
function buildRegexOr(obj) {
  //
  let res = [];
  for (const [key, value] of Object.entries(obj)) {
    res = [...res, ...value];
  }
  return res.join("|");
}

const chunkNumber = (number, chunkSize) => {
  let split = [];
  let num = number.toString();
  while (num.length) {
    split.push(num.slice(0, chunkSize));
    num = num.slice(chunkSize);
  }
  return split;
};

//remove dupes from multidim array
function multiDimensionalUnique(arr) {
  var uniques = [];
  var itemsFound = {};
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) {
      continue;
    }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

//generate  separate arrays with all permutations
// i.e. [[1,2],[1]] generates [[[1],[1]],[[2],[1]]] etc even when multiple entries are length>1
function permutations(arr) {
  let res = [];
  function fn(arr) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].length > 1) {
        arr[j].forEach((el, i) => {
          let c = [...arr];
          c.splice(j, 1, [arr[j][i]]);
          if (c.every((a) => a.length === 1)) {
            res.push([...c]);
          } else {
            fn(c);
          }
        });
      }
    }
  }
  fn(arr);
  return res;
}

export { buildRegexOr, chunkNumber, multiDimensionalUnique, permutations };
