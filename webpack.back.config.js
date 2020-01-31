const path = require('path');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {getCommonLoaders, getParams} = require('./webpack.utils');

module.exports = env => {
    const {
        isDev,
        dirname,
        mode,
        devtool,
    } = getParams(env);

    return {
        mode,
        devtool,
        target: 'node',
        entry: './back/src/index.ts',
        output: {
            filename: 'index.js',
            path: path.resolve(dirname, 'back/build'),
            publicPath: '/build/',
        },
        node: {
            __dirname: false,
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        ...getCommonLoaders(dirname, isDev),
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(dirname, 'back/tsconfig.json'),
                                experimentalWatchApi: true,
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            // modules: ['node_modules'],
            alias: {
                src: path.resolve(dirname, './back/src'),
                shared: path.resolve(dirname, './shared'),
            },
        },
        plugins: [
            new FriendlyErrorsWebpackPlugin(),
        ],
    };
};