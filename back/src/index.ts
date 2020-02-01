import path from 'path';
import express from 'express';
import {AddressInfo} from 'net';
import {router} from './router';
import {log} from 'shared/src/utils';
import {SomeModule} from 'shared/src/modules/someModule';
import webpack from 'webpack';

const hmr = !!process.env.HMR;
const app = express();

if (hmr) {
    const webpackConfig = require('../../webpack.front.config')({
        dev: true,
        dirname: path.join(__dirname, '../..'),
        hmr,
    });

    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use('/build', express.static(path.join(__dirname, '../../front/build')));
}

app.use(router);

const server = app.listen(3000, 'localhost', () => {
    const {address, port} = server.address() as AddressInfo;

    console.log(`Server listening at ${address}:${port}`);
});

server.timeout = 0;
