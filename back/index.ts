const path = require('path');
const express = require('express');
const params: string[] = process.argv.slice(2);
const data: {[key: string]: string} = {};

for (const item of params) {
    const [name, value] = item.split('=');
    data[name.slice(2)] = value;
}

const front = data.front;

const app = express();
app.use('/dist', express.static(path.join(__dirname, `../front/${front}/dist`)));
app.use(require('./router')(front));

const server = app.listen(3000, 'localhost', () => {
    const {address, port} = server.address();

    console.log(`Server listening at ${address}:${port}`);
});

server.timeout = 0;

module.exports = app;