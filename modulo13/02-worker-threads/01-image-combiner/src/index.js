import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

import sharp from 'sharp';
import { dirname } from 'path';

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = 'worker.js'

async function joinImages(images) {

    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`);
        worker.postMessage(images)
        worker.once('message', resolve)
        worker.once('error', reject)
        worker.once('exit', code => {
            if (code !== 0) {
                return reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`))
            }
            console.log(`the thread ${worker.threadId} exited!`)
        })
    })
}

async function handler(req, res) {
    if (req.url.includes('joinImages')) {
        const { query: {background, img} } = parse(req.url, true);
        const imageBase64 = await joinImages({
            image: img,
            background
        })
       
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })

        res.end(`<img src="data:image/jpeg;base64,${imageBase64}"/>`)
        return;
    }
    return res.end('ok')
}

createServer(handler)
    .listen(3000, () => console.log('running at 3000'))


// localhost:3000/joinImages?img=https://i0.wp.com/scifiguresreview.com/wp-content/uploads/2021/12/assassino-4.png&background=https://cdn.pixabay.com/photo/2017/06/30/19/52/apocalypse-2459465_1280.jpg
// https://static3.tcdn.com.br/img/img_prod/460977/action_figure_predador_predator_big_red_alien_vs_predator_neca_60385_1_20201211173157.png
// https://images4.alphacoders.com/140/140624.jpg
// https://cdn.pixabay.com/photo/2017/06/30/19/52/apocalypse-2459465_1280.jpg
// https://t4.ftcdn.net/jpg/05/33/66/63/360_F_533666385_iM4MlMwF3QtXqSPRr4edUdDzfCRGNklH.jpg