const assert = require('assert');

const myMap = new Map();

// podem ter qualquer coisa como chave 
myMap
.set(1, 'one')
.set('Halister', {text: 'two'})
.set(true, () => 'hello')

// usando construtor
const myMapWithContructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

console.log('myMap', myMap);
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Halister'), {text: 'two'});
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// Em objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyRefereceWorks = { id: 1 };
myMap.set(onlyRefereceWorks, { name: 'HalisterFernando'});

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyRefereceWorks), { name: 'HalisterFernando' });

// utilitarios
// - no object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

// verificar se um item existe no objeto
// item.key = se não existe = undefined
// if () = coerção implicita para boolean e retorna false
// O jeito certo em object é ({ name: 'HalisterFernando }).hasOwnProperty('name')
assert.ok(myMap.has(onlyRefereceWorks))

// para remover um item do objeto
// delete item.id
// imperformático para o javascript
assert.ok(myMap.delete(onlyRefereceWorks));

// não dá pra iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Halister", {"text": "two"}], [true, () => {}]]))

for (const [key, value] of myMap) {
    console.log({[key]: value})
}

// Object e inseguro pois dependendo do nome da chave pode substituir algum comportamento padrão
// ({ }).toString() === '[object Object]'
// ({ toString: () => 'hey'}).toString() === 'hey'

// qualquer chave pode colidir, com as propriedades herdadas no prototype chain como,
// constructor, toString, valueOf etc...

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// não tem restrição de chave
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Não da pra limpar um Obj sem reassiná-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// WeakMap

// tem a maioria dos beneficios do map
// MAS não é iteravel
// Só chaves de referencia e que você já conheça
// mais leve e prevê leak de memória, pq depois que as instancia saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)







