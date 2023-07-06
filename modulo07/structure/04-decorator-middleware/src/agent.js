import Http from 'http';

async function InjectHttpMiddleware() {
    const oldEmit = Http.Server.prototype.emit;
    Http.Server.prototype.emit = function (...args) {
        const [type, req, response] = args;

        if (type === 'request') {
            response.setHeader('X-Instrumented-By', 'Halister')
        }

        return oldEmit.apply(this, args);
    }
}

export { InjectHttpMiddleware }