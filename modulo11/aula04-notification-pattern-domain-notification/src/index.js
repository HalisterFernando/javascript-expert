import { createServer } from 'http'
import { statusCodes } from './utils/httpStatusCodes.js';
import HeroEntity from './heroEntity.js';



async function handler(req, res) {
    for await (const data of req) {
        try {
            const parsedData = JSON.parse(data);
            if (Reflect.has(parsedData, "connectionError")) {
                throw new Error("error connecting to DB!")
            }
            const hero = new HeroEntity(parsedData)
            if (!hero.isValid()) {
                res.writeHead(statusCodes.BAD_REQUEST)
                res.end(hero.notifications.join('\n'))
                continue;
            }
            console.log(parsedData)
            res.writeHead(statusCodes.OK)
            res.end()
        } catch (error) {
            res.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            res.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}'