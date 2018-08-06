const path = require('path');
const express = require('express');

const app = express();
app.use('/dist', express.static(path.join(__dirname, '../front/react/dist')));
app.use(require('./router'));

const server = app.listen(3000, 'localhost', () => {
    const {address, port} = server.address();

    console.log(`Server listening at ${address}:${port}`);
});

server.timeout = 0;

module.exports = app;