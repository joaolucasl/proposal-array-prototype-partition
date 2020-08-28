# `Array.prototype.partition`
A proposal for an utility function for splitting an Array using a predicate.


## Why not use `.filter` or `.reduce`?
While `.filter` is a helpful way of eliminating unwanted items from your collection by filtering them out, wanting to simply remove the items is not always the case. The `.reduce` function can serve the purpose of manipulating the items, but it doesn't cover easily the need of having multiple arrays built for you depending on conditions you apply to the items.

## Current State
### Using `.filter`
```
const numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15]

const isEven = n => n % 2 === 0

const even = numbers.filter(n => isEven(n))
const odd = numbers.filter(n => !isEven(n)) 
```

### Using `.reduce`
```js
const numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15]

const isEven = n => n % 2 === 0

const [even, odd] = numbers.reduce(
  ([even, odd], num) => 
    isEven(num) ? [even.concat(num), odd]: [even, odd.concat(num)],
  [[], []]
)

```

### Using `for`
```js
const numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15]

const isEven = n => n % 2 === 0

let even = []
let odd = []

for (const number of numbers) {
  isEven(number) ? even.push(number) : odd.push(number)
}
```


## Prior art
### Other Languages
- Ruby - [`Enumerable.partition`](https://apidock.com/ruby/Enumerable/partition)
- OCaml - [`List.partition`](https://caml.inria.fr/pub/docs/manual-ocaml/libref/List.html)
- Elixir - [`Enum.split_with`](https://hexdocs.pm/elixir/Enum.html#split_with/2)
- Kotlin - [`Collection.partition`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/partition.html)
- Erlang = [`List.partition`](https://erlang.org/doc/man/lists.html#partition-2)
- Rust = [`trait.Iterator.partition`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.partition)
- Common Lisp = [`partition`](https://common-lisp.net/project/bese/docs/arnesi/html/api/function_005FIT.BESE.ARNESI_003A_003APARTITION.html)

### Javascript Ecosystem
- Lodash - [`_.partition(collection, predicate)`](https://lodash.com/docs/4.17.15#partition)
- Underscore - [`_.partition(list, predicate)`](http://underscorejs.org/#partition)
- Ramda - [`R.partition(predicate, filterable)`](https://ramdajs.com/docs/#partition)
- RxJS - [`Observable.partition(predicate)`](https://www.learnrxjs.io/learn-rxjs/operators/transformation/partition)

## Draft Spec

### **Array.prototype.partition ( callbackfn [ , thisArg ] )**

> NOTE - _callbackfn_ should be a function that accepts three arguments and returns a value that is coercible to the Boolean value true or false. **partition** calls callbackfn once for each element in the array, in ascending order, and constructs two new arrays: one of all the values for which _callbackfn_ returns `true` and another of all the values for which _callbackfn_ returns `false`. _callbackfn_ is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the `this` value for each invocation of _callbackfn_. If it is not provided, `undefined` is used instead.

_callbackfn_ is called with three arguments: the value of the element, the index of the element, and the object being traversed.

**partition** does not directly mutate the object on which it is called but the object may be mutated by the calls to _callbackfn_.

The range of elements processed by *partition* is set before the first call to callbackfn. Elements which are appended to the array after the call to **partition** begins will not be visited by _callbackfn_. If existing elements of the array are changed their value as passed to _callbackfn_ will be the value at the time **partition** visits them; elements that are deleted after the call to **partition** begins and before being visited are not visited.

When the **partition** method is called with one or two arguments, the following steps are taken:

1. Let `O` be ? `ToObject(this value)`.
2. Let `len` be ? `LengthOfArrayLike(O)`.
3. If `IsCallable(callbackfn)` is `false`, throw a `TypeError` exception.
4. Let `A` be ? ArraySpeciesCreate(O, 0).
5. Let `B` be ? ArraySpeciesCreate(O, 0).
6. Let `Tuple` be ? ArrayCreate(2).
7. Let k be 0.
8. Let `toA` be 0.
9. Let `toB` be 0.
10. Repeat, while `k < len`,
  a. Let `Pk` be ! ToString(k).
  b. Let `kPresent` be ? HasProperty(O, Pk).
  c. If `kPresent` is `true`, then
    i. Let `kValue` be ? `Get(O, Pk)`.
    ii. Let `selected` be ! `ToBoolean(? Call(callbackfn, thisArg, « kValue, k, O »))`.
    iii. If `selected` is `true`, then
      1. Perform ? `CreateDataPropertyOrThrow(A, ! ToString(toA), kValue)`.
      2. Set `toA` to `toA + 1`.
    iv. Else,
      1. Perform ? `CreateDataPropertyOrThrow(B, ! ToString(toB), kValue)`.
      2. Set `toB` to `toB + 1`.
  d. Set `k` to `k + 1`
11. Perform ? `CreateDataPropertyOrThrow(Tuple, ! ToString(0), A)
12. Perform ? `CreateDataPropertyOrThrow(Tuple, ! ToString(1), B)
13. Return `Tuple`
