import timers from 'timers/promises';
const timeoutAsync = timers.setTimeout

setTimeout(async () => {
    console.log('starting process!!')
    await timeoutAsync(100)
    console.count('debug')
    console.log(await Promise.resolve('timeout order'))
    await timeoutAsync(100)
    console.count('debug')

    await Promise.reject('promise rejected on timeout')
}, 1000)

const throwError = (msg) => {
    throw new Error(msg)
}

try {
    console.log('hello')
    console.log('world')
    throwError('erro dentro do try/catch')
} catch(err) {
    console.log('pego no catch', err.message )
} finally {
    console.log('executed after all')
}

process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err.message || err)
})

process.on('uncaughtException', (err) => {
    console.log('uncaughtExecption', err.message || err)
    process.exit(1)
})
Promise.reject('promise rejected')


//se o Promise.reject estiver dentro de um outro contexto, ele cai no unhandledrejection
setTimeout(async () => {
    await Promise.reject('promise rejected')
})
// mas se ele estiver no contexto global, ele cai no uncaughtExcepetion
// await Promise.reject('promised async/await rejected)

// uncaught exception
setTimeout(() => {
    throwError('error fora do catch')
})
