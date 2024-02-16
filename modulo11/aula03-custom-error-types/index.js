import { createServer } from 'http'
import BusinessError from './errors/businessError.js';
import { statusCodes } from './utils/httpStatusCodes.js';

function validateHero(hero) {
    //simulando erro do banco de dados
    if (Reflect.has(hero, "connectionError")) {
        throw new Error("error connecting to DB!")
    }
    if (hero.age < 20) {
        throw new BusinessError('age must be above 20!')
    }
    if (hero.name?.length < 4) {
        throw new BusinessError("name length must be above 4 characters")
    }

}

async function handler(req, res) {
    for await (const data of req) {
        try {
            const hero = JSON.parse(data);
            validateHero(hero)
            console.log(hero)
            res.writeHead(statusCodes.OK)
            res.end()
        } catch (error) {
            if ( error instanceof BusinessError) {
                res.writeHead(statusCodes.BAD_REQUEST)
                res.end(error.message)
                continue;
            }
            res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            res.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}'