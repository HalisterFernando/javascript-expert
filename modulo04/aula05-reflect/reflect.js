'use strict'
const assert = require('assert');

// garantir sempre a semântica e segurança do objeto

const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue
    }
}

assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [100]), 130)

// um problema que pode acontercer (raro)

// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// esse aqui pode acontecer 

myObj.add.apply = function () { throw new TypeError('Vixxx')}

assert.throws(
    () => myObj.add.apply({}, []),
    {
        name: 'TypeError',
        message: 'Vixxx'
    }
)

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20}, [200])
assert.deepStrictEqual(result, 260)
/// ----apply

// ----- define property

// questões semânticas

function myDate() {}

// feio pra kct
Object.defineProperty(myDate, 'withObject', {value: () => 'hey there'})
// agora faz mais sentido
Reflect.defineProperty(myDate, 'withReflection', {value: () => 'hey dude'})

assert.deepStrictEqual(myDate.withObject(), 'hey there')
assert.deepStrictEqual(myDate.withReflection(), 'hey dude')

// delete property

const withDelete = { user: 'Erik Wendel'}
// imperformático, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'xuxa da silva'}
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

// ----- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

// ----- has

assert.ok('superman' in {superman: ''})
assert.ok(Reflect.has({batman: ''}, 'batman'))

// ownKeys

const user = Symbol('user');
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'halisterfernando'
}

// com os metodos de object, temos que fazer 2 requisições

const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// reclection com um só modo

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])