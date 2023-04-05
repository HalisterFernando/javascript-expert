const assert = require('assert');

// keys

const uniqueKey = Symbol('userName');
const user = {};

user["userName"] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

console.log('getting normal Objects', user.userName);
console.log('getting normal Objects', user[Symbol("userName")]);
console.log('getting normal Objects', user[uniqueKey]);


assert.deepStrictEqual(user.userName, 'value for normal Objects');

// sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// é difícil pegar mas não é secreto
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)

user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// keys

const obj = {
    [Symbol.iterator]: () => ({
        items: ['a', 'b', 'c'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

for (const item of obj) {
    console.log('item', item)
}

assert.deepStrictEqual([...obj], ['c', 'b', 'a'])

const kItems = Symbol("kItems")
class MyDate {
    constructor(...args) {
        this[kItems] = args.map((arg) => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== 'string') throw new TypeError()
      
        const items = this[kItems]
        .map((item) => 
                new Intl
                .DateTimeFormat("pt-BR", {
                    month: 'long',
                    day: '2-digit',
                    year: "numeric"
                }).format(item)
        )
        
        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(items)
    }

    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

    get [Symbol.toStringTag]() {
        return 'What?'
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02)
]

console.log('myDate', myDate);
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object What?]');
assert.throws(() => myDate + 1, TypeError)
console.log(String(myDate))
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018');
console.log([...myDate])

;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()
