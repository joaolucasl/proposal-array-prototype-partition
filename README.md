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
