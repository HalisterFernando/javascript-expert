import { createServer } from 'http';
import { randomBytes } from 'crypto';

import Event from 'events'

const myEvent = new Event()

function getBytes() {
    return randomBytes(10000)
}

function onData() {
    getBytes()
    const items = []
    setInterval(function myInterval() {items.push(Date.now())})
}


createServer(function handler (req, res) {
    myEvent.emit('data', Date.now())
    myEvent.on('data', onData)
    res.end('ok')
}).listen(3000, () => console.log('rodando na porta 3000'))