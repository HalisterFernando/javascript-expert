import { setTimeout } from 'timers/promises'
import { pipeline } from 'stream/promises';

async function * myCustomReadable() {
    yield Buffer.from('This is my')
    await setTimeout(100)
    yield Buffer.from('custom readable')
}

async function * myCustomTransform(stream) {
    for await (const chunk of stream) {
        yield chunk.toString().replace(/\s/g, "_")
       }
}

async function * myCustomDuplex(stream) {
    let bytesRead = 0;
    const wholeString = []
    for await (const chunk of stream) {
        console.log('[duplex writable]', chunk)
        bytesRead += chunk.length
        wholeString.push(chunk)
       }

       yield `wholeString ${wholeString.join()}`
       yield `bytesRead ${bytesRead}`
}

async function * myCustomWriteable(stream) {
   for await (const chunk of stream) {
    console.log('[writable]', chunk.toString())
   }
}

try {

    const controller = new AbortController()

    setImmediate(() => controller.abort() ) 
    await pipeline(
        myCustomReadable,
        myCustomTransform,
        myCustomDuplex,
        myCustomWriteable,
        { signal: controller.signal }
    )
    console.log('process has finished')
} catch (err) {
    console.log('\nabort', err.message)
}

