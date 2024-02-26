import { fork } from 'child_process';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Writable } from 'stream';
import csvtojson from 'csvtojson';

const database = './data/All_Pokemon.csv';
const PROCESS_COUNT = 10;
const replications = [];


const backgroundTaskFile = './src/backgroundTask.js';
const processes = new Map() 

for (let index = 0; index < PROCESS_COUNT; index++) {
    const child = fork(backgroundTaskFile, [database])
    child.on('exit', () => {
        console.log(`process ${child.pid} exited`)
        processes.delete(child.pid)
    })
    child.on('error', error => {
        console.log(`process ${child.pid} has en error`, error)
        process.exit(1)
    })
    child.on('message', msg => {
        // work around para multiprocessamento
        if (replications.includes(msg)) return;
        console.log(`${msg} is replicated!`)
        replications.push(msg)
    })
    processes.set(child.pid, child)
}

function roundRobin(array, index = 0) {
    return function() {
        if (index >= array.length) index = 0

        return array[index++]
    }
}

const getProcess = roundRobin([...processes.values()])
console.log(`starting with ${processes.size} processes`)

await pipeline(
    createReadStream(database),
    csvtojson(),
    Writable({
        write(chunk, enc, cb) {
            const chosenProcess = getProcess()
            chosenProcess.send(JSON.parse(chunk))
            cb()
        }
    })

)


