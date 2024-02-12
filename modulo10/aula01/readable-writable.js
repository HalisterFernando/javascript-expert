import { Readable, Writable } from 'stream';

const readable = Readable({
    read() {
        this.push('hello world 1')
        this.push('hello world 2')
        this.push('hello world 3')
        this.push('hello world 4')
        // informa que os dados acabaram
        this.push(null)
    }
});

// saída de dados

const writable = Writable({
    write(chunk, encoding, cb) {
        console.log('msg', chunk.toString())
        cb()
    }
})

readable // writable é sempre a saída - imprimir / salvar ou ignorar
    .pipe(writable)