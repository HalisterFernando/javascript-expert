import { Duplex, Transform } from 'stream';

let count = 0

const server = new Duplex({    
    objectMode: true, // faz não precisar trabalhar com buffer mas gasta mais memória
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Halister ${count} `)
                return 
            }
            clearInterval(intervalContext);
            this.push(null)
        }
        setInterval(function() { everySecond(this) })
    },
    
    write(chunk, encoding, cb) {
        console.log(`[writable] saving`, chunk);
        cb()
    }
})

// write aciona o writable do Duples
server.write(`[duplex] hey this is a variable!\n`);
// on data > loga o que rolou no .push do readable
// server.on('data', msg => console.log(`[readable] ${msg}`))

// o push deixa você enviar mais dados
server.push(`[duplex] hey this is also a variable!\n`)

// server
//     .pipe(process.stdout)

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        cb(null, chunk.toUpperCase())

    }
})

// o transform é também um duplex mas não possuem comunicação independente
transformToUpperCase.write(`[transform] hello from write`)
// o push vai ignorar o que você tem na função transform
transformToUpperCase.push(`[transform] hello from push\n`)

server
    .pipe(transformToUpperCase)
    // redireciona todos os dados de readable para variable da duplex
    .pipe(server)