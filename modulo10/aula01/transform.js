import { Readable, Writable, Transform } from 'stream';
import { createWriteStream } from 'fs';

const readable = Readable({
    read() {
        for (let index = 0; index < 1e5; index++) {
            const person = { id: Date.now() + index, name: `Halister${index}`}
            const data = JSON.stringify(person);
            this.push(data)
        }

        // informa que os dados acabaram
        this.push(null)
    }
});

// processamento dos dados

const mapFields = Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk)
        const result = `${data.id},${data.name.toUpperCase()}\n`
        cb(null, result)
    }
})


// saída de dados

const writable = Writable({
    write(chunk, encoding, cb) {
        console.log('msg', chunk.toString())
        cb()
    }
})

const mapHeaders = Transform({
    transform(chunk, encoding, cb) {
        this.counter = this.counter ?? 0;
        if (this.counter) {
            return cb(null, chunk)
        }

        this.counter += 1;
        cb(null, 'id,name\n'.concat(chunk))
    }
})

const pipeline = readable // writable é sempre a saída - imprimir / salvar ou ignorar
    .pipe(mapFields)
    .pipe(mapHeaders)
    //.pipe(process.stdout)
    .pipe(createWriteStream('my.csv'))

pipeline
    .on('end', () => console.log('acabou'))

