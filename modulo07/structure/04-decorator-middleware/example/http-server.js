import http from 'http';
import { InjectHttpMiddleware } from './../src/index.js'

InjectHttpMiddleware()

function handleRequest(req, res) {
    res.end('Hello World')
}

const server = http.createServer(handleRequest);
const port = 3000

server.listen(port, () => console.log(`Server running at ${server.address().port}`))