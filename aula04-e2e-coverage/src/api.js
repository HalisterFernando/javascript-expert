const http = require('http');
const DEFAULT_USER = {
    username: 'Halister Fernando',
    password: '123'
}

const { once } = require('events')

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page');
        return response.end()
    },
    '/login:post': async (request, response) => {
        const user = JSON.parse(await once(request, 'data'));
        const toLower = (string) => string.toLowerCase();        
        console.log(toLower(user.username), toLower(DEFAULT_USER.username))
        if (
            toLower(user.username) !== toLower(DEFAULT_USER.username) ||
            user.password !== DEFAULT_USER.password
        ) {
            response.writeHead(401)
            response.end('Logging failed!!')
            return;
        }

        return response.end('Logging succeeded!!');
    },
    default(request, response) {
        response.writeHead(404);
        return response.end('not found!')
    }
}

const handler = (request, response) => {
    const {url, method} = request;
    const routKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
    const chosen = routes[routKey] || routes.default
    return chosen(request, response)
}

const app = http.createServer(handler)
.listen(3000, () => console.log('rodando na porta 3000'));

module.exports = app;