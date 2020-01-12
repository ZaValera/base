import path from 'path';
import express from 'express';
import {AddressInfo} from 'net';
import {router} from './router';
import {log} from 'shared/src/utils';
import {SomeModule} from 'shared/src/modules/someModule';

const app = express();

app.use('/build', express.static(path.join(__dirname, '../../front/build')));
app.use(router);

const server = app.listen(3000, 'localhost', () => {
    const {address, port} = server.address() as AddressInfo;

    console.log(`Server listening at ${address}:${port}`);
});

server.timeout = 0;
