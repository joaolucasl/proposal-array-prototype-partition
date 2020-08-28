if (!Array.prototype.partition) {
  Array.prototype.partition = function partition(callbackfn, thisArg) {
    // Let O be ? ToObject(this value).
    var O = Object(this);
    // Let len be ? LengthOfArrayLike(O).
    var len = O.length;
    // If IsCallable(callbackfn) is false, throw a TypeError exception.
    if (typeof callbackfn !== "function") {
      throw TypeError(callbackfn + " is not a function");
    }
    // Let A be ? ArraySpeciesCreate(O, 0).
    var A = new Array(0);
    // Let B be ? ArraySpeciesCreate(O, 0).
    var B = new Array(0);

    // Let Tuple be ? ArrayCreate(2).
    var Tuple = new Array(2);

    // Let k be 0.
    var k = 0;

    // Let toA be 0.
    var toA = 0;

    // Let toB be 0.
    var toB = 0;

    // Repeat, while k < len,
    while (k < len) {
      // a. Let Pk be ! ToString(k).
      var Pk = String(k);
      // b. Let kPresent be ? HasProperty(O, Pk).
      var kPresent = Pk in O;
      // c. If kPresent is true, then
      if (kPresent) {
        // i. Let kValue be ? Get(O, Pk).
        var kValue = O[Pk];

        // ii. Let selected be ! ToBoolean(? Call(callbackfn, thisArg, « kValue, k, O »)).
        var selected = Boolean(callbackfn.call(thisArg, kValue, k, O));
        // iii. If selected is true, then
        if (selected) {
          // Perform ? CreateDataPropertyOrThrow(A, ! ToString(toA), kValue).
          A[toA] = kValue;
          // Set toA to toA + 1. iv.
          toA = toA + 1;
          // Else,
        } else {
          // Perform ? CreateDataPropertyOrThrow(B, ! ToString(toB), kValue).
          B[toB] = kValue;
          // Set toB to toB + 1.
          toB = toB + 1;
        }
      }
      // Set k to k + 1
      k = k + 1;
    }
      // Perform ? `CreateDataPropertyOrThrow(Tuple, ! ToString(0), A)
      Tuple[0] = A;

      // Perform ? `CreateDataPropertyOrThrow(Tuple, ! ToString(1), B)
      Tuple[1] = B;

      // Return Tuple
      return Tuple;
  };
}
