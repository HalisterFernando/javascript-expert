import ContextStrategy from "./base/contextStrategy.js"
import MongoDBStrategy from "./strategies/mongoDBStrategy.js"
import PostgresStrategy from "./strategies/postgresStrategy.js"

const postgresConnectionString = 'postgres://halisterfernando:senha123@localhost:5432/heroes';
const mongoConnectionString = 'mongodb://halisterfernando:senha123@localhost:27017/heroes';
const postegresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoConnectionString));
const result = await postegresContext.connect()
await mongoDBContext.connect()



const data = [
    {
        name: 'Halister Fernando',
        type: 'transaction',
    },
    {
        name: 'Maria Silva',
        type: 'activityLog'
    }
]

const contextTypes = {
    transaction: postegresContext,
    activityLog: mongoDBContext,
}

for (const {type, name } of data) {
    const context = contextTypes[type]
    await context.create({name: name + Date.now()})
    console.log(type, context.dbStrategy.constructor.name)

    console.log(await context.read())
}