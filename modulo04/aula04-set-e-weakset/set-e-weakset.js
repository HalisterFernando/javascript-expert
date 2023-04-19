const assert = require('assert')

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", '2', '2', '3'])

const set = new Set()

arr1.map((item) => set.add(item))
arr2.map((item) => set.add(item))

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2]), ['0', '1', '2', '3']))
console.log('set.keys', set.keys())
console.log('set.values', set.values()) // só existe por causa do map

// no array comun, para saber se um item existe
// [].indexOf('1') !== -1 ou [0].includes[0]
assert.ok(set.has('3'))

// mesma teoria do map, mas você sempre trabalha com a lista toda
// não tem get, então você não pode saber se o item está ou não no array
// na documentação tem exemplos de como fazer uma iteração, saber o que tem em uma lista e não tem em outra

// tem nos dois arrays 

const users01 = new Set([
    'erick',
    'mariazinha',
    'xuxa da silva '
])

const users02 = new Set([
    'joaozinho',
    'erick',
    'julio '
])

const intersection = new Set([...users01].filter((user) => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...users01].filter((user) => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa da silva'])

// weakSet

// mesma ideia do weakMap
// não é enumeralvel (iterável)
// só trabalha com chaves como referência
// só tem métodos simples

const user = {id: 123}
const user2 = {id: 321}

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)




