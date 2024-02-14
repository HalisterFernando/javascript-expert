import { Writable, PassThrough } from 'stream';
import axios from 'axios';

const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:4000';

const requests = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'get',
        url: API_02,
        responseType: 'stream'
    })
]);



const results = requests.map(({data}) => data);

const output = Writable({
    write(chunk, enc, cb) {
        const data = chunk.toString().replace(/\n/, "");

        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${name.toLowerCase()}] ${data}`)
        cb()
    }
});

function merge(streams) {
    return streams.reduce((prev, curr, index, items) => {
        curr.pipe(prev, {end: false})
        curr.on('end', () => items.every(s => s.ended) && prev.end())
        return prev
    }, new PassThrough())
}

merge(results).pipe(output)
// result[0].pipe(output)
// result[1].pipe(output)