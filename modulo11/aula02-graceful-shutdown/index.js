import { MongoClient } from 'mongodb';
import http from 'http';

import { promisify } from 'util';

async function dbConnect() {
    const client = new MongoClient("mongodb://localhost:27017")
    await client.connect()
    console.log('mongo db is connected!')
    const db = client.db('comics')

    return {
        collections: {
            heroes: db.collection('heros'),
        },
        client
    }
}

const { collections, client} = await dbConnect()

async function handler(req, res) {
    for await (const data of req) {        
        try {
            const hero = JSON.parse(data);
            await collections.heroes.insertOne({ ...hero, updatedAt: new Date().toISOString() })
            const heroes = await collections.heroes.find().toArray()
            console.log({ heroes })            
            res.writeHead(200)
            res.write(JSON.stringify(heroes))
        } catch (error) { 
            console.log('a request error has happened', error)
            res.writeHead(500)
            res.write(JSON.stringify({ message: 'internal server error!'}))
        } finally {
            res.end()
        }
    }    

  
}


//await client.close()
// curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}'
const server = http.createServer(handler)
    .listen(3000, () => console.log('running at 3000', process.pid))




const onStop = async (signal) => {
    console.info(`\n${signal} signal received!`)

    console.log('closing http server')
    await promisify(server.close.bind(server))();
    console.log('http server has closed');

    await client.close()
    console.log('mongo connection has closed')
    // zero é certo, 1 é erro
    process.exit(0);
}

 // SIGINT - Ctrl C
// SIGTERM - Kill


["SIGINT", "SIGTERM"].forEach(ev => {
    process.on(ev, onStop)
});
// process.on('SIGINT', (signal) => {
//     console.info(`\n${signal} signal received!`)
// })
