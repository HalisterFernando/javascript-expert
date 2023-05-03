const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

// poderia estar em outro arquivo
const dbData = [{name: 'Mariazinha'}, {name: 'Joãozinho'}]
class MockDatabase {
    connect = () => this
    find = async (query) => dbData
}


rewiremock(() => require('./../util/database')).with(MockDatabase)

;(async () => {
    {
        const expected = [{name: 'MARIAZINHA'}, {name: 'JOÃOZINHO'}];
        rewiremock.enable();
        const UserFactory = require('../factory/userFactory');

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()
        deepStrictEqual(result, expected)
        rewiremock.disable();
    }
})()